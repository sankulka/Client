var controller = angular.module('pms-dashboard-controller', []);

controller.controller('pms-dashboard-controller', ['$http', '$cookies', '$scope', '$window', '$state', '$filter', 'PMSUtilsService', 'PMSRolesService',
	function PMSDashboardController($http, $cookies, $scope, $window, $state, $filter, PMSUtilsService, PMSRolesService) {
		this.$http = $http;
		this.$scope = $scope;
		$scope.vm = this;
		var _this = this;
		this.query = '';
		this.apptQueries = PMSUtilsService.getApptQueries();
		this.apptQuery = 'Today';
		this.maxSize = 5; //Number of pager buttons to show		
		this.itemsPerPage = 10;

		$scope.vm.user = PMSRolesService.getUser ($cookies);
		if ($scope.vm.user != '') {
			this.$http.get('/patients').success(function(patients) {
				console.log('Successful patients request');
				$scope.vm.patients = patients;
				console.log(patients);
			});
		}

		this.search = function(patient) {
			var query = _this.query ? _this.query.toLowerCase() : '';
			if (query == '')
				return true;
			var name = patient.name ? patient.name.toLowerCase() : '';
			var phone = patient.phone ? patient.phone.toLowerCase() : '';
			var reference = patient.reference ? patient.reference.toLowerCase() : '';
			var primaryCom =
				patient.complaints.primaryCom ? patient.complaints.primaryCom.toLowerCase() : '';
			var secondaryCom =
				patient.complaints.secondaryCom ? patient.complaints.secondaryCom.toLowerCase() : '';
			
			if ((name != '' && name.indexOf(query) >= 0) ||
				(phone != '' && phone.indexOf(query) >= 0) ||
				(reference != '' && reference.indexOf(query) >= 0) ||
				(primaryCom != '' && primaryCom.indexOf(query) >= 0) ||
				(secondaryCom != '' && secondaryCom.indexOf(query) >= 0))
				return true;
			return false;
		}
		
		this.currentPatientPage = 1;
		this.setPatientPage = function (pageNo) {
			$scope.vm.currentPatientPage = pageNo;
		};
		this.patientPageChanged = function() {
			console.log('Patient page changed to: ' + $scope.vm.currentPatientPage);
		};
		
		// Email dashboard
		if ($scope.vm.user != '') {
			this.$http.get('/unreadEmails').success(function(emails) {
				console.log('Successful email retrieval');
				$scope.vm.emails = emails;
				console.log(emails);
			});
		}
		
		$scope.vm.emailDate = function (email) {
			return new Date (email.date);
		}
		
		this.currentEmailPage = 1;
		this.setEmailPage = function (pageNo) {
			$scope.vm.currentEmailPage = pageNo;
		};
		this.emailPageChanged = function() {
			console.log('Email page changed to: ' + $scope.vm.currentEmailPage);
		};		
		
		// Appointment dashboard
		if ($scope.vm.user != '') {
			this.$http.get('/patientAppointments').success(function(patientAppts) {
				console.log('Successful patientAppts retrieval');
				console.log(patientAppts);
				$scope.vm.patientAppts = patientAppts;
			});
		}
		
		this.apptOptionChanged = function() {
			_this.setAppointmentPage(1);
		}
		
		this.today = moment();
		this.searchAppts = function(patientAppt) {
			var apptDate = moment(patientAppt.date);
			switch (_this.apptQuery) {
				case 'Yesterday':
					if (_this.today.dayOfYear() - apptDate.dayOfYear() == 1)
						return true;
				break;
				case 'Today':
					if (_this.today.dayOfYear() - apptDate.dayOfYear() == 0)
						return true;
				break;
				case 'Tomorrow':
					if (_this.today.dayOfYear() - apptDate.dayOfYear() == -1)
						return true;
				break;
				case 'Last Week':
					if (_this.today.week() - apptDate.week() == 1)
						return true;
				break;
				case 'This Week':
					if (_this.today.week() - apptDate.week() == 0)
						return true;
				break;
				case 'Next Week':
					if (_this.today.week() - apptDate.week() == -1)
						return true;
				break;
				
				return false;
			}
		}
		
		this.currentAppointmentPage = 1;
		this.setAppointmentPage = function (pageNo) {
			$scope.vm.currentAppointmentPage = pageNo;
		};
		this.appointmentPageChanged = function() {
			console.log('Appointment page changed to: ' + $scope.vm.currentAppointmentPage);
		};				
	}
]);