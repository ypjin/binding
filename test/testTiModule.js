var should = require('should');
var sinon = require('sinon');
var rewire = require('rewire');

var request = require('request');

var Binding = rewire('../out/ti.cloud.binding');

var host = 'http://localhost:8080';
var currentReqPath;

/**
 * To run these tests,
 * 1. run 'npm install' in the app folder
 * 2. use 'acs compile out test' to generate binding file in 'out' folder.
 * 3. update the following line in the generated binding file
 *      var url = Ti.App.Properties.getString("acs-service-baseurl-testapp");
 *    to
 *      var url = null;
 * 4. use 'acs run' to start the app locally
 * 5. in the app folder run 'mocha' (npm install -g mocha to install it first)
 *
 */
describe('binding file for Ti app', function() {

    Binding.__set__('InvokeService', sendRequest);

    describe('health check from stratus - app change', function() {

        // { "path": "/", "callback": "application#index" },

        it('1 - should respond to /', function(done) {
            currentReqPath = '/';
            Binding.application_index({}, function(err, data) {
                should.strictEqual(null, err);
                done();
            })
        });


        // { "path": "/test/abc?a=b&c=d", "callback": "application#index" },

        it('1.1 - should respond to /test/abc', function(done) {
            currentReqPath = '/test/abc';
            Binding.application_index1({}, function(err, data) {
                should.strictEqual(null, err);
                done();
            })
        });


        // { "path": "/test/:name", "callback": "application#test"},

        it('2 - should respond to /test/:name', function(done) {
            currentReqPath = '/test/someone';
            Binding.application_test({}, 'someone', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone' });
                done();
            })
        })


        // { "path": "/test/:name/abc", "callback": "application#test"},

        it('2.2 - should respond to /test/:name/abc', function(done) {
            currentReqPath = '/test/someone/abc';
            Binding.application_test1({}, 'someone', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone' });
                done();
            })
        })

        // { "path": "/test/:name/ycc/:id", "callback": "application#test"},

        it('3 - should respond to /test/:name/ycc/:id', function(done) {
            currentReqPath = '/test/someone/ycc/someid';
            Binding.application_test2({}, 'someone', 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone', id: 'someid' });
                done();
            })
        })


        // { "path": "/test/:name/:id", "callback": "application#test"},

        it('4 - should respond to /test/:name/:id', function(done) {
            currentReqPath = '/test/someone/someid';
            Binding.application_test3({}, 'someone', 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone', id: 'someid' });
                done();
            })
        })


        // { "path": "/test/nameopt/:name?/reqid/:id", "callback": "application#test"},

        it('5 - should respond to /test/nameopt/:name?/reqid/:id with name', function(done) {
            currentReqPath = '/test/nameopt/someone/reqid/someid';
            Binding.application_test4({}, 'someone', 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone', id: 'someid' });
                done();
            })
        })

        it('6 - should respond to /test/nameopt/:name?/reqid/:id without name', function(done) {
            currentReqPath = '/test/nameopt/reqid/someid';
            Binding.application_test4({}, null, 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ id: 'someid' });
                done();
            })
        })



        // { "path": "/test/reqname/:name/idopt/:id?/", "callback": "application#test"},

        it('7 - should respond to /test/reqname/:name/idopt/:id?/ with id', function(done) {
            currentReqPath = '/test/reqname/someone/idopt/someid/';
            Binding.application_test5({}, 'someone', 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone', id: 'someid' });
                done();
            })
        })

        it('8 - should respond to /test/reqname/:name/idopt/id?/ without id', function(done) {
            currentReqPath = '/test/reqname/someone/idopt/';
            Binding.application_test5({}, 'someone', null, function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone' });
                done();
            })
        })



        // { "path": "/test/nameopt/:name?/idopt/:id?", "callback": "application#test"}

        it('9 - should respond to /test/nameopt/:name?/idopt/:id? with name and id', function(done) {
            currentReqPath = '/test/nameopt/someone/idopt/someid';
            Binding.application_test6({}, 'someone', 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone', id: 'someid' });
                done();
            })
        })

        it('10 - should respond to /test/nameopt/:name/idopt/:id? without name', function(done) {
            currentReqPath = '/test/nameopt/idopt/someid';
            Binding.application_test6({}, null, 'someid', function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ id: 'someid' });
                done();
            })
        })

        it('11 - should respond to /test/nameopt/:name/idopt/:id? without id', function(done) {
            currentReqPath = '/test/nameopt/someone/idopt';
            Binding.application_test6({}, 'someone', null, function(err, data) {
                should.strictEqual(null, err);
                data.should.eql({ name: 'someone' });
                done();
            })
        })

    });
});


function sendRequest(path, method, data, cb) {

    path.should.eql(currentReqPath);

    request[method.toLowerCase()](host + path,
        {json: data},
        function(error, response, body) {

            response.statusCode.should.eql(200);

            if(error) {
                console.log(error);
                return cb(error);
            }
            cb(null, body);
        });
}
