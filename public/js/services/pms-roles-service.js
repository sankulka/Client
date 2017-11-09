var utils = angular.module('Utils');

utils.service('PMSRolesService', function() {
	
	this.getUser = function (cookies) {
		var cred = cookies.get('credentials')
		if (cred == null || cred == undefined)
			return '';
		
		var credentials = JSON.parse(cred);
		if (credentials == null || credentials == undefined)
			return '';
		
		return credentials.user;
	}
	
	this.getRole = function (cookies) {
		var cred = cookies.get('credentials');
		if (cred == null || cred == undefined)
			return '';
		
		var credentials = JSON.parse(cred);
		if(credentials.role.indexOf('owner') >= 0)
			return 'owner';
		else if (credentials.role.indexOf('editor') >= 0)
			return 'editor';
		else if (credentials.role.indexOf('viewer') >= 0)
			return 'viewer';
		return '';
	}
	
	this.isOwner = function (cookies) {
		var cred = JSON.parse(cookies.get('credentials'));
		if (cred == null || cred == undefined)
			return false;
		
		var credentials = JSON.parse(cred);
		var role = credentials.role;
		if (role.toLowerCase().indexOf('owner') >= 0)
			return true;
		return false;
	}
});