function changeVisibilityItem(scope, item) {
    // Find the item
    var index = scope.items.indexOf(item);
    // Hide/show tabs/properties
    if (index > -1) {
        var tabs = scope.items[index].tabs;
        hideShowTabs(tabs);
    }
}

// Hide/show tabs
function hideShowTabs(tabsList) {
    if (tabsList && tabsList !== '') {
        var tabLabels = tabsList.split(",");
        angular.forEach(tabLabels, function (value, key) {
            // Remove the first charater which contains the action (+ show, - Hide)
            var tabLabel = value.substring(1, value.length);
            var action = value.charAt(0);
            // Look for the tab control
            var tabControls = $("a[href^='#tab']");
            // Show/hide the control
            angular.forEach(tabControls, function (value, key) {
                if (value.text == tabLabel) {
                    switch (action) {
                        case '+':
                            $(value).show();
                            break;
                        case '-':
                            $(value).hide();
                            break;
                        default:
                    }
                }
            });
        });
    }
}

