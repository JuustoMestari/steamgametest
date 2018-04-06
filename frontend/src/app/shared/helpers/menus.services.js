(function () {
    'use strict';

    angular.module('boilerplateApp.menuServices', []).service('asyncMenuService', asyncMenuService);

    asyncMenuService.$inject = ['$state', '$stateParams', 'asyncLocalService', 'CONFIG'];

    function asyncMenuService($state, $stateParams, asyncLocalService, CONFIG) {

        var factory = {
            goHome: goHome,
            goToModule:goToModule,
        };

        function goHome() {
            $state.go("home");
        }

        function goToModule(module_name, params) {
            //retrieve current params and merge them
            $state.go(module_name, params);
        }

        return factory;
    }
})();