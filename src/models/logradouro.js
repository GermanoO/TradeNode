'use strict';

module.exports = (sequelize, DataTypes) => {
	let logradouro = sequelize.define('logradouro', {
		logradouro: {
			type: DataTypes.STRING
		},
		numero: {
			type: DataTypes.STRING
		},
		complemento: {
			type: DataTypes.STRING
		},
		bairro: {
			type: DataTypes.STRING
		},
		cidade: {
			type: DataTypes.STRING
		},
		estado: {
			type: DataTypes.STRING
		},
		estado: {
			type: DataTypes.STRING
		},
		codigoPostal: {
			type: DataTypes.STRING
		},
		dataCadastro: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.TINYINT
		}
	}, 
	{
		tableName: 'logradouro',
		timestamps: false
	});

	return logradouro;
}