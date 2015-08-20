var app = angular.module('readingGoals');

app.service('bookService', function($http){

this.saveBook = function(newBook){
	 $http({
			method: 'POST',
			url: 'http://localhost:8888/api/books',  //need book endpoint
			data: {
				totalPages: newBook.pageNums,
				finishDate: newBook.goalDate
								// finishDate: finishDate
			}
		});
	};
});