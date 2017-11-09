var controller = angular.module('payments-dashboard-controller', [
	'ui.bootstrap'
]);

controller.controller('payments-dashboard-controller', ['$http', '$cookies', '$scope', '$window', '$state', '$filter', '$stateParams', '$uibModal', 'PMSUtilsService', 'PMSRolesService',
	function PaymentsDashboardController($http, $cookies, $scope, $window, $state, $filter, $stateParams, $uibModal, PMSUtilsService, PMSRolesService) {
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
		console.log('Payments query: ' + $stateParams.query);

		if ($scope.vm.user != '') {
			this.$http.get('/payments').success(function(payments) {
				console.log('Successful payments request');
				$scope.vm.payments = payments;
				console.log(payments);
			});
		}

		this.search = function(payment) {
			var query = _this.query ? _this.query.toLowerCase() : '';
			if (query == '')
				return true;
			var name = payment.name ? payment.name.toLowerCase() : '';
				
			if (name != '' && name.indexOf(query) >= 0)
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

		$scope.vm.selectedRecord = null;
		$scope.selectRecord = function (record) {
			if (record.selected) {
				record.selected = false;
				$scope.vm.selectedRecord = null;
			} else if ($scope.vm.selectedRecord != null) {
				$scope.vm.selectedRecord.selected = false;
				$scope.vm.selectedRecord = record;
				$scope.vm.selectedRecord.selected = true;
			} else {
				$scope.vm.selectedRecord = record;
				$scope.vm.selectedRecord.selected = true;				
			}
		}

		$scope.updatePayment = function (record) {
			_this.toUpdate = record;
			if (_this.toUpdate == null)
				_this.toUpdate = $scope.vm.selectedRecord;
			if (_this.toUpdate == null)
				return;
				
			console.log('Updating Payment record');
			var modalInstance = _this.$uibModal.open({			
				templateUrl: 'payment.html',
				controller: 'payment-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#payments-dashboard-controller')),
				size: '', // blank, sm, lg
				resolve: {
					PMSUtilsService: PMSUtilsService,
					record: _this.toUpdate
				}
			});
			
			modalInstance.result.then(function (record) {
				record['update'] = true;
				console.log(record);
				
				if ($scope.vm.user != '') {
					_this.$http.post('/payments/', angular.toJson(record))
					.success(function() {
						console.log('Payment entry is successfully updated');
						_this.$state.reload();
					});
				}
			}, function () {
				console.log('Payment modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}
		
		$scope.createPayment = function () {
			console.log('Adding new Payment');
			var modalInstance = _this.$uibModal.open({			
				templateUrl: 'payment.html',
				controller: 'payment-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#payments-dashboard-controller')),
				size: '', // blank, sm, lg
				resolve: {
					PMSUtilsService: PMSUtilsService,
					record: null
				}
			});
			
			modalInstance.result.then(function (record) {
				console.log(record);
				if ($scope.vm.user != '') {
					_this.$http.post('/payments/', angular.toJson(record))
					.success(function() {
						console.log('New payment entry is successfully added');
						_this.$state.reload();
					});
				}
			}, function () {
				console.log('Payment modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}
	}
]);