// Temperature screen : set and read temperature for hotend and bed

var TemperatureScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('temperature_screen');

        // Handle button clicks       
        this.html.find(".btn-set-hotend-temp").off().click(function(){ fabrica.machine.send_command("M104 S" + $(".hotend-temp").val()); });
        this.html.find(".btn-set-bed-temp").off().click(function(){ fabrica.machine.send_command("M140 S" + $(".bed-temp").val()); });
        this.html.find(".btn-get-temp").off().click(function(){ fabrica.machine.send_command("M105"); });
    },

    on_gcode_response: function(response){
        console.log(response);

        // check if it contains temperature data and display it if it does
        if(response.includes("ok T:")){
            $(".temp-readout").text(response);
        }
    }

});

fabrica.add_screen('temperature', new TemperatureScreen()); 
