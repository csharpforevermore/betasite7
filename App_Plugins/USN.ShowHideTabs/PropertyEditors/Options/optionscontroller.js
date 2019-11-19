angular.module("umbraco").controller("USN.OptionTabsController",

function ($scope, $q, $timeout, assetsService) {

    $scope.isLoaded = false;

    var await = [];



    await.push(assetsService.loadJs('/App_Plugins/USN.ShowHideTabs/PropertyEditors/common.js', $scope));

    // Wait for queue to end
    $q.all(await).then(function () {

        // Check whether the model is initialized
        if (!$scope.model.value) {
                $scope.model.value = "";
        }

        // Remove any empty item from the list
        $scope.model.config.items.items = $scope.model.config.items.items.filter(function (item) {
            return item.key !== "" && item.text !== "";
        });

        // Populate the list
        $scope.items = $scope.model.config.items.items;

        $scope.isLoaded = true;
        // Change visibility/state of the tabs and properties depending on the dropdown list initial values
        $timeout(function () {
            changeVisibilityAllItems();
        }, 0);


        // Item click
        $scope.click = function click() {
            changeVisibilityAllItems();
        };

        function changeVisibilityAllItems() {

            //Hide all Tabs
            var hideTabs = $scope.model.config.hideTabs.split(",");

            angular.forEach(hideTabs, function (value, key) {
                var tabLabel = value;
                var tabControls = $("a[href^='#tab']");
                // Show/hide the control
                angular.forEach(tabControls, function (value, key) {
                    if (value.text == tabLabel) {
                        $(value).hide();
                    }
                });

            });

            if ($scope.model.value !== "") {
                angular.forEach($scope.items, function (value, key) {
                    // Check whether it is a currently selected value
                    if ($scope.model && $scope.model.value == value.key) {
                        changeVisibilityItem($scope, value);
                    }
                });
            }

        }

    });

});
