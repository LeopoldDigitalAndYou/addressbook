angular.module('addressApp').directive('addressEntry', function (Address, Gift) {
	return {
		templateUrl: 'address-entry/address-entry.template.html',
		restrict: 'E',
		scope: {
			personId: '=',
		},
		require: '?^fullList',
		transclude: true,
		link: function (scope, tElem, tAttrs, listController) {
			scope.entryIndex = Gift.register(scope.giftApi);
			scope.linkToDetails = !!listController;

			scope.eraseEntry = function() {
				tElem.css('text-decoration', 'line-through');
				tElem.find('h2').append('<strong style="text-decoration: none; display: inline-block;">supprimé</strong>');
			}
		},
		controller: function ($compile, $scope, Address, Gift) {
			if($scope.personId !== undefined) {
				this.person = Address.get({id: $scope.personId});
			}
			$scope.person = this.person;

			// gifts
			var getNbGifts = function() {
				return [...$scope.gifts].length;
			};
			var resetGifts = function() {
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

			this.sendGift = function() {
				Gift.sendGiftTo($scope.entryIndex);
			};
			// end gifts

			// edit
			$scope.editing = false;
			$scope.startEdit = function(){
				$scope.editing = true;
			};
			$scope.cancelEdit = function(){
				$scope.editing = false;
			};
			$scope.submitEdit = function(newPerson){
				$scope.editing = false;
				for(var k in newPerson) {
					$scope.person[k] = newPerson[k];
				}
				$scope.person.$update();
			};

			// delete
			$scope.deleting = false;
			$scope.startDeletion = function(){
				$scope.deleting = true;
			};
			$scope.cancelDeletion = function(){
				$scope.deleting = false;
				$scope.person.$update();
			};
			$scope.submitDeletion = function(){
				$scope.deleting = false;
				$scope.person.$delete();
				$scope.eraseEntry();
			};
		}
	};
});
