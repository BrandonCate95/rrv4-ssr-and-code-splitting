const path = require('path');
require( "babel-register" )( {
    presets: [ "react", "env" ],
});
require('babel-polyfill');
require(path.join(__dirname, '/server.js'));