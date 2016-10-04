angular.module('addressApp').directive('presentSender',
		function ($compile, Birthday, IsBirthday) {
			return {
				restrict: 'E',
				scope: {
					personId: '='
				},
				require: '^addressEntry',
				link: function (scope, tElement, tAttrs, entryController) {
					var childScope = scope.$new();

					scope.birthday.$promise.then(
							function (birthday) {
								if (IsBirthday(birthday)) {
									var template = '<birthday></birthday>';
								}
								else {
									var template = '<unbirthday></unbirthday>';
								}

								childScope.birthday = birthday;
								childScope.name = entryController.person.name;
								childScope.sendGift = entryController.receiveGift;

								var digested = $compile(template)(childScope);
								tElement.append(digested);
							}
					);
				},
				controller: function ($scope, Birthday) {
					$scope.birthday = Birthday.get({id: $scope.personId});
				}
			};
		});
