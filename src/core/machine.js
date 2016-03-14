// Core machine object, used to store machine information, and communicate with the machine

var Machine = Class({

    // Constructor method
    create: function(){
    },

    // Attempt connecting to a machine, and report results
    attempt_connection: function( params ){
        var _that = this;
        $.post("http://" + params.ip + "/command", "version\n").done( function(data){ _that.successful_connection(data, params.ip); } ).fail( params.failure );
    },

    // A succesful connection was established with a Smoothie-based board
    successful_connection: function(data, ip){
        // Remember the information learned from finding the board
        this.ip = ip;
        this.version_string = data;

        // Warn the system that a new connection was established
        fabrica.call_event('on_succesful_connection');
    }

}); 

fabrica.machine = new Machine();
