angular.module('addressApp').directive('addressForm', function (Address) {
	return {
		templateUrl: 'address-form/address-form.template.html',
		restrict: 'E',
		scope: {
			person: '=?',
			cancelEdit: '&',
			submitEdit: '&'
		},
		require: ['?^addressEntry', '?^addressCreate'],
		link: function (scope, tElem, tAttrs, parentControllers) {
			var parentController = parentControllers.reduce((c1, c2) => c1 || c2);
			scope.person = scope.person || {};
			if (!parentController) {
				throw new Error('Address edit form not tied to any address entry');
			}
			scope.submitEdit = scope.submitEdit || (()=> {});
			scope.cancelEdit = scope.cancelEdit || (()=> {});
			scope.newPerson = angular.copy(scope.person);
		}
	};
});
