'use strict';

module.exports = (sequelize, DataTypes) => {
	let pessoafisica = sequelize.define('pessoafisica', {
		cpf: {
			type: DataTypes.CHAR
		}
	},
	{
		tableName: 'pessoafisica',
		timestamps: false
	});

	return pessoafisica;
}