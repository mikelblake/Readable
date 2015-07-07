var app = angular.module('readingGoals', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/login', {
		templateUrl: '',
		controller: ''
	})

	.when('/home', {
		templateUrl: 'templates/books.html',
		controller: 'bookCtrl'
	})

	.otherwise({
		redirectTo: '/'
	});

});