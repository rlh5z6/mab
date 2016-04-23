app.controller('dashboardCtrl', ['$scope', '$mdDialog', '$state', 'UserData', 'LoginAuth', 'DateID',
                              function($scope, $mdDialog, $state, UserData, LoginAuth, DateID){

  $scope.getDateID = function(){
    return DateID.getDateID;
  }

  $scope.hasMeal = function(meal_name){
    var refString = "https://hackweekmizzou.firebaseio.com/users/";
    refString = refString + UserData.getProfileData().$id + "/meals/"+DateID.getDateID();
    var ref = new Firebase(refString);

    ref.orderByChild("food_meal").equalTo(meal_name).once("value", function(snapshot){
      if(snapshot == null){
        return 0;
      }

      return 1;
    });

  }

  $scope.getMeal = function(meal_name){
    var refString = "https://hackweekmizzou.firebaseio.com/users/";
    refString = refString + UserData.getUserID() + "/meals/"+DateID.getDateID();
    var ref = new Firebase(refString);
    var meal_list = [];

    ref.orderByChild("food_meal").equalTo(meal_name).on("child_added", function(snapshot){
      meal_list.push(snapshot.val());
    });

    return meal_list;
  }

  $scope.breakfastList = $scope.getMeal('Breakfast');
  $scope.lunchList = $scope.getMeal('Lunch');
  $scope.dinnerList = $scope.getMeal('Dinner');
  $scope.snackList = $scope.getMeal('Snack');

  $scope.hasBreakfast = $scope.hasMeal('Breakfast');
  $scope.hasLunch = $scope.hasMeal('Lunch');
  $scope.hasDinner = $scope.hasMeal('Dinner');
  $scope.hasSnack = $scope.hasMeal('Snack');


  $scope.update_meal_chart = function(){


	var tot_breakfast = 0;
	var tot_lunch = 0;
	var tot_dinner = 0;
  var tot_snack = 0;

	for (i = 0; i < $scope.breakfastList.length; i++) {
    tot_breakfast += $scope.breakfastList[i].food_cal;
	}
	for (i = 0; i < $scope.lunchList.length; i++) {
    tot_lunch+= $scope.lunchList[i].food_cal;
	}
	for (i = 0; i < $scope.dinnerList.length; i++) {
    tot_dinner += $scope.dinnerList[i].food_cal;
	}
  for (i = 0; i < $scope.snackList.length; i++) {
    tot_snack += $scope.snackList[i].food_cal;
  }


  var data = {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    series: [tot_breakfast, tot_lunch, tot_dinner, tot_snack]
  };

  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 50,
      chartPadding: 20
    }]
  ];

  new Chartist.Pie('#meal_breakdown', data, options, responsiveOptions);

}

$scope.update_food_cat_chart = function(){
 var cat_count = {Meat: 0, Seafood: 0, Fruit: 0, Vegetable: 0, Dairy: 0, Grains: 0, Dessert: 0, Other: 0};
 for (i = 0; i < $scope.breakfastList.length; i++) {
   if(!($scope.breakfastList[i].food_cat in cat_count)){
     cat_count['Other']++;
   }
   else{
     cat_count[$scope.breakfastList[i].food_cat]++;
   }
 }
 for (i = 0; i < $scope.lunchList.length; i++) {
   if(!($scope.lunchList[i].food_cat in cat_count)){
     cat_count['Other']++;
   }
   else{
     cat_count[$scope.lunchList[i].food_cat]++;
   }
 }
 for (i = 0; i < $scope.dinnerList.length; i++) {
   if(!($scope.dinnerList[i].food_cat in cat_count)){
     cat_count['Other']++;
   }
   else{
     cat_count[$scope.dinnerList[i].food_cat]++;
   }
 }
 for (i = 0; i < $scope.snackList.length; i++) {
   if(!($scope.snackList[i].food_cat in cat_count)){
     cat_count['Other']++;
   }
   else{
     cat_count[$scope.snackList[i].food_cat]++;
   }
 }

 var data = {
   labels:  ['Meat', 'Seafood', 'Fruit', 'Vegetable', 'Dairy', 'Nuts/Seeds', 'Grains', 'Dessert'],
   series: [cat_count['Meat'], cat_count['Seafood'], cat_count['Fruit'], cat_count['Vegetable'], cat_count['Dairy'], cat_count['Other'], cat_count['Grains'], cat_count['Dessert']]
 };

 var options = {
   labelInterpolationFnc: function(value) {
     return value[0]
   }
 };

 var responsiveOptions = [
   ['screen and (min-width: 640px)', {
     chartPadding: 30,
     labelOffset: 100,
     labelDirection: 'explode',
     labelInterpolationFnc: function(value) {
       return value;
     }
   }],
   ['screen and (min-width: 1024px)', {
     labelOffset: 50,
     chartPadding: 20
   }]
 ];

 new Chartist.Pie('#cat_breakdown', data, options, responsiveOptions);

}


  $scope.logout = function(){

    LoginAuth.logout();
    if($state.is('dashboard')){
      $state.go('home');
    }

    if($state.is('dashboard.begin')){
      $state.go('^.^.home');
    }
  }


$scope.showFoodForm = function(ev){

    $mdDialog.show({
       clickOutsideToClose: true,
       templateUrl: 'app/components/dashboard/views/add/addFoodTmpl.html',
       targetEvent: ev,
       controller: function DialogController($scope, $mdDialog, UserData, DateID) {
         $scope.mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
         $scope.foodCategories = ['Meat', 'Seafood', 'Fruit', 'Vegetable', 'Dairy', 'Nuts/Seeds', 'Grains', 'Dessert'];

         $scope.closeDialog = function() {
           $mdDialog.hide();
         }

         $scope.saveFood = function(name, category, meal, calories){

           if(name != null && category != null && meal != null && calories != null){
             var refString = "https://hackweekmizzou.firebaseio.com/users/";
             refString = refString + UserData.getProfileData().$id + "/meals/"+DateID.getDateID();
             var ref = new Firebase(refString);

             ref.push({
               food_name: name,
               food_cat: category,
               food_meal: meal,
               food_cal: calories
             });

             $mdDialog.hide();
          }
         }
       }
    }).then(function(){
      $scope.breakfastList = $scope.getMeal('Breakfast');
      $scope.lunchList = $scope.getMeal('Lunch');
      $scope.dinnerList = $scope.getMeal('Dinner');
      $scope.snackList = $scope.getMeal('Snack');

      $scope.hasBreakfast = $scope.hasMeal('Breakfast');
      $scope.hasLunch = $scope.hasMeal('Lunch');
      $scope.hasDinner = $scope.hasMeal('Dinner');
      $scope.hasSnack = $scope.hasMeal('Snack');

      //$scope.update_chart();
    });
}

$scope.getUserData = function(){
    return UserData.getData();
}


$scope.showProfile = function(ev){
  $mdDialog.show({
      scope: $scope,
      preserveScope: true,
      templateUrl: 'app/components/dashboard/views/profile/profileTmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      controller: function DialogController($scope, $mdDialog, UserData, DateID) {
    	//$scope.update_chart();
        $scope.closeDialog = function() {
            $mdDialog.hide();
        }
      }
  });
}

}]);
