// Control screen : lists different control activities and allows to select which to use

var ControlScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('control_screen');

        // Add handlers
        this.html.find(".btn-back").click(function(){ fabrica.screens.main.enter(); });
        
        this.html.find(".btn-move").click(function(){ fabrica.screens.move.enter(); });
 
    },


});

fabrica.add_screen('control', new ControlScreen()); 
