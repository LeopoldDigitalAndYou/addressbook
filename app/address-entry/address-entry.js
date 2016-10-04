angular.module('addressApp').directive('addressEntry', function (Address) {
	return {
		templateUrl: 'address-entry/address-entry.template.html',
		restrict: 'E',
		scope: {
			personId: '='
		},
		require: '?^fullList',
		transclude: true,
		link: function (scope, tElement, tAttrs, listController) {
			if (listController) {
				var entryIndex = listController.register(scope);
				scope.registerGifts = function(){
					listController.setGifts(entryIndex);
				}
			}
		},
		controller: function ($scope, Address) {
			this.person = Address.get({id: $scope.personId});
			$scope.person = this.person;

			$scope.gifts = '';
			$scope.jealousy = 0;
			this.receiveGift = function () {
				$scope.gifts += '\u{1f381}';
				$scope.jealousy = 0;
				$scope.registerGifts();
			};
			$scope.covet = function() {
				$scope.jealousy++;
			}
		}
	};
});
