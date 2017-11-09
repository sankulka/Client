var controller = angular.module('patients-dashboard-controller', [
	'ui.bootstrap'
]);

controller.controller('patients-dashboard-controller', ['$http', '$cookies', '$scope', '$window', '$state', '$filter', '$stateParams', '$uibModal', 'PatientCreateService', 'PMSRolesService',
	function PatientsDashboardController($http, $cookies, $scope, $window, $state, $filter, $stateParams, $uibModal, PatientCreateService, PMSRolesService) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		$scope.vm = this;
		var _this = this;
		this.query = ''
		
		$scope.vm.user = PMSRolesService.getUser ($cookies);
		if ($stateParams.query != '')
			_this.query = $stateParams.query;
		else
			_this.query = '';
		console.log('patients query: ' + $stateParams.query);
		
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
			var regId = patient.regId ? patient.regId.toLowerCase() : '';
			var name = patient.name ? patient.name.toLowerCase() : '';
			var phone = patient.phone ? patient.phone.toLowerCase() : '';
			var reference = patient.reference ? patient.reference.toLowerCase() : '';
			var primaryCom =
				patient.complaints.primaryCom ? patient.complaints.primaryCom.toLowerCase() : '';
			var secondaryCom =
				patient.complaints.secondaryCom ? patient.complaints.secondaryCom.toLowerCase() : '';
			
			if ((regId != '' && regId.indexOf(query) >= 0) ||
				(name != '' && name.indexOf(query) >= 0) ||
				(phone != '' && phone.indexOf(query) >= 0) ||
				(reference != '' && reference.indexOf(query) >= 0) ||
				(primaryCom != '' && primaryCom.indexOf(query) >= 0) ||
				(secondaryCom != '' && secondaryCom.indexOf(query) >= 0))
				return true;
			return false;
		}
		
		this.itemsPerPage = 10;
		this.maxSize = 5; //Number of pager buttons to show

		this.currentPatientPage = 1;
		this.setPatientPage = function (pageNo) {
			$scope.vm.currentPatientPage = pageNo;
		};
		this.patientPageChanged = function() {
			console.log('Patient page changed to: ' + $scope.vm.currentPatientPage);
		};
		
		$scope.createPatient = function (notification) {
			var element = angular.element(document.querySelector('#patients-dashboard-controller'));
			PatientCreateService.createPatient(_this.$scope, _this.$state, element);
		}		
	}
]);