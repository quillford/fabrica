// Main screen, selects actions to do for users

var MainScreen = Screen.extend({

    enter: function(){
        // Display screen
        this.display('main_screen'); 
    }

});

fabrica.add_screen( 'main', new MainScreen() );


