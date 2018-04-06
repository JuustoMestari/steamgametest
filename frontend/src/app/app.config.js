var app = angular.module('boilerplateApp', [
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'boilerplateApp.homeServices',
        'boilerplateApp.factories',
        'boilerplateApp.directives',
        'boilerplateApp.filters',
        'boilerplateApp.commonServices',
        'boilerplateApp.localServices',
        'boilerplateApp.menuServices',
        'boilerplateApp.modalServices',
        'boilerplateApp.homeServices',
]);
    
app.constant('CONFIG',
{
    API : 'http://localhost:9988/api/v1.0/'
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])