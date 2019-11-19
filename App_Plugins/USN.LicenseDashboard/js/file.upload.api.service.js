angular.module("umbraco.resources")
    .factory("fileUploadService", function ($http) {
        return {
            uploadFileToServer: function (file) {
                var request = {
                    file: file
                };
                return $http({
                    method: 'POST',
                    url: "backoffice/api/LicenseDashboard/UploadLicenseToServer",
                    headers: { 'Content-Type': undefined },
                    transformRequest: function (data) {
                        var formData = new FormData();
                        formData.append("file", data.file);
                        return formData;
                    },
                    data: request
                }).then(function (response) {
                    if (response) {
                        var fileName = response.data;
                        return fileName;
                    } else {
                        return false;
                    }
                });
            }
        };
    });