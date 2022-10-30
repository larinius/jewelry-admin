const os = require('os');
module.exports = {
    apps: [{
        port        : 8080,
        name        : "api",
        script      : "api/app.js", // 👈 CommonJS
        watch       : true,           
        instances   : 1,
        exec_mode   : 'fork',         
        env: {
            NODE_ENV: "debug",
        }
    }]
}