angular.module("umbraco").controller("USN.Heading.Controller", function ($scope) {

    $scope.model.currentHeadingTag = $scope.model.value.headingtag;

    //code to allow deselect of radio buttons
    $scope.check = function (event) {

        if ($scope.model.currentHeadingTag == event.target.value) {
            $scope.model.value.headingtag = "";
            $scope.model.currentHeadingTag = "";
        }
        else {
            $scope.model.currentHeadingTag = $scope.model.value.headingtag;
        }
    }

});