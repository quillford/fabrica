// Core updater object, used to update machine information frequently such as temperature, position, and progress of file playing

var Updater = Class({

    // Constructor method
    create: function(){
        window.setInterval(this.update, 5000);
    },

    update: function(){
        if(fabrica.machine.state === "printing"){
            fabrica.machine.send_command("progress");
        }else if(fabrica.machine.state === "idle"){
            fabrica.machine.send_command("M105");
        }
    },

    on_gcode_response: function(response){
        if(response.includes("Not currently playing")){
            fabrica.machine.state = "idle";
        }else if(response.includes("file") && response.includes("complete")) {
            fabrica.machine.state = "printing";
        }
    }

}); 

fabrica.machine.updater = new Updater();
