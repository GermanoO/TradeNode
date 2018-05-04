'use strict';
const fs = require("fs");
const path = require("path");
const Sequelize = require('sequelize');

module.exports = config => {

	let models = {}

	const sequelize = new Sequelize(config.database, config.username, config.password, {
	  host: config.host,
	  dialect: config.dialect,
	  operatorsAliases: false,
	  pool: config.pool,
	});
	
	try{
		fs
			.readdirSync(__dirname)
			.filter((file) => {
				return (file.indexOf(".") !== 0) && (file !== "index.js");
			})
			.forEach((file) => {
				let model = sequelize.import(path.join(__dirname, file));
				models[model.name] = model;
			});
	} catch (err){
		console.log(err)
	}

	Object.keys(models).forEach(function (modelName) {
		if (typeof models[modelName].associate === 'function') {
			models[modelName].associate(models);
		}
	});

	models.Sequelize = Sequelize;
	models.sequelize = sequelize;

	return models;
}
