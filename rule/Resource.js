/**
 * @class Mba.ux.HttpListener.rule.Resource
 */
Ext.define('Mba.ux.HttpListener.rule.Resource', {

    extend: 'Mba.ux.HttpListener.rule.Default',
    maps: [],

    /**
     * @param {String/RegExp} resource
     * @param {Mba.ux.HttpListener.ListenerAbstract} listener
     */
    addMap: function(resource, listener)
    {

        if (!Ext.isObject(listener)) {
            throw 'Listener not object.';
        }

        if (!(listener instanceof Mba.ux.HttpListener.ListenerAbstract)) {
            throw 'Not object.';
        }

        if (!resource instanceof RegExp) {
            resource = new RegExp(recource, 'g');
        }

        var object = {
            rule: resource,
            listener: listener
        };

        this.maps.push(object);
    },

    // @private
    filter: function(response)
    {
        var map;
        for (var i = 0, length = this.maps.length; i < length; i++) {
            map = this.maps[i];
            if (map.rule.test(response.request.options.url)) {
                this.setListener(map.listener);
                return true;
            }
        }
        return false;
    }
});
