app.controller('HomeCtrl', ['$scope', '$mdDialog', '$state', 'UserData', 'LoginAuth',
                              function($scope, $mdDialog, $state, UserData, LoginAuth){

  if(UserData.isLoggedIn()){
    $state.go('dashboard.begin');
  }

  $scope.loginWithFacebook = function(){
    LoginAuth.login();
  }

}]);
