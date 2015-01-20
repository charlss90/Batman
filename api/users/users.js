exports.register = function (plugin, options, next) {
    plugin.route({
        method: "GET",
        path: "users",
        config: {
            auth: "simple",
            handler: function (request, reply) {
                reply("Users Api in construction");
            }
        }
    });
    next();
};

exports.register.attributes = {
    name:"users",
    version: "0.0.0"
};