var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService, $http, $timeout){

/////////// Goodreads API //////////  
$scope.pages = 0;

	goodreadsService.getBooks('to-read').then(
			function(data){
        console.log(data)
        var booksArr = data;
        goodreadsService.getBooks('currently-reading').then(
          function(data){
            $scope.books = booksArr.concat(data);
          });
			});
  
//////////// Show modal when click on book ////////////
	$scope.modalShown = [];
  $scope.toggleModal = function(index) {
    if(!$scope.modalShown[index]){
      $scope.modalShown[index] = true;
    } else {
      $scope.modalShown[index] = false;
    }
    // $scope.modalShown[index] = !$scope.modalShown[index];
  };

////////////// Show modal when click on progress bar ///////////

  $scope.modal2Shown = [];
  $scope.toggleModal2 = function(index) {
    if(!$scope.modal2Shown[index]){
      $scope.modal2Shown[index] = true;
    } else {
      $scope.modal2Shown[index] = false;
    }
  };

////////////// Pages Progress Bar //////////////
  $scope.onClick = function(pagesRead){
    // $scope.pagesRead = 0;
    $scope.progressValue = pagesRead; 
  };
  
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
      $scope.pagesRead = 0;
      $scope.progressValue = $scope.pagesRead;
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