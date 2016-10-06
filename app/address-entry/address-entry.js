angular.module('addressApp').directive('addressEntry', function ($templateRequest, $compile, Address, Gift) {
	return {
		restrict: 'E',
		scope: {
			personId: '=',
			fullView: '='
		},
		require: '?^fullList',
		transclude: true,
		link: function (scope, tElem, tAttrs, listController) {
			scope.entryIndex = Gift.register(scope.giftApi);
			scope.linkToDetails = !!listController;

			scope.eraseEntry = function () {
				tElem.css('text-decoration', 'line-through');
				tElem.find('h2').append('<strong style="text-decoration: none; display: inline-block;">supprimé</strong>');
			};

			scope.changeTemplate = function (fullView) {
				fullView = !!fullView;
				var templateName = fullView ? 'address' : 'short';
				$templateRequest('address-entry/' + templateName + '-entry.template.html').then(
						function (template) {
							var digested = $compile(template)(scope);
							tElem.empty();
							tElem.append(digested);
						},
						function (err) {
							throw new Error('addressEntry: Missing template ' + templateName + ': ' + err);
						});
			};
		},
		controller: function ($compile, $scope, Address, Gift) {
			if ($scope.personId !== undefined) {
				this.person = Address.get({id: $scope.personId});
			}
			$scope.person = this.person;

			// gifts
			var getNbGifts = function () {
				return [...$scope.gifts].length;
			};
			var resetGifts = function () {
				$scope.gifts = '';
				$scope.jealousy = 0;
			};
			var receiveGift = function () {
				$scope.gifts += '\u{1f381}';
				$scope.jealousy = 0;
			};
			var covet = function () {
				$scope.jealousy++;
			};
			$scope.giftApi = {
				getNbGifts: getNbGifts,
				resetGifts: resetGifts,
				receiveGift: receiveGift,
				covet: covet
			};
			resetGifts();

			this.sendGift = function () {
				Gift.sendGiftTo($scope.entryIndex);
			};
			// end gifts

			// edit
			$scope.editing = false;
			$scope.startEdit = function () {
				$scope.editing = true;
			};
			$scope.cancelEdit = function () {
				$scope.editing = false;
			};
			$scope.submitEdit = function (newPerson) {
				$scope.editing = false;
				for (var k in newPerson) {
					$scope.person[k] = newPerson[k];
				}
				$scope.person.$update();
			};

			// delete
			$scope.deleting = false;
			$scope.startDeletion = function () {
				$scope.deleting = true;
			};
			$scope.cancelDeletion = function () {
				$scope.deleting = false;
				$scope.person.$update();
			};
			$scope.submitDeletion = function () {
				$scope.deleting = false;
				$scope.person.$delete();
				$scope.eraseEntry();
			};

			$scope.$watch('fullView', function() {
				console.log('$scope.fullView',$scope.fullView);
				$scope.changeTemplate(!!$scope.fullView);
			});
		}
	};
});
