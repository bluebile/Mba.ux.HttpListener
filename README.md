# Mba.ux.HttpListener

Componente da MBA que provê execução de uma classe que mapea os status code HTTP

## Mba.ux.Manager

Exemplo:

```
/**
 * @class HttpListener
 * @extends Mba.ux.HttpListener.ListenerAbstract
 */
Ext.define('HttpListener', {
    extend: 'Mba.ux.HttpListener.ListenerAbstract',

    notFound: function(response) {
        alert(this.messages[response.status]);
    }
});


var manager = Ext.create('Mba.ux.HttpListener.Manager', {
    global: {
        listener: 'HttpListener'
    }
});

manager.addWrapper('ajax');
manager.run();

Ext.Ajax.request({
    url: 'test'
});

```


