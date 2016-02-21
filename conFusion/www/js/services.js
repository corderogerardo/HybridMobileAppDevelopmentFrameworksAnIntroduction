'use strict';
angular.module('conFusion.services', ['ngResource'])
     .constant("baseURL","http://localhost:3000/")
        .factory('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {

                    return $resource(baseURL+"dishes/:id",null,  {

                    	'update':{
                    		method:'PUT' 
                    	}
              });
    
                        /*end menuFactory*/
        }])
        .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "promotions/:id");
/*end promotionFactory*/
}])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    	
    		 return $resource(baseURL+"leadership/:id",null,  {
    		 	'update':{
    		 		method:'PUT' 
    		 	}
    		 });
          /*end coorporate factory*/
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
    	/*end feedbackFactory*/
        }])
        .factory('favoriteFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        	var favFac = {};
        	var favorites = [];

        	favFac.addToFactory = function (index){
        		for(var i = 0; i < favorites.length; i++){
        			if(favorites[i].id == index){
        				return;
        			};
        		};
        		favorites.push({id:index});
        	}; /*end method addToFactory*/
        	favFac.deleteFromFavorites = function (index){
        		for(var i = 0; i<favorites.length; i++){
        			if (favorites[i].id = index){
        				favorites.splice(i,1);
        			};
        		};
        	};
        	favFac.getFavorites = function(){
        		return favorites;
        	};
        	/*end of the favoriteFactory service*/
        	return favFac;
        }])
 ;