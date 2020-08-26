module.exports = function greetFactory() {

    var namesListedMap = [];

    function reset() {
        namesListedMap = [];
    }

    function listed(name) {
      var nameList = namesListedMap;
      const addName = nameList.push(name)
        console.log(nameList);
        if (name !== ""){
        for (var i=0;i<nameList.length;i++){
           return addName;
        }
      }
    }

    function addMap(name) {
        if (namesListedMap[name] === undefined){
        namesListedMap[name] = 1;
        }
    }

    function noName(name){
      if (name === ""){
      return "no name";
        }
    }

    function language(name, lang) {
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

    function regex(nameInput) {
        var characters = /[^A-Za-z]/g;
        if (nameInput !== "") {
        var newName = nameInput.replace(characters, "")
        var capital = newName[0].toUpperCase() + newName.slice(1).toLowerCase();
        return capital;
     }
    return "";
    }

    function allNames() {
        return namesListedMap;
    }

    return {
        reset,
        addMap,
        language,
        countNames,
        regex,
        allNames,
        noName,
        listed,
    }
}
