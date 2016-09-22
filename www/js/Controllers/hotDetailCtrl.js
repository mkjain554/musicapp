angular.module('starter').controller('HotDetailCtrl', function ($scope, $state, $rootScope, albumDetail, $cordovaMedia, $ionicLoading, songplayer) {
    var albumid = $state.params.id;
    for (var i = 0; i < $rootScope.allAlbums.length; i++) {
        if ($rootScope.allAlbums[i].id == albumid) {
            $scope.selectedAlbumVar = $rootScope.allAlbums[i];
        }
    }


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
        $rootScope.songplayer = true;
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