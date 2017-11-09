var controller = angular.module('patient-update-controller', [
	'ui.bootstrap'
]);

controller.controller('patient-update-controller',
	["$scope", "$uibModalInstance", "PMSUtilsService", "patient",
	function ($scope, $uibModalInstance, PMSUtilsService, patient) {

	console.log('patient: ' + patient);
	$scope.salutations = PMSUtilsService.getSalutations();
	$scope.references = PMSUtilsService.getReferences();
	
	if (patient != null) {
		$scope.patient = patient;
		$scope.salutation = patient.salutation;
		$scope.name = patient.name;
		$scope.phone = patient.phone;
		$scope.reference = patient.reference;
		$scope.email = patient.email;
		$scope.gender = patient.gender;
		
		if (patient.birthdate != null)
			$scope.dob = moment(patient.birthdate).toDate();
		else
			$scope.dob = '';
		
		$scope.primaryCom = patient.complaints.primaryCom;
		$scope.secondaryCom = patient.complaints.secondaryCom;
		$scope.address = patient.address;
	} else {
		$scope.salutation = $scope.salutations[0];
		//$scope.reference = $scope.references[0];
	}

	// Validation check and Default Enter to be set
    $scope.ok = function () {
		if ($scope.name == undefined || $scope.name == '' ||
			$scope.phone == undefined || $scope.phone == '')
			return;

		var complaints = {
			'primaryCom': PMSUtilsService.capitalize($scope.primaryCom),
			'secondaryCom': PMSUtilsService.capitalize($scope.secondaryCom)
		};
		var dob = moment($scope.dob);
		
		var patient = {
			salutation: $scope.salutation,
			name: PMSUtilsService.capitalize($scope.name),
			phone: $scope.phone,
			reference: PMSUtilsService.capitalize($scope.reference),
			email: ($scope.email == undefined ? "" : $scope.email),
			gender: ($scope.gender == undefined ? "" : $scope.gender),
			dob: dob,
			complaints: complaints,
			address: PMSUtilsService.capitalize($scope.address)
		};
		$uibModalInstance.close(patient);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.clear = function () {
        $scope.dob = null;
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
	
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
		minDate: '1900-01-01', // 'yyyy-mm-dd'
		maxDate: new Date(),
		showWeeks: false
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
}]);
