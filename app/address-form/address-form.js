angular.module('addressApp').directive('addressForm', function (Address) {
	return {
		templateUrl: 'address-form/address-form.template.html',
		restrict: 'E',
		scope: {
			person: '=?'
		},
		require: ['?^addressEntry', '?^addressCreate'],
		link: function (scope, tElem, tAttrs, parentControllers) {
			var parentController = parentControllers.reduce((c1, c2) => c1 || c2);
			if(parentController) {
				scope.cancelEdit = parentController.cancelEdit;
				scope.person = scope.person || {};
				scope.submitEdit = parentController.submitEdit;
			}
			else {
				scope.submitEdit = ()=>{};
				scope.cancelEdit = ()=>{};
				scope.person = {};
				throw new Error('Address edit form not tied to any address entry');
			}
			scope.newPerson = angular.copy(scope.person);
		}
	};
});
