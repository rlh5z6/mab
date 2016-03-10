var app = angular.module('MABApp', ['ngMaterial', 'ui.router']);

//Routing stuff
app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
   
  
  .state('profile', {
      url: '/profile',
      abstract: true,
      templateUrl: 'app/components/profile/profileIndex.html'
    })

});

app.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('grey',
      {
        'default': '800',
        'hue-1': '500'
      })
    .accentPalette('green',
      {
        'default': '900',
      });
});



//app.factory('UserData', ['$firebaseObject', function($firebaseObject){
//  var ref = new Firebase("https://hackweekmizzou.firebaseio.com");
//
//  var data;
//  var profileData;
//  var savedData = localStorage.getItem('firebase:session::hackweekmizzou');
//  var loggedIn = false;
//
//  if(savedData != null){
//    data = JSON.parse(savedData);
//    profileData = $firebaseObject(ref.child('users').child(data.facebook.id));
//    loggedIn = true;
//  }
//
//  return{
//    getData: function(){
//      return data;
//    },
//
//    getProfileData: function(){
//      return profileData;
//    },
//
//    getUserID: function(){
//      return profileData.$id;
//    },
//
//    isLoggedIn: function(){
//      return loggedIn;
//    },
//
//    setData: function(newData){
//      data = newData;
//      console.dir(data);
//      profileData = $firebaseObject(ref.child('users').child(data.facebook.id));
//      profileData.$loaded().then(function(){
//        profileData.name = data.facebook.displayName;
//        profileData.img_url = data.facebook.profileImageURL;
//        profileData.$save();
//      });
//
//      if(localStorage.getItem('firebase:session::hackweekmizzou') != null){
//        localStorage.clear();
//      }
//
//      localStorage.setItem('firebase:session::hackweekmizzou', JSON.stringify(data));
//      loggedIn = true;
//    },
//
//    clearData: function(){
//      if(localStorage.getItem('firebase:session::hackweekmizzou') != null){
//        loggedIn = false;
//        localStorage.clear();
//      }
//    }
//
//  }
//
//}]);
//
////Facebook authentication
//app.factory('LoginAuth', ['$state', '$mdDialog', 'UserData', function($state, $mdDialog, UserData){
//    var ref = new Firebase("https://hackweekmizzou.firebaseio.com");
//    var currentUser;
//
//    return{
//      login: function(){
//        ref.authWithOAuthPopup("facebook", function(error, authData) {
//          if (error) {
//            //console.log("Login Failed!", error);
//          }
//          if (!error) {
//            //console.log("Authenticated successfully with payload:", authData);
//            UserData.setData(authData);
//            $state.go('dashboard.begin');
//            $mdDialog.cancel();
//          }
//        });
//      },
//
//      logout: function(){
//        UserData.clearData();
//      }
//    };
//
//}]);
