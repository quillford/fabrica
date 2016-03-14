<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>fabrica</title>

    <!-- Bootstrap -->
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap callouts -->
    <link href="static/css/bootstrap-callouts.css" rel="stylesheet">
 
  </head>
  <body>
    
    <!-- Bootstrap -->
    <link href="src/screens/connection.html" rel="html">

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="static/js/jquery-2.2.1.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="static/js/bootstrap.min.js"></script>
    <!-- Js.class allows more object-oriented javascript -->
    <script src="src/core/js.class/dist/browser/js.class.min.js"></script>

    <!-- Core Fabrica object -->
    <script src="src/core/fabrica.js"></script>
    <!-- Base class for all screens -->
    <script src="src/core/screen.class.js"></script>
    <!-- Describes a machine, stores information about it, communicates with it -->
    <script src="src/core/machine.js"></script>

    <!-- Connection screen -->
    <script src="src/screens/connection.js"></script>



    <script>
        // Manually enter the first screen
        fabrica.screens.connection.enter();
    </script>

  </body>
</html>

