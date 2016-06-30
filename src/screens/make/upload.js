// Upload screen : upload files to sd

var UploadScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('upload_screen');

        // Initially disable the upload button
        this.html.find(".btn-upload-file").prop("disabled", true);

        var _that = this;
        document.getElementById("file-uploader").onchange = function() {
            var file_input = document.getElementById("file-uploader");

            // Allow the user to change the filename
            _that.html.find(".file-name-input").val( file_input.files.length ? file_input.files[0].name : "" );

            // Enable the upload button
            _that.html.find(".btn-upload-file").prop("disabled", false);
        }

        // Setup button clicks       
        var _that = this;
        this.html.find(".btn-upload-file").off().click(function(){
            if(_that.html.find(".file-name-input").val().match(/ /g)){ bootbox.alert("Remove the spaces from the file name."); return; }

            _that.html.find(".upload-status").text("Reading file...");

            var file = document.getElementById("file-uploader").files[0];
            if (file) {
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function(evt) {
                    _that.html.find(".upload-status").text("Uploading file...");
                    fabrica.machine.upload_file(file, _that.html.find(".file-name-input").val());
                };
                reader.onerror = function(evt) {
                    _that.html.find(".upload-status").text("Error reading file");
                };
                
            }

        });
    },

    on_file_upload_update: function(progress){
        if(this.html){
            this.html.find(".upload-status").html('<div class="progress" style="margin-bottom: 0px;"><div class="progress-bar" role="progressbar" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress + '%;">' + progress + '%</div></div>');
        }
    },

    // Tell the user their file failed to upload
    on_file_upload_failure: function(){
        if(this.html){
            this.html.find(".upload-status").html("Error on upload. Try again.");
        }
    },
    
    // Tell the user their file uploaded successfully
    on_file_upload_done: function(){
        if(this.html){
            this.html.find(".upload-status").html("File uploaded successfully");
        }
    }

});

fabrica.add_screen('upload', new UploadScreen()); 
