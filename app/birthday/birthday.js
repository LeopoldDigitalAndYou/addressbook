angular.module('addressApp').directive('birthday', function (Birthday) {
	return {
		templateUrl: 'birthday/birthday.template.html',
		restrict: 'E',
		scope: {
			personId: '='
		},
		require: '^addressEntry',
		link: function (scope, tElement, tAttrs, entryController) {
			scope.$watch(
					function () {
						return entryController.person.name;
					},
					function () {
						scope.name = entryController.person.name;
					});
		},
		controller: function ($scope, Birthday) {
			$scope.birthday = Birthday.get({id: $scope.personId});

			$scope.sendGift = function () {
				//
			}
		}
	};
});
