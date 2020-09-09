let assert = require("assert");
let greetFactory = require("../greet");

describe("Greet Database Unit Test", function() {

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';
const pool = new Pool({
	connectionString
});

const INSERT_QUERY = "insert into users (name, greet_count) values ($1, $2)";

beforeEach(async function () {
	await pool.query("delete from users");
  });


  it("should greet name entered (Kyle)", async function() {

    let greetName = greetFactory(pool);

    assert.equal("Hello, Kyle", greetName.language('Kyle', 'English'));
  });

  it("should be able to add a bookings", async function () {

	await pool.query(INSERT_QUERY, ["Jack", 4]);

	const results = await pool.query("select * from users where name = $1", ["Jack"]);

	assert.equal(0, results.rows[1].name);

  });

  it("should greet in the language chosen (English)", async function() {

    let greetName = greetFactory(pool);

    assert.equal('Hello, Jack', greetName.language('Jack', 'English'));
  });


  it("should greet in the language chosen (Afrikaans)", async function() {

    let greetName = greetFactory(pool);

    assert.equal('Halo, James', greetName.language('James', 'Afrikaans'));
  });


  it("should greet in the language chosen (isiXhosa)", async function() {

    let greetName = greetFactory(pool);

    assert.equal('Molo, Julien', greetName.language('Julien', 'isiXhosa'));

  });


  it("should return the count of names greeted (3)", async function() {

    let greetName = greetFactory(pool);

    await greetName.addMap('Jody');
    await greetName.addMap('Julien');
    await greetName.addMap('James');

    assert.equal(3, greetName.countNames());


  });

});
