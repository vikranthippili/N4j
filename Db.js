const neo4j = require('neo4j-driver');

// Define the connection details
const uri = 'bolt://localhost:7687'; // Replace with your Neo4j server URI
const user = 'your_username';
const password = 'your_password';

// Create a Neo4j driver instance
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Create a session to perform database operations
const session = driver.session();

// Example: Run a Cypher query
session
  .run('MATCH (n) RETURN n LIMIT 10')
  .then(result => {
    result.records.forEach(record => {
      console.log(record.get('n').properties);
    });
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    // Close the session and driver when done
    session.close();
    driver.close();
  });
