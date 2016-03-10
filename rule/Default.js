/**
 * @class Mba.ux.HttpListener.rule.Default
 */
Ext.define('Mba.ux.HttpListener.rule.Default', {

    statics: {
        EVENTS: {
            OK: 200,
            NOT_FOUND: 404,
            RUNTIME: 500
        }
    },

    config: {
        listener: null
    },

    /**
     * Normaliza o nome coloca camelcase a separacao por underscore
     * @private
     *
     * @param name
     * @returns {string}
     */
    normalizeName: function(name)
    {
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
     *
     * @param {string|integer} event
     * @param {object} response
     */
    fire: function(event, response)
    {
        if (!this.filter(response)) {
            return false;
        }

        if (Ext.isNumber(event)) {
            event = Ext.Object.getKey(Sucupira.util.HttpListenerRuleDefault.EVENTS, event);
        }

        if (! (event in Sucupira.util.HttpListenerRuleDefault.EVENTS)) {
            console.log('Http code not implemented');
            return false;
        }

        var eventName = this.normalizeName(event);

        this.getListener()[eventName](response);

        return true;
    },

    // @private
    filter: function(response)
    {
        return true;
    }
});
