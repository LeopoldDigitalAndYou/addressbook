angular.module('addressApp').directive('addressEntry', function(Address){
	return {
		templateUrl: 'address-entry/address-entry.template.html',
		restrict: 'E',
		scope: {
			personId: '='
		},
		controller: function ($scope, Address) {
			$scope.person = Address.get({id: $scope.personId});
		}
	};
});
