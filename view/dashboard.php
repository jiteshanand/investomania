<html>
    <head>
      <meta charset="utf-8">
     <link rel="stylesheet" type="text/css" href="css/index.css"/>
    </head>
<body>

<div class="outercontainer">
    <?php
include 'Navbar.php'
  ?>
  <div class="content-container">

<!-- Code for graph and sensex data display starts here -->

<section class="sensexdata">

  <?php
  include 'highstock1.php'
  ?>
	<!-- <div class="rowone">
<script type='text/javascript' src='https://10ay.online.tableau.com/javascripts/api/viz_v1.js'></script>
<div class='tableauPlaceholder' style='width: 700px; height: 300px; margin-top:20px;margin-left:20px;border:0px;'>
	<object class='tableauViz' width='700' height='300' style='display:none;'>
	<param name='host_url' value='https%3A%2F%2F10ay.online.tableau.com%2F' />
	<param name='site_root' value='&#47;t&#47;investmoney' />
	<param name='name' value='Book2&#47;Sheet1' />
	<param name='tabs' value='no' />
	<param name='toolbar' value='no' />
	<param name='showVizHome' value='n' />
	<parameter name="customViews" value="no" />
	</object>
</div>

</div> -->
</section>
<!-- code for watchlist table starts here -->

 <section class="wrapper">
    <!-- Row title -->
    <main class="row title1">
    	<span class="watchlisttag">Watchlist Trend</span>
      <ul>
        <li>Company</li>
        <li>Last Trade</li>
        <li>Change</li>
        <li>Max</li>
      </ul>
    </main>
    
       <!-- Row 3 -->
    <article class="row nfl">
      <ul>
        <li><a href="#">Infosys</a></li>
        <li>$50</li>
        <li>12</li>
        <li>48</li>
      </ul>
      <ul class="more-content">
        <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
      </ul>
    </article>
    <!-- Row 4 -->
    <article class="row mlb">
      <ul>
        <li><a href="#">Reliance</a></li>
        <li>$10</li>
        <li>2</li>
        <li>10</li>
      </ul>
      <ul class="more-content">
        <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
      </ul>
    </article>
    <!-- Row 5 -->
    <article class="row mlb">
      <ul>
        <li><a href="#">Bharti Airtel</a></li>
        <li>$5</li>
        <li>48</li>
        <li>120</li>
      </ul>
      <ul class="more-content">
        <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
      </ul>
    </article>
    <!-- Row 6 -->
    <article class="row nhl">
      <ul>
        <li><a href="#">TCS</a></li>
        <li>$50</li>
        <li>12</li>
        <li>48</li>
      </ul>
      <ul class="more-content">
        <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
      </ul>
    </article>
     <article class="row nfl">
      <ul>
        <li><a href="#">SML ISUZU</a></li>
        <li>$50</li>
        <li>12</li>
        <li>48</li>
      </ul>
      <ul class="more-content">
        <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
      </ul>
    </article>

      <article class="row nfl">
      <ul>
        <li><a href="#">ICICI Bank</a></li>
        <li>$50</li>
        <li>12</li>
        <li>48</li>
      </ul>
      <ul class="more-content">
        <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
      </ul>
    </article>

  </section>
  <!-- code for watchlist table ends here -->
  <script type="text/javascript" src="jquery.circliful.min.js"></script>
<section class="donutchart">
	<main class="title1">
    	<span class="watchlisttag">Investment areas</span>
	<div id="doughnutChart" class="chart"></div>
</main>
</section>

<!-- Code for graph and sensex data display ends here -->
</div>
</div>
</body>
</html>