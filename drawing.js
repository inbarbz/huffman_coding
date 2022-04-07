
function myFunction() {
	const node = getRow([
  	[{letters: "a", count: "5"}, {letters: "b", count: "4"}], // element 1 (made up of 2 nodes)
  	[{letters: "z", count: "3"}], // element 2
  	[{letters: "u", count: "1"}]  // element 3
  ]);
  // Append the "li" node to the list:
	document.getElementById("add_it_here").appendChild(node);
}

// returns a table with one Row
// it get's an array of arrays of objects
function getRow(nodes) {
	const table_node = document.createElement("table");
  const tr_node = document.createElement("tr");
  table_node.appendChild(tr_node);
  
  for (let i=0; i<nodes.length; i++) {
  	const td_node = document.createElement("td");
    for (let j=0; j<nodes[i].length; j++) {
      td_node.appendChild(getNode(nodes[i][j].letters, nodes[i][j].count));
    }
  	tr_node.appendChild(td_node);
  }
  
  return table_node;
}


function getNode(letters, count) {

// Create an "li" node:
const node = document.createElement("div");

// Create a text node:
const letters_node = document.createTextNode(letters);
const count_node = document.createTextNode(count);
const br_node = document.createElement("br");

node.appendChild(letters_node);
node.appendChild(br_node);
node.appendChild(count_node);
node.classList.add("nodeClass");

return node;
}



