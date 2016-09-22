(function () {
    "use strict";
    angular.module('starter').factory('allAlbums', allAlbums);
    allAlbums.$inject = ['$http'];

    function allAlbums($http) {
        return {
            getAllAlbums: getAllAlbums
        };

        function getAllAlbums(page, type) {

            return $http.get("http://mixtapeupload.net/webservices/get_albums.php?page=" + page)
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('youtubeVideos', youtubeVideos);
    youtubeVideos.$inject = ['$http'];

    function youtubeVideos($http) {
        return {
            getVideos: getVideos
        };

        function getVideos(page) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_videos.php?page=" + page
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('searchService', searchService);
    searchService.$inject = ['$http'];

    function searchService($http) {
        return {
            searchSongs: searchSongs
        };

        function searchSongs(key, page) {

            return $http.get("http://www.mixtapeupload.net/webservices/search.php?page=" + page + "&key=" + key)
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('albumDetail', albumDetail);
    albumDetail.$inject = ['$http'];

    function albumDetail($http) {
        return {
            getAlbumDetail: getAlbumDetail,
            likeSong: likeSong,
            unlikeSong: unlikeSong
        };


        function getAlbumDetail(page, songid, userid) {

            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_songs.php?page=" + page + "&al_id=" + songid + "&user_id=" + userid
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }

        function likeSong(song, user_id) {
            console.log("like song called in albumdetail service >>>>>>>>>>>>>>>>>");
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/add_song_feedback.php?song_id=" + song.id + "&user_id=" + user_id + "&is_like=1"
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }



        function unlikeSong(song, user_id) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/add_song_feedback.php?song_id=" + song.id + "&user_id=" + user_id + "&is_like=0"
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('loginService', login);
    login.$inject = ['$http'];

    function login($http) {
        return {
            login: login
        };
        var deviceToken = localStorage.getItem("device_id");
        var deviceGCM = localStorage.getItem("gcm_id");

        function login(email, password) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/signin.php?email=" + email + "&password=" + password + "&device_type=0&device_token=" + deviceToken + "&device_gcm=" + deviceGCM
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('favSongs', favSongs);
    favSongs.$inject = ['$http'];

    function favSongs($http) {
        return {
            getFavSongs: getFavSongs
        };

        function getFavSongs(user_id) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_favorite_list.php?user_id=" + user_id
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('registerService', register);
    register.$inject = ['$http'];

    function register($http) {
        return {
            register: register
        };
        var deviceToken = localStorage.getItem("device_id");
        var deviceGCM = localStorage.getItem("gcm_id");

        function register(email, password, cpassword) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/register.php?email=" + email + "&password=" + password + "&rpassword=" + cpassword + "&device_type=0&device_token=" + deviceToken + "&device_gcm=" + deviceGCM
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('hotAlbums', hotAlbums);
    hotAlbums.$inject = ['$http'];

    function hotAlbums($http) {
        return {
            getHotAlbums: getHotAlbums
        };

        function getHotAlbums(page, userid) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_hot_songs.php?page=" + page + "&user_id=" + userid
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('newAlbums', newAlbums);
    newAlbums.$inject = ['$http'];

    function newAlbums($http) {
        return {
            getNewAlbums: getNewAlbums
        };

        function getNewAlbums(page, type) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_new_albums_list.php?page=" + page
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('hostedAlbums', hostedAlbums);
    hostedAlbums.$inject = ['$http'];

    function hostedAlbums($http) {
        return {
            getHostedAlbums: getHostedAlbums
        };

        function getHostedAlbums(page, type) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_hosted_albums.php?page=" + page
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('comingSoonSongs', comingSoonSongs);
    comingSoonSongs.$inject = ['$http'];

    function comingSoonSongs($http) {
        return {
            getSongs: getSongs
        };

        function getSongs(page) {
            return $http({
                    method: "GET",
                    url: "http://mixtapeupload.net/webservices/get_coming_soon.php?page=" + page
                })
                .success(function (res, status, headers, config) {
                    return res.data;
                })
                .error(function (res, status, headers, config) {
                    return res;
                });
        }
    }
})();
(function () {
    "use strict";
    angular.module('starter').factory('songplayer', ['albumDetail', '$rootScope', '$ionicLoading', '$cordovaMedia', function (albumDetail, $rootScope, $ionicLoading, $cordovaMedia) {

        var mediaStatusCallback = function (status) {
            console.log("mediaStatusCallback Called with status>>>>>" + status);
            $rootScope.mediaStatus = status;
            if (status == 1) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
            } else {
                $ionicLoading.hide();
            }
        }
        var playSong = function (src) {
            if ($rootScope && $rootScope.media) {
                $rootScope.media.stop();
                delete $rootScope.media;
                delete $rootScope.currentPosition;
            }
            if (src) {
                var media = new Media(src, null, null, mediaStatusCallback);

                media.play();
                $rootScope.media = media;
            } else {
                var media = new Media($scope.selected_song_url, null, null, mediaStatusCallback);
                $rootScope.media = media;
                if ($rootScope.currentPosition) {
                    $rootScope.media.seekTo($rootScope.currentPosition);
                }
                media.play();
            }
        }

        return {
            pauseSong: function () {
                $rootScope.media.getCurrentPosition(function (res) {
                    $rootScope.currentPosition = res;
                }, function (e) {
                    console.log("errro in getting current position>>>>." + e)
                });
                $rootScope.media.pause();
            },
            loadSong: function (song) {

                var song_url = song.song_url;
                var songName = song_url.substring(song_url.lastIndexOf("/") + 1);
                $rootScope.songName = songName.substring(0, 12) + ".....";

                console.log("song_url..." + song_url);
                console.log("songName..." + songName);
                try {
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                            fs.root.getDirectory(
                                "EP", {
                                    create: true
                                },
                                function (dirEntry) {
                                    dirEntry.getFile(
                                        songName, {
                                            create: false,
                                            exclusive: false
                                        },
                                        function gotFileEntry(fe) {
                                            //$ionicLoading.hide();
                                            playSong(fe.toURL());
                                            //$scope.imgFile = fe.toURL();
                                        },
                                        function (error) {
                                            //$ionicLoading.hide();
                                            console.log("Error getting file from downloads>>>>>> trying to play online");
                                            playSong(song_url);
                                        }
                                    );
                                }
                            );
                        },
                        function () {
                            //$ionicLoading.hide();
                            console.log("Error requesting filesystem");
                            playSong();
                        });
                } catch (err) {
                    console.log("error in playing song...." + err);
                }
            }
        };
    }]);


})();
angular.module('starter.services', [])
    .service('UserService', function () {
        // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
        var setUser = function (user_data) {
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        };

        var getUser = function () {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

        return {
            getUser: getUser,
            setUser: setUser
        };
    });