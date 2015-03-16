'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LandingPageController', [function(){

}])
.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase){
    
    var patientsRef = new Firebase('https://patient-pager.firebaseio.com/');

    // no longer needed since firebase is being used
    // $scope.patients = [];
    $scope.patients = $firebase(patientsRef);

    $scope.newPatient = {name: '', phone: '', room: ''};

    $scope.savePatient = function() {

        // no longer needed since firebase is being used
        // $scope.patients.push($scope.patient);
        $scope.patients.$add($scope.newPatient);
        $scope.newPatient = {name: '', phone: '', room: ''};
    };
}]);