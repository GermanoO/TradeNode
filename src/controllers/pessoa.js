'use strict';

module.exports = models => {
	return {
		index: (req, res) => {

			models.pessoa.findAll({
				include: [{ model: models.pessoajuridica },
				{ model: models.pessoafisica },
				{ model: models.telefone },
				{ model: models.logradouro },
				{ model: models.banco }]
			})
			.then(pessoas => {
				res.json({
					status: 'sucesso',
					data: pessoas
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
			
			models.pessoa.findOne({
				where: {
					id: id
				}
			}).then(pessoas => {
				res.json({
					status: 'sucesso',
					data: pessoas
				});
			}).catch(function(error) {
				res.json({
					status: 'error',
					data: error.message
				});
			})

		},
		findByEmail: (req, res) => {
			
			let email = req.body.email;
			
			if(!email){
				res.status(400).json({
					message: 'Email inválido.'
				})
			}
			
			models.pessoa.findOne({
				where: {
					email: email
				}
			}).then(pessoas => {
				res.json({
					status: 'sucesso',
					data: pessoas
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
			let pessoa = body.pessoa
			
			pessoa.pessoafisica = {
				cpf: body.cpf
			}

			pessoa.telefone = {
				telefone: body.telefone
			}

			pessoa.logradouro = body.logradouro

			pessoa.banco = body.banco;
			console.log(JSON.stringify(pessoa, null, 2))
			models.pessoa.findOne({
				where: {
					email: pessoa.email
				}
			})
			.then(found => {
				if(found !== null){
					res.status(400).json({
						message: 'Usuário já cadastrado.'
					})
				} else {
					models.pessoa.create(pessoa, {
						include: [
							{ model: models.pessoajuridica },
							{ model: models.pessoafisica },
							{ model: models.telefone },
							{ model: models.logradouro }
						]
					})
					.then(response => {
						let banco = models.banco.create({ ...pessoa.banco[0], pessoa: response.get('id') })
						.then(resp => {
							res.status(200).json({
								message: 'Usuário criado com sucesso.',
								data: [response, resp]
							})
						})
						.catch(err => {
							res.status(400).json({
								message: err.message
							})
						})
					})
					.catch(err => {
						console.log(err)
						res.status(400).json({
							message: err.message
						})
					})
				}
			})
			.catch(err => {
				console.log(err)
				res.status(400).json({
					message: err.message
				})
			})
		},
		updateSenha: (req, res) => {
			let { id } = req.user;
			let senha  = req.body.senha;

			if(!id) {
				res.status(400).json({
					message: 'ID inválido.'
				})
			}

			models.pessoa.update({ senha: senha}, {
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
		update: (req, res) => {
			let { id } = req.user;
			let body = req.body

			let pessoa = body.pessoa
			
			pessoa.pessoafisica = {
				cpf: body.cpf
			}

			pessoa.telefone = {
				telefone: body.telefone
			}

			pessoa.logradouro = body.logradouro

			console.log(body)
			
			if(!id) {
				res.status(400).json({
					message: 'ID inválido.'
				})
			}

			Promise
				.all([
					models.pessoa.update( pessoa, {
						where: {
							id: id
						},
					}),
					models.pessoafisica.update(pessoa.pessoafisica, {
						where: {
							pessoa: id
						},
					}),
					models.telefone.update(pessoa.telefone, {
						where: {
							pessoa: id
						},
					}),
					models.logradouro.update(pessoa.logradouro, {
						where: {
							pessoa: id
						},
					})
				])
				.then(response => {
					res.status(200).json({
						message: 'Atualização realizada com sucesso.'
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

			models.pessoa.destroy({
				where: {
					id: id
				}
			})
			.then(response => {
				res.status(200).json({
					message: 'Pessoa removida com sucesso.'
				})
			})
			.catch(err => {
				console.log(err)
				res.status(400).json({
					err
				})
			})
		}
	}
}