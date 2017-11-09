var controller = angular.module('appointment-controller', []);

controller.controller('appointment-controller', ["$http", "$scope", "$uibModalInstance", "event", "dateTime", "isLoggedIn",
	 function AppointmentController($http, $scope, $uibModalInstance, event, dateTime, isLoggedIn) {
		this.$scope = $scope;
		
		$scope.durations = ['15', '30', '60', '90', '120', '150', '180'];
		if (event != null) {
			$scope.event = event;
			$scope.date = moment(event.start).format('ddd, DD MMM YYYY');
			$scope.time = moment(event.start).format('h:mm a');
			var duration = (event.end).diff(moment(event.start), 'minutes');
			for (var ii = 0; ii < $scope.durations.length; ii++) {
				if ($scope.durations[ii] == duration) {
					$scope.duration = $scope.durations[ii];
					break;
				}
			}
			$scope.newPatient = event.title;
			$scope.phone = event.phone;
			$scope.email = event.email;
		} else {
			$scope.dateTime = dateTime;
			if(dateTime != '' && dateTime != undefined) {
				$scope.date = moment(dateTime).format('ddd, DD MMM YYYY');
				$scope.time = moment(dateTime).format('h:mm a');
			}
			if (isLoggedIn)
				$scope.duration = $scope.durations[0];
			else
				$scope.duration = $scope.durations[1];
			$scope.selectedPatient = null;
			$scope.newPatient = '';
			$scope.phone = '';
			$scope.email = '';
		}

		$scope.isLoggedIn = isLoggedIn;
		$scope.registered = false;
		if(isLoggedIn && event == null)
			$scope.registered = true;

		$http.get('/patients').success(function(patients) {
			console.log('Successful patients request');
			$scope.patients = patients;
		});
		
		/*
		startDateTime:
		endDateTime:
		summary: id | name | phone
		email:
		*/
		
		$scope.capitalize = function (str) {
			return str.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase();
			});
		};
		
		$scope.createAppointment = function() {
			var appointment = {};
			var start = moment($scope.dateTime);
			appointment.startDateTime = moment(start).format("YYYY-MM-DDTHH:mm:ssZ");

			var end = start.add($scope.duration, 'm');
			appointment.endDateTime = moment(end).format("YYYY-MM-DDTHH:mm:ssZ");
			
			if($scope.registered) {
				var patient = $scope.selectedPatient;
				var summary = patient.regId + "|" + patient.name + "|" + patient.phone;
				appointment.summary = summary;
				appointment.email = patient.email;
			} else {
				var summary = "" + "|" + $scope.capitalize($scope.newPatient) + "|" + $scope.phone;
				appointment.summary = summary;
				appointment.email = $scope.email;
			}
			$uibModalInstance.close(appointment);
		};
		
		$scope.deleteAppointment = function() {
			if ($scope.event == null)
				return;
			$scope.event.delete = true;
			$uibModalInstance.close($scope.event);
		}
		
		$scope.sendSMSReminder = function() {
			if ($scope.event == null)
				return;
			$scope.event.sms = true;
			$uibModalInstance.close($scope.event);
		}		
	}
]);
