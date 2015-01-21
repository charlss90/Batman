var Hapi = require('hapi');
var Good = require("good");
var Basic = require("hapi-auth-basic");
var FrontEnd = require("./front-end");
// Basic.attributes = {
//     name:"Security",
//     version: "0.0.0"
// };
var api = require("./api/api");

var port = 3000;
var config = {
    debug: {
        request: ["error", "read"]
    }
};


var server = new Hapi.Server(config);
server.connection({
    port: port, 
    host: "0.0.0.0"
});

server.register([
    {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                args:[{ log: '*', response: '*' }]
            }]
        }
    },
    {
        register: Basic,
        options: {}
    },
    {
        register: FrontEnd,
        options: {}
    }

], function (err) {
    if (err) throw err; // something bad happened loading the plugin
    server.register({
        register: api,
        option: {}
    }, {
        routes: {
            prefix: "/api/"
        }
    }, function (err) {
        if (err) throw err;

        server.start(function (err) {
            if (err) throw err;
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    });
});