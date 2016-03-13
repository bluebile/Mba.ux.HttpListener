/**
 * Classe abstrata responsável por tratar o retorno da resposta para o Gerenciador
 *
 * @class Mba.ux.HttpListener.wrappper.WrapperAbstract
 * @extends Ext.Evented
 * @abstract
 */
Ext.define('Mba.ux.HttpListener.wrapper.WrapperAbstract', {

    extend: 'Ext.Evented',

    /**
     * @property {String} response
     * A resposta setada após ocorrência de eventos de sucesso ou erro
     */
    response: null,

    /**
     * @method
     * Atribui a resposta retorna do servidor
     * @param {String} response
     */
    setResponse: function(response) {
        this.response = response;
    },

    /**
     * @method
     * Retorna a string de resposta
     * @return {String}
     */
    getResponse: function() {
        return this.response;
    },

    run: Ext.emptyFn,

    /**
     * @method
     * Retorna o status code HTTP
     * @return {Integer}
     */
    getStatus: Ext.emptyFn,

    /**
     * @method
     * Retorna a url origem da requisição
     * @return {String}
     */
    getUrl: Ext.emptyFn
});
