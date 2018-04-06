var app = angular.module('boilerplateApp.filters', []);
app.filter('round', ['asyncLocalService', function (asyncLocalService) {
    return function (input,precision) {
        if (input == null) input = 0;
        if(!precision || precision==null)
            precision=2;
        return asyncLocalService.roundFloat(input,precision);
    };
}]);

app.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});

app.filter('trust', [ '$sce', function($sce) {
      return function(value, type) {
        // Defaults to treating trusted text as `html`
        return $sce.trustAs(type || 'html', value);
      }
    }
])
