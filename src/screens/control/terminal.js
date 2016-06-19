// Terminal screen : send arbitrary commands and receive responses

var TerminalScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('terminal_screen');

        $(".terminal-output").text( fabrica.machine.communication_log );

        // Handle button clicks       
        this.html.find(".btn-terminal-send").off().click(function(){ fabrica.machine.send_command($(".terminal-input").val()); });
    },

    // listen for gcode being sent so that we can show it
    on_gcode_send: function(gcode){
        $(".terminal-output").html($(".terminal-output").html() + "<b>" + gcode + "</b>");
    },

    // listen for gcode responses so that we can show them
    on_gcode_response: function(response){
        $(".terminal-output").html($(".terminal-output").html() + "<b>" + response + "</b>");
    }

});

fabrica.add_screen('terminal', new TerminalScreen()); 
