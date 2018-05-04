const jwt = require('jsonwebtoken');

module.exports = (models, config) => {
	return {
		default: (req, res, next) => {
			let authorization = req.headers['authorization'];

			if(!authorization) {
				res.status(400).json({
	                data: "Você não tem permissão para passar por aqui! :("
	            })
			} else {
				let token = authorization.replace("Bearer ", "");
				jwt.verify(token, 'ATIVO$ECRET', function (err, decode) {
					if(err) {
						res.status(400).json({
	                        data: 'Token inválido'
	                    })
					} else {
						models.pessoa.findOne({
							where: {
								email: decode.email
							},
							include: [
								{ model: models.pessoajuridica },
								{ model: models.pessoafisica },
								{ model: models.telefone },
								{ model: models.logradouro },
								{ model: models.banco }
							]
						})
						.then(success => {
							if(success) {
								req.user = success;
                            	next();
							} else {
								res.status(400).json({
	                                data: 'Você não tem permissão para passar por aqui! :('
	                            })
							}
						})
						.catch(err => {
							//
						})

					}
				})
			}
		}
	}
}