'use strict';
const jwt = require('jsonwebtoken');

module.exports = models => {
	return {
		signIn: (req, res) => {
			
			let email = req.body.email;
			let senha = req.body.senha;
			
			if(!email){
				res.status(400).json({
					message: 'Usuário inválido.'
				})
			}
			
			models.pessoa.findOne({
				where: {
					email: email
				}
			}).then(response => {
				if(response.get('senha') === senha) {
					res.json({
						status: 'sucesso',
						token: jwt.sign({
							email: email
						}, 'ATIVO$ECRET')
					});
				} else {
					res.status(404).json({
						status: 'Usuário ou senha incorretos.'
					});
				}
				
			}).catch(function(error) {
				res.status(404).json({
					status: 'Usuário ou senha incorretos.'
				});
			})

		}
	}
}