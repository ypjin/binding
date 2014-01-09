Use the following command to genreate binding file:

acs compile out alias

To run tests:

1. run 'npm install' in the app folder
2. use 'acs compile out test' to generate binding file in 'out' folder.
3. update the following line in the generated binding file
      var url = Ti.App.Properties.getString("acs-service-baseurl-testapp");
    to
      var url = null;
4. use 'acs run' to start the app locally
5. in the app folder run 'mocha' (npm install -g mocha to install it first)
