var controller = angular.module('gallery-controller', [
	'ui.bootstrap',
	'ngFileUpload'
]);

controller.controller('gallery-controller', ['$rootScope', '$http', '$cookies', '$scope', '$window', '$state', '$sce', '$document', 'Upload', 'PMSRolesService',
	function galleryController($rootScope, $http, $cookies, $scope, $window, $state, $sce, $document, Upload, PMSRolesService) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		$scope.vm = this;
		var _this = this;
		var project = 'panacea-165312';
		
		$scope.vm.path = './gallery/' + project + '/';
		$scope.vm.user = PMSRolesService.getUser ($cookies);
		$scope.vm.role = PMSRolesService.getRole ($cookies);
		this.$http.get('/galleryy/' + project).success(function(files) {
			$scope.vm.gallery = files;
			console.log('Successful gallery request');
		});

		$scope.deleteGalleryFile = function (file) {
			if (file == null || file == undefined || $scope.vm.role != 'owner')
				return;
			
			//file = file.replace ('.', '_'); for PHP client
			_this.$http.delete('/galleryy/' + file).success(function(error) {
				console.log('gallery file deleted successfully');
				_this.$state.reload();
			});
		}
		
		$scope.uploadFiles = function(file, errFiles) {
			if (file == null || file == undefined || $scope.vm.role != 'owner')
				return;

			file.upload = Upload.upload({
				url: '/galleryy',
				data: {file: file}
			});
			
			file.upload.then (function (response) {
				console.log('Upload is successful. Launching gallery');
				_this.$state.reload();
			}, function (response) {
				if (response.status > 0)
					console.log('Error in uploading file: ' +
						response.status + ': ' + response.data);
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 * 
									 evt.loaded / evt.total));
				console.log('Upload progress: ' + file.progress);
			});
		}	
	}
]);