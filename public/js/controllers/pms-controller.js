angular.module('PMS')

.controller('PMSController', ['$rootScope', '$scope', '$window', '$http', '$cookies', '$state', '$location', 'Idle',
	function PMSController($rootScope, $scope, $window, $http, $cookies, $state, $location, Idle) {
		this.$scope = $scope;
		this.$http = $http;
		this.window = $window;
		$scope.vm = this;
		this.Idle = Idle;
		this.query = '';
		var _this = this;
		
		console.log('Launching PMS dashboard with credentials: ' + $cookies.get('credentials'));
		$state.go('dashboard');

		$scope.chronicDashboard = function() {
			console.log('Launching Chronic Patients dashboard');
			$state.go('patients');
		};

		$scope.acuteDashboard = function() {
			console.log('Launching Acute Patients dashboard');
			$state.go('acute');
		};
		
		$scope.prescriptionsDashboard = function() {
			console.log('Launching Prescriptions dashboard');
			$state.go('prescriptions');
		};
		
		$scope.paymentsDashboard = function() {
			console.log('Launching Payments dashboard');
			$state.go('payments');
		};
		
		/*
		$scope.testimonials = function() {
			console.log('Launching Testimonials');
			$state.go('testimonials');
		}

		$scope.gallery = function() {
			console.log('Launching Gallery');
			$state.go('gallery');
		}
		*/
		
		$scope.calendar = function() {
			console.log('Launching Calendar');
			$state.go('calendar');
		}
		
		$scope.search = function() {
			console.log('Searching Patients: ' + _this.query);
			var query = _this.query;
			_this.query = '';
			$state.go('patients', {'query': query});
		}
		
		$scope.logout = function() {
			console.log('Logging out');
			
			_this.$http.get('/logout').success(function(){
				console.log('Logged out from server.');
				_this.window.open("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout", "_self");
				//_this.window.open("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://www.panaceahomoeopathy.in", "_self");
			});
		}
		
		// This is idle timeout 
		$scope.idle = 120*60; // 2 hours of idle time
        $scope.timeout = 1;
        $scope.$on('IdleStart', function() {
			console.log('Idle time started');
        });
        $scope.$on('IdleEnd', function() {
			console.log('Idle time ended');
        });

        $scope.$on('IdleTimeout', function() {
			console.log('Timeout. Logging out');
			$scope.logout();
        });

        $scope.$watch('idle', function(value) {
          if (value !== null) _this.Idle.setIdle(value);
        });
        $scope.$watch('timeout', function(value) {
          if (value !== null) _this.Idle.setTimeout(value);
        });
	}
])

.config(["IdleProvider", "KeepaliveProvider", "$httpProvider",
	function(IdleProvider, KeepaliveProvider, $httpProvider) {
		KeepaliveProvider.interval (30);
		IdleProvider.windowInterrupt ('focus');
		$httpProvider.interceptors.push('PMSAPIInterceptor');
	}
])

.run(["Idle", "Keepalive", function(Idle, Keepalive){
	Idle.watch();
}]);
