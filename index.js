let express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFactory = require('./greet');

let app = express();
const greet = greetFactory();

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://kali:pg123@localhost:5432/greetings';

const pool = new Pool({
     connectionString
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
     secret: "<add a secret string here>",
     resave: false,
     saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async function (req, res) {

     const usernames = await greet.getData();
     console.log(usernames)
     res.render('index', { usernames});
});

app.post('/greet', async function (req, res) {
     const regName = req.body.nameItem;
     const regLang = req.body.langItem;

     const error = greet.noName(req.body.nameItem);
     const parsed = JSON.parse(JSON.stringify(req.body));
     const displayGreeting = greet.language(regName, regLang);

     if (error) {
          req.flash('info', 'No name entered');
     }

     const list = greet.addMap(req.body.nameItem);

//     const countUsers = greet.countNames(req.body);
   //  const countUsers = await greet.getMainCount();
     const name = req.body.nameItem;

     if (name) {
          await greet.addData({ name });
     }

     const usernames = await greet.getData();

     const countUsers = await greet.getMainCount();

     res.render('index', {
          display: displayGreeting,
          countUsers,
          name,
          usernames
     });
});

app.get('/greeted', async function (req, res) {
     const greetedList = Object.keys(greet.allNames());
     console.log(greetedList)

     res.render('greeted', { name: greetedList });
});

app.get('/counter/:nameItem', async function (req, res) {

     const displayName = req.params.nameItem;
     const name = req.body.nameItem;

     //const count = greet.addMap(req.params.nameItem);
     const count = await greet.getUserCount(displayName);

     res.render('counter', { displayName, count});
});

app.post("/reset", async function (req, res) {
     greet.reset();
     await greet.resetBtn();
     res.redirect("/");
})

let PORT = process.env.PORT || 3060;

app.listen(PORT, function () {
     console.log('App starting on port', PORT);
});
