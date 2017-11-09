var controller = angular.module('testimonials-controller', [
	'ui.bootstrap'
]);

controller.controller('testimonials-controller', ['$http', '$cookies', '$scope', '$window', '$state', 'PMSRolesService',
	function TestimonialsController($http, $cookies, $scope, $window, $state, PMSRolesService) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		$scope.vm = this;
		var _this = this;
		
		$scope.vm.path = './testimonials/';
		$scope.vm.user = PMSRolesService.getUser ($cookies);
		$scope.vm.role = PMSRolesService.getRole ($cookies);		
		this.$http.get('/webTestimonials/').success(function(testimonials) {
			console.log('Successful testimonials request');
			$scope.vm.testimonials = testimonials;
			console.log(testimonials);
		});
		
		$scope.deleteTestimonial = function (testimonial) {
			if (testimonial.date == null || testimonial.date == undefined || $scope.vm.role != 'owner')
				return;
			
			_this.$http.delete('/webTestimonial/' + testimonial.date).success(function(response) {
				console.log('Testimonial deleted successfully');
				_this.$state.reload();
			});
		}
	}
]);