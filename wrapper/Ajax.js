/**
 * @class Mba.ux.HttpListener.wrapper.Ajax
 * @extends Mba.ux.HttpListener.wrapper.WrapperAbstract
 */
Ext.define('Mba.ux.HttpListener.wrapper.Ajax', {

    extend: 'Mba.ux.HttpListener.wrapper.WrapperAbstract',

    /**
     * @inheritdoc #getStatus
     */
    getStatus: function() {
        return this.getResponse().status;
    },

    /**
     * @inheritdoc #getUrl
     */
    getUrl: function() {
        return this.getResponse().request.options.url;
    },

    /**
     * @inheritdoc #run
     */
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
