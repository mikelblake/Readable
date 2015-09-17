var app = angular.module('readingGoals');

app.service('goodreadsService', function($http, $q){
	this.getBooks = function(shelftype, callback){
    var dfd = $q.defer();
		$http({
		    method: 'GET', 
		    url: '/api/reviews/' + shelftype  
		}).then(function(data){
		    var x2js = new X2JS(); 
		    var json = x2js.xml_str2json(data.data); 
		    dfd.resolve(json.GoodreadsResponse.reviews.review); 
		    // dfd.resolve(data); 
		});

		return dfd.promise;
    };


});