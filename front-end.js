exports.register = function (plugin, options, next) {

    plugin.route({
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: "./app",
                listing: false,
                index: true
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: "FrontEnd Server",
    version: "0.0.0"
};
