module.exports = function greetFactory(savedState) {

    var namesListedMap = savedState || {};

    function reset() {
        namesListedMap = {};
    }

    function listed(name) {
      var nameList = namesListedMap;
        console.log(nameList);
        if (name !== ""){
        for (var i=0;i<nameList.length;i++){
        nameList.push(name);
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
    
    function language(name, langItem) {
        if (name !== "" && langItem !== "") {
            if (langItem === "English") {
                return "Hello, " + name;
            }
            else if (langItem === "Afrikaans") {
                return "Halo, " + name;
            }
            else if (langItem === "isiXhosa") {
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
        simpleGreet,
        noName,
        listed
    }
}
