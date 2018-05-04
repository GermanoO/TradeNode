'use strict';

module.exports = (sequelize, DataTypes) => {
	let pessoajuridica = sequelize.define('pessoajuridica', {
		cnpj: {
			type: DataTypes.CHAR
		}
	},
	{
		tableName: 'pessoajuridica',
		timestamps: false
	});

	return pessoajuridica;
}