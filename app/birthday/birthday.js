angular.module('addressApp').directive('birthday', function () {
	return {
		templateUrl: 'birthday/birthday.template.html',
		restrict: 'E',
		require: '^presentSender'
	};
});
