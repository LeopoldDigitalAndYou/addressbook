angular.module('addressApp').config(
	function config($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.
		when('/', {
			template: '<full-list></full-list>',
		}).
		otherwise('/');
	}
);
