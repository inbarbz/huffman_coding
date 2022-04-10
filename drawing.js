
function myFunction() {
  const node = renderToHtml([
    [{ letters: "a", count: "5" }, { letters: "b", count: "4" }], // element 1 (made up of 2 nodes)
    [{ letters: "z", count: "3" }], // element 2
    [{ letters: "u", count: "1" }]  // element 3
  ]);
  // Append the "li" node to the list:
  document.getElementById("add_it_here").appendChild(node);
}

let current_step = 0;
let nodes = null;


window.onload = (event) => {
  console.log('Page is loaded!');
  start_game();
};


function start_game() {
  current_step = 0;
  draw_current_step();
}

function prev_step() {
  if (current_step > 0) current_step--;
  const step_number_element = document.getElementById("step_number")
  step_number_element.innerHTML = current_step

  if (current_step > 0)
    combine_least_frequent()

  draw_current_step();
}

function next_step() {
  if (current_step < 10) current_step++;
  const step_number_element = document.getElementById("step_number")
  step_number_element.innerHTML = current_step

  draw_current_step();
}

function draw_current_step() {
  if (current_step == 0) {
    return;
  }
  if (current_step == 1) {
    const huffman_text_element = document.getElementById("huffman_text_id")
    console.log('huffman_text_element = ' + huffman_text_element.value)
    huffman_nodes = get_frequencies(huffman_text_element.value);
  } else {
    huffman_nodes = combine_least_frequent(huffman_nodes);
  }
  if (huffman_nodes.length == 1) {
    assignHuffmanCoding(huffman_nodes);
  }
  console.log(huffman_nodes);

  const row = renderToHtml(huffman_nodes);
  console.log(row);

  const huffman_tree_element = document.getElementById("huffman_tree_id");
  huffman_tree_element.innerHTML = "";
  huffman_tree_element.appendChild(row);

  //const htmlLine = connect_elements_with_line(document.getElementById('node-1'), document.getElementById('node-2'), 'blue', 3);
  // huffman_tree_element.innerHTML += htmlLine;


}

function traverseTree(node, child = true) {
  const div = document.createElement("div");

  div.appendChild(getNodeAsHtml(node.letters.join(','), node.count, node.huffmanCode));

  div.appendChild(document.createElement("table"));
  const tr = document.createElement("tr");
  div.appendChild(tr);
  if (node.left != undefined) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const left = traverseTree(node.left);
    td.appendChild(left);
  }
  if (node.right != undefined) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const right = traverseTree(node.right);
    td.appendChild(right);
  }
  return div;
}

// returns a table with one Row
// it get's an array of arrays of objects
function renderToHtml(nodes) {
  const table_node = document.createElement("table");
  const tr_node = document.createElement("tr");
  table_node.appendChild(tr_node);

  for (let i = 0; i < nodes.length; i++) {
    const td_node = document.createElement("td");
    td_node.appendChild(traverseTree(nodes[i]));
    tr_node.appendChild(td_node);
  }

  return table_node;
}

function getLine() {
  const node1 = document.getElementById("node-1").getBoundingClientRect();
  const node2 = document.getElementById("node-2").getBoundingClientRect();
  const line_div = document.createElement("div");
  line_div.classList.add("line");
  line_div.setAttribute("top", node1.y);
  line_div.setAttribute("left", node1.x);
  line_div.setAttribute("width", node2.x - node1.x);
  line_div.setAttribute("height", Math.max(node2.y - node1.y, 2));

  return line_div;
}

function getNodeAsHtml(letters, count, huffmanCode) {

  // Create an "li" node:
  const node = document.createElement("div");

  // Create a text node:
  const letters_node = document.createTextNode(letters);
  const count_node = document.createTextNode(count);
  const huffman_node = document.createTextNode(" (" + huffmanCode + ")");
  const br_node = document.createElement("br");

  node.appendChild(letters_node);
  node.appendChild(br_node);
  node.appendChild(count_node);
  if (huffmanCode != undefined) {
    node.appendChild(huffman_node);
  }
  node.classList.add("nodeClass");
  node.setAttribute("id", "node-" + letters);

  return node;
}



