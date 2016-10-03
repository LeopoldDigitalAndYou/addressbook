angular.module('addressApp').directive('addressEntry', function(Address){
	return {
		templateUrl: 'address-entry/address-entry.template.html',
		restrict: 'E',
		scope: {
			personId: '='
		},
		transclude: true,
		controller: function ($scope, Address) {
			this.person = Address.get({id: $scope.personId});
			$scope.person = this.person;
		}
	};
});
