'use strict';

module.exports = (sequelize, DataTypes) => {
	let transacao = sequelize.define('transacao', {
		nome: {
			type: DataTypes.STRING
		},
		tipo: {
			type: DataTypes.INTEGER
		},
		codigo: {
			type: DataTypes.STRING
		},
		pessoa: {
			type: DataTypes.INTEGER
		},
		favorecido: {
			type: DataTypes.INTEGER
		},
		banco: {
			type: DataTypes.INTEGER
		},
		moeda: {
			type: DataTypes.TINYINT
		},
		valor: {
			type: DataTypes.STRING
		},
		valorReal: {
			type: DataTypes.STRING
		},
		taxa: {
			type: DataTypes.STRING
		},
		situacao: {
			type: DataTypes.TINYINT
		},
		documento: {
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
		tableName: 'transacao',
		timestamps: false
	})

	transacao.associate = models => {
		models.transacao.belongsTo(models.banco, {foreignKey: 'banco' ,as: 'bancoObj'})
		models.transacao.belongsTo(models.pessoa, {foreignKey: 'pessoa' ,as: 'pessoaObj'})
	};

	return transacao;
}