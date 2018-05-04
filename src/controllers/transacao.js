'use strict';
const tx = require('../libs/ativo-taxas')

const uuid = require('node-uuid')
const moment = require('moment-timezone')
const fs = require('fs')
const path = require('path')

module.exports = (models, mailer) => {
	return {
		index: (req, res) => {
			models.transacao.findAll()
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
			
			let { id } = req.user;
			
			if(!id){
				res.status(400).json({
					message: 'ID inválido.'
				})
			}
			
			models.transacao.findAll({
				where: {
					pessoa: id
				}, 
				include: [{ model: models.banco, as: 'bancoObj' },
				{ model: models.pessoa , as: 'pessoaObj'}]
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
		indexByTipo: (req, res) => {
			
			let { id } = req.user;
			let tipo = req.params.tipo;
			let limit = parseInt(req.params.limit) || 10;
			let offset = parseInt(req.params.offset) || 0;
			
			if(!id){
				res.status(400).json({
					message: 'ID inválido.'
				})
			}
			
			models.transacao.findAll({
				where: {
					pessoa: id,
					tipo: tipo
				},
				limit: limit,
				offset: offset, 
				include: [{ model: models.banco, as: 'bancoObj' },
				{ model: models.pessoa , as: 'pessoaObj'}]
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
			let transacao
			
			//SAQUE
			if(body.tipo == 4){
				let taxa
				let valorReal

				if(body.tipoPessoa == 'PF'){
					taxa = tx.getTaxaSaqueManualPF()
				} else {
					taxa = tx.getTaxaSaqueManualPJ()
				}
				valorReal = body.valor - (body.valor * taxa)
				console.log(valorReal)

				transacao = {
					nome: body.descricao,
					tipo: body.tipo,
					codigo: uuid.v4(),
					pessoa: body.pessoa,
					favorecido: body.pessoa,
					banco: body.numero,
					moeda: 1,
					valor: body.valor,
					valorReal: valorReal,
					taxa: taxa,
					situacao: 0,
					dataCadastro: moment().format(),
					status: 1
				};
			}

			//DEPOSITO
			if(body.tipo == 1){
				let taxa
				let valorReal

				if(body.tipoPessoa == 'PF'){
					taxa = tx.getTaxaDepositoManualPF()
				} else {
					taxa = tx.getTaxaDepositoManualPJ()
				}
				valorReal = body.valor - (body.valor * taxa)
				console.log(valorReal)

				let imageName = uuid.v4() + '.jpeg'
				
				try {
					//converting base64 to file
					fs.writeFile(path.join(__dirname, '..', "comprovantes/" + imageName), body.img.replace(/^data:image\/jpeg;base64,/, ""), 'base64', function(err) {
					    if(err) {
					        return console.log(err);
					    }
					});
				} catch(err) {
					console.log(err)
				}

				transacao = {
					nome: body.descricao,
					tipo: body.tipo,
					codigo: body.codigo,
					pessoa: body.pessoa,
					favorecido: body.pessoa,
					moeda: 1,
					valor: body.valor,
					valorReal: body.valor,
					taxa: 0,
					situacao: 0,
					dataCadastro: moment().format(),
					documento: imageName,
					status: 1
				};
			}

			//TRANSFERENCIA
			if(body.tipo == 2){
				let taxa
				let valorReal

				if(body.tipoPessoa == 'PFPF'){
					taxa = tx.getTaxaTransferenciaInternaPFPF()
				} else if(body.tipoPessoa == 'PFPJ') {
					taxa = tx.getTaxaTransferenciaInternaPFPJ()
				} else if(body.tipoPessoa == 'PJPF'){
					taxa = tx.getTaxaTransferenciaInternaPJPF()
				} else {
					taxa = tx.getTaxaTransferenciaInternaPJPJ()
				}

				valorReal = body.valor - (body.valor * taxa)

				transacao = {
					nome: body.descricao,
					tipo: body.tipo,
					codigo: uuid.v4(),
					pessoa: body.pessoa,
					favorecido: body.beneficiario,
					moeda: body.moeda,
					valor: body.valor,
					valorReal: valorReal,
					taxa: taxa,
					situacao: 0,
					documento: body.img,
					dataCadastro: moment().format(),
					status: 1
				};

				console.log(transacao.documento)
			}

			
				models.transacao.create(transacao)
				.then(response => {
					res.status(200).json({
						message: 'Transacao criado com sucesso.',
						data: response
					})
				})
				.catch(err => {
					res.status(400).json({
						message: err.message
					})
				})
			
				res.status(200).json({
					message: 'Transacao criado com sucesso.',
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

			models.transacao.update(changes, {
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

			models.transacao.destroy({
				where: {
					id: id
				}
			})
			.then(response => {
				res.status(200).json({
					message: 'transacao removida com sucesso.'
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