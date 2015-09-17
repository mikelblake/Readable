var app = angular.module('readingGoals');

app.service('bookService', function($http){

this.saveBook = function(newBook){
	 $http({
			method: 'PUT',
			url: 'http://localhost:8888/api/user',  //need book endpoint
			data: {
				books: [
				{totalPages: newBook.pageNums},
				{finishDate: newBook.goalDate}
				]
			}
		});
	};
});