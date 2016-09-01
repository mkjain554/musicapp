var uniqueDeviceID = undefined;
var GCMDeviceToken = undefined;
var iosDeviceToken = undefined;
var deviceToken = undefined;

document.addEventListener('deviceready', function () {
    resiterForPushNotification();
    //getDeviceuuid();
    deviceToken = device.uuid;
    //alert("Device token -->"+deviceToken1);
});

/*
function getDeviceuuid(){
	window.plugins.uniqueDeviceID.get(success, fail);
}
function success(uuid)
{
	uniqueDeviceID = uuid;
	//alert("Device uuid--->"+uniqueDeviceID)
};*/



/* ################## CODE FOR PUSH NOTIFICATION STARTS HERE #############################*/

function tokenHandler(result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    //alert('device token = ' + result);
    iosDeviceToken = result;
    sendDataToServerFromIOS(result);
    //GCMDeviceToken = result;
}



// Android and Amazon Fire OS


function resiterForPushNotification() {

    try {
        pushNotification = window.plugins.pushNotification;
        // $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
        if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
            pushNotification.register(successHandler, errorHandler, {
                "senderID": "231419162889",
                "ecb": "onNotification"
            }); // required!

        } else {
            //GCMDeviceToken="uniquestring";
            pushNotification.register(tokenHandler, errorHandler, {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            }); // required!
        }
    } catch (err) {
        txt = "There was an error on this page.\n\n";
        txt += "Error description: " + err.message + "\n\n";
        alert(txt);
    }

}


function successHandler(result) {

}

function errorHandler(error) {
    $("#app-status-ul").append('<li>error:' + error + '</li>');
}






function onNotification(e) {

    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch (e.event) {
    case 'registered':
        if (e.regid.length > 0) {
            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
            GCMDeviceToken = e.regid;
            sendDataToServerFromAndroid(GCMDeviceToken);
            //alert("regID = " + e.regid);
            //alert("GCMDeviceToken = " + GCMDeviceToken);
            /* document.getElementById("appendDeviceToken").innerHTML = e.regid;*/

        }
        break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.

        if (e.foreground) {


            $.jAlert({
                'title': 'New Event',
                'content': '' + e.payload.message + '',
                'closeOnEsc': false,
                'closeOnClick': false
            });


        } else { // otherwise we were launched because the user touched a notification in the notification tray.
            if (e.coldstart) {
                //eventsList();
                /*$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');*/
                /* alert(e.payload.message);
                  alert(e.payload.message.message);
                alert(JSON.stringify(e.payload.message));
                alert(JSON.stringify(e.payload.message.message));*/

            } else {
                //eventsList();
                /*alert(e.payload.message);
                alert(e.payload.message.message);
                alert(JSON.stringify(e.payload.message));
                alert(JSON.stringify(e.payload.message.message));*/

                /*$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');*/
            }
        }




        break;

    case 'error':
        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
        break;

    default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        break;
    }
}




// iOS

function onNotificationAPN(e) {

    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
    if (e.foreground == 0 || e.foreground == "0") {

        if (e.alert) {
            //  $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
            // showing an alert also requires the org.apache.cordova.dialogs plugin
            // navigator.notification.alert(e.alert,null,"NOTIFICATION");
            //$.jAlert({'title': 'New Event','content': ''+e.payload.message+'','closeOnEsc': false,'closeOnClick': false}); 
            //navigator.notification.alert(e.payload.message,null,"NOTIFICATION");
        }

    }
    if (e.foreground == 1 || e.foreground == "1") {
        //$.jAlert({'title': 'New Event','content': ''+e.payload.message+'','closeOnEsc': false,'closeOnClick': false}); 
        //navigator.notification.vibrate(2000);
        //alert(e.alert);
        //navigator.notification.alert(e.alert,null,"NOTIFICATION");
        // alert(JSON.stringify(e.payload.message.message));

    }
}



/* ################## CODE FOR PUSH NOTIFICATION ENDS HERE #############################*/



function sendDataToServerFromAndroid(GCMDeviceToken) {
    var gcm_id = GCMDeviceToken;
    //alert("gcm_id>>>>>>>>>" + gcm_id);
    localStorage.setItem("gcm_id", gcm_id);
    localStorage.setItem("device_id", deviceToken)
        //var GCMandDeviceToken_URL = "http://209.160.65.49:1091/webservice/add_token.php";
        //var  formData = "device_token="+deviceToken+"&gcm_id="+gcm_id+"&device_type=android";

    /*//alert(GCMandDeviceToken_URL)
	$.ajax({
    url : GCMandDeviceToken_URL,
    type: "POST",
    data : formData,
    success: function(data)
    {
        //alert(JSON.stringify(data))
    },
    error: function (data)
    {
 		//alert(JSON.stringify(data))
    }
});*/
}

function sendDataToServerFromIOS(deviceToken) {
    var deviceToken = deviceToken;
    var GCMandDeviceToken_URL = "http://209.160.65.49:1091/webservice/add_token.php";
    var formData = "device_token=" + deviceToken + "&gcm_id=null&device_type=iphone";

    //alert(GCMandDeviceToken_URL)
    $.ajax({
        url: GCMandDeviceToken_URL,
        type: "POST",
        data: formData,
        success: function (data) {
            //alert(JSON.stringify(data))
        },
        error: function (data) {
            //alert(JSON.stringify(data))
        }
    });
}