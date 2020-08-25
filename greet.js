module.exports = function greetFactory(savedState) {

    var namesListedMap = savedState || [];

    function reset() {
        namesListedMap = [];
    }

    function listed(name) {
      var nameList = namesListedMap;
      const addName = nameList.push(name) 
        console.log(nameList);
        if (name !== ""){
        for (var i=0;i<nameList.length;i++){
        // var vertList = nameList[i];
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

    function simpleGreet(name){
      var displayedGreeting = "Hello, " + name; 

      if (name !== ""){
      return displayedGreeting;
}
}
    
    function language(name, lang) {
        var Eng = "Hello, " + name;
        var Afr = "Halo, " + name;
        var Xho = "Molo, " + name;

        if (name !== "" && lang !== "") {
            if (lang === "English") {
                return Eng;
            }
            else if (lang === "Afrikaans") {
                return Afr;
            }
            else if (lang === "isiXhosa") {
                return Xho;
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
        simpleGreet,
        noName,
        listed
    }
}
