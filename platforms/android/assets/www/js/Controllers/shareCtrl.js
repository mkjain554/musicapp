angular.module('starter').controller('ShareCtrl', function ($scope, $cordovaSocialSharing) {
    $scope.shareAnywhere = function () {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
    }



    $scope.shareViaWhatsApp = function (message, image, link) {
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function (result) {
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        }, function (error) {
            alert("Cannot share on Whatsapp");
        });
    }

    $scope.shareViaFacebook = function (message, image, link) {
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function (result) {
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        }, function (error) {
            alert("Cannot share on facebook");
        });
    }
    $scope.shareViaEmail = function (message, image, link) {
        $cordovaSocialSharing.canShareVia("email", message, image, link).then(function (result) {
            $cordovaSocialSharing.canShareViaEmail(message, image, link);
        }, function (error) {
            alert("Cannot share on email" + error);
        });
    }


});