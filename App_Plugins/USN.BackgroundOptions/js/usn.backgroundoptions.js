angular.module("umbraco").controller("USN.BackgroundOptions.Controller", function ($scope) {

    $scope.model.currentStyle = $scope.model.value.style;
    $scope.model.currentPosition = $scope.model.value.position;

    //code to allow deselect of radio buttons
    $scope.checkStyle = function (event) {

        if ($scope.model.currentStyle == event.target.value) {
            $scope.model.value.style = "";
            $scope.model.currentStyle = "";
        }
        else {
            $scope.model.currentStyle = $scope.model.value.style;
        }
    }

    $scope.checkPosition = function (event) {

        if ($scope.model.currentPosition == event.target.value) {
            $scope.model.value.position = "";
            $scope.model.currentPosition = "";
        }
        else {
            $scope.model.currentPosition = $scope.model.value.position;
        }
    }

});