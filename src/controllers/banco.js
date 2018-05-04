'use strict';

var moment = require('moment-timezone');

module.exports = models => {
	return {
		index: (req, res) => {
			models.banco.findAll()
			.then(response => {
				res.json({
					status: 'sucesso',
					data: response
				});
			}).catch(function(error) {
				res.json({
					status: 'error',
					data: error.message
				});
			})
		},
		indexById: (req, res) => {
			
			let id = req.params.id;
			
			if(!id){
				res.status(400).json({
					message: 'ID inválido.'
				})
			}
			
			models.banco.findOne({
				where: {
					pessoa: id
				}
			}).then(response => {
				res.json({
					status: 'sucesso',
					data: response
				});
			}).catch(function(error) {
				res.json({
					status: 'error',
					data: error.message
				});
			})

		},
		insert: (req, res) => {
			let body = req.body

			const banco = {
				pessoa: body.pessoa,
				nome: body.nome,
				banco: body.banco,
				agencia: body.agencia,
				conta: body.conta,
				dataCadastro: moment().format(),
				status: 1
			};

			models.banco.create(banco)
				.then(response => {
					res.status(200).json({
						message: 'Banco cadastrado com sucesso.',
						data: response
					})
				})
				.catch(err => {
					res.status(400).json({
						message: err.message
					})
				})
			
		},
		update: (req, res) => {
			let { id } = req.params;
			let { changes } = req.body;

			if(!id) {
				res.status(400).json({
					message: 'ID inválido.'
				})
			}

			models.banco.update(changes, {
				where: {
					id: id
				}
			})
			.then(response => {
				res.status(200).json({
					message: 'Mudanças realizadas com sucesso'
				})
			})
			.catch(err => {
				res.status(400).json({
					message: err.message
				})
			})
		},
		remove: (req, res) => {
			let { id } = req.params;

			models.banco.destroy({
				where: {
					id: id
				}
			})
			.then(response => {
				res.status(200).json({
					message: 'Banco removida com sucesso.'
				})
			})
			.catch(err => {
				res.status(400).json({
					message: 'Bad Request'
				})
			})
		}
	}
}