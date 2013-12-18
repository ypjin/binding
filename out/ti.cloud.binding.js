/**
 * This is generated code - it will be overwritten. Do not modify.
 * Copyright (c) 2012 by Appcelerator, Inc. All Rights Reserved.
 */

function InvokeService(path, method, data, cb) {
   if (typeof(data) == "function") {
      cb = data; data = null;
   }
   var xhr = Ti.Network.createHTTPClient();
   if (typeof(cb) == "function") {
        xhr.onload = function(e) {
           var r = this.responseText;
           if (xhr.getResponseHeader("content-type").indexOf("json") != -1) {
               try { r = JSON.parse(r); } catch (E) { }
           }
           cb(r, e);
        };
   }
   if(exports.URL.match('/$') == '/' && path.indexOf('/') == 0) {
       xhr.open(method, exports.URL + path.substring(1));
   } else {
       xhr.open(method, exports.URL + path);
   }
   xhr.send(data);
};

var url = null;//Ti.App.Properties.getString("acs-service-baseurl-testapp");

if(url && url.replace(/^\s+|\s+$/g, "")) {
   exports.URL = url.replace(/^\s+|\s+$/g, "");
} else {
   exports.URL = "http://localhost:8080";
}

exports.application_index = function(data, cb) {
   var path = [];
   path.push('/');
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_index1 = function(data, cb) {
   var path = [];
   path.push('/test/abc');
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test = function(data, name, cb) {
   if(!name) throw 'name is required!';
   var path = [];
   path.push('/test');
   if(name) {
      path.push('/' + name);
   }
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test1 = function(data, name, cb) {
   if(!name) throw 'name is required!';
   var path = [];
   path.push('/test');
   if(name) {
      path.push('/' + name);
   }
   path.push('/abc');
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test2 = function(data, name, id, cb) {
   if(!name) throw 'name is required!';
   if(!id) throw 'id is required!';
   var path = [];
   path.push('/test');
   if(name) {
      path.push('/' + name);
   }
   path.push('/ycc');
   if(id) {
      path.push('/' + id);
   }
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test3 = function(data, name, id, cb) {
   if(!name) throw 'name is required!';
   if(!id) throw 'id is required!';
   var path = [];
   path.push('/test');
   if(name) {
      path.push('/' + name);
   }
   if(id) {
      path.push('/' + id);
   }
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test4 = function(data, name, id, cb) {
   if(!id) throw 'id is required!';
   var path = [];
   path.push('/test/nameopt');
   if(name) {
      path.push('/' + name);
   }
   path.push('/reqid');
   if(id) {
      path.push('/' + id);
   }
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test5 = function(data, name, id, cb) {
   if(!name) throw 'name is required!';
   var path = [];
   path.push('/test/reqname');
   if(name) {
      path.push('/' + name);
   }
   path.push('/idopt');
   if(id) {
      path.push('/' + id);
   }
   path.push('/');
   InvokeService(path.join(''), "GET", data, cb);
};

exports.application_test6 = function(data, name, id, cb) {
   var path = [];
   path.push('/test/nameopt');
   if(name) {
      path.push('/' + name);
   }
   path.push('/idopt');
   if(id) {
      path.push('/' + id);
   }
   InvokeService(path.join(''), "GET", data, cb);
};
