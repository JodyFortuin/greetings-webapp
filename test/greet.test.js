let assert = require("assert");
let greetFactory = require("../greet");

describe("Greet Unit Test", function() {
  
  it("should greet name entered (Kyle)", function() {
    
    var greetName = greetFactory();
   
    assert.equal("Hello, Kyle", greetName.language('Kyle', 'English'));
  });

  it("should greet in the language chosen (English)", function() {

    var greetName = greetFactory();  

    assert.equal('Hello, Jack', greetName.language('Jack', 'English'));
  });


  it("should greet in the language chosen (Afrikaans)", function() {

    var greetName = greetFactory();   

    assert.equal('Halo, James', greetName.language('James', 'Afrikaans'));
  });


  it("should greet in the language chosen (isiXhosa)", function() {

    var greetName = greetFactory();

    assert.equal('Molo, Julien', greetName.language('Julien', 'isiXhosa'));

  });
  

  it("should return the count of names greeted (3)", function() {

    var greetName = greetFactory();

    greetName.addMap('Jody');
    greetName.addMap('Julien');
    greetName.addMap('James');

    assert.equal(3, greetName.countNames());

  });

});
