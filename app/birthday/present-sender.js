angular.module('addressApp').directive('presentSender',
		function ($compile, Birthday, IsBirthday) {
			return {
				restrict: 'E',
				scope: {
					personId: '='
				},
				require: '^addressEntry',
				link: function (scope, tElement, tAttrs, entryController) {

					function digest() {
						var childScope = scope.$new();
						scope.getBirthday().then(
								function (birthday) {
									if (IsBirthday(birthday)) {
										var template = '<birthday></birthday>';
									}
									else {
										var template = '<unbirthday></unbirthday>';
									}

									childScope.birthday = birthday;
									childScope.name = entryController.person.name;
									childScope.sendGift = entryController.sendGift;

									var digested = $compile(template)(childScope);
									tElement.html('');
									tElement.append(digested);
								}
						);
					}

					scope.$watch(
							function () {
								return entryController.person.birthdate;
							},
							digest
					);
				},
				controller: function ($scope, Birthday) {
					$scope.getBirthday = function() {
						return Birthday.get({id: $scope.personId}).$promise;
					}
				}
			};
		});
