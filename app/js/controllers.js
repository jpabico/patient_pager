'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LandingPageController', [function(){

}])
.controller('WaitlistController', ['$scope', function($scope){
    $scope.patients = [];

    $scope.patient = {name: '', phone: '', room: ''};

    $scope.savePatient = function() {
        $scope.patients.push($scope.patient);
        $scope.patient = {name: '', phone: '', room: ''};
    };
}]);