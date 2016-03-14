// Core fabrica object, similar to Smoothie's "kernel", holds all the screens

var Fabrica = Class({

    // Constructor method
    create: function(){
        this.screens = {};
    },

    // Add a new screen to the list
    add_screen: function( name, screen ){
        this.screens[name] = screen;
        screen.fabrica = this;
    },

    // Call an even upon all modules that want to hear it
    call_event: function( event_name ){
        $.each(this.screens, function(name, screen){
            $.each(screen, function(property_name, property){
                if( property_name == event_name ){
                    property.call(screen);
                }
            });
        });
    }

});

// Instantiate a single, global instance
var fabrica = new Fabrica();



