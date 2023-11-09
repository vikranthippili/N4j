// Example Neo4j response data
const neo4jResponse = {
  records: [
    {
      keys: ['n', 'r', 'm'],
      length: 3,
      _fields: [
        {
          identity: { low: 1, high: 0 },
          labels: ['Node'],
          properties: { name: 'Node A' },
        },
        {
          identity: { low: 2, high: 0 },
          start: { low: 1, high: 0 },
          end: { low: 3, high: 0 },
          type: 'CONNECTED_TO',
          properties: { weight: 10 },
        },
        {
          identity: { low: 3, high: 0 },
          labels: ['Node'],
          properties: { name: 'Node B' },
        },
      ],
      _fieldLookup: { n: 0, r: 1, m: 2 },
    },
    // Additional records...
  ],
};

// Transform Neo4j response to nodes and edges format
function transformNeo4jDataToOgmaFormat(neo4jData) {
  const nodes = {};
  const edges = [];

  neo4jData.records.forEach(record => {
    const [nodeA, edge, nodeB] = record._fields;

    // Helper function to add nodes to the nodes object
    const addNode = (node) => {
      if (!nodes[node.identity.low]) {
        nodes[node.identity.low] = { id: node.identity.low, label: node.labels[0], properties: node.properties };
      }
    };

    // Add nodes to the nodes object
    addNode(nodeA);
    addNode(nodeB);

    // Add edge to the edges array
    if (edge) {
      edges.push({
        id: edge.identity.low,
        source: edge.start.low,
        target: edge.end.low,
        label: edge.type,
        properties: edge.properties,
      });
    }
  });

  return { nodes: Object.values(nodes), edges };
}

// Call the transformation function
const ogmaData = transformNeo4jDataToOgmaFormat(neo4jResponse);
console.log(ogmaData);
