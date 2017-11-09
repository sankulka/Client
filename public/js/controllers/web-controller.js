angular.module('WEB')

.controller('WEBController', ['$rootScope', '$scope', '$window', '$http', '$state',
	function WEBController($rootScope, $scope, $window, $http, $state) {
		this.$scope = $scope;
		this.$http = $http;
		this.window = $window;
		$scope.vm = this;
		this.query = '';
		var _this = this;
		
		$scope.testimonials = function() {
			console.log('Launching Testimonials');
			$state.go('testimonials');
		}

		$scope.gallery = function() {
			console.log('Launching Gallery');
			$state.go('gallery');
		}
		
		$scope.calendar = function() {
			console.log('Launching Calendar');
			$state.go('calendar');
		}
		
/*
{headers:  {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
"Access-Control-Allow-Headers" : "X-Requested-With,content-type",
"Access-Control-Allow-Credentials" : true
}
*/
		$scope.login = function () {
			console.log('Logging in');
			//_this.window.open("http://localhost:3000/login/panacea-165312", "_blank");
			_this.window.open("http://172.104.50.112:3001/login/panacea-165312", "_blank");
			/*
			_this.$http.get('/login').success(function(credentials){
				var user = credentials;
				var role = credentials.role;
				console.log ('Successful login for: ' + " " + credentials);
			});
			*/
		}
	}
])

.config(["IdleProvider", "KeepaliveProvider", "$httpProvider",
	function(IdleProvider, KeepaliveProvider, $httpProvider) {
		KeepaliveProvider.interval (30);
		IdleProvider.windowInterrupt ('focus');
		$httpProvider.interceptors.push('PMSAPIInterceptor');
	}
])

.run(["$rootScope", "$log", "Keepalive", function($rootScope, $log, Keepalive){
}]);
