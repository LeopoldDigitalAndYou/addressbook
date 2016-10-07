angular.module('addressApp').directive('collapsible', function () {
	return {
		templateUrl: 'collapsible/collapsible.template.html',
		restrict: 'E',
		transclude: {
			summarySlot: 'h2'
		},
		scope: {
			collapsed: '='
		},
		controller: function ($scope) {
			$scope.collapse = function () {
				$scope.collapsed = true;
			};
			$scope.uncollapse = function () {
				$scope.collapsed = false;
			};
		}
	};
});
