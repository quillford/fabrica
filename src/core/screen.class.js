// Screen base class, which all screen objects inherit

var Screen = Class({

    display: function(name){
        // Save screen html
        this.html = $("#" + name);

        // Display this screen 
        $("screen").addClass('hidden');
        this.html.removeClass('hidden');
    }


}); 




