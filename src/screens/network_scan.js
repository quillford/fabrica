// Network scan screen : allows the user to start a search for active boards on the local network

var NetworkScanScreen = Screen.extend({
    enter: function(){
        // Display this screen
        this.display('network_scan_screen');
        this.html.find(".scan-ongoing").hide();
       
        // Set up button 
        this.html.find(".btn-scan").off().click(function(){ fabrica.screens.network_scan.start_scanning(); });
    },

    start_scanning: function(){
        // Start scanning the network for boards
        var _that = this;
        var expression = this.html.find(".input-expression").val();
        this.html.find(".scan-info").hide();
        this.html.find(".scan-ongoing").show();
        this.html.find(".found-machines").hide();

        // Start the scan 
        // TODO : Get the button to do something, can't now because it doesn't return the IP address along with the board
        sh.scanner.scan(expression,{
            onprogress: function(ip, version){
                _that.html.find(".currently-scanning").text(ip);
            },
            onboard: function(board){
                console.log(board);
               _that.html.find(".found-machines").show();
               _that.html.find(".machine-list").append(
                   $("<tr></tr>").append(
                       $("<td></td>").text(board.branch), $("<td></td>").text(board.date), $("<td></td>").text(board.hash), $("<td></td>").text(board.mcu), $("<td></td>").text(board.clock),$("<button></button>").addClass("btn btn-default").text("Connect to this board")
                   )
               );
            }
        });
    }

});

fabrica.add_screen( 'network_scan', new NetworkScanScreen() );

