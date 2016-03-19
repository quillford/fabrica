// Move screen : allows moving the machine to a given position

var MoveScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('move_screen');

        // Add handlers
        this.html.find(".btn-back").click(function(){ fabrica.screens.control.enter(); });

    },

});


fabrica.add_screen('move', new MoveScreen()); 

