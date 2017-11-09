'use strict';
var cache = angular.module('patient');

cache.service('PMSCacheService', ['$rootScope', '$q',
	function PMSCacheService($rootScope, $q) {
        this.$q = $q;
        this.sig = 'PatientCacheService';
		this.patients = [];
		this.patientsFolder = "";
		this.templatesFolder = "";
		this.patientMasterSheet = "";
		
		this.setPatients = function (patients) {
			this.patients = patients;
		}
		
		this.getPatients = function () {
			return this.patients;
		}
		
		this.getLastPatient = function () {
			return this.patients[this.patients.length-1];
		}
		
		this.getNewPatientId = function () {
			if(this.patients.length == 1)
				return 1;
			return parseInt(this.patients[this.patients.length-1][0]) + 1;
		}
		
		this.addNewPatient = function (newPatient) {
			this.patients.push(newPatient);
		}
		
		this.updatePatient = function (patient) {
			for (var ii = 0; ii < this.patients.length; ii++)
				if (this.patients[ii][1] == patient[1]) {
					patient[0] = this.patients[ii][0];
					this.patients[ii] = patient;
					return;
				}
		}
		
		this.getPatientById = function (id) {
			for (var ii = 0; ii < this.patients.length; ii++)
				if (this.patients[ii][1] == id)
					return this.patients[ii];
		}
		
		this.setPatientsFolder = function (folderId) {
			this.patientFolder = folderId;
		}
		
		this.getPatientsFolder = function () {
			return this.patientsFolder;
		}
		
		this.setPatientMasterSheet = function(fileId) {
			this.patientMasterSheet = fileId;
		}
		
		this.getPatientMasterSheet = function() {
			return this.patientMasterSheet;
		}
		
		this.setTemplatesFolder = function(folderId) {
			this.templatesFolder = folderId;
		}
		
		this.getTemplatesFolder = function() {
			return this.templatesFolder;
		}
 	}
]);