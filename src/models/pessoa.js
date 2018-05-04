'use strict';

module.exports = (sequelize, DataTypes) => {
	let pessoa = sequelize.define('pessoa', {
		nome: {
			type: DataTypes.INTEGER
		},
		email: {
			type: DataTypes.STRING
		},
		senha: {
			type: DataTypes.STRING
		},
		nacionalidade: {
			type: DataTypes.STRING
		},
		codigo: {
			type: DataTypes.STRING
		},
		foto: {
			type: DataTypes.STRING
		},
		dataCadastro: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.TINYINT
		}
	}, {
		tableName: 'pessoa',
		timestamps: false
	})
	pessoa.associate = models => {
		models.pessoa.hasOne(models.pessoajuridica, {
			onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: 'pessoa'
            }
		})
		models.pessoa.hasOne(models.pessoafisica, {
			onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: 'pessoa'
            }
		})
		models.pessoa.hasOne(models.telefone, {
			onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: 'pessoa'
            }
		})
		models.pessoa.hasOne(models.logradouro, {
			onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: 'pessoa'
            }
		})
		models.pessoa.hasMany(models.banco, {
			onDelete: "CASCADE",
            foreignKey: {
                allowNull: false,
                name: 'pessoa'
            }
		})
	};

	return pessoa
}