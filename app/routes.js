'use strict';

module.exports = function (app) {

	require('./routes-web-gallery') (app);
	
	require('./routes-web-testimonials.js') (app);
	
    	app.get('*', function (req, res) {
		console.log('Redirecting to home now');
		res.redirect('/');
    	});
};
