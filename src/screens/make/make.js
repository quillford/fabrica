// Make screen : lists gcode on sd that is able to be played

var MakeScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('make_screen');

        
        $(".playing-file").hide();
        $(".file-manager").hide();
        
    },


    // listen for gcode files
    on_gcode_response: function( response ){
        if(response.includes("Begin file list")){ // Update the file list
            // Empty the file list
            $(".file-list").empty();

            var _that = this;
            // Populate the file list
            response.split("\n").forEach(function( file ){
                $(".file-status").text("No gcode files found on your internal sd card");

                if(file.includes(".gco")){
                    $(".file-status").hide();
                    var filename = file.replace(".", "-").replace(/(\r\n|\n|\r)/gm,"");
                    file = file.replace(/(\r\n|\n|\r)/gm,"");
                    $(".file-list").append( '<a class="btn btn-default col-xs-12 btn-lg btn-'+filename+'" href="#">'+file+'</a>' );
                    _that.html.find(".btn-"+filename).off().click(function(){ 
                        $(".file-options-modal .modal-body").html("What do you want to do with <b>"+file+"</b>?");
                        $(".file-options-modal").modal("show");

                        _that.html.find(".btn-delete-file").off().click(function(){
                            if(confirm("Are you sure you want to delete " + file + "?")){
                                // Delete the file and refresh the file list
                                fabrica.machine.send_command("M30 " + file);
                                fabrica.machine.send_command("M20");

                                // Close the modal
                                $(".file-options-modal").modal("hide");
                            }
                        });

                        _that.html.find(".btn-play-file").off().click(function(){
                            // Play the file
                            fabrica.machine.send_command("M32 " + file);

                            // Close the modal
                            $(".file-options-modal").modal("hide");

                            fabrica.machine.send_command("progress");
                        });
                    });    
                }
            });

        }
    },

    on_value_update: function( value ){
        if(value.progress.playing){
            // Example: file: /sd/test.gcode, 6 % complete, elapsed time: 3 s 

            // The machine is playing a file, so we should display information about that job and hide the file manager
            $(".screen-status").hide();
            $(".file-manager").hide();
            $(".playing-file").show();

            $(".file-title").text( value.progress.string.match("/sd/(.*?), ")[1] );
            $(".file-progress").text( value.progress.string.match(", (.*?) %")[1] + "%" );
            $(".file-progress-bar").css("width", value.progress.string.match(", (.*) %")[1]);
            $(".file-time-elapsed").text( new Date(value.progress.string.match("time: (.*?) s")[1] * 1000).toISOString().substr(11, 8) );
        }else {
            if(!$(".file-manager").is(":visible") && fabrica.current_screen.name === "make_screen"){
                // Ask for the files
                fabrica.machine.send_command("M20");
            }
            $(".screen-status").hide();
            $(".playing-file").hide();
            $(".file-manager").show();
        }
    }
});

fabrica.add_screen('make', new MakeScreen()); 