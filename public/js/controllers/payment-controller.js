var controller = angular.module('payment-controller', [
	'ui.bootstrap'
]);

controller.controller('payment-controller', ["$scope", "$uibModalInstance", "PMSUtilsService", "record",
	function ($scope, $uibModalInstance, PMSUtilsService, record) {

	if (record != null) {
		$scope.record = record;
		$scope.name = record.name;
		$scope.phone = record.phone;
		$scope.billRaised = record.billing.raised;
		$scope.billPaid = record.billing.paid;
		$scope.medium = record.billing.medium;
	} else {
		$scope.name = '';
		$scope.phone = '';
		$scope.billRaised = 0;
		$scope.billPaid = 0;
	}
	$scope.billUnpaid = parseInt($scope.billRaised) - parseInt($scope.billPaid);
	
	$scope.mediums = PMSUtilsService.getPayMediums();
	$scope.ok = function () {
		$scope.billUnpaid = parseInt($scope.billRaised) - parseInt($scope.billPaid);
		var billing = {
			'raised': $scope.billRaised,
			'paid': $scope.billPaid,
			'medium': $scope.medium,
			'unpaid': $scope.billUnpaid
		};
		
		var newRecord;
		if ($scope.record != null) {
			newRecord = $scope.record;
			newRecord['billing'] = billing;
		} else {
			newRecord = {
			'name': PMSUtilsService.capitalize($scope.name),
			'phone': $scope.phone,
			'billing': billing
			};
		}
		
		console.log(newRecord);
		$uibModalInstance.close(newRecord);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);
