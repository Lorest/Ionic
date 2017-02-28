// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // $http.get("http://carbillet.net/api-digitalGrenoble/users/").then(function(users){
  //   $rootScope.listusers = users;
  // });
  
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.map', {
    cache: false,
    url: '/maps',
    views : {
      'tab-dash' : {
        templateUrl: 'templates/tab-dash.html',
        controller: 'MapCtrl'
      }
    },

    params : {

      coord : {

        lat : undefined,

        lng : undefined

      }
      
    },

    resolve : {
      coord : function ($stateParams, $cordovaGeolocation) {

        if (!$stateParams.coord.lat) {
          return $cordovaGeolocation.getCurrentPosition().then(function(data){
            $stateParams.coord = {
              lat: data.coords.latitude,
              lng: data.coords.longitude
            };
            return $stateParams.coord;
          });
        }
        else {
          return $stateParams.coord;
        }     
      }
    }
    
    
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.jeux', {
    url: '/jeux',
    views: {
      'tab-jeux': {
        templateUrl: 'templates/tab-jeux.html',
        controller: 'JeuxCtrl'
      }
    }

  })

  .state('tab.users', {
    url: '/users',
    views: {
      'tab-users': {
        templateUrl: 'templates/tab-users.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('tab.profil', {
    url: '/users/:idUser',
    views: {
      'tab-users': {
        templateUrl: 'templates/tab-profil.html',
        controller: 'ProfilCtrl'
      }
    }
  })

  .state('tab.save', {
    url: '/users',
    views: {
      'tab-users': {
        templateUrl: 'templates/tab-profil.html',
        controller: 'saveProfilCtrl'
      }
    },
    params: {
      user: {
        // "age":0,
        // "phone":0,
        // "adress": undefined
      }
    }
  })
 






  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/maps');

});
