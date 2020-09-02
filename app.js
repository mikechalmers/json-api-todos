var   express     = require('express'),
      app         = express(),
      port        = process.env.PORT || 3000,
      bodyParser  = require('body-parser');

// body parser setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// route files

var todoRoutes  = require('./routes/todos');

app.get('/', function(req, res){
  res.json({message: "Hi from root route"});
});

app.use('/api/todos', todoRoutes);

app.listen(port, function(){
  console.log("I awaken");
});
