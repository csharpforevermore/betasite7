angular.module("umbraco").controller("USN.OptionsController", function ($scope) {

    //Hide all options
    var option = $scope.model.config.optionType;
    $scope.model.isLayouts = false;
    $scope.model.isItemsPerRow2_4 = false;
    $scope.model.isItemsPerRow1_4 = false;
    $scope.model.isTextAlignment = false;
    $scope.model.isBannerSize = false;
    $scope.model.isPageLayout = false;
    $scope.model.isListingStyle = false;
    $scope.model.isTextPosition = false;
    $scope.model.isComponentWidth = false;
    $scope.model.isRepeatableLayout = false;
    $scope.model.isWindowsOrder = false;
    $scope.model.isSplitComponent = false;
    $scope.model.isNewsletter = false;
    $scope.model.isSitemapChangeFrequency = false;
    $scope.model.isReusableComponentStyle = false;
    $scope.model.isImageStyleWithWide = false;
    $scope.model.isImageStyleWithoutWide = false;
    $scope.model.isIconShape = false;

    $scope.model.current = $scope.model.value;

    switch (option) {
        case "isLayouts":
            $scope.model.isLayouts = true;
            break;
        case "isItemsPerRow2_4":
            $scope.model.isItemsPerRow2_4 = true;
            break;
        case "isItemsPerRow1_4":
            $scope.model.isItemsPerRow1_4 = true;
            break;
        case "isTextAlignment":
            $scope.model.isTextAlignment = true;
            break;
        case "isBannerSize":
            $scope.model.isBannerSize = true;
            break;
        case "isPageLayout":
            $scope.model.isPageLayout = true;
            break;
        case "isListingStyle":
            $scope.model.isListingStyle = true;
            break;
        case "isTextPosition":
            $scope.model.isTextPosition = true;
            break;
        case "isComponentWidth":
            $scope.model.isComponentWidth = true;
            break;
        case "isRepeatableLayout":
            $scope.model.isRepeatableLayout = true;
            break;
        case "isWindowsOrder":
            $scope.model.isWindowsOrder = true;
            break;
        case "isSplitComponent":
            $scope.model.isSplitComponent = true;
            break;
        case "isNewsletter":
            $scope.model.isNewsletter = true;
            break;
        case "isSitemapChangeFrequency":
            $scope.model.isSitemapChangeFrequency = true;
            break;
        case "isReusableComponentStyle":
            $scope.model.isReusableComponentStyle = true;
            break;
        case "isImageStyleWithWide":
            $scope.model.isImageStyleWithWide = true;
            break;
        case "isImageStyleWithoutWide":
            $scope.model.isImageStyleWithoutWide = true;
            break;
        case "isIconShape":
            $scope.model.isIconShape = true;
            break;

    }


    //code to allow deselect of radio buttons
    $scope.check = function (event) {

        if ($scope.model.current === event.target.value) {
            $scope.model.value = "";
            $scope.model.current = "";
        }
        else {
            $scope.model.current = $scope.model.value;
        }
    }
});


