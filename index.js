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
     const displayGreeting = greet.language(regName, regLang);

     if(error){
     req.flash('info', 'No name entered');
     }

     const list = greet.addMap(req.body.nameItem);
     const greetedList = greet.allNames();

     const countUsers = greet.countNames(req.body);
     res.render('index', {
                display:displayGreeting,
                countUsers: countUsers});
});

app.get('/greeted', function(req, res){
     const greetedList = Object.keys(greet.allNames());
     console.log(greetedList)

     res.render('greeted', {name: greetedList});
});

app.get('/counter/:nameItem', function(req, res){

    const displayName = req.params.nameItem;
    const count = greet.addMap(req.params.nameItem);

   res.render('counter', {displayName, count});
});

app.post("/reset", function(req, res) {
     greet.reset();
     res.redirect("/");
})

let PORT = process.env.PORT || 3060;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
