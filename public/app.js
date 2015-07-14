var app = angular.module('readingGoals', ['ngRoute', '720kb.datepicker']);

app.config(function($routeProvider){

	$routeProvider
	.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'loginCtrl'
	})

	.when('/home', {
		templateUrl: 'templates/books.html',
		controller: 'bookCtrl'
	})

	.otherwise({
		redirectTo: '/login'
	});

});