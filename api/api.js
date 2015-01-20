Bcrypt = require("bcrypt");

var users = {
    john: {
        username: 'john',
        password: '$2a$10$ayXYG20OTlvOX0V22RpBUenDMtAkq71AMOkLBOQJf39vGDIAYbZ5i',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

// Bcrypt.genSalt(10, function(err, salt) {
//     Bcrypt.hash("carlos", salt, function(err, hash) {
//         // Store hash in your password DB.
//         users.john.password = hash;
//         console.log(hash);
//     });
// });

var validate = function (username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};


exports.register = function (plugin, options, next) {
    plugin.auth.strategy('simple', 'basic', { validateFunc: validate });

    plugin.register([
        {
            register: require("./users/users"),
            options: {}
        }
    ], function (err) {
        if (err) throw err;
        next();
    });

};

exports.register.attributes = {
    name: "API REST",
    version: "0.0.0"
};
