var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService, $http, $timeout){
  // $scope.value = $scope.progressValue;
  // $scope.max = 100;
  // $scope.type = 'active';

  // $scope.dateSet;
  // $scope.dateMinLimit;
  // $scope.MaxLimit;

$scope.pages = 0;

	goodreadsService.getBooks('to-read').then(
			function(data){
        var booksArr = data;
        goodreadsService.getBooks('currently-reading').then(
          function(data){
            $scope.books = booksArr.concat(data);
            // console.log($scope.books);
          });
			});
  
//////////// Show modal when click on book ////////////
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

////////////// Pages Progress Bar //////////////
  
  // var amt = 75;
  
  // $scope.countTo = amt;
  // $scope.countFrom = 0;
  
  
////////////// Calculate Pages ///////////////
  $scope.onChange = function(date, book){
    var today = new Date();
    var goalDate = new Date(date);
    var timeDiff = Math.abs(goalDate.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var pageNums = book.book.num_pages;
    var goalPages = Math.ceil(pageNums / diffDays);
    $scope.message = "You should read " + goalPages + " pages each day!";
    book.pages = goalPages;
    book.pageNums = pageNums;
    $timeout(function(){
      $scope.progressValue = book.pages;
    }, 2000);
    book.show = !book.show;

    // var today = moment();
    // console.log(today);
    // var day = new Date(date);
    // var bookDate = moment(day);
    // console.log(bookDate);
    // var goalDays = bookDate.subtract(today);
    // console.log(goalDays);

  };
});