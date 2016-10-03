angular.module('addressApp').config(
	function config($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.
		when('/', {
			template: '<full-list></full-list>',
		}).
		when('/:id', {
			template: '<address-details></address-details>',
		}).
		otherwise('/');
	}
);
