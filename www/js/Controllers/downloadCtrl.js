angular.module('starter').controller('DownloadCtrl', function ($scope, $state, $rootScope, $cordovaMedia, $ionicLoading) {


    var mediaStatusCallback = function (status) {
        if (status == 1) {
            $ionicLoading.show({
                template: 'Loading...'
            });
        } else {
            $ionicLoading.hide();
        }
    }
    $scope.pauseSong = function () {
        $rootScope.currentPosition = $rootScope.media.getCurrentPosition();
        $scope.togglePlayPause = !$scope.togglePlayPause;
        $rootScope.media.pause();
    }
    $scope.playSelectedSong = function (song, index) {
        $scope.selectedSong = song;
        $scope.playSong(song.song_url, index);
    }
    $scope.playSong = function (src, index) {
        $scope.selectedSrc = src;
        $scope.songPlaying = src.substring(src.lastIndexOf("/") + 1);
        if ($rootScope && $rootScope.media) {
            $rootScope.media.stop();
            delete $rootScope.media;
            delete $rootScope.currentPosition;
        }
        $scope.togglePlayPause = !$scope.togglePlayPause;
        if (src) {
            var media = new Media(src, null, null, mediaStatusCallback);
            $rootScope.media = media;
            media.play();
        } else {
            var media = new Media($scope.selectedSong.song_url, null, null, mediaStatusCallback);
            $rootScope.media = media;
            if ($rootScope.currentPosition) {
                $rootScope.media.seekTo($rootScope.currentPosition);
            }
            media.play();
        }
    }




    $scope.loadSong = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                fs.root.getDirectory(
                    "EP", {
                        create: true
                    },
                    function (dirEntry) {
                        var dirReader = dirEntry.createReader();
                        dirReader.readEntries(
                            function (entries) {
                                $scope.downloadedFiles = [];
                                for (var i = 0; i < entries.length; i++) {
                                    var song_url = entries[i].toURL();
                                    $scope.downloadedFiles.push({
                                        name: song_url.substring(song_url.lastIndexOf("/") + 1),
                                        path: song_url
                                    });
                                }
                                $ionicLoading.hide();
                            },
                            function (error) {
                                $ionicLoading.hide();
                                console.log("readEntries error: " + error.code);
                            }
                        );
                    }
                );
            },
            function () {
                $ionicLoading.hide();
                console.log("Error requesting filesystem");
            });
    }

    $scope.loadSong();
});