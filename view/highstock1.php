<html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
      <script type="text/javascript" src="..\library\jquery-2.1.3.min.js"></script>
      <link rel="stylesheet" type="text/css" href="css/highstock1.css"/>
    </head>
<body>
<!-- <div id="container" style="height: 300px; min-width: 700px"></div> -->
<script src="http://code.highcharts.com/stock/highstock.js"></script>
<script src="http://code.highcharts.com/stock/modules/exporting.js"></script>

<div class="chart-wrapper">
	<div class="chart-inner">
<div id="container" style="width:100%; height: 300px;"></div>
</div>
</div>

<script type="text/javascript">
$(function () {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=new-intraday.json&callback=?', function (data) {

        // create the chart
        $('#container').highcharts('StockChart', {

        chart: {
                  height: 280,
                //  width: 350,
                // type: 'bar',
                backgroundColor: '#FFFFFF',
                marginLeft:20,
                borderRadius: 10
            },

            title: {
                text: 'Stock price by minute'
            },

            // subtitle: {
            //     text: 'Using ordinal X axis'
            // },

            xAxis: {
                gapGridLineWidth: 0
            },

            rangeSelector : {
                buttons : [{
                    type : 'hour',
                    count : 1,
                    text : '1h'
                }, {
                    type : 'day',
                    count : 1,
                    text : '1D'
                }, {
                    type : 'all',
                    count : 1,
                    text : 'All'
                }],
                selected : 1,
                inputEnabled : false
            },

            series : [{
                name : 'SENSEX',
                type: 'area',
                data : data,
                gapSize: 5,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold: null
            }]
        });
    });
});
</script>