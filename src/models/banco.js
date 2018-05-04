'use strict';

module.exports = (sequelize, DataTypes) => {
	let banco = sequelize.define('banco', {
		nome: {
			type: DataTypes.STRING
		},
		banco: {
			type: DataTypes.STRING
		},
		agencia: {
			type: DataTypes.STRING
		},
		conta: {
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
		tableName: 'banco',
		timestamps: false
	});

	banco.associate = models => {
		models.banco.belongsTo(models.pessoa, {
			onDelete: "CASCADE",
			as: 'pessoaObj',
            foreignKey: {
                allowNull: false,
                name: 'pessoa'
            }
		})
	}

	return banco;
}