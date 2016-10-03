angular.module('addressApp').directive('fullList', function(Address){
	return {
		templateUrl: 'full-list/list.template.html',
		restrict: 'E',
		scope: {},
		controller: function ($scope, Address) {
			$scope.people = Address.query();
		}
	};
});
