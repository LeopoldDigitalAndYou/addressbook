angular.module('addressApp').directive('unbirthday', function () {
	return {
		templateUrl: 'birthday/unbirthday.template.html',
		restrict: 'E',
		require: '^presentSender'
	};
});
