angular.module('conFusion.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


 

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  /*this create the reserve modal that we will use later*/
  $ionicModal.fromTemplateUrl('templates/reserve.html',{
  	scope:$scope
  }).then(function(modal){
  	$scope.reserveForm = modal;
  });

  /*this section triggered in the reserve modal to close it*/
  $scope.closeReserve = function(){
  	$scope.reserveForm.hide();
  };

  /*this function open the reserve modal*/
  $scope.reserve = function(){
  	$scope.reserveForm.show();
  };
   /*Perform the reserve action when the user submits the reserve form*/
  $scope.doReserve = function(){
  	console.log('Doing reservation', $scope.reservation);
  	//Simulate a reservation delay. Remove this and replace with your reservation
  	//code if using a server system
  	$timeout(function(){
  		$scope.closeReserve();
  	},1000);	
  };
 
 

})/*end of appCtrl controller*/

  .controller('MenuController', ['$scope', 'dishes','favoriteFactory', 'baseURL','$ionicListDelegate', function($scope, dishes,favoriteFactory, baseURL, $ionicListDelegate) {

            $scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
                   
            $scope.dishes = dishes;
                 
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };

            $scope.addFavorite= function(index){
            		console.log("Index is "+ index);
            		favoriteFactory.addToFactory(index);
            		$ionicListDelegate.closeOptionButtons();
            }; /*added in week 2*/
            /*end MenuController*/
        }])

        .controller('ContactController', ['$scope','baseURL', function($scope,baseURL) {

        	$scope.baseURL = baseURL;
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams','dish','menuFactory','favoriteFactory','baseURL','$ionicPopover','$ionicModal', function($scope, $stateParams, dish, menuFactory,favoriteFactory, baseURL, $ionicPopover, $ionicModal) {
            
            $scope.baseURL= baseURL;
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
          
              $scope.dish = dish;

            $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
     	scope:$scope
	   }).then(function(popover){
		     $scope.popover = popover;
	     });

	 $scope.openPopover = function($event) {
	    $scope.popover.show($event);
	  };
	 $scope.closePopover = function() {
	    $scope.popover.hide();
	  };

	 $scope.addFavorite= function(){
            		favoriteFactory.addToFactory($scope.dish.id);
            		$scope.closePopover();
            }; /*added in week 2*/           

	   /*this create the comment modal*/
$ionicModal.fromTemplateUrl('templates/dish-comment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.commentForm = modal;
  });
  /*this section triggered in the reserve modal to close it*/
  $scope.closeCommentForm = function(){
  	$scope.commentForm.hide();
  };
  /*this function open the reserve modal*/
  $scope.comment = function(){
  	$scope.closePopover();
  	$scope.commentForm.show();
  };

    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

   $scope.doComment = function(){
   	
  	
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
          
                $scope.dish.comments.push($scope.mycomment);
        menuFactory.update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
         
	         $timeout(function() {
	        $scope.closeCommentForm();
	        }, 1000);
  	 }; 
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', 'baseURL' , function($scope, menuFactory, baseURL) {
            
             $scope.baseURL= baseURL;
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here

     .controller('IndexController', ['$scope', 'dishes','promotion', 'coorporate', 'baseURL', function($scope, dishes,promotion,coorporate, baseURL) {

                        $scope.baseURL = baseURL;
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.leader = coorporate;

                        $scope.dish = dishes;
                        $scope.promotion = promotion;
      }])

       .controller('AboutController', ['$scope', 'leaderships', 'baseURL', 
       	function($scope, leaderships, baseURL) {

       	$scope.baseURL = baseURL;
    	$scope.showLeaders=false;
    	$scope.message="Loading";


            $scope.leadership= leaderships;
           
   /*end aboutController*/
        }])
       .controller('FavoritesController', ['$scope', 'dishes','favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate','$ionicPopup','$ionicLoading','$timeout', function ($scope, dishes,favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;


    $scope.favorites = favorites;

  $scope.dishes = dishes;

    console.log($scope.dishes, $scope.favorites);

    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    };

    $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
                favoriteFactory.deleteFromFavorites(index);
            } else {
                console.log('Canceled delete');
            }
        });

        $scope.shouldShowDelete = false;

    };

}])
       .filter('favoriteFilter', function () {
    return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id === favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;
    };
})
;