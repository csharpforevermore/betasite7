angular.module("umbraco").controller("USN.Dashboard.Controller",function ($scope, $http, notificationsService) {

    $scope.isPublishedNodesLoaded = false;
    $scope.isPublishedNodesError = false;
    $scope.isRecycleBinLoaded = false;
    $scope.isRecycleBinError = false;
    $scope.isRecentActivityLoaded = false;
    $scope.isRecentActivityError = false;
    $scope.isContentLoaded = false;
    $scope.isContentError = false;

    $http.get('backoffice/api/USNDashboard/GetDashboardViewModel').
        success(function (data, status, headers, config) {
            $scope.vm = data;
        }).
        error(function (data, status, headers, config) {
            notificationsService.error("Error", "Issue getting overview infromation");
        });

    $http.get('backoffice/api/USNDashboard/GetPublishedNodes').
        success(function (data, status, headers, config) {
            $scope.publishedNodesCount = data;
            $scope.isPublishedNodesLoaded = true;
        }).
        error(function (data, status, headers, config) {
            notificationsService.error("Error", "Issue getting publisched content nodes");
            $scope.isPublishedNodesError = true;
        });

    $http.get('backoffice/api/USNDashboard/GetRecycleBin').
        success(function (data, status, headers, config) {
            $scope.recycleBinCount = data;
            $scope.isRecycleBinLoaded = true;
        }).
        error(function (data, status, headers, config) {
            notificationsService.error("Error", "Issue getting nodes in recycle bin");
            $scope.isRecycleBinError = true;
        });

    $http.get('backoffice/api/USNDashboard/GetRecentActivity').
        success(function (data, status, headers, config) {
            $scope.RecentActivity = data;
            $scope.isRecentActivityLoaded = true;
        }).
        error(function (data, status, headers, config) {
            notificationsService.error("Error", "Issue getting your recent activity");
            $scope.isRecentActivityError = true;
            $scope.isRecentActivityLoaded = true;
        });

    $http.get('backoffice/api/USNDashboard/GetContentActivity').
        success(function (data, status, headers, config) {
            $scope.ContentActivity = data;
            $scope.isContentLoaded = true;
        }).
        error(function (data, status, headers, config) {
            notificationsService.error("Error", "Issue getting unpublished/scheduled content");
            $scope.isContentError = true;
            $scop.isContentLoaded = true;
        });  
});