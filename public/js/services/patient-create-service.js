var pms = angular.module('PMS');

pms.service('PatientCreateService', ['$http', '$uibModal', 'PMSUtilsService', function($http, $uibModal, PMSUtilsService) {
	this.$http = $http;
	this.$uibModal = $uibModal;
	var _this = this;
	
	this.createPatient = function (scope, state, element) {
		_this.scope = scope;
		_this.state = state;
		
		var modalInstance = this.$uibModal.open({
			templateUrl: 'patientUpdate.html',
			controller: 'patient-update-controller',
			scope: scope,
			appendTo: element,
			resolve: {
				patient: null,
				PMSUtilsService: PMSUtilsService,
			}
		});

		modalInstance.result.then(function (patient) {
			console.log(patient);
			
			if (patient.name == undefined || patient.name == '' ||
				patient.phone == undefined || patient.phone == '')
				return;

			_this.$http.post('/patients/', angular.toJson(patient)).success(function(newId, stat) {
				console.log('Patient is successfully created: ' + newId);
				_this.state.go('patient', {'patientId': newId});
			});
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
			_this.state.reload();
		});
	}
}]);