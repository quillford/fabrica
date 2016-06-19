// Home screen : allows homing the machine's axes

var HomeScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('home_screen');

        // Handle button clicks
        this.html.find(".btn-home-x").off().click(function(){  /*fabrica.machine.home("X");*/ }); 
        this.html.find(".btn-home-y").off().click(function(){  /*fabrica.machine.home("Y");*/ });
        this.html.find(".btn-home-z").off().click(function(){  /*fabrica.machine.home("Z");*/ });
        this.html.find(".btn-home-all").off().click(function(){  /*fabrica.machine.home("all");*/ });    
    }

});


fabrica.add_screen('home', new HomeScreen()); 

