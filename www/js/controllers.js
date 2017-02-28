angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  console.log(Chats.all());
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true


  };
})

.controller('JeuxCtrl', function($scope, Jeux) {
  $scope.jeux = Jeux.all();
})


.controller('UserCtrl', function($scope, Users) {
  $scope.loading = true;
  $scope.users = Users.all().then(function(users) {
    $scope.loading = false;
    $scope.users = users.users;

  }, function(msg) {
      alert(msg);
  });
})

.controller('ProfilCtrl', function($scope, $state, $stateParams, $window, Users) {
  id = $stateParams.idUser;

  $scope.see = function (lat, lng){
    var coord = {
      lat :lat,
      lng : lng
    }
    console.log('ProfilCtrl, coord', coord)
    $state.go('tab.map', {coord : coord}, {location: "replace"});
  }
  $scope.chat = function (lat, lng){
    $state.go('tab.chat-detail');
  }

   $scope.post = function(u1){
    $state.go('tab.save', {user : u1});
   }


  Users.all().then(function(users) {
    $scope.user = Users.get(users, id);
  })
})





.controller('MapCtrl', function($scope, $state, $stateParams, coord, $timeout, $cordovaGeolocation) {

    if(coord.lat && coord.lng){

      $scope.center = {
      latitude: coord.lat,
      longitude: coord.lng
      };

    }
    else {
      $scope.center = {
        latitude: 0,
        longitude: 0
      };
    }
    

    $scope.maposition = function(){
      $cordovaGeolocation.getCurrentPosition().then(function(data){
        $scope.center = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        };
      });
    }
   
    
    $scope.showMap = false;

    $timeout(function() {
        $scope.showMap = true;
    });
  
  }, function(error){
    console.log("Could not get location");
  })









.controller('saveProfilCtrl', function($scope, $state, $stateParams, Users, Connection){
  $scope.user = $stateParams.user;
  var ident = {
    "username": "loic.forest",
    "password": "loic"
  }

  Connection.save(ident).then(function(){

    var data = { "json" : {
    "idUser" : parseInt($stateParams.user.idUser),
    "phone" : JSON.stringify($stateParams.user.phone),
    "adress" : $stateParams.user.adress,
    "age" : $stateParams.user.age
    }
  }

  Users.save(data);

  });

  

  
})

;
