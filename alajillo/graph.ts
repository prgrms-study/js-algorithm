// 그래프 용어
// 정접 vertex : 그래프를 형성하는 노드
// 간선 edge : 그래프에서 노드 간의 연결
// 정점 차수 degree of vertex : 정점에 연결된 간선의 개수
// 가중치 weight : 간선에 대한 값으로 문맥에 따라 다양한 해석 가능

// 그래프 종류
// 희소 그래프 sparse graph :  정점들 간에 가능한 연결중 일부분만 존재하는 그래프
// 밀집 그래프 dense graph : 다양한 정점들 간에 연결이 많은 그래프
// 순환 그래프 cyclical graph : 순환하는 구조를 가진 지향성 그래프

function isEmpty(obj: Edges) {
  return Object.keys(obj).length === 0;
}

function extractMinNode(Q: Edges, dist: Dist) {
  let minDistance: number | string = Infinity;
  let nodeWithMinDist: string = null;
  for (const node in Q) {
    if (dist[node] <= minDistance) {
      minDistance = dist[node];
      nodeWithMinDist = node;
    }
  }
  return nodeWithMinDist;
}
// 무지향성 그래프
interface Dist {
  [key: number | string]: number | string;
}
interface Edges {
  [vertex1: number | string]: { [vertex2: number | string]: number | string };
}
// {
//     1 : {
//         2 : 3
//     },
//     3 : {
//         4 : 5
//     }
// }
class Graph {
  edges: Edges;
  constructor() {
    this.edges = {};
  }
  addVertex(vertex: number | string) {
    this.edges[vertex] = {};
  }
  bfsSearch(vertex: number | string, fn: (vertex: number | string) => void) {
    const queue = [vertex];
    const visited = {};
    while (queue.length) {
      const currentVertex = queue.shift();
      if (!visited[currentVertex]) {
        visited[currentVertex] = true;
        fn(currentVertex);
        Object.keys(this.edges[currentVertex]).forEach((adj: string) => {
          queue.push(parseInt(adj));
        });
      }
    }
  }
  //     1
  //  2     3
  //4
  // stack : []
  // dfs : [1,3,2,4]
  // currentVertex : 2
  dfsSearch(vertex: number | string, fn: (vertex: number | string) => void) {
    const stack = [vertex];
    const visited = {};
    while (stack.length) {
      const currentVertex = stack.pop();
      if (!visited[currentVertex]) {
        visited[currentVertex] = true;
        Object.keys(this.edges[currentVertex]).forEach((obj: string) => {
          stack.push(parseInt(obj));
        });
        fn(currentVertex);
      }
    }
  }
}

class UndirectedGraph extends Graph {
  constructor() {
    super();
  }
  addEdge(vertex1: number | string, vertex2: number | string, weight = 0) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
  removeEdge(vertex1: number | string, vertex2: number | string) {
    delete this.edges?.[vertex1]?.[vertex2];
    delete this.edges?.[vertex2]?.[vertex1];
  }
  removeVertex(vertex: number | string) {
    Object.keys(this.edges[vertex]).forEach((adj: string) => {
      this.removeEdge(parseInt(adj), vertex);
    });
    delete this.edges[vertex];
  }
}

const graph1 = new UndirectedGraph();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(1, 2, 1);
graph1.addEdge(2, 3, 8);
graph1.addEdge(3, 4, 10);
graph1.addEdge(4, 5, 100);
graph1.removeVertex(5);
graph1.removeEdge(1, 2);
// console.log(graph1);

// 지향성 그래프
class DirectedGraph extends Graph {
  constructor() {
    super();
  }
  addEgde(
    originVertex: number | string,
    destinationVertex: number | string,
    weight = 0
  ) {
    this.edges[originVertex][destinationVertex] = weight;
  }
  removeEdge(
    originVertex: number | string,
    destinationVertex: number | string
  ) {
    delete this.edges?.[originVertex]?.[destinationVertex];
  }
  removeVertex(vertex: number | string) {
    Object.keys(this.edges[vertex]).forEach((adj: string) => {
      this.removeEdge(parseInt(adj), vertex);
    });
    delete this.edges[vertex];
  }
  Dijkstra(soruce) {
    const path: any = {};
    const Q = {};
    const dist = {};
    for (const vertex in this.edges) {
      dist[vertex] = Infinity;
      Q[vertex] = this.edges[vertex];
    }
    dist[soruce] = 0;
    while (!isEmpty(Q)) {
      const u = extractMinNode(Q, dist);
      delete Q[u];

      for (const adj in this.edges[u]) {
        const alt = dist[u] + this.edges[u][adj];
        if (alt < dist[adj]) {
          dist[adj] = alt;
          path[adj] = [...(path[u] || []), adj];
        }
      }
    }
    return {
      dist,
      path,
    };
  }
}

const graph = new DirectedGraph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('Z');
graph.addEgde('A', 'B', 4);
graph.addEgde('A', 'C', 8);
graph.addEgde('B', 'D', 5);
graph.addEgde('B', 'C', 1);
graph.addEgde('C', 'D', 8);
graph.addEgde('C', 'E', 10);
graph.addEgde('D', 'Z', 2);
graph.addEgde('E', 'D', 2);
graph.addEgde('E', 'Z', 3);
const { path, dist } = graph.Dijkstra('A');
console.log(path);
console.log(dist);
// graph.bfsSearch(1, (vertex: number | string) => {
//   console.log(vertex);
// });
// graph.dfsSearch(1, (vertex: number | string) => {
//   console.log(vertex);
// });
