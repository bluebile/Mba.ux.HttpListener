/**
 * Classe responsável por gerenciar as regras 'geral' {@link Mba.ux.HttpListener.rule.Default}
 * de listener com Http Status Code e de acordo com o recurso(url) {@link Mba.ux.HttpListener.rule.Resource}
 *
 * @class Mba.ux.HttpListener.Manager
 * @alternateClassName Mba.HttpListener
 * @extends Ext.Evented
 */
Ext.define('Mba.ux.HttpListener.Manager', {

    extend: 'Ext.Evented',

    alternateClassName: 'Mba.HttpListener',

    requires: [
        'Mba.ux.HttpListener.rule.Resource',
        'Mba.ux.HttpListener.rule.Default'
    ],

    /**
     * @property {Object} wrappersClass
     * Mapeamento entre um alias e nome classe Wrappers disponíveis em Mba.ux.wrapper.*
     */
    wrappersClass: {
        ajax: 'Mba.ux.HttpListener.wrapper.Ajax'
    },

    /**
     * @property {Object} wrappersInstances
     */
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
        return Ext.factory(resource, Mba.ux.HttpListener.rule.Resource, currentResource, 'resouce');
    },

    applyGlobal: function(global, currentGlobal) {
        return Ext.factory(global, Mba.ux.HttpListener.rule.Default, currentGlobal, 'global');
    },

    updateGlobal: function(global, currentGlobal) {
        if (!global.getListener()) {
            var listenerDefault = Ext.create('Mba.ux.HttpListener.Default');
            global.setListener(listenerDefault);
        }
    },

    /**
     * Adiciona uma instância de um wrapper {@link #wrappersInstances}
     * Este permite criar um objeto de acordo com o alias {@link #wrappersClass}, também cria
     *
     * @param {String/Mba.ux.HttpListener.wrapper.WrapperAbstract} type
     * @return {Mba.ux.HttpListener.wrapper.WrapperAbstract}
     */
    addWrapper: function(type) {
        var className = type, instance;

        if (type in this.wrappersClass) {
            className = this.wrappersClass[type];
        }

        instance = this.createWrapperInstance(className);
        return this.wrappersInstances[instance.$className] = instance;
    },

    /**
     * @private
     * @method
     * Cria o objeto wrapper ou retorna um já criado
     * @param {String} className
     * @return {Mba.ux.HttpListener.wrapper.WrapperAbstract}
     */
    createWrapperInstance: function(className) {
        var instance;

        if (className in this.wrappersInstances) {
            return this.wrappersInstances[className];
        }

        instance = className;
        if (!Ext.isObject(className)) {
            instance = Ext.create(className);
        }

        return instance;
    },

    run: function() {
        var instance;
        for (var wrapper in this.wrappersInstances) {
            instance = this.wrappersInstances[wrapper];
            instance.run();
            instance.on('run', this.parse, this);
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
