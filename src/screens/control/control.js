// Control screen : lists different control activities and allows to select which to use

var ControlScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('control_screen');

        // Add handlers
        this.html.find(".btn-back").click(function(){ fabrica.screens.main.enter(); });
 
    },


});

fabrica.add_screen('control', new ControlScreen()); 
