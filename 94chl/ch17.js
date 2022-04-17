function UndirectedG() {
  this.edges = {};
}

UndirectedG.prototype.addVertex = function (v) {
  this.edges[v] = {};
};

UndirectedG.prototype.addEdge = function (v1, v2, weight) {
  if (!weight) weight = 0;
  this.edges[v1][v2] = weight;
  this.edges[v2][v1] = weight;
};

const graph1 = new UndirectedG();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addEdge(1, 2, 1);
console.log(graph1.edges);
graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(2, 3, 8);
graph1.addEdge(3, 4, 10);
graph1.addEdge(4, 5, 100);
graph1.addEdge(1, 5, 88);
console.log(graph1.edges);

UndirectedG.prototype.removeEdge = function (v1, v2) {
  if (this.edges[v1] && this.edges[v1][v2]) {
    delete this.edges[v1][v2];
  }
  if (this.edges[v2] && this.edges[v2][v1]) {
    delete this.edges[v2][v1];
  }
};

UndirectedG.prototype.removeVertex = function (v) {
  for (let vertex in this.edges[v]) {
    this.removeEdge(vertex, v);
  }
  delete this.edges[v];
};

const graph2 = new UndirectedG();
graph2.addVertex(1);
graph2.addVertex(2);
graph2.addEdge(1, 2, 1);
console.log({ ...graph2.edges });
graph2.addVertex(3);
graph2.addVertex(4);
graph2.addVertex(5);
graph2.addEdge(2, 3, 8);
graph2.addEdge(3, 4, 10);
graph2.addEdge(4, 5, 100);
graph2.addEdge(1, 5, 88);
console.log({ ...graph2.edges });

graph2.removeVertex(5);
graph2.removeVertex(1);
graph2.removeEdge(2, 3);
console.log({ ...graph2.edges });

function DirectedG() {
  this.edges = {};
}

DirectedG.prototype.addVertex = function (v) {
  this.edges[v] = {};
};

DirectedG.prototype.addEdge = function (fromV, destV, weight) {
  if (!weight) weight = 0;
  this.edges[fromV][destV] = weight;
};

DirectedG.prototype.removeEdge = function (fromV, destV) {
  if (this.edges[fromV] && this.edges[fromV][destV]) {
    delete this.edges[fromV][destV];
  }
};

DirectedG.prototype.removeVertex = function (v) {
  for (let vertex in this.edges[v]) {
    this.removeEdge(vertex, v);
  }
  delete this.edges[v];
};

const graph3 = new DirectedG();
graph3.addVertex("A");
graph3.addVertex("B");
graph3.addVertex("C");
graph3.addEdge("A", "B", 1);
graph3.addEdge("B", "C", 2);
graph3.addEdge("C", "A", 3);
graph3.addVertex("D");
graph3.addVertex("E");
graph3.addEdge("D", "E", 100);
console.log({ ...graph3.edges });

graph3.removeVertex("D");
graph3.removeVertex("E");
graph3.removeEdge("B", "C");
console.log({ ...graph3.edges });

graph3.addEdge("B", "C", 2);
graph3.addVertex("D");
graph3.addVertex("E");
graph3.addEdge("A", "D", 10);
graph3.addEdge("C", "E", 50);
graph3.addEdge("B", "E", 100);

DirectedG.prototype.bfs = function (v, fn) {
  const q = [];
  const visited = {};

  q.push(v);

  while (q.length) {
    v = q.shift();
    if (!visited[v]) {
      visited[v] = true;
      console.log(fn(v));
      for (let vertex in this.edges[v]) {
        q.push(vertex);
      }
    }
  }
};

console.log({ ...graph3 });
graph3.bfs("A", (v) => v);

DirectedG.prototype.dfs = function (v, fn) {
  const visited = {};

  this._dfs(v, visited, fn);
};

DirectedG.prototype._dfs = function (v, visited, fn) {
  visited[v] = true;

  console.log(fn(v));

  for (let vertex in this.edges[v]) {
    if (!visited[vertex]) {
      this._dfs(vertex, visited, fn);
    }
  }
};

console.log({ ...graph3 });
graph3.dfs("A", (v) => v);
