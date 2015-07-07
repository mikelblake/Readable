var app = angular.module('readingGoals');

app.service('goodreadsService', function($http, $q){
	this.getBooks = function(){
		var dfd =  $q.defer();
		$http.get('https://www.goodreads.com/review/list/993466?format=xml&key=wXIuvQ4Icx6bai2S7FxwLQ&v=2')
		.then(function(data){
			console.log(data);
			var bookData = $.xml2json(data);
			dfd.resolve();
		});
		return dfd.promise;
	};
});