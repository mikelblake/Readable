var app = angular.module('readingGoals');

app.controller('bookCtrl', function($scope, goodreadsService, $http, $timeout, bookService){

/////////// Goodreads API //////////  
$scope.pages = 0;

	goodreadsService.getBooks('to-read').then(
			function(data){
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
  };
  $scope.hideModal = function() {
    $scope.show = false;
  };

////////////// Create book in database //////////////

$scope.saveBook = function(){
  var newBook = {
    pageNums: $scope.pageNums,
    goalDate: $scope.goalDate
  };
  bookService.saveBook(newBook);
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
  
////////////// Calculate Pages ///////////////
  $scope.onChange = function(date, book){
    var today = new Date();
    $scope.goalDate = new Date(date);
    var timeDiff = Math.abs($scope.goalDate.getTime() - today.getTime());
    $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    $scope.pageNums = book.book.num_pages;
    var goalPages = Math.ceil($scope.pageNums / $scope.diffDays);
    $scope.message = "You should read " + goalPages + " pages each day!";
    book.pages = goalPages;
    book.pageNums = $scope.pageNums;
    $timeout(function(){
      $scope.pagesRead = 0;
      $scope.progressValue = $scope.pagesRead;
    }, 1000);
    book.show = !book.show;
  };

////////////// Pages Progress Bar //////////////
  $scope.onClick = function(pagesRead, book){
    book.progressValue = pagesRead; 
    book.updatedPageNums = book.pageNums - book.progressValue;

    var today = new Date();
    var timeDiff = Math.abs($scope.goalDate.getTime() - today.getTime());
    $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var goalPages = Math.ceil(book.updatedPageNums / $scope.diffDays);
    book.pages = goalPages;
    // book.pageNums = $scope.pageNums;
  };
});