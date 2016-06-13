/**
 * Classe base Listener que mapea os Status code Http em métodos, já implementa os métodos sem necessidade de escrever todos
 *
 * @class Mba.ux.HttpListener.ListenerAbstract
 * @abstract
 */
Ext.define('Mba.ux.HttpListener.ListenerAbstract', {

    /**
     * @method
     * Mapea status 200
     */
    ok: Ext.emptyFn,

    /**
     * @method
     * Mapea status 201
     */
    created: Ext.emptyFn,

    /**
     * @method
     * Mapea status 202
     */
    accepted: Ext.emptyFn,

    /**
     * @method
     * Mapea status 204
     */
    noContent: Ext.emptyFn,

    /**
     * @method
     * Mapea status 302
     */
    found: Ext.emptyFn,

    /**
     * @method
     * Mapea status 400
     */
    badRequest: Ext.emptyFn,

    /**
     * @method
     * Mapea status 401
     */
    unauthorized: Ext.emptyFn,

    /**
     * @method
     * Mapea status 403
     */
    forbidden: Ext.emptyFn,

    /**
     * @method
     * Mapea status 404
     */
    notFound: Ext.emptyFn,

    /**
     * @method
     * Mapea status 405
     */
    methodNotAllowed: Ext.emptyFn,

    /**
     * @method
     * Mapea status 412
     */
    preconditionFailed: Ext.emptyFn,

    /**
     * @method
     * Mapea status 500
     */
    internalError: Ext.emptyFn,

    /**
     * @method
     * Mapea status 501
     */
    methodNotImplemented: Ext.emptyFn,

    /**
     * @method
     * Mapea status 502
     */
    badGateway: Ext.emptyFn,

    /**
     * @method
     * Mapea status 406
     */
    notAcceptable: Ext.emptyFn,

    /**
     * @method
     * Mapea status 503
     */
    serviceUnavailable: Ext.emptyFn,

    /**
     * @method
     * Mapea status 504
     */
    gatewayTimeout: Ext.emptyFn
});
