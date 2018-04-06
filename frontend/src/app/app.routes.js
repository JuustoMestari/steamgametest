var tpl_404                     = require('./shared/404.html');
var tpl_home                    = require('./components/home/home.view.html');
var tpl_about                    = require('./components/about/about.view.html');

angular.module('boilerplateApp')
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','$locationProvider',
     function ($stateProvider, $urlRouterProvider, $httpProvider,$locationProvider) {

        $httpProvider.interceptors.push('httpIntercept');
        //remove hashbang from URL
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        // no route goes to index
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '/home');
        // any unknown URLS go to 404
        $urlRouterProvider.otherwise('/404');

        // use a state provider for routing
         $stateProvider
            .state('home', {
                 url: '/home',
                 templateUrl: tpl_home,
                 controller: "homeController",
                 controllerAs: 'vm',
                 params: {
                 }
             })
            .state('about', {
                url: '/about',
                templateUrl: tpl_about,
                controller: "aboutController",
                controllerAs: 'vm',
                params: {
                }
            })
            .state('404', {
                url: '/404',
                templateUrl: tpl_404
             })
    }]);