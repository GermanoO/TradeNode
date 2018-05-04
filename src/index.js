'use strict';


module.exports = {
	setupRoutes: (app, controllers, models, config) => {

		let auth = require('./libs/token-authentication')(models, config)

		//AUTHENTICATION
		app.post('/auth', controllers.autenticacao.signIn);

		//USER ROUTES
		app.get('/pessoas', auth.default, controllers.pessoa.index);

		app.get('/pessoa', auth.default, controllers.pessoa.indexById);
		app.post('/pessoa/email', controllers.pessoa.findByEmail);
		app.post('/pessoa', controllers.pessoa.insert);
		app.put('/pessoa', auth.default, controllers.pessoa.update);
		app.put('/pessoa/pass', auth.default, controllers.pessoa.updateSenha);
		app.delete('/pessoa/:id', controllers.pessoa.remove);

		app.get('/banco', auth.default, controllers.banco.index);
		app.get('/banco/:id', auth.default, controllers.banco.indexById);
		app.post('/banco', auth.default, controllers.banco.insert);
		/*app.put('/banco/:idBanco', controllers.pessoa.update);
		app.delete('/banco/:idBanco', controllers.pessoa.remove);
		*/

		app.get('/transacao', auth.default, controllers.transacao.index);
		app.get('/transacao/listar', auth.default, controllers.transacao.indexById);
		app.get('/transacao/:tipo/:limit/:offset', auth.default, controllers.transacao.indexByTipo);
		app.post('/transacao', auth.default, controllers.transacao.insert);
		
	}
}