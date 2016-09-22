angular.module('starter').controller('HotCtrl', function ($scope, $http, $rootScope, $state, hotAlbums, songplayer, albumDetail) {
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

    $scope.likeSong = function (song) {
        if ($rootScope.user && $rootScope.user.id) {
            var promise = albumDetail.likeSong(song, $rootScope.user.id);
            promise.then(function (response) {
                console.log("response of markFavouirte.." + JSON.stringify(response));
                for (var i = 0; i < $scope.selectedAlbumVar.songs.length; i++) {
                    if ($scope.selectedAlbumVar.songs[i].id == song.id) {
                        $scope.selectedAlbumVar.songs[i].user_feedback = 'y';
                        $scope.selectedAlbumVar.songs[i].total_likes = $scope.selectedAlbumVar.songs[i].total_likes + 1;
                    }
                }
            })
        } else {
            alert("Please Login to like this song");
        }
    }

    $scope.unlikeSong = function (song) {
        if ($rootScope.user && $rootScope.user.id) {
            var promise = albumDetail.unlikeSong(song, $rootScope.user.id);
            promise.then(function (response) {
                console.log("response of unMarkFavouirte.." + JSON.stringify(response));
                for (var i = 0; i < $scope.selectedAlbumVar.songs.length; i++) {
                    if ($scope.selectedAlbumVar.songs[i].id == song.id) {
                        $scope.selectedAlbumVar.songs[i].user_feedback = 'n';
                        $scope.selectedAlbumVar.songs[i].total_likes = $scope.selectedAlbumVar.songs[i].total_likes - 1;
                    }
                }
            })
        } else {
            alert("Please Login to like this song");
        }
    }


});