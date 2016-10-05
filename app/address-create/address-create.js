angular.module('addressApp').directive('addressCreate', function () {
	return {
		templateUrl: 'address-create/address-create.template.html',
		restrict: 'E',
		scope: {},
		require: '^fullList',
		link: function (scope, tElem, tAttrs, listController) {
			scope.addPerson = listController.addPerson;
		},
		controller: function ($scope, Address) {
			$scope.creating = false;
			$scope.editing = true;
			$scope.startEdit = function() {
				$scope.creating = true;
			};
			$scope.submitEdit = function(person) {
				$scope.creating = false;
				$scope.editing = false;
				$scope.addPerson(person);
			};
			$scope.cancelEdit = function() {
				$scope.creating = false;
				$scope.editing = false;
			};
		}
	};
});
