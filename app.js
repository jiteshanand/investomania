
//set up all the reuirements for project
var express = require('express');
var app = express();
var port = 80;
var routes = require('./routes');
var bodyParser = require('body-parser');
var fs = require('graceful-fs');
var csv = require('ya-csv');
var cookieParser = require('cookie-parser');
var compress= require('compression');
var elasticsearch = require('elasticsearch');
var mongoose = require('mongoose');
var cheerio = require("cheerio");
var http = require('http');
var request = require('request');
// var Promise	= require('Promise');
var beautify = require('js-beautify').js_beautify;
var feed = require("feed-read");
var Twit = require("twit");
var FETCH_INTERVAL = 1000000000;
var socket = require('socket.io-client')('http://localhost:3001');
//connect with mongo DB here
var configDB = require('./config/database');
var configTweet = require('./config/tweet');


mongoose.connect(configDB.url);
var mfhistory = require('./DBmodel/user.js');
//var history = require('../DBmodel/user.js');
var io1 = require('socket.io-client');
//read cookies
app.use(compress());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Connect to elasticsearch server @ localhost:9200 and use the default settings
var client = new elasticsearch.Client();
var client = elasticsearch.Client({
	host: 'localhost:9200',
  log: 'trace'
});




app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs'); //set ejs view engine1.3 million views. Please keep sharing.

//connect with passportjs here
require('./config/passport')(app);
require('./config/dataload')(app);

//Define routes
app.get('/',routes.index); 
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);  

// app.listen(port);
var server = app.listen(port,function(){
	console.log("Application connected on port "+port);
});

var io = require('socket.io').listen(server);

// expose app           
exports = module.exports = app;  

//socket connection started
io.sockets.on('connection', function(socket) 
{
	//socket onn for ticker event
	socket.on('ticker', function(ticker)
	{
		track_ticker(socket, ticker);
	});

	//socket on for global indices
	socket.on('index',function(indices)
	{
		getIndices(socket,indices);
	});

	//socket on for global indices
	socket.on('sector',function()
	{
		getSector(socket);
	});

		//socket on for global indices
	socket.on('currency',function()
	{
		getcurrency(socket);
	});

	//socket on for google news feed
	socket.on('googlenews',function(company)
	{
		getnewsfeed(socket,company);
	});

	//socket on for tweets
	socket.on('tweet',function(symbol)
	{
		// console.log("1");
		tracktweet(socket,symbol);
	});


});

function tracktweet(socket,symbol) {

	//Run the first time immediately
	// console.log("2");
	gettweet(socket,symbol);

	//Every N seconds
	var timer = setInterval(function() {
		gettweet(socket,symbol)
	}, FETCH_INTERVAL);

	socket.on('disconnect', function () {
		clearInterval(timer);
	});
}

//this function will call getticker at specified interval of time
function track_ticker(socket, ticker) {

	//Run the first time immediately
	getticker(socket, ticker);

	//Every N seconds
	var timer = setInterval(function() {
		getticker(socket, ticker)
	}, FETCH_INTERVAL);

	socket.on('disconnect', function () {
		clearInterval(timer);
	});
}

//this function will get ticker current values and emit values from socket to controller
function getticker(socket,sname) {

	var options = {
		host: 'www.google.com',
		port: 80,
		path: '/finance/info?client=ig&infotype=infoquoteall&q=NSE:'+sname
	};
	// var options = {
	// 	host: 'finance.yahoo.com',
	// 	port: 80,
	// 	path: '/webservice/v1/symbols/'+sname+'/quote?format=json&view=detail'
	// };
	http.get(options,function(response){
		response.setEncoding('utf8');
		var data = "";
	response.on('data', function(chunk) {
			data += chunk;
	}).on('end', function() {
			var quote = data;
	 		socket.emit('quote',quote); 	
	}).on("error",function(e){
		console.log("Error in fetching Stock data")
	});
	});
}

function getcurrency(socket) {

var fixedEncodeURIComponent = function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    };
    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
	var query = 'select * from yahoo.finance.xchange where pair in ("USDINR", "EURINR","CNYINR","AUDINR", "GBPINR", "CADINR")';
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

	http.get(url,function(response){
		response.setEncoding('utf8');
		var data = "";
	response.on('data', function(chunk) {
			data += chunk;
	}).on('end', function() {
			var currency = data;
			// console.log(currency);
	 		socket.emit('Currency',currency); 	
	}).on("error",function(e){
		console.log("Error in fetching Stock data")
	});
	});

}

//function to initiate the fields
 function Article(title, date, description, url) {
	this.title = title;
	this.date = date;
	this.description = description;
	this.url = url;
}

//function to fetch all the news feed and clean them to send the result for display
function getnewsfeed(socket,searchname){

var query = "https://news.google.com/news?pz=0&cf=all&ned=in&hl=en&scoring=d&q="+searchname+"&as_qdr=w&cf=all&output=rss&num=30";
	feed(query, function(err, articles) {
		if (err) {
			throw err;
		}
		var results = [];
		for (var i = 0; i < articles.length; i++) {
			var title = articles[i].title.replace(/<(?:.|\n)*?>/g, '');
			var date = articles[i].published;
			 var description = articles[i].content.replace(/<(?:.|\n\')*?>/g, '');
			 var description = description.replace(/&#39;/g,"\'");
			 var description = description.replace(/&nbsp;/g,"");
			 var description = description.replace(/&raquo;/g,"");
			 var fullurl = articles[i].link;
			 var url = fullurl.substring(fullurl.indexOf("url=")+4,fullurl.Length);
			results.push(new Article(title, date, description, url));
		}
		socket.emit('newsfeed',results);
});

}

//function to get data for all indices
function getIndices(socket,indices)
{

var options = {
		host: 'www.google.com',
		port: 80,
		path: '/finance/info?&infotype=infoquoteall&q='+indices
	};
		
	http.get(options,function(response){
		response.setEncoding('utf8');
		var data = "";
	response.on('data', function(chunk) {
			data += chunk;
	}).on('end', function() {
			var index = data;
	 		socket.emit('Index',index); 	
	}).on("error",function(e){
		console.log("Error in fetching Stock data")
	});
	});	
}

function getSector(socket){

var options = {
		host: 'www.nseindia.com',
		port: 80,
		path: '/homepage/Indices1.json'
	};	
http.get(options,function(response){
		response.setEncoding('utf8');
		var data = "";
	response.on('data', function(chunk) {
			data += chunk;
	}).on('end', function() {
			var sector = data;
			// console.log(sector);
	 		socket.emit('Sector',sector); 	
	}).on("error",function(e){
		console.log("Error in fetching Stock data")
	});
});	

}
//creating new twit instance and giving all configuration params
var T = new Twit({
  consumer_key: configTweet.twitter.consumerKey,
  consumer_secret: configTweet.twitter.consumerSecret,
  access_token: configTweet.twitter.accessToken,
  access_token_secret: configTweet.twitter.accessTokenSecret
})

// socket.io on and emit to get tweets
function gettweet(socket,symbol){

// console.log(symbol);
  var today = new Date();

	// T.get('search/tweets', { q: '' + symbol + ' -filter:retweets lang:en since:' + today.getFullYear() + '-' +
 //      (today.getMonth() + 1) + '-' + (today.getDate()-2), count:30}, function(err, data, response) {
  // T.get('search/tweets',{q:symbol,count:50},function(err,data,response){
  	T.get('search/tweets', { q: '' + symbol + ' -filter:retweets lang:en', count:30}, function(err, data, response) {
  	socket.emit('newTweet',data);

})

}


function getmfschemeid(id){

var query = "http://portal.amfiindia.com/RssNAV.aspx?mf="+id;
	feed(query, function(err, schemes) {
		if (err) {
			throw err;
		}
		
		for (var i = 0; i < schemes.length; i++) 
		{

			var link = schemes[i].link;
			var schemeId = link.substring(link.length - 6);
			var title = schemes[i].title;
			var length = schemes.length;
			//title = title.substring(6,title.length)
			var writer = csv.createCsvStreamWriter(fs.createWriteStream('scheme.csv',{'flags': 'a'}));
			writer.writeRecord([schemeId,title,link,length]);  
			//sId.push(schemeId); 
		}


});
}

var mfhistory = mongoose.model('mfhistory');

app.post('/mf/:nav_number/:scheme',function(req,res,done){
	
	var code = String(req.params.scheme);
   // console.log(code);
  mfhistory.find({"nav_code" : code},function(err, data) {
    if (err) return done(err);
 	if (!data) return done(new Error('Failed to load fund ' + code));
 	// console.log(data);
    res.json(data);
    done();
  });
});