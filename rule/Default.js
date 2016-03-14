/**
 * @class Mba.ux.HttpListener.rule.Default
 */
Ext.define('Mba.ux.HttpListener.rule.Default', {

    statics: {
        EVENTS: {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            FOUND: 302,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            PRECONDITION_FAILED: 412,
            INTERNAL_ERROR: 500,
            METHOD_NOT_IMPLEMENTED: 501,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503
        }
    },

    config: {
        /**
         * @cfg {Mba.ux.HttpListener.ListenerAbstract} listener
         */
        listener: null
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    applyListener: function(listener) {
        if (Ext.isString(listener)) {
            return Ext.create(listener);
        }

        if (Ext.isObject(listener)) {
            if (!listener.xclass) {
                return listener;
            }

            var className = listener.xclass;
            delete listener.xclass;
            return Ext.create(className, listener);
        }

        return listener;
    },

    /**
     * Normaliza o nome coloca camelcase a separacao por underscore
     * @private
     *
     * @param name
     * @returns {string}
     */
    normalizeName: function(name) {
        var normalizeName = name.toLowerCase();

        if (normalizeName.indexOf('_') != -1) {
            var array = normalizeName.split('_');

            for (var i = 1, length = array.length; i < length; i++) {
                array[i] = array[i].charAt(0).toUpperCase() + array[i].substr(1);
            }

            normalizeName = array.join('');
        }

        return normalizeName;
    },

    /**
     * @method
     * Executa um método do listener atribuído {@link #listener} de acordo com status code HTTP retornado
     * @param {string|integer} event
     * @param {Mba.ux.HttpListener.WrapperAbstract} wrapper
     * @return {Boolean}
     */
    fire: function(event, wrapper) {
        if (!this.filter(wrapper)) {
            return false;
        }

        if (Ext.isNumber(event)) {
            event = Ext.Object.getKey(Mba.ux.HttpListener.rule.Default.EVENTS, event);
        }

        if (! (event in Mba.ux.HttpListener.rule.Default.EVENTS)) {
            console.log('Http code not implemented');
            return false;
        }

        var eventName = this.normalizeName(event);

        this.getListener()[eventName](wrapper.getResponse());

        return true;
    },

    /**
     * @method
     * Método para ser sobreescrito, para filtragem de acordo com a resposta na classe que herda
     * @param {Mba.ux.HttpListener.wrapper.WrapperAbstract} wrapper
     * @return {Boolean}
     */
    filter: function(wrapper) {
        return true;
    }
});
