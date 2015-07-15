var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService, $http){

	goodreadsService.getBooks('to-read').then(
			function(data){
        var booksArr = data;
        goodreadsService.getBooks('currently-reading').then(
          function(data){
            $scope.books = booksArr.concat(data);
            // console.log($scope.books);
          });
			});
  

	$scope.modalShown = [];
  $scope.toggleModal = function(index) {
    console.log(index, $scope.modalShown[index]);
    if(!$scope.modalShown[index]){
      $scope.modalShown[index] = true;
    } else {
      $scope.modalShown[index] = false;
    }
    // $scope.modalShown[index] = !$scope.modalShown[index];
  };

  $scope.onChange = function(date, book){
    var today = new Date();
    var goalDate = new Date(date);
    var timeDiff = Math.abs(goalDate.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var pageNums = book.book.num_pages;
    var goalPages = Math.ceil(pageNums / diffDays);
    $scope.message = "You should read " + goalPages + " pages each day!";

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
  };
});