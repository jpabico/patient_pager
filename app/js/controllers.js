'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LandingPageController', [function(){

}])
.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase){
    
    // connecting $scope.patients to live firebase data
    var patientsRef = new Firebase('https://patient-pager.firebaseio.com/patients');

    // no longer needed since firebase is being used
    // $scope.patients = [];
    $scope.patients = $firebase(patientsRef);

    // object to store data from waitlist form
    $scope.newPatient = {name: '', phone: '', room: '', done: false, notified: 'No'};

    // function to save a new patient to the waitlist
    $scope.savePatient = function() {

        // no longer needed since firebase is being used
        // $scope.patients.push($scope.patient);
        $scope.patients.$add($scope.newPatient);
        $scope.newPatient = {name: '', phone: '', room: '', done: false, notified: 'No'};
    };

    // function for sending text message
    $scope.sendTextMessage = function(patient){
        var textMessageRef = new Firebase('https://patient-pager.firebaseio.com/textMessages');
        var textMessages = $firebase(textMessageRef);
        var newTextMessage = {
            phoneNumber: patient.phone,
            room: patient.room,
            name: patient.name
        };
        textMessages.$add(newTextMessage);
        patient.notified = 'Yes';
        $scope.patients.$save(patient.$id)
    };
}])
.controller('AuthController', ['$scope', '$firebaseSimpleLogin', function($scope, $firebaseSimpleLogin) {
        var authRef = new Firebase('https://patient-pager.firebaseio.com/');
        var auth = $firebaseSimpleLogin(authRef);

        $scope.user = {email: '', password: ''};
        $scope.register = function() {
            // returns an Angular promise
            auth.$createUser($scope.user.email, $scope.user.password).then(function(data){
                console.log(data);
                auth.$login('password', $scope.user);
            });
        };

        $scope.login = function() {
            auth.$login('password', $scope.user).then(function(data) {
                console.log(data);
            });
        };
}]);