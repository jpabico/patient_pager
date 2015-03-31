'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://patient-pager.firebaseio.com/')
  .factory('dataService', function($firebase, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    return fireData;

  })
  .factory('patientService', function(dataService) {
    // var patientsRef = new Firebase(FIREBASE_URL + 'patients');
    // var patients = $firebase(patientsRef);

    // var patients = dataService.$child('patients');
    var users = dataService.$child('users');

    var patientServiceObject = {
        // patients: patients,
        savePatient: function(patient, userId) {
            // patients.$add(patient);
            users.$child(userId).$child('patients').$add(patient);
        },
        getPatientsByUserId: function(userId) {
            return users.$child(userId).$child('patients');
        }
    };

    return patientServiceObject;

  })
  .factory('textMessageService', function(dataService, patientService) {
        // var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
        // var textMessages = $firebase(textMessageRef);
        var textMessages = dataService.$child('textMessages');

        var textMessageServiceObject = {
            sendTextMessage: function(patient, userId) {
                var newTextMessage = {
                    phoneNumber: patient.phone,
                    room: patient.room,
                    name: patient.name
                };

                textMessages.$add(newTextMessage)
                // patient.notified = 'Yes';
                // $scope.patients.$save(patient.$id);
                // patientService.patients.$save(patient.$id)

                patientService.getPatientsByUserId(userId).$child(patient.$id).$update({notified: 'Yes'});
            }
        };

        return textMessageServiceObject

        
  })
  .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {

        var authRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseSimpleLogin(authRef);
        var emails = dataService.$child('emails');

        var authServiceObject =  {
            register: function(user) {
                // returns an Angular promise
                auth.$createUser(user.email, user.password).then(function(data){
                console.log(data);
                emails.$add({email: user.email});
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
            },
            getCurrentUser: function() {
                return auth.$getCurrentUser();
            }
        };

        $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
            $rootScope.currentUser = user;
        });

        $rootScope.$on("$firebaseSimpleLogin:logout", function() {
            $rootScope.currentUser = null;
        });

        return authServiceObject;
  });
