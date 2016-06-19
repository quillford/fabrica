// Welcome the user to the interface, display useful information

var WelcomeScreen = Screen.extend({

    enter: function(){
        // Display this screen
        this.display('welcome_screen');

        if( localStorage.getItem("skip_welcome") === "true" ){
            fabrica.screens.main.enter();
        }

        // Add handler
        this.html.find(".btn_next").off().click(function(){
            localStorage.setItem("skip_welcome", $(".skip-welcome").is(':checked'));
            fabrica.screens.main.enter();
        });
    }, 

    on_initialization_complete: function(){
        this.enter();
    }

}); 

fabrica.add_screen( 'welcome', new WelcomeScreen() );

