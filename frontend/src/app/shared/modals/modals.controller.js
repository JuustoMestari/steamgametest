var tpl_errorAPI = require('./templates/modalError.html');

(function () {
    'use strict';

    angular.module('boilerplateApp').factory('modalService', ['$uibModal', modalService]);

    function modalService($modal) {

        var defmodalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: '',
            bodyText: '',
            error: {},
            headerClass: 'modal-default'
        };

        this.showModal = function (modalType, modalOptions) {
         
            switch (modalType) {
                case "errorAPI":
                    modalOptions.templateUrl = tpl_errorAPI;
                    break;
                default:
                    break;
            }

            if (!modalOptions.controller) {
                modalOptions.controller = function ($scope, $uibModalInstance) {
                    $scope.modalOptions = modalOptions;
                    $scope.modalOptions.isClear = false;
                    $scope.modalOptions.ok = function (result) {
                        $uibModalInstance.close($scope);
                    };
                    $scope.modalOptions.close = function (result) {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            }
            return $modal.open(modalOptions).result;

        };


        var services = {
            showModal: this.showModal,
        }
        return services;

    };
})();