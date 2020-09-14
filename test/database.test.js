let assert = require("assert");
let greetFactory = require("../greet");

describe("Greet Database Unit Test", function () {

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


  it("should greet name entered (Kyle)", async function () {

    let greetName = greetFactory(pool);

    assert.equal("Hello, Kyle", greetName.language('Kyle', 'English'));
  });


  it("should greet in the language chosen (English)", async function () {

    let greetName = greetFactory(pool);

    assert.equal('Hello, Jack', greetName.language('Jack', 'English'));
  });


  it("should greet in the language chosen (Afrikaans)", async function () {

    let greetName = greetFactory(pool);

    assert.equal('Halo, James', greetName.language('James', 'Afrikaans'));
  });


  it("should greet in the language chosen (isiXhosa)", async function () {

    let greetName = greetFactory(pool);

    assert.equal('Molo, Julien', greetName.language('Julien', 'isiXhosa'));

  });


  it("should return the count of names greeted (3)", async function () {

    let greetName = greetFactory(pool);

    await greetName.addMap('Jody');
    await greetName.addMap('Julien');
    await greetName.addMap('James');

    assert.equal(3, greetName.countNames());


  });

  it("should be able to add a user", async function () {

    await pool.query(INSERT_QUERY, ["Jack", 1]);

    const results = await pool.query("select count(*) from users");

    assert.equal(1, results.rows[0].count);

  });

  it("should be able to find a user", async function () {

    await pool.query(INSERT_QUERY, ["Jack", 3]);

    const results = await pool.query("select * from users where (name, greet_count) = ($1, $2)", ["Jack", 3]);

    assert.equal('Jack', results.rows[0].name);
    assert.equal(3, results.rows[0].greet_count);

  });


  it("should be able to find the greet_count of a user", async function () {

    await pool.query(INSERT_QUERY, ["Jack", 3]);

    const results = await pool.query("select * from users where (name, greet_count) = ($1, $2)", ['Jack', 3]);

    assert.equal(3, results.rows[0].greet_count);

  });

  it("should be able to find the total count for all users greeted", async function () {

    await pool.query(INSERT_QUERY, ["Jack", 1]);
    await pool.query(INSERT_QUERY, ["John", 1]);
    await pool.query(INSERT_QUERY, ["Joe", 1]);
    await pool.query(INSERT_QUERY, ["James", 1]);

    const results = await pool.query("select name from users");

    assert.equal(4, results.rowCount);

  });

});
