/**
 * @class Mba.ux.HttpListener.WrapperAbstract
 * @abstract
 */
Ext.define('Mba.ux.HttpListener.wrapper.WrapperAbstract', {

    extend: 'Ext.Evented',

    response: null,

    setResponse: function(response) {
        this.response = response;
    },

    getResponse: function() {
        return this.response;
    },

    getStatus: Ext.emptyFn,

    getUrl: Ext.emptyFn
});
