(function () {
    'use strict';

    angular.module('boilerplateApp.modalServices', []).service('asyncModalService', asyncModalService);

    asyncModalService.$inject = ['modalService'];

    function asyncModalService(modalService) {
        
        var factory = {
            testModal:testModal
        };

        function testModal(headerText, mainText) {

            return modalService.showModal("errorAPI",
                {
                    headerText: headerText,
                    mainText: mainText
                });
        }

        return factory;
    }
})();