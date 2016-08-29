angular.module('starter').controller('HostedMusicCtrl', function ($scope, $http, $rootScope, $state, hostedAlbums) {

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

});
