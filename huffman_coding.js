

let huffman_nodes = null;

// return a list of objects
function get_frequencies(str) {
    let letters = str.split('').sort();
    let counter = 0;
    let frequencies = [];
    let prev_letter = letters[0];
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] == prev_letter) {
            counter++;
        }
        else {
            if (prev_letter == ' ') prev_letter = 'space';
            frequencies.push({
                letters: [prev_letter],
                count: counter
            });
            counter = 1;
            prev_letter = letters[i];
        }

    }
    //report the last letter in the letters array
    frequencies.push({
        letters: [prev_letter],
        count: counter
    });
    return frequencies.sort((a, b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0));;
}

// combine 2 objects into 1
function combine_objects(node_1, node_2) {
    return ({
        letters: node_1.letters.concat(node_2.letters),
        count: node_1.count + node_2.count,
        left: node_1,
        right: node_2
    });
}

// takes an array of objects [{letters: ['a','b'], count: 5}]
// return array of objects combining the 2 least frequent elements
function combine_least_frequent(nodes) {
    if (nodes.length <= 1) return nodes;
    const sorted_nodes = nodes.sort((a, b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0));
    return [combine_objects(sorted_nodes[0], sorted_nodes[1])].concat(sorted_nodes.slice(2, sorted_nodes.length));
}


function assignHuffmanCoding(node) {
    if (Array.isArray(node)) {
        node = node[0];
    }

    if (node.huffmanCode == undefined) {
        node.huffmanCode = "0";
    }
    if (node.left != undefined) {
        node.left.huffmanCode = node.huffmanCode + "0";
        node.right.huffmanCode = node.huffmanCode + "1";
        assignHuffmanCoding(node.left);
        assignHuffmanCoding(node.right);
    }


}