// Raw configuration screen : allows direct editing of configuration options

var RawConfigurationScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('raw_configuration_screen');

        // Setup button clicks       
        //this.html.find(".btn-raw-configuration").off().click(function(){ fabrica.screens.move.enter(); });
    },

});

fabrica.add_screen('raw_configuration', new RawConfigurationScreen()); 

