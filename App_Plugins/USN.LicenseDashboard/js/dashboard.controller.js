angular.module("umbraco").controller("USN.LicenseDashboard.Controller", function ($scope, $http, notificationsService, fileUploadService) {

    $scope.isLoaded = false;

    $http.get('backoffice/api/LicenseDashboard/GetViewModel').
        success(function (data, status, headers, config) {
            $scope.vm = data;
            $scope.isLoaded = true;
        }).
        error(function (data, status, headers, config) {
            notificationsService.error("Error", "Issue getting license information");
            $scope.isLoaded = true;
        });

    $scope.fileSelected = function (files) {
        // In this case, files is just a single path/filename
        $scope.file = files;
    };

    $scope.uploadFile = function () {
        if (!$scope.isUploading) {
            if ($scope.file) {
                $scope.showInstallingMessage = true;
                $scope.isUploading = true;
                fileUploadService.uploadFileToServer($scope.file)
                    .then(function (response) {
                        if (response) {

                            $http.get('backoffice/api/LicenseDashboard/GetViewModel').
                                success(function (data, status, headers, config) {
                                    $scope.vm = data;
                                    $scope.showInstallingMessage = false;
                                    notificationsService.success("Success", "License installed on server");
                                }).
                                error(function (data, status, headers, config) {
                                    $scope.showInstallingMessage = false;
                                    notificationsService.error("Error", "Issue getting license information");
                                });  
                        }
                        $scope.isUploading = false;
                    }, function (reason) {
                        $scope.showInstallingMessage = false;
                        notificationsService.error("Error", "File import failed: " + reason.message);
                        $scope.isUploading = false;
                    });
            } else {
                $scope.showInstallingMessage = false;
                notificationsService.error("Error", "You must select a file to upload");
                $scope.isUploading = false;
            }
        }
    };

    $scope.showInstallingMessage = false;
    $scope.file = false;
    $scope.isUploading = false;

});