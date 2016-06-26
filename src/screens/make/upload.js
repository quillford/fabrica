// Upload screen : upload files to sd

var UploadScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('upload_screen');

        // Initially disable the upload button
        $(".btn-upload-file").prop("disabled", true);

        document.getElementById("file-uploader").onchange = function() {
            var file_input = document.getElementById("file-uploader");

            // Allow the user to change the filename
            $(".file-name-input").val( file_input.files.length ? file_input.files[0].name : "" );

            // Enable the upload button
            $(".btn-upload-file").prop("disabled", false);
        }

        // Setup button clicks       
        this.html.find(".btn-upload-file").off().click(function(){
            if($(".file-name-input").val().match(/ /g)){ bootbox.alert("Remove the spaces from the file name."); return; }

            $(".upload-status").text("Reading file...");

            var file = document.getElementById("file-uploader").files[0];
            if (file) {
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function(evt) {
                    $(".upload-status").text("Uploading file...");
                    fabrica.machine.upload_file( $(".file-name-input").val(), evt.target.result);
                };
                reader.onerror = function(evt) {
                    $(".upload-status").text("Error reading file");
                };
            }

        });
    },


    // Tell the user their file failed to upload
    on_file_upload_failure: function(){
        $(".upload-status").text("Error on upload. Try again.");
    },
    
    // Tell the user their file uploaded successfully
    on_file_upload_done: function(){
        $(".upload-status").text("File uploaded successfully");
    }

});

fabrica.add_screen('upload', new UploadScreen()); 
