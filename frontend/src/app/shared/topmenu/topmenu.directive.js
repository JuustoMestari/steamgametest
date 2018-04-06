var tpl_topmenu     = require('./topmenu.html');
(function () {
    'use strict';

    angular.module('boilerplateApp.directives').directive('topMenu', topMenu);

    topMenu.$inject = ['$rootScope', '$state', 'asyncLocalService'];

    function topMenu($rootScope, $state, asyncLocalService) {

        var directive = {
            restrict: 'EA',
            replace: true,
            link: link,
            scope: {},
            templateUrl: tpl_topmenu
        }
        return directive;

        function link(scope, element, attrs) {
            scope.asyncLocalService = asyncLocalService;

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
               
            })

        }
    }
})();