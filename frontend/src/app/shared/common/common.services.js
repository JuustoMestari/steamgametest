(function () {
    'use strict';

    angular.module('boilerplateApp.commonServices', []).service('asyncCommonService', asyncCommonService);

    asyncCommonService.$inject = ['$http', '$q', 'CONFIG'];

    function asyncCommonService($http, $q, CONFIG) {

        var factory = {
            
        };

        
        return factory;
    }
})();