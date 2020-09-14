const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request =  require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//api call Function
function call_api(finishedAPI , ticker){
	request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_95d0c7f25e1545b0bbd89b11a6d9485a', {json: true}, (err, res, body)=>{
	if(err){return console.log(err);}
	if(res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});	
};

//Set handlebars Middleware
app.engine('handlebars' , exphbs());
app.set('view engine', 'handlebars');

//Set handlebars indexGet route
app.get('/',function(req, res){
	call_api(function(doneAPI){
		res.render('home', { 
		stock: doneAPI
		});
	},"fb");
	
})

// here call_api(function [on line 43], req.body.stock_ticker;)
//Set handlebars index Post route
app.post('/',function(req, res){
	call_api(function(doneAPI){res.render('home', {stock: doneAPI});} ,  
		req.body.stock_ticker);
	
})
//start of about page

app.get('/about.html',function(req, res){
	res.render('about',);
})
// Set static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, ()=> console.log('Server listening on port '+ PORT));


// api stock exchange key
// pk_95d0c7f25e1545b0bbd89b11a6d9485a