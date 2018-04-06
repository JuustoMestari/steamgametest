
var app = angular.module('boilerplateApp.directives', []);

app.directive('loading', ['$rootScope','$http', function ($rootScope,$http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            //check if http request pending
            //socket request are not included here
            scope.isLoading = function () {

                //no need if a modal or popover is loading
                var exclude = ["/app/shared/modals/"];
                if ($http.pendingRequests.length > 0) {
                    for (var i = 0; i < exclude.length; i++) {
                        if ($http.pendingRequests[0].url.indexOf(exclude[i]) > -1) return false;
                    }
                }
                return $http.pendingRequests.length > 0 || $rootScope.showLoadingCog;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    $(elm).show();
                } else {
                    $(elm).hide();
                }
            });
           
        }
    };
}]);