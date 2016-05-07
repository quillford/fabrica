// Raw configuration screen : allows direct editing of configuration options

var RawConfigurationScreen = Screen.extend({

    enter: function(){

        // Set up sections
        this.sections = [
            { name: "Robot",                selector: "## Robot",        description: "Basic motion" },
            { name: "System",               selector: "## System",       description: "System settings" },
            { name: "Extruder",             selector: "## Extruder",     description: "Extruder motors" }, 
            { name: "Laser",                selector: "## Laser",        description: "Laser power control"},
            { name: "Temperature control",  selector: "## Temperature",  description: "Temperature regulation, typically for hotends and heated beds"},
            { name: "Switch",               selector: "## Switch",       description: "Map inputs/outputs and commands"},
            { name: "Temperature switch",   selector: "## Temperaturesw",description: "Toggle outputs at given temperatures"},
            { name: "Endstops",             selector: "## Endstops",     description: "Homing, endstops and limit switches"},
            { name: "Z-probe",              selector: "## Z-probe",      description: "Probing, calibration and levelling"},
            { name: "Panel",                selector: "## Panel",        description: "Panels and displays"},
            { name: "Custom menus",         selector: "## Custom menus", description: "Custom menu entries"},
            { name: "Network",              selector: "## Network",      description: "Ethernet and web interface"}
        ];

        // Display this screen
        this.display('raw_configuration_screen');

        // Set up button clicks
        $(".section-button").click(function(){
            fabrica.screens.raw_configuration_section.enter( $(this).attr('selector'), $(this).text());
        });

    },

});

fabrica.add_screen('raw_configuration', new RawConfigurationScreen()); 

// Raw configuration section screen : select lines to edit in a specific section of the screen

var RawConfigurationSectionScreen = Screen.extend({

    enter: function(selector, name ){
        // Remember section in case we come back
        if( selector !== undefined ){ this.current_section = {'name': name, 'selector': selector}; }

        // Get configuration file section
        this.config = fabrica.machine.config.get_section( this.current_section.selector ).map( this.parse_line );

        // Display this screen
        this.display('raw_configuration_section_screen');

        // Set up button clicks
        $(".option_line .btn").click(function(){
            fabrica.screens.raw_configuration_option.enter({option:$(this).attr('option'), value:$(this).attr('value')});
        });
    },

    parse_line: function( line ){
        var splitted = line.split(/\s+/);
        var parsed = { option: splitted.shift(), value: splitted.shift(), comment: splitted.join(" ") };
        parsed.starts_with_comment = ((line.substr(0,2) == '# ' || line.substr(0,2) == '##') ? true : false );
        parsed.shifted_comment = ((parsed.value !== undefined && parsed.value.substr(0,1) == '#') ? true : false );
        parsed.has_value = (parsed.value != '' ? true : false );
        parsed.empty = (splitted.length == 0 ? true : false );
        return parsed;
    }

});
fabrica.add_screen('raw_configuration_section', new RawConfigurationSectionScreen()); 

// Raw configuration option screen : edit a specific option's value

var RawConfigurationOptionScreen = Screen.extend({

    enter: function( line ){
        // Remember our line
        this.line = line 

        // Get option definitions
        var _that = this;
        $("#option_definitions").find("div.option").each(function(index){
            if( $(this).attr("name") == line.option ){ _that.definition = $(this); }
        });
        this.title = this.definition.attr('title');
        this.description = this.definition.find("div.description").html();
        this.type = {}; this.type[this.definition.attr('type')] = true;
        this.unit = this.definition.attr('unit');
        // TODO : What to do if no definition of a config option was found ( error message )
   
        // Display this screen
        this.display('raw_configuration_option_screen');

   /*     // Set up screen
    
        // Get option definitions
        var definitions = $("#option_definitions");       

        // Get option within definitions
        var definition = {};
        definitions.find("div.option").each(function(index){
            if( $(this).attr("name") == line.option ){ definition = $(this); }
        });
        // TODO : What to do if no definition of a config option was found ( error message )

        // Display found information
        this.html.find(".panel-title").text( definition.attr('title') );
        this.html.find(".panel-body" ).empty().append( definition.find("div.description").clone() );

        // Display the right edition box
        var type = definition.attr('type');
        var unit = definition.attr('unit');
        this.html.find(".edit_box").addClass('hidden');
        this.html.find(".edit_" + type).removeClass('hidden'); 
        this.html.find(".option-units").text(unit);
    */

        // TODO : Allow to comment/uncomment line
        // TODO : Raw edit
        // TODO : Assisted edit

    }

});
fabrica.add_screen('raw_configuration_option', new RawConfigurationOptionScreen()); 



