var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService){
	// $scope.getBooks = function(){
	// 	return goodreadsService.getBooks();
	// };

	goodreadsService.getBooks().then(
			function(data){
				console.log(data);
				$scope.books = data;
			});
});