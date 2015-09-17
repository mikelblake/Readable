var app = angular.module('readingGoals');

app.service('userService', function($http){

	return $http({
		method: 'POST',
		url: 'http://localhost:8888/api/users' + userId,
		data: {
			goodreadsId: goodreadsId,
			// books: books
		}
	});

});

// this.createUser = function(userId) {
//   var dfd = $q.defer();
//   $http({
//     method: "POST",
//     url: 'http://localhost:8888/api/users' + userId,
//     data: {
//     }
//   }).then(function(response) {
//     console.log('new user from the service', response);
//     dfd.resolve(response.data);
//   });
//   return dfd.promise;
// };