angular.module('addressApp').directive('fullList', function (Address, Gift) {
	return {
		templateUrl: 'full-list/list.template.html',
		restrict: 'E',
		scope: {},
		controller: function ($scope, Address, Gift) {
			$scope.people = Address.query();
			$scope.uOrder = 'name';

			$scope.clearGifts = function () {
				$scope.nbGifts = 0;
				Gift.clear();
			};
			$scope.clearGifts();

			$scope.$watch(Gift.countGifts, function () {
				$scope.nbGifts = Gift.countGifts();
			});

			this.addPerson = function(person) {
				Address.save(person).$promise.then(function(newPerson){
					$scope.people.push(newPerson);
				});
			}
		}
	};
});
