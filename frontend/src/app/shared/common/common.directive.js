(function () {
    'use strict';

    angular.module('boilerplateApp.directives').directive('commonDirective', commonDirective);

    commonDirective.$inject = ['$rootScope', 'asyncLocalService', 'asyncCommonService'];

    function commonDirective($rootScope, asyncLocalService, asyncCommonService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            link: link,
            scope: {},
            template: '<b></b>'
        }

        $rootScope.$on('errorAPI', function(error){
            console.error("ERROR",error);
        });

        return directive;

        function link(scope, element, attrs) {
        }

        

    }
})();