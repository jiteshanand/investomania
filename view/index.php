<html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
      <script type="text/javascript" src="..\library\jquery-2.1.3.min.js"></script>      
      <link rel="stylesheet" type="text/css" href="css/index.css"/>
    </head>
<body>
<div class="outercontainer">
    <?php

include 'Navbar.php'
  ?>
<div class="content-container">
 <?php
include 'ticker.php';
include 'comment.php';
  ?>
</div>

<div class="stat-container">
 <?php

include 'stats.php'
  ?>
</div>
</div>
</body>
</html>