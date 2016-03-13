/**
 * Classe responsável por mapear listener de acordo com recurso(url)
 *
 * @class Mba.ux.HttpListener.rule.Resource
 * @extends Mba.ux.HttpListener.rule.Default
 */
Ext.define('Mba.ux.HttpListener.rule.Resource', {

    extend: 'Mba.ux.HttpListener.rule.Default',

    /**
     * @property {Array} mapsCollection
     * Coleção de 'urls' e 'listeners'
     */
    mapsCollection: [],

    config: {
        /**
         * @cfg {Array} maps
         */
        maps: null
    },

    updateMaps: function(maps)
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
     * @method
     * Adiciona mapeamento entre uma 'url' e uma classe 'listener'
     * @param {String/RegExp} resource
     * @param {string} listenerClass
     */
    addMap: function(resource, listenerClass)
    {
        if (!Ext.isString(listenerClass)) {
            throw 'Assign className listener.';
        }

        if (!(resource instanceof RegExp)) {
            resource = new RegExp(resource, 'g');
        }

        var object = {
            rule: resource,
            listener: listenerClass
        };

        this.mapsCollection.push(object);
    },

    /**
     * @method
     * Filtragem de acordo com recurso(url)
     * @inheritdoc #filter
     */
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
