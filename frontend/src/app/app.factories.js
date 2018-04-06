var app = angular.module('boilerplateApp.factories', []);

app.factory('httpIntercept', ['$rootScope', '$q', 'asyncLocalService', function ($rootScope, $q, asyncLocalService) {
    return {
        // optional method
        'request': function (config) {

            return config;
        },

        // optional method
        'requestError': function (rejection) {
            // do something on error
            
            return $q.reject(rejection);
        },

        // optional method
        'response': function (response) {
           
            return response;
        },

        // executes if gets a failed response
        'responseError': function (rejection) {
            $rootScope.$broadcast('errorAPI', rejection);
            return $q.reject(rejection);
        }
    };
}]);