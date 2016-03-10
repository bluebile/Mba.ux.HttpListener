/**
 * @class Sucupira.util.HttpListenerManagerDefault
 * @alternateClassName Mba.HttpEvents
 */
Ext.define('Mba.ux.HttpListener.Manager', {

    alternateClassName: 'Mba.HttpListener',

    requires: [
        'Mba.ux.HttpListener.rule.Resource',
        'Mba.ux.HttpListener.rule.Default'
    ],

    config: {
        /**
         * @cfg Mba.ux.HttpListener.rule.Resource
         */
        resource: undefined,

        /**
         * @cfg Mba.ux.HttpListener.rule.Default
         */
        global: undefined
    },

    applyResource: function(resource, currentResource)
    {
        return Ext.factory(resource, Mba.ux.HttpListener.rule.Resource, currentResource, 'proxy');
    },

    applyGlobal: function(global, currentGlobal)
    {
        return Ext.factory(global, Mba.ux.HttpListener.rule.Default, currentGlobal, 'proxy');
    },

    updateGlobal: function(global, currentGlobal)
    {
        if (!global.getListener()) {
            var listenerDefault = Ext.create('Mba.ux.HttpListener.rule.Default');
            global.setListener(listenerDefault);
        }
    },

    constructor: function()
    {
        this.listenersRequest();
    },

    listenersRequest: function()
    {
        var me = this,
            events = [ 'requestcomplete', 'requestexception' ];

        for (var i = 0, length = events.length; i < length; i++) {
            Ext.Ajax.on(events[i], function(scope, response) {
                me.parse(response);
            });
        }
    },

    parse: function(response)
    {
        var resource = this.getResource(),
            global;

        if (resource) {
            if (resource.fire(response.status, response)) {
                return;
            }
        }

        global = this.getGlobal();

        if (!global) {
            throw 'Listener global is required.';
        }

        global.fire(response.status, response);
    }
});
