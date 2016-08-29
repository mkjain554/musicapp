angular.module('starter').controller('SearchCtrl', function ($scope, $http, $rootScope, $state, searchService) {
    $scope.searchedItemArray = [];
    $scope.keypressevt = function () {
        var keypresskeycode = event.keyCode;
        if (keypresskeycode == 13) {
            if ($scope.searchText.length > 0) {
                var promise = searchService.searchSongs($scope.searchText, 1);
                promise.then(function (response) {
                    if (response && response.data && response.data.data) {
                        console.log(response.data.data);
                        $scope.searchedItemArray = response.data.data;
                    }
                })
            }
        }
    }
    $scope.selectedAlbum = function (item) {
        $scope.selectedAlbumVar = item;
        $rootScope.selectedAlbumVar = item;
    }
});