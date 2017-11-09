var controller = angular.module('notes-controller', [
	'ui.bootstrap'
]);

controller.controller('notes-controller', ["$scope", "$uibModalInstance",
	function ($scope, $uibModalInstance, notes) {
	
	$scope.notes = notes;
	
	$scope.ok = function () {
		$uibModalInstance.close($scope.notes);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);