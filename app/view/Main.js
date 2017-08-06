Ext.define('suwe.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.Button',
        'Ext.Img'
    ],
    config: {
        layout: {
            type:"vbox",
            pack:"center",
            align:"center"
        },
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Native API Examples'
        }, {
            xtype: "image",
            src: "http://placehold.it/200x200",
            width: '100%',
            height: '100%'
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: "button",
                text: "Photo Library",
                handler: function(btn) {
                    var panel = btn.up('panel');

                    panel.getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
                }
            }, {
                xtype: "button",
                text: "Take Photo",
                handler: function(btn) {
                    var panel = btn.up('panel');

                    panel.getPhoto(navigator.camera.PictureSourceType.CAMERA);
                }
            }]
        }]
    },

    getPhoto: function(source) {
        var me = this;

        navigator.camera.getPicture(me.success, me.failure, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: source 
        });


    },

    success: function(imageUri) {
        var img = Ext.ComponentQuery.query("image")[0];
        img.setSrc(imageUri);

        document.addEventListener("deviceready", function(imageUri) {
                    Ext.Msg.confirm('Title', imageUri, Ext.emptyFn);
            var servPath = '192.168.1.100';
            window.cordova.plugin.ftp.connect(servPath, 'jumawax', 'jkluio789', function(ok) {
                window.cordova.plugin.ftp.upload('SD Card/DSC_0001.JPG', '/remoteFile.jpg', function(percent) {
                if (percent == 1) {
                    console.info("ftp: upload finish");
                } else {
                    console.debug("ftp: upload percent=" + percent * 100 + "%");
                }
            }, function(error) {
                console.error("ftp: upload error=" + error);
            });
            }, function(error) {
                // console.error("ftp: connect error=" + error);
            });
        }, false);
 

















        var options = new FileUploadOptions();
        options.fileKey="";
        options.fileName=imageUri.substr(imageUri.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = {};
        params.value1="test";
        params.value2="param";

        option.params= params;

        var ft = new FileTransfer();
        var url = encodeURI("");
        ft.upload(imageUri, url, win, fail, options);
    },

    onDeviceReady: function(imageUri) {
        window.alert("sometext");
        // First of all, connect to ftp server address without protocol prefix. e.g. "192.168.1.1", "ftp.xfally.github.io". 
        var servPath = '192.168.1.100';
        
        window.cordova.plugin.ftp.connect(servPath, 'jumawax', 'jkluio789', function(ok) {
            console.info("ftp: connect ok=" + ok);
     
            // You can do any ftp actions from now on... 
            // window.cordova.plugin.ftp.upload(imageUri, '/remotePath/remoteFile', function(percent) {
            //     if (percent == 1) {
            //         console.info("ftp: upload finish");
            //     } else {
            //         console.debug("ftp: upload percent=" + percent * 100 + "%");
            //     }
            // }, function(error) {
            //     console.error("ftp: upload error=" + error);
            // });
     
        }, function(error) {
            console.error("ftp: connect error=" + error);
        });
    },

    failure: function(message) {
        alert("Failed" + message);
    },

    win: function(r){
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    },

    fail: function(error){
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
});