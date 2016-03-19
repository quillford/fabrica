// Raw configuration screen : allows direct editing of configuration options

var RawConfigurationScreen = Screen.extend({

    enter: function(){
        // Display this screen
        this.display('raw_configuration_screen');

        // Set up sections
        this.sections = [
            { name: "Robot",                selector: "## Robot",        description: "Basic motion" },
            { name: "Extruder",             selector: "## Extruder",     description: "Extruder motors" }, 
            { name: "Laser",                selector: "## Laser",        description: "Laser power control"},
            { name: "Temperature control",  selector: "## Temperature",  description: "Temperature regulation, typically for hotends and heated beds"},
            { name: "Switch",               selector: "## Switch",       description: "Map inputs/outputs and commands"},
            { name: "Temperature switch",   selector: "## Temperaturesw",description: "Toggle outputs at given temperatures"},
            { name: "Endstops",             selector: "## Endstops",     description: "Homing, endstops and limit switches"},
            { name: "Z-probe",              selector: "## Z-probe",      description: "Probing, calibration and levelling"},
            { name: "Panel",                selector: "## Panel",        description: "Panels and displays"},
            { name: "Custom menus",         selector: "## Custom menus", description: "Custom menu entries"},
            { name: "Network",              selector: "## Network",      description: "Ethernet and web interface"},
            { name: "System",               selector: "## System",       description: "System settings" } 
        ];

        // Display sections in the array
        this.html.find(".section_list .section_line").remove();
        var line_template = this.html.find(".section_line");
        var _that = this;
        $.each( this.sections, function( index, line ){
            var new_line = line_template.clone();
            new_line.removeClass("hidden");
            new_line.find(".section-button").text( line.name ).click(function(){
                fabrica.screens.raw_configuration_section.enter( line );
            });
            new_line.find(".section-description").text( line.description );
            _that.html.find(".section_list").append(new_line);
        });   

    },

});

fabrica.add_screen('raw_configuration', new RawConfigurationScreen()); 

// Raw configuration section screen : select lines to edit in a specific section of the screen

var RawConfigurationSectionScreen = Screen.extend({

    enter: function( section ){
        // Remember section in case we come back
        if( section !== undefined ){
            this.current_section = section;
        }

        // Display this screen
        this.display('raw_configuration_section_screen');

        // Set up screen
        this.html.find(".section_name").text( section.name );

        // Get configuration file section
        this.lines = fabrica.machine.config.get_section( section.selector );

        // Display list of options
        this.html.find(".option_list .option_line").remove();
        var line_template = this.html.find(".option_line");
        var _that = this;
        $.each( this.lines, function( index, line ){
            var new_line = line_template.clone();
            new_line.removeClass("hidden");
            new_line.find(".option_name").text( line );
            _that.html.find(".option_list").append(new_line);
        });   


        console.log(this.lines.join("\n"));

    }

});

fabrica.add_screen('raw_configuration_section', new RawConfigurationSectionScreen()); 

