angular.module('addressApp').directive('addressForm', function (Address) {
	return {
		templateUrl: 'address-form/address-form.template.html',
		restrict: 'E',
		scope: {},
		require: ['?^addressEntry', '?^addressCreate'],
		link: function (scope, tElem, tAttrs, parentControllers) {
			var parentController = parentControllers.reduce((c1, c2) => c1 || c2);
			if(parentController) {
				scope.submitEdit = parentController.submitEdit;
				scope.person = parentController.person || {};
			}
			else {
				scope.submitEdit = ()=>{};
				scope.person = {};
				throw new Error('Address edit form not tied to any address entry');
			}
		}
	};
});
