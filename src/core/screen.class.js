// Screen base class, which all screen objects inherit

var Screen = Class({

    display: function(name){
        // Save screen html and name
        this.html = $("#" + name);
        this.name = name;

        // Display this screen 
        $("screen").addClass('hidden');
        this.html.removeClass('hidden');

        // Setup help for this screen
        this.setup_help();
    },

    setup_help: function(){
        // Only register if the help modal exists
        this.help_modal = $("#" + this.name + "_help");
        if( this.help_modal.length == 0 ){
            console.log(this.help_modal); 
            this.html.find(".btn-help").hide();
            return; 
        }

        // Only register for a button if there is a button
        var _that = this;
        this.html.find(".btn-help").click(function(button){
            _that.enter_help(button);
        });
    },

    enter_help: function(button){
        // Show the modal
        this.help_modal.modal();
    }


}); 




