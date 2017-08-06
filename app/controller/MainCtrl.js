Ext.define('suwe.controller.MainCtrl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main'
        },
        control: {
            'main userform button[action=save]': {
                tap: 'saveUser'
            }
        }
    },

    saveUser: function() {
        var form = this.getMain().down('userform'),
            capture = form.down('capturepicture');

        var tot = capture.getImageDataUrl();

        console.log(tot);

    }
});