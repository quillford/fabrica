// Terminal screen : send arbitrary commands and receive responses

var TerminalScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('terminal_screen');

        var _that = this;
        // Handle button clicks       
        this.html.find(".btn-terminal-send").off().click(function(){ _that.append_terminal_output($(".terminal-input").val()+"\n"); fabrica.machine.send_command($(".terminal-input").val()); });
    },

    // listen for gcode responses so that we can show them
    on_gcode_response: function(response){
        this.append_terminal_output(response);
    },

    // add text to the terminal output
    append_terminal_output: function(text){
        $(".terminal-output").text($(".terminal-output").text() + text);
    }

});

fabrica.add_screen('terminal', new TerminalScreen()); 
