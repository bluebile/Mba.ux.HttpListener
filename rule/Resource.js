/**
 * @class Mba.ux.HttpListener.rule.Resource
 */
Ext.define('Mba.ux.HttpListener.rule.Resource', {

    extend: 'Mba.ux.HttpListener.rule.Default',
    mapsCollection: [],

    config: {
        maps: null
    },

    updateMaps: function(maps, currentMap)
    {
        if (maps) {
            if (!Ext.isArray(maps)) {
                throw 'Maps not array.';
            }

            var i, length, map;
            for (i = 0, length = maps.length; i < length; i++) {
                map = maps[i];

                if (!map.resource || !map.listener) {
                    throw 'Property \'resource\' and \'listener\' is required.';
                }
                this.addMap(map.resource, map.listener);
            }
        }
    },

    /**
     * @param {String/RegExp} resource
     * @param {string} listenerClass
     */
    addMap: function(resource, listenerClass)
    {
        if (!Ext.isString(listenerClass)) {
            throw 'Assign className listener.';
        }

        if (!resource instanceof RegExp) {
            resource = new RegExp(recource, 'g');
        }

        var object = {
            rule: resource,
            listener: listenerClass
        };

        this.mapsCollection.push(object);
    },

    // @private
    filter: function(wrapper)
    {
        var map;
        for (var i = 0, length = this.mapsCollection.length; i < length; i++) {
            map = this.mapsCollection[i];
            if (map.rule.test(wrapper.getUrl())) {
                this.setListener(Ext.create(map.listener));
                return true;
            }
        }
        return false;
    }
});
