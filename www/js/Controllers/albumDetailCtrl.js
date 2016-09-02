angular.module('starter').controller('AlbumDetailCtrl', function ($scope, $state, $rootScope, albumDetail, $cordovaMedia, $ionicLoading, songplayer) {
    var albumid = $state.params.id;
    var userid = $rootScope.user && $rootScope.user.id ? $rootScope.user.id : '';
    var promise = albumDetail.getAlbumDetail(1, albumid, userid);

    promise.then(function (response) {
        if (response && response.data && response.data.data) {
            $scope.selectedAlbumVar.songs = response.data.data;
            for (var i = 0; i < $scope.selectedAlbumVar.songs.length; i++) {
                $scope.selectedAlbumVar.songs[i].rating = 1;
            }
        }
    });

    $rootScope.songName = $rootScope.songName || '';

    $scope.download = function (song) {
        var song_url = song.song_url;
        var songName = song_url.substring(song_url.lastIndexOf("/") + 1);
        $ionicLoading.show({
            template: 'Loading...'
        });
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                fs.root.getDirectory(
                    "EP", {
                        create: true
                    },
                    function (dirEntry) {
                        dirEntry.getFile(
                            songName, {
                                create: true,
                                exclusive: false
                            },
                            function gotFileEntry(fe) {
                                var p = fe.toURL();
                                fe.remove();
                                ft = new FileTransfer();
                                ft.download(
                                    encodeURI(song_url),
                                    p,
                                    function (entry) {
                                        $ionicLoading.hide();
                                        console.log(entry.toURL());
                                        //$scope.imgFile = entry.toURL();
                                    },
                                    function (error) {
                                        alert(error);
                                        $ionicLoading.hide();
                                        alert("Download Error Source -> " + error.source);
                                    },
                                    false,
                                    null
                                );
                            },
                            function () {
                                $ionicLoading.hide();
                                console.log("Get file failed");
                            }
                        );
                    }
                );
            },
            function () {
                $ionicLoading.hide();
                console.log("Request for filesystem failed");
            });
    }
    $scope.loadSong = function (song) {
        if (!song) {
            $rootScope.song = $rootScope.song || undefined;
            song = $rootScope.song;
            if (song) {
                $scope.togglebutton = true;
                $scope.togglebutton = !$scope.togglebutton
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
            $scope.togglebutton = false;
        }
        $scope.loadSong();
    }
    $scope.pause = function () {
        $scope.togglebutton = true;
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