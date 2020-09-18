module.exports = function greetFactory() {

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://kali:pg123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
  });


    var namesListedMap = {};

    function reset() {
        namesListedMap = {};
    }

    function addMap(name) {

//        var characters = /[^A-Za-z]/g;
  //      var newName = name.replace(characters, "")
    //    var capital = newName[0].toUpperCase() + newName.slice(1).toLowerCase();

        if (namesListedMap[name] === undefined){
        namesListedMap[name] = 0;
        } else {
        namesListedMap[name]++;
       } return namesListedMap[name]
    }

    async function addData(userValue){
           const nameValue = await pool.query("select greet_count from users where name = $1",[userValue.name]);
           const INSERT_QUERY = "insert into users(name, greet_count) values ($1, 1)";
           const INCREMENT = "update users set greet_count = greet_count + 1 where name = $1"
           if (nameValue.rowCount > 0){
           await pool.query(INCREMENT, [userValue.name]);
           } else {
           await pool.query(INSERT_QUERY, [userValue.name]);

        }
    }

    async function getData(){
           const usernames = await pool.query('select name, greet_count as count from users');
           return usernames.rows;
    }

    async function resetBtn(){
           const DELETE_QUERY = "delete from users";
           await pool.query(DELETE_QUERY);
    }

    async function getUserCount(user){
           const userCount = await pool.query("select greet_count from users where name = $1", [user]);
           return userCount.rows[0].greet_count;
    }

    async function getMainCount(){
           const COUNT_QUERY = await pool.query("select id from users");
           return COUNT_QUERY.rowCount;
    }

    function noName(name){
      if (name === ""){
      return "no name";
        }
    }

    function language(name, lang) {
//        var characters = /[^A-Za-z]/g;
  //      var newName = name.replace(characters, "")
    //    var capital = newName[0].toUpperCase() + newName.slice(1).toLowerCase();


        if (name !== "") {
            if (lang === "English") {
              return "Hello, " + name;
            }
            else if (lang === "Afrikaans") {
             return "Halo, " + name;
            }
            else if (lang === "isiXhosa") {
            return "Molo, " + name;
            }
         }
      }

    function countNames() {
        var greetTotal = Object.keys(namesListedMap)
        return greetTotal.length;
    }

/*    function regex(nameInput) {
        var characters = /[^A-Za-z]/g;
        if (nameInput !== "") {
        var newName = nameInput.replace(characters, "")
        var capital = newName[0].toUpperCase() + newName.slice(1).toLowerCase();
        return capital;
     }
    return "";
    }
*/
    function allNames() {
       console.log(namesListedMap)
        return namesListedMap;
    }

    return {
        reset,
        addMap,
        language,
        countNames,
        allNames,
        noName,
        addData,
        getData,
        resetBtn,
        getMainCount,
        getUserCount
    }
}
