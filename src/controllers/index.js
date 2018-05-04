'use strict';

module.exports = (models, mailer) => {
	let pessoa = require('./pessoa')(models);
	let banco = require('./banco')(models);
	let transacao = require('./transacao')(models, mailer);
	let autenticacao = require('./autenticacao')(models);

	return {
		pessoa,
		banco,
		transacao,
		autenticacao
	}
}