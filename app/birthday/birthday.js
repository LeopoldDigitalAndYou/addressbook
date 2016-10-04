angular.module('addressApp').directive('birthday', function (Birthday, Gift) {
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
			scope.sendGift = entryController.sendGift;
		},
		controller: function ($scope, Birthday, Gift) {
			$scope.birthday = Birthday.get({id: $scope.personId});
		}
	};
});
