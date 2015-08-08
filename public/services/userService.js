var app = angular.module('readingGoals');

app.service('userService', function($http){

	return $http({
		method: 'POST',
		url: 'http://localhost:8888/api/users' + userId,
		data: 
	});

});

// this.createUser = function(firstName, lastName, email, password) {
//   var dfd = $q.defer();
//   $http({
//     method: "POST",
//     url: '/auth/local/signup',
//     data: {
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password
//     }
//   }).then(function(response) {
//     console.log('new user from the service', response);
//     dfd.resolve(response.data);
//   });
//   return dfd.promise;
// };