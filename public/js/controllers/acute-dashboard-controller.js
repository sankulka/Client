var controller = angular.module('acute-dashboard-controller', [
	'ui.bootstrap'
]);

controller.controller('acute-dashboard-controller', ['$http', '$cookies', '$scope', '$state', '$filter', '$stateParams', '$uibModal', 'PMSUtilsService', 'PMSRolesService',
	function AcuteDashboardController($http, $cookies, $scope, $state, $filter, $stateParams, $uibModal, PMSUtilsService, PMSRolesService) {
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
		console.log('acute patients query: ' + $stateParams.query);

		if ($scope.vm.user != '') {
			this.$http.get('/acute').success(function(patients) {
				console.log('Successful acute patients request');
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
				
			if ((name != '' && name.indexOf(query) >= 0) ||
				(phone != '' && phone.indexOf(query) >= 0))
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
		
		$scope.vm.selectedPatient = null;
		$scope.selectPatient = function (patient) {
			if (patient.selected) {
				patient.selected = false;
				$scope.vm.selectedPatient = null;
			} else if ($scope.vm.selectedPatient != null) {
				$scope.vm.selectedPatient.selected = false;
				$scope.vm.selectedPatient = patient;
				$scope.vm.selectedPatient.selected = true;
			} else {
				$scope.vm.selectedPatient = patient;
				$scope.vm.selectedPatient.selected = true;				
			}
		}
		
		$scope.updateFollowup = function (patient) {
			_this.toUpdate = patient;
			if (_this.toUpdate == null)
				_this.toUpdate = $scope.vm.selectedPatient;
			if (_this.toUpdate == null)
				return;
			
			console.log('Updating Followup');
			var modalInstance = _this.$uibModal.open({			
				templateUrl: 'acuteFollowup.html',
				controller: 'acute-followup-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#acute-dashboard-controller')),
				size: '', // blank, sm, lg
				resolve: {
					PMSUtilsService: PMSUtilsService,
					patient: _this.toUpdate
				}
			});
			
			modalInstance.result.then(function (patient) {
				patient['update'] = true;
				
				if ($scope.vm.user != '') {
					_this.$http.post('/acute/', angular.toJson(patient))
					.success(function() {
						console.log('Acute Followup is successfully updated');
						_this.$state.reload();
					});
				}
			}, function () {
				console.log('Acute Followup modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}
		
		$scope.createFollowup = function () {
			console.log('Adding new Acute Patient followup');
			var modalInstance = _this.$uibModal.open({			
				templateUrl: 'acuteFollowup.html',
				controller: 'acute-followup-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#acute-dashboard-controller')),
				size: '', // blank, sm, lg
				resolve: {
					PMSUtilsService: PMSUtilsService,
					patient: null
				}				
			});
			
			modalInstance.result.then(function (patient) {
				console.log(patient);
				if ($scope.vm.user != '') {
					_this.$http.post('/acute/', angular.toJson(patient))
					.success(function() {
						console.log('Acute Followup is successfully added');
						_this.$state.reload();
					});
				}
			}, function () {
				console.log('Acute Followup modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}
	}
]);