(function () {
    'use strict';

    angular.module('boilerplateApp.homeServices', []).service('asyncHomeService', asyncHomeService);

    asyncHomeService.$inject = ['$http', '$q','CONFIG'];

    function asyncHomeService($http, $q,CONFIG) {

        var factory = {
            getGames:getGames,
            getGameInfo:getGameInfo,
            getYTVideos:getYTVideos,
            getTwitchStream:getTwitchStream
        };

        function getGames(){
            var games = $http({
                method: 'GET',
                url: CONFIG.API+'steam/bestgames',
            });
            return $q.when(games);
        }

        function getGameInfo(appid){
            var info = $http({
                method: 'GET',
                url: CONFIG.API+'steam/game/'+appid
            });
            return $q.when(info);
        }

        function getYTVideos(q,maxResults){
            var videoList = $http({
                method: 'POST',
                url: CONFIG.API+'youtube/search',
                data:{
                    q : q+' video game',
                    maxResults:maxResults
                }
            });
            return $q.when(videoList);
        }

        function getTwitchStream(game){
            var stream = $http({
                method: 'GET',
                url: CONFIG.API+'twitch/stream/'+game
            });
            return $q.when(stream);
        }

        return factory;
    }
})();