// Main screen, selects actions to do for users

var MainScreen = Class({

    enter: function(){
        // Save screen html
        this.html = $("#main_screen");

        // Display this screen 
        $("screen").addClass('hidden');
        this.html.removeClass('hidden');
    }

});

fabrica.add_screen( 'main', new MainScreen() );


