'use strict';
//ENVIRONMENT
if (!process.env.NODE_ENV || process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = "development";
}

const env = process.env.NODE_ENV;
let config;
if(env === "development"){
	config = require('./config/config.json')["development"];
} else if(env === "production"){
	config = require('./config/config.json')["production"];
}else {
	config = require('./config/config.json')["development"];
}

console.log('current config: '+JSON.stringify(config, null, 2))

let express = require('express');
let bodyParser = require('body-parser');
let port = config.port || 8080;
let app = express();
var cors = require('cors');
let mailer = require('./src/libs/ativo-mailer')(config)

//DATABASE
let models = require('./src/models')(config)

//PARSERS
app.use(bodyParser.urlencoded({
    limit: '150kb',
    extended: true
}));

app.use(bodyParser.json({limit: '50mb'}));

app.use(cors());

let controllers = require('./src/controllers')(models, mailer);

//ROUTES
let routes = require('./src');
routes.setupRoutes(app, controllers, models, config);


models.sequelize.sync()
.then(() => {
	app.listen(port, function () {
		console.log('Linstening port '+ port);
	});
})