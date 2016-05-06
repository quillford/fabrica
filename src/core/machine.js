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
        this.address = "http://" + ip ;
        this.version_string = data;

        // Tell the system that a new connection was established
        fabrica.call_event('on_succesful_connection');
    
        // Next step is obtaining the configuration file from the SD card
        // TODO : Handle errors
        $.ajax(this.address + "/sd/config").done(function(file){
            // Tell the system the configuration file was obtained and parsing will now begin 
            fabrica.call_event('on_config_parse_begin');

            // Parse configuration
            fabrica.machine.config.parse(file);

            // Parsing done
            fabrica.call_event('on_config_parse_end');
        });
    }

}); 

fabrica.machine = new Machine();
