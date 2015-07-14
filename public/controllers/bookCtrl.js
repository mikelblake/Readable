var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService){

	goodreadsService.getBooks().then(
			function(data){
				$scope.books = data;
			});

	$scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  $scope.onChange = function(date, book){
    var today = new Date();
    var goalDate = new Date(date);
    var timeDiff = Math.abs(goalDate.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    console.log(diffDays);
    var pageNums = book.book.num_pages;
    console.log(pageNums);
    $scope.goalPages = Math.ceil(pageNums / diffDays);
    console.log(goalPages);


    // var today = moment();
    // console.log(today);
    // var day = new Date(date);
    // var bookDate = moment(day);
    // console.log(bookDate);
    // var goalDays = bookDate.subtract(today);
    // console.log(goalDays);


    // console.log($scope.date, date, book.book.num_pages);
    // var bookDate = new Date(date);
    // var today = new Date();
    // console.log(bookDate, today);
    // var diff = Math.abs(bookDate - today);
    // var days = (((diff/1000)/60)/60)/24;
    // console.log(days)
  }
});