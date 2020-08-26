let express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFactory = require('./greet');

let app = express();
const greet = greetFactory();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
     res.render('index',);
});

app.post('/greet', function(req,res){
     const regName = req.body.nameItem;
     const regLang = req.body.langItem;

     const error = greet.noName(req.body.nameItem);
     const parsed = JSON.parse(JSON.stringify(req.body));
     console.log(parsed);
     const displayGreeting = greet.language(regName, regLang);

     if(error){
     req.flash('info', 'No name entered');
     }

     const list = greet.listed(req.body.nameItem);
     const greetedList = greet.allNames();
     console.log(req.body.langItem)

     const countUsers = greet.countNames(req.body);
     res.render('index', {display:displayGreeting});
});

app.get('/greeted', function(req, res){

     const greetedList = greet.allNames();

     res.render('greeted', {greetedList});
});

app.get('/counter', function(req, res){
     const regName = req.params.nameItem;
     const regLang = req.params.langItem;

     const display = greet.language(regName, regLang);
     
     res.render('counter', {display});
});

app.get('/counter/:userNames', function(req, res){

     const countUsers = greet.countNames(req.body);

   res.render('index', {countUsers});
});

app.post("/reset", function(req, res) {
     greet.reset();
     res.redirect("/");
})

let PORT = process.env.PORT || 3050;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
