var controller = angular.module('patient-followup-controller', [
	'ui.bootstrap'
]);

controller.controller('patient-followup-controller', ['$scope', '$uibModalInstance', 'PMSUtilsService', function ($scope, $uibModalInstance, PMSUtilsService) {

	//https://www.codementor.io/angularjs/tutorial/create-dropdown-control	
	$scope.changes = PMSUtilsService.getChanges();
	$scope.mediums = PMSUtilsService.getPayMediums();
	$scope.medicines = PMSUtilsService.getMedicines();
	$scope.potencies = PMSUtilsService.getPotencies();
	$scope.frequencies = PMSUtilsService.getFrequencies();
	$scope.doses = PMSUtilsService.getDoses();
	
	$scope.symptoms = [];
	$scope.symptoms.complaint = '';
	$scope.symptoms.change = '';
	$scope.addSymptom = function() {
		if($scope.symptoms.complaint != '' &&
			$scope.symptoms.change.name != '') {
			var icon = PMSUtilsService.getIconByName($scope.symptoms.change.name);
			$scope.symptoms.push({
				'complaint': PMSUtilsService.capitalize($scope.symptoms.complaint),
				'change': $scope.symptoms.change.name,
				'icon': icon
			});
			$scope.symptoms.complaint = '';
			$scope.symptoms.change = '';
		}
	};
	
	$scope.treatments = [];
	$scope.treatments.medicine = '';
	$scope.treatments.potency = '';
	$scope.treatments.dose = '';
	$scope.treatments.frequency = '';
	$scope.addTreatment = function() {
		if($scope.treatments.medicine != '') {
			var pot = $scope.treatments.potency == undefined ? "" : $scope.treatments.potency;
			var dose = $scope.treatments.dose == undefined ? "" : $scope.treatments.dose;
			var freq = $scope.treatments.frequency == undefined ? "" : $scope.treatments.frequency;

			$scope.treatments.push({
				'medicine': PMSUtilsService.capitalize($scope.treatments.medicine),
				'potency': pot,
				'dose': dose,
				'frequency': freq
			});
			$scope.treatments.medicine = '';
			$scope.treatments.potency = '';
			$scope.treatments.dose = '';
			$scope.treatments.frequency = '';	   
		}
	};

	$scope.billRaised = 0;
	$scope.billPaid = 0;
	$scope.billUnpaid = parseInt($scope.billRaised) - parseInt($scope.billPaid);
	
	$scope.ok = function () {
		var symptoms = [];
		for (var ii = 0; ii < $scope.symptoms.length; ii++) {
			var symptom = $scope.symptoms[ii];
			symptoms.push({
				'complaint': symptom.complaint,
				'change': symptom.change,
				'icon': symptom.icon
			});
		}
		
		$scope.billUnpaid = parseInt($scope.billRaised) - parseInt($scope.billPaid);
		var billing = {
			'raised': $scope.billRaised,
			'paid': $scope.billPaid,
			'medium': $scope.medium,
			'unpaid': $scope.billUnpaid
		};
		var followup = {
			'symptoms': symptoms,
			'treatments': $scope.treatments
		};
		var activity = {
			'followup': followup,
			'billing': billing
		}

		console.log(activity);
		$uibModalInstance.close(activity);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);