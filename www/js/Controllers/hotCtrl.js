angular.module('starter').controller('HotCtrl', function ($scope, $http, $rootScope, $state, hotAlbums, songplayer) {
    console.log("hotCtrl called");
    $scope.pageNumber = 0;
    $scope.hotAlbums = [];

    function populateAlbums(page, callback) {
        var userid = $rootScope.user && $rootScope.user.id ? $rootScope.user.id : '';
        var promise = hotAlbums.getHotAlbums(page, userid);
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
            $scope.hotAlbums = $scope.hotAlbums.concat(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.selectedAlbum = function (albumid) {
        for (var i = 0; i < $scope.hotAlbums.length; i++) {
            if ($scope.hotAlbums[i].id == albumid.id.toString()) {
                $rootScope.sAlbum = $scope.hotAlbums[i];
            }
        }
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