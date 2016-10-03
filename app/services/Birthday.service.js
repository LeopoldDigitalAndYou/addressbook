angular.module('addressApp').factory('Birthday', function($resource, apiUrl){
	return $resource(
			apiUrl + '/:id' + '/birthday',
			{id: '@id'},
			{}
	);
});
