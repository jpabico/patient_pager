'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LandingPageController', [function(){

}])
.controller('WaitlistController', ['$scope', 'patientService', 'textMessageService', function($scope, patientService, textMessageService) {
    
    // connecting $scope.patients to live firebase data
    // var patientsRef = new Firebase(FIREBASE_URL + 'patients');

    // no longer needed since firebase is being used
    // $scope.patients = [];
    // $scope.patients = $firebase(patientsRef);

    // Binds Firebase patients to $scope using service
    $scope.patients = patientService.patients;

    // object to store data from waitlist form
    $scope.newPatient = {name: '', phone: '', room: '', done: false, notified: 'No'};

    // function to save a new patient to the waitlist
    $scope.savePatient = function() {

        // no longer needed since firebase is being used
        // $scope.patients.push($scope.patient);
        // $scope.patients.$add($scope.newPatient);
        // $scope.newPatient = {name: '', phone: '', room: '', done: false, notified: 'No'};

        patientService.savePatient($scope.newPatient);
    };

    // function for sending text message
    $scope.sendTextMessage = function(patient){
        textMessageService.sendTextMessage(patient);
    };
}])
.controller('AuthController', ['$scope', 'authService', function($scope, authService) {

        // object bound to inputs on register and login pages
        $scope.user = {email: '', password: ''};

        // method to register using the authService
        $scope.register = function() {
                authService.register($scope.user);
        };

        // method to login using the authService
        $scope.login = function() {
                authService.login($scope.user);
        };

        // method to logout using the authService
        $scope.logout = function() {
                authService.logout();
        };

}]);