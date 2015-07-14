var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService){

	goodreadsService.getBooks().then(
			function(data){
				console.log(data);
				$scope.books = data;
			});

	$scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
});