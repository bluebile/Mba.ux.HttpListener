/**
 * @class Mba.ux.HttpListener.WrapperAbstract
 * @abstract
 */
Ext.define('Mba.ux.HttpListener.wrapper.Ajax', {

    extend: 'Mba.ux.HttpListener.wrapper.WrapperAbstract',

    getStatus: function() {
        return this.getResponse().status;
    },

    getUrl: function() {
        return this.getResponse().request.options.url;
    },

    run: function() {
        var me = this,
            events = [ 'requestcomplete', 'requestexception' ];

        for (var i = 0, length = events.length; i < length; i++) {
            Ext.Ajax.on(events[i], function(scope, response) {
                me.setResponse(response);
                me.fireEvent('run', me);
            });
        }
    }
});
