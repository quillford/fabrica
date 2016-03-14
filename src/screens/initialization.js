// Initialization screen : displays progress of preparation of the interface, after initial contact with the machine

InitializationScreen = Screen.extend({
    enter: function(){
        // Save screen html
        this.html = $("#initialization_screen");

        // Display this screen 
        $("screen").addClass('hidden');
        this.html.removeClass('hidden');
    },

    on_succesful_connection: function(){
        this.enter();
        this.html.find(".list-download").removeClass('hidden');
        this.html.find(".progress-bar").width("33%");
    },

    on_config_parse_begin: function(){
        this.html.find(".list-parse").removeClass('hidden');
        this.html.find(".progress-bar").width("66%");
    }, 

    on_config_parse_end: function(){
        this.html.find(".list-done").removeClass('hidden');
        this.html.find(".progress-bar").width("100%");
        fabrica.call_event('on_initialization_complete');
    }

});

fabrica.add_screen( 'initialization', new InitializationScreen() );
