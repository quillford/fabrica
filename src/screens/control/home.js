// Home screen : allows homing the machine's axes independently or all at once

var HomeScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('home_screen');

        // Handle button clicks
        
        var _that = this;
        ['x', 'y', 'z', 'all'].forEach(function(axis) {
            _that.html.find(".btn-home-" + axis).off().click(function(){ fabrica.machine.home( axis.toUpperCase() ); }); 
        });
    }

});


fabrica.add_screen('home', new HomeScreen());

