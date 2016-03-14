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
    }

});

// Instantiate a single, global instance
var fabrica = new Fabrica();



