var app = angular.module('readingGoals');

app.service('bookService', function($http){

this.saveBook = function(newBook){
	 $http({
			method: 'PUT',
			url: '/api/user',  //need book endpoint
			data: {
				books: [
				{totalPages: newBook.pageNums},
				{finishDate: newBook.goalDate}
				]
			}
		});
	};
});