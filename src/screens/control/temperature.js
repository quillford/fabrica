// Temperature screen : set and read temperature for hotend and bed

var TemperatureScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('temperature_screen');

        // Get an initial temperature reading
        fabrica.machine.send_command("M105");

        // Create the sliders        
        $(".hotend-slider").slider({
            tooltip: 'always',
            formatter: function(value) {
                return value;
            }
        });

        $(".bed-slider").slider({
            tooltip: 'always',
            formatter: function(value) {
                return value;
            }
        });

        // Apply styling to sliders
        $(".slider").css({
            "max-width": "500px",
            "width": "100%",
            "margin-top": "30px"
        });


        // Handle button clicks       
        this.html.find(".btn-set-hotend-temperature").off().click(function(){ fabrica.machine.send_command("M104 S" + $("#hotend-slider .tooltip-inner").text()); });
        this.html.find(".btn-set-bed-temperature").off().click(function(){ fabrica.machine.send_command("M140 S" + $("#bed-slider .tooltip-inner").text()); });
        this.html.find(".btn-set-hotend-heater-off").off().click(function(){ fabrica.machine.send_command("M104 S0"); });
        this.html.find(".btn-set-bed-heater-off").off().click(function(){ fabrica.machine.send_command("M140 S0"); });
        this.html.find(".btn-update-temperature").off().click(function(){ fabrica.machine.send_command("M105"); });
    },

    on_gcode_response: function(response){
        // check if it contains temperature data and display it if it does
        if(response.includes("ok T:")){
            $(".temperature-readout").html(response);
        }
    }

});

fabrica.add_screen('temperature', new TemperatureScreen()); 
