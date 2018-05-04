'use strict';

module.exports = (sequelize, DataTypes) => {
	let telefone = sequelize.define('telefone', {
		telefone: {
			type: DataTypes.CHAR
		},
		dataCadastro: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.TINYINT
		}
	},
		{
		tableName: 'telefone',
		timestamps: false
	});

	return telefone;

}