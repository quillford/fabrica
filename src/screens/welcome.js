// Welcome the user to the interface, display useful information

var WelcomeScreen = Class({

    enter: function(){
        // Save screen html
        this.html = $("#welcome_screen");

        // Display this screen 
        $("screen").addClass('hidden');
        this.html.removeClass('hidden');

        //TODO : Make "do not show this next time" actually do what it says

        // Add handler
        this.html.find(".btn_next").click(function(){ fabrica.screens.main.enter(); });
    }, 

    on_initialization_complete: function(){
        this.enter();
    }

}); 

fabrica.add_screen( 'welcome', new WelcomeScreen() );

