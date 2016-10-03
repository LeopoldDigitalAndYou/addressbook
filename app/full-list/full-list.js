angular.module('addressApp').directive('fullList', function(Address){
	return {
		templateUrl: 'full-list/list.template.html',
		restrict: 'E',
		scope: {},
		controller: function ($scope, Address) {
			$scope.people = Address.query();
			$scope.nbGifts = 0;

			this.entries = [];
			this.register = function(scope) {
				this.entries.push(scope);
				return this.entries.length - 1;
			};
			this.setGifts = function(entryIndex) {
				$scope.nbGifts = 0;
				for(var ii = 0 ; ii < this.entries.length ; ii++){
					$scope.nbGifts += [...this.entries[ii].gifts].length;
					if(ii != entryIndex){
						this.entries[ii].covet();
					}
				}
			};
		}
	};
});
