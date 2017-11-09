var utils = angular.module('Utils');

utils.service('PMSAPIInterceptor', ["$cookies", "PMSRolesService", function($cookies, PMSRolesService) {
	
	this.request = function (config) {
		var user = PMSRolesService.getUser($cookies);
		if (user != '')
			config.headers.From = user;

		var role = PMSRolesService.getRole($cookies);
		if (role != '')
			config.headers.Role = role;
		
		if (config.url.indexOf('web') >= 0 ||
			config.url.indexOf('html') >= 0) {
			return config;
		}

		if (config.url.indexOf('logout') >= 0)
			$cookies.remove('credentials');

		var project = "panacea-165312";
		if (config.method == "POST" &&
			config.url.indexOf('appointment') >= 0)
			config.url = config.url + project;
		
		//config.url = 'http://localhost:8005' + config.url;
		config.url = 'http://172.104.50.112:3001' + config.url;
		return config;
	};
}]);
