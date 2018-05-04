const nodemailer = require('nodemailer');

module.exports = config => {

	const smtpConfig = {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,  //use SSL
		auth: {
			"user": 'gustavohbarros.1992@gmail.com',
			"pass": ''
		}
	};

	const transporter = nodemailer.createTransport(smtpConfig);
	//const salt = bcrypt.genSaltSync(10);

	var mailOptions = {
		from: 'gustavohbarros.1992@gmail.com', // sender address
		to: 'bgermano89@gmail.com', // list of receivers
		subject: 'Se ligue piveti',  //Subject line
		html: '<b>Chegue logo piveti, que os email já tá pegando</b>'
	};

			

	return {
		confirmarTransacao: (res) => {
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error)
					/*
					res.json({
						status: 'error',
						data: error.message
					});
					*/
				}
				console.log(info)
				/*
				res.json({
					status: 'success',
					data: '',

				});
				*/
			});
		}
	}
}

/*


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = '<YOUR_ACCOUNT_USER>'
var mailAccountPassword = '<YOUR_ACCOUNT_PASS>'

var fromEmailAddress = '<FROM_EMAIL>'
var toEmailAddress = 'TO_EMAIL'

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))

var mail = {
    from: fromEmailAddress,
    to: toEmailAddress,
    subject: "hello world!",
    text: "Hello!",
    html: "<b>Hello!</b><p><a href=\"http://www.yahoo.com\">Click Here</a></p>"
}

transport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    transport.close();
});

*/