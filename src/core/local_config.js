var LocalConfig = Class({
    // Constructor method
    create: function(){

    },

    // set a local config value
    set: function( name, value ){
        localStorage.setItem(name, value);
    },

    // get a local config value
    get: function( name ){
        return localStorage.getItem(name);
    }


});

fabrica.local_config = new LocalConfig();

