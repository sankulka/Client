var router = angular.module('pms-router', []);

router
    .config(['$urlRouterProvider', '$locationProvider',
        function($urlRouterProvider, $locationProvider) {
//            $urlRouterProvider.otherwise("/login");
			$locationProvider.hashPrefix('!');
        }
	]);

router
    .config(['$stateProvider',
        function($stateProvider) {

            $stateProvider
                .state('dashboard', {
                    url :'/dashboard',
                    views :  {
                        '': {
                            templateUrl: 'partials/pms-dashboard.html',
							controller: 'pms-dashboard-controller'
                        },
                    },
                })

			.state('patients', {
                    url :'/patients/:query',
					params: {'query': ''},
                    views :  {
                        '': {
                            templateUrl: 'partials/patients-dashboard.html',
							//templateUrl: 'table-basic-copy.html',
							controller: 'patients-dashboard-controller'
                        },
                    },
                })				

			.state('acute', {
                    url :'/acute/:query',
					params: {'query': ''},
                    views :  {
                        '': {
                            templateUrl: 'partials/acute-dashboard.html',
							controller: 'acute-dashboard-controller'
                        },
                    },
                })	

			.state('payments', {
                    url :'/payments',
                    views :  {
                        '': {
                            templateUrl: 'partials/payments-dashboard.html',
							controller: 'payments-dashboard-controller'
                        },
                    },
                })
				
			.state('patient', {
                    url :'/patient/:patientId',
					params: {'patientId': ''},
                    views :  {
                        '': {
                            templateUrl: 'partials/patient-dashboard.html',
							controller: 'patient-dashboard-controller'
                        },
                    },
                })
				
			.state('update', {
                    url :'/update/:patientId',
					params: {'patientId': ''},
                    views :  {
                        '': {
                            templateUrl: 'partials/update.html',
							controller: 'patient-update-controller'
                        },
                    },
                })

			.state('prescriptions', {
                    url :'/prescriptions',
                    views :  {
                        '': {
                            templateUrl: 'partials/prescriptions-dashboard.html',
							controller: 'prescriptions-dashboard-controller'
                        },
                    },
                })
			/*
			.state('testimonials', {
                    url :'/testimonials',
                    views :  {
                        '': {
                            templateUrl: 'partials/testimonials.html',
							controller: 'testimonials-controller'
                        },
                    },
                })

			.state('gallery', {
                    url :'/gallery',
                    views :  {
                        '': {
                            templateUrl: 'partials/gallery.html',
							controller: 'gallery-controller'
                        },
                    },
                })
			*/
			.state('calendar', {
                    url :'/calendar',
                    views :  {
                        '': {
                            templateUrl: 'partials/calendar.html',
							controller: 'calendar-controller'
                        },
                    },
                })			
		}
	])