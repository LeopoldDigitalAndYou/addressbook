var app = angular.module('addressApp');

app.constant('apiUrl', 'http://localhost:3002/server/api/addressbook');

app.factory('Address', function($resource, apiUrl){
	return $resource(
			apiUrl + '/:id',
			{id: '@id'},
			{
				update: {method: 'PUT'}
			}
			);
});
