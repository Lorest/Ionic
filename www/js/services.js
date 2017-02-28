angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  

  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Mario',
    lastText: 'Hey, it\'s me',
    face: 'img/images.jpg'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }

  };
})

.factory('Jeux', function() {

  var test = [{
    name: 'Link',
    img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1__ixI5CR6rePpkHgpc3CSiSsFx1PZRm-UVbbIDwViW7rGA8LML_ItQ'
  }, {
    name: 'Pika',
    img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbmVWf9hiZQAidma8t5aa18Lh_DS5XIDDcvTuHUsf8ig-IwoVI8VDRLwY'
  }];


 return {
  all : function() {
    return test;
  }
 };

})


.factory('Users', function($http, $q, $rootScope) {
  



return {
  all : function() {
    var deferred = $q.defer();
  $http.get("http://carbillet.net/api-digitalGrenoble/users/")
    .success(function(response, status) {

      deferred.resolve(response);

    }).error (function(response, status){
      deferred.reject('Erreur');
    });
    return deferred.promise;
  },

  get : function(users, id) {
      
      for(i = 0; i < users.users.length; i++){
         if (users.users[i].idUser === id) {
          users.users[i].phone = parseInt(users.users[i].phone);
          users.users[i].age = parseInt(users.users[i].age);
          return users.users[i];
        }
      }
    },

  save : function(data) {
    var deferred = $q.defer();
    console.log(data)
    $http.put("http://carbillet.net/api-digitalGrenoble/users/", data)
    .success(function(response, status) {
 
      deferred.resolve(response);

    }).error (function(response, status){
      deferred.reject('Erreur');
    });

    return deferred.promise;
  }

 };

})

.factory('Connection', function ($http, $q) {
  return {
    save : function(data) {
      var deferred = $q.defer();
    $http.post("http://carbillet.net/api-digitalGrenoble/credentials/", data)
    .success(function(response, status) {

      deferred.resolve(response);

    }).error (function(response, status){
      deferred.reject('Erreur');
    });

    return deferred.promise;
    }
  }
})

;
