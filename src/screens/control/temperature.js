// Temperature screen : set and read temperature for hotend and bed

var TemperatureScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('temperature_screen');

        // Find temperature_control modules and make a tab for each of them
        if(fabrica.machine.config.temperature_control){
            var _that = this;
            $.each(fabrica.machine.config.temperature_control, function( name ){
                var temperature_control = fabrica.machine.config.temperature_control[name];

                if(temperature_control.enable){
                    // We found an enabled temperature_control module, so we can hide the message
                    $(".no-temperature-control-modules-found").hide();

                    // Make a tab
                    $(".temperature-control-tabs").append('<li role="presentation"><a href="#'+name+'" class="'+name+'-tab" aria-controls="'+name+'" role="tab" data-toggle="tab">'+name+'</a></li>');

                    // Add content to the tab
                    $(".temperature-control-tabs-content").append('<div role="tabpanel" class="tab-pane" id="'+name+'"></div>');

                    $("#"+name).append('<div class="container '+name+'-content"></div>');

                    // Temperature readout
                    $("."+name+"-content").append('<h1 class="well '+temperature_control.designator+'-readout" style="text-align: center; margin-top: 12px;"></h1>');
                    
                    // Temperature slider
                    $("."+name+"-content").append('<input data-slider-id="'+name+'-slider" class="'+name+'-slider" type="text" data-slider-min="0" data-slider-max="'+(temperature_control.max_temp || "300" )+'" data-slider-step="1" data-slider-value="0"/><br>');

                    $("."+name+"-slider").slider({
                        tooltip: 'always',
                        formatter: function(value) {
                            return value;
                        }
                    })

                    // Buttons
                    $("."+name+"-content").append('<button class="btn btn-lg btn-default btn-'+name+'-set-temperature">Set</button>');
                    $("."+name+"-content").append('<button class="btn btn-lg btn-danger btn-'+name+'-heater-off">Off</button>');

                    // Handle button clicks       
                    _that.html.find(".btn-"+name+"-set-temperature").off().click(function(){ fabrica.machine.send_command("M"+temperature_control.set_m_code+" S" + $("#"+name+"-slider .tooltip-inner").text()); });
                    _that.html.find(".btn-"+name+"-heater-off").off().click(function(){ fabrica.machine.send_command("M"+temperature_control.set_m_code+" S0"); });
                    
                    // Show the first tab
                    if($(".temperature-control-tabs > li").length == 1){ $("."+name+"-tab").tab('show'); }
                }
            });
        }

        // Apply styling to sliders
        $(".slider").css({
            "max-width": "600px",
            "width": "90%",
            "margin-top": "35px",
            "margin-bottom": "20px"
        });
    },

    on_value_update: function( value ){
        $.each(value.temperature, function( designator ){
            $("."+designator+"-readout").html(value.temperature[designator].temperature+'°C / ' +value.temperature[designator].target+ (value.temperature[designator].target > 0 ? '°C <span class="label label-danger">Heating</span>': '°C') );

        });
    }

});

fabrica.add_screen('temperature', new TemperatureScreen()); 
