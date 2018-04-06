(function () {
    'use strict';

    angular.module('boilerplateApp.localServices', []).service('asyncLocalService', asyncLocalService);

    asyncLocalService.$inject = ['$q','$rootScope', '$cookies', '$timeout', 'CONFIG'];

    function asyncLocalService($q,$rootScope, $cookies,$timeout, CONFIG, ) {


        var factory = {
            
            $timeout: $timeout,
           
            roundFloat:roundFloat,
            roundFloatForInput: roundFloatForInput,
            stripHTML,stripHTML,
           
        };
        
        /*TOOLS*/
        function roundFloat(number, precision) {
            var factor = Math.pow(10, precision);
            var tempNumber = number * factor;
            var roundedTempNumber = Math.round(tempNumber);
            return roundedTempNumber / factor;
        }

        //This function converts html5 steps (1,0.1,0.01,..)
        //to decimal precision(0,1,2),...
        function roundFloatForInput(value, step) {
            //var roundedvalue = 0;
            var precision = 0;
            //step is html5 format : 1, 0.1, 0.01,...
            //find out precision
            precision = Math.round(Math.log10(1 / step));
            return roundFloat(value,precision);
        }

        function stripHTML(inputString){
            return inputString.replace(/<(?:.|\n)*?>/gi,'');
        }

        return factory;
    }
})();