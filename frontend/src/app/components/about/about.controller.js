(function () {
    'use strict';

    angular.module('boilerplateApp').controller('aboutController', aboutController);

    aboutController.$inject = ['$scope','asyncMenuService','asyncLocalService','asyncModalService'];

    function aboutController($scope,asyncMenuService,asyncLocalService,asyncModalService) {


        var vm = this;

        vm.asyncModalService = asyncModalService;
        
        vm.title = "About";

        vm.openModal = function(){
            vm.asyncModalService.testModal('HEADER','BODY').then(function(){
                console.log("modal closed");
            });
        }

        return vm;
    }
})();