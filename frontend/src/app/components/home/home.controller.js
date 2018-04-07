(function () {
    'use strict';

    angular.module('boilerplateApp').controller('homeController', homeController);

    homeController.$inject = ['$scope','$sce','asyncMenuService','asyncLocalService','asyncHomeService'];

    function homeController($scope,$sce,asyncMenuService,asyncLocalService,asyncHomeService) {

        var vm = this;
        vm.asyncHomeService = asyncHomeService;

        vm.title = "Steam games";
        vm.fullGameList = [];
        vm.randomGameList = [];
        vm.selectedGame = null;
        vm.gameQty=10;

        getGames();

        function getGames(){
            vm.asyncHomeService.getGames().then(function(results){
                var list = results.data;
                vm.fullGameList=[];
                //converts from a big object to an array
                for(var k in list){
                    if(list.hasOwnProperty(k)){
                        vm.fullGameList.push(list[k]);
                    }
                }
                getRandomGames(vm.gameQty);
            }).catch(function(error){
                //do something if error;
                //modal? toast?
            })
        }

        function getRandomGames(qty){
            if(vm.fullGameList.length>=qty){
                //order randomly
                vm.fullGameList.sort((a,b)=>(0.5-Math.random()));
                //take first xx
                vm.randomGameList = vm.fullGameList.slice(0,qty);
                //select first game by default
                vm.selectedGame = vm.randomGameList[0];
                vm.selectedGameChanged();
           }
        }

        function getGameInfo(appid){
            vm.asyncHomeService.getGameInfo(appid).then(function(result){
                //return first property of object
                var game = result.data[Object.keys(result.data)[0]];
                if(!game.success){
                    alert("Could not retrieve data for that game... sorry :(");
                }else{
                    vm.selectedGame = game.data;
                    vm.selectedGame.appid = appid;
                    if(!vm.selectedGame.short_description)
                        vm.selectedGame.short_description = vm.selectedGame.detailed_description;
                    vm.selectedGame.YTVideos=[];


                    vm.asyncHomeService.getTwitchStream(vm.selectedGame.name).then(function(results){
                        var streams = results.data.streams;
                        console.log(streams);
                        if(streams.length>0){
                            
                            vm.selectedGame.streamInfo={};
                            vm.selectedGame.streamInfo.viewers = streams[0].viewers;
                            vm.selectedGame.streamInfo.channel = streams[0].channel.name;
                        }
                    }).catch(function(error){
                    });

                    vm.asyncHomeService.getYTVideos(vm.selectedGame.name,3).then(function(results){
                        vm.selectedGame.YTVideos = results.data.items;
                        console.log("GAME : ",vm.selectedGame);
                    }).catch(function(error){
                    });
                    
                }
            }).catch(function(error){
            });
        }

        vm.selectedGameChanged = function(){
            getGameInfo(vm.selectedGame.appid);
        }

        vm.getRandomGames = function(){
            getRandomGames(vm.gameQty);
        }

        vm.getYTIframe=function(videoId){
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+videoId);
        }

        return vm;
    }
})();