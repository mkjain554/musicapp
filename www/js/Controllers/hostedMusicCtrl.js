angular.module('starter').controller('HostedMusicCtrl', function ($scope, $http, $rootScope, $state, hostedAlbums, songplayer) {

    $scope.pageNumber = 0;
    $scope.newAlbums = [];
    $rootScope.showTabs = true;
    $scope.androidPlatform = ionic.Platform.isAndroid();
    $scope.iosPlatform = ionic.Platform.isIOS();

    function populateAlbums(page, callback) {
        var promise = hostedAlbums.getHostedAlbums(page);
        promise.then(function (response) {
            if (response && response.data && response.data.data) {
                callback(response.data.data);
            } else {
                $scope.noMoreItemsAvailable = true;
            }
        })
    }
    $scope.loadMore = function () {
        $scope.pageNumber = $scope.pageNumber + 1;
        populateAlbums($scope.pageNumber, function (data) {
            $scope.newAlbums = $scope.newAlbums.concat(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.selectedAlbum = function (item) {
        $scope.selectedAlbumVar = item;
        $rootScope.selectedAlbumVar = item;
    }

    $scope.loadSong = function (song) {
        if (!song) {
            $rootScope.song = $rootScope.song || undefined;
            song = $rootScope.song;
            if (song) {
                $scope.togglebutton = true;
                songplayer.loadSong(song);
            }
        } else {
            $scope.togglebutton = true;
            $rootScope.song = song;
            songplayer.loadSong(song);
        }
    }

    $scope.play = function () {
        if ($rootScope.song) {
            $scope.togglebutton = true;
        }
        $scope.loadSong();
    }
    $scope.pause = function () {
        $scope.togglebutton = false;
        songplayer.pauseSong();
    }

});