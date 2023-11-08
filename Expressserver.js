const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();

// Set up the Neo4j driver and connect to the database
const uri = 'bolt://localhost:7687'; // Replace with your Neo4j server URI
const user = 'your_username';
const password = 'your_password';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Create an API endpoint to query Neo4j
app.get('/api/queryNeo4j', async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run('MATCH (n) RETURN n LIMIT 10');
    const data = result.records.map(record => record.get('n').properties);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while querying Neo4j.' });
  } finally {
    session.close();
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
