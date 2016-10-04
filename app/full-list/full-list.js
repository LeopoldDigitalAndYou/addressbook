angular.module('addressApp').directive('fullList', function (Address, Gift) {
	return {
		templateUrl: 'full-list/list.template.html',
		restrict: 'E',
		scope: {},
		controller: function ($scope, Address, Gift) {
			$scope.people = Address.query();

			$scope.nbGifts = 0;
			$scope.$watch(Gift.countGifts, function () {
				$scope.nbGifts = Gift.countGifts();
			});
		}
	};
});
