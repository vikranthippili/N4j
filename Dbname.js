const neo4j = require('neo4j-driver');

// Define the connection details, including the graph namespace (database name)
const uri = 'bolt://localhost:7687'; // Replace with your Neo4j server URI
const user = 'your_username';
const password = 'your_password';
const databaseName = 'your_database_name'; // Replace with the desired database name

// Create a Neo4j driver instance with the specified database name
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  database: databaseName
});

// Rest of the code remains the same
