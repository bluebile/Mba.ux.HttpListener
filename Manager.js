/**
 * @class Mba.ux.HttpListener.Manager
 * @alternateClassName Mba.HttpListener
 */
Ext.define('Mba.ux.HttpListener.Manager', {

    alternateClassName: 'Mba.HttpListener',

    requires: [
        'Mba.ux.HttpListener.rule.Resource',
        'Mba.ux.HttpListener.rule.Default'
    ],

    wrappersClass: {
        ajax: 'Mba.ux.HttpListener.wrapper.Ajax'
    },

    wrappersInstances: {},

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

    applyResource: function(resource, currentResource) {
        return Ext.factory(resource, Mba.ux.HttpListener.rule.Resource, currentResource, 'proxy');
    },

    applyGlobal: function(global, currentGlobal) {
        return Ext.factory(global, Mba.ux.HttpListener.rule.Default, currentGlobal, 'proxy');
    },

    updateGlobal: function(global, currentGlobal) {
        if (!global.getListener()) {
            var listenerDefault = Ext.create('Mba.ux.HttpListener.Default');
            global.setListener(listenerDefault);
        }
    },

    addWrapper: function(type) {
        var className = type, instance;

        if (type in this.wrappersClass) {
            className = this.wrappersClass[type];
        }

        if (className in this.wrappersInstances) {
            return this.wrappersInstances[className];
        }

        instance = Ext.create(className);
        this.wrappersInstances[instance.$className] = instance;

        return instance;
    },

    run: function() {
        var instance;
        for (var wrapper in this.wrappersInstances) {
            instance = this.wrappersInstances[wrapper];
            instance.on('run', 'parse');
        }
    },

    parse: function(wrapper) {
        var resource = this.getResource(),
            global;

        if (resource) {
            if (resource.fire(wrapper.getStatus(), wrapper)) {
                return;
            }
        }

        global = this.getGlobal();

        if (!global) {
            this.setGlobal(Ext.create('Mba.ux.HttpListener.rule.Default'));
            global = this.getGlobal();
        }

        global.fire(wrapper.getStatus(), wrapper);
    }
});
