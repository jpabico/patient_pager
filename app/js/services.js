'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://patient-pager.firebaseio.com/')
  .factory('authService', function($firebaseSimpleLogin, $location, FIREBASE_URL) {

        var authRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseSimpleLogin(authRef);

        var authServiceObject =  {
            register: function(user) {
                // returns an Angular promise
                auth.$createUser(user.email, user.password).then(function(data){
                console.log(data);
                authServiceObject.login(user);
            });
            },
            login: function(user) {
                auth.$login('password', user).then(function(data) {
                console.log(data);
                // redirect users to /waitlist page
                $location.path('/waitlist');
            });
            },
            logout: function() {
                auth.$logout();
                // redirect users to / landing page
                $location.path('/');
            }
        };

        return authServiceObject;
  });
