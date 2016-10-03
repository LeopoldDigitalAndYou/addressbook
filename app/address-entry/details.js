angular.module('addressApp').directive('addressDetails', function($routeParams){
	return {
		templateUrl: 'address-entry/details.template.html',
		restrict: 'E',
		scope: {},
		controller: function ($scope) {
			$scope.personId = $routeParams.id;
		}
	};
});
