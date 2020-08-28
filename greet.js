module.exports = function greetFactory() {

    var namesListedMap = {};

    function reset() {
        namesListedMap = {};
    }

    function addMap(name) {

        var characters = /[^A-Za-z]/g;
        var newName = name.replace(characters, "")
        var capital = newName[0].toUpperCase() + newName.slice(1).toLowerCase();

        if (namesListedMap[capital] === undefined){
        namesListedMap[capital] = 0;
        } else {
        namesListedMap[capital]++;
       } return namesListedMap[capital]
    }

    function noName(name){
      if (name === ""){
      return "no name";
        }
    }

    function language(name, lang) {
        var characters = /[^A-Za-z]/g;
        var newName = name.replace(characters, "")
        var capital = newName[0].toUpperCase() + newName.slice(1).toLowerCase();


        if (name !== "") {
            if (lang === "English") {
              return "Hello, " + capital;
            }
            else if (lang === "Afrikaans") {
             return "Halo, " + capital;
            }
            else if (lang === "isiXhosa") {
            return "Molo, " + capital;
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
 
    }
}
