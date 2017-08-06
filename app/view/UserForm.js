Ext.define('suwe.view.UserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'userform',
    requires: [
        'suwe.view.CapturePicture',
        'Ext.field.Email'
    ],

    config: {
        cls: 'user-form',
        items: [{
            xtype: 'capturepicture'
        }, {
            xtype: 'button',
            action: 'save',
            text: 'Save',
            margin: '10 20'
        }]
    },

    reset: function() {
        this.callParent(arguments);
        this.down('capturepicture').reset();
    }
});