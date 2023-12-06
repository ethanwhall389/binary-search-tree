class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}


class Tree {
    constructor(sortedArray) {
        this.root = this.buildTree(sortedArray);
    }

    buildTree(array) {
        //find midpoint
        //create a root node using the midpoint
        //recursive call to the left using midpoint-1 as end
        //recursive call to the left using midpoint+1 as start
        //return the created node

        const start = 0;
        const end = array.length - 1;

        if (start > end) return null;

        const midpoint = Math.floor((start + end) / 2);
        const rootNode = new Node(array[midpoint]);

        const leftArray = array.slice(0, midpoint);
        const rightArray = array.slice(midpoint+1);
        rootNode.leftChild = this.buildTree(leftArray);
        rootNode.rightChild = this.buildTree(rightArray);
        return rootNode;
    }
}


function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};




const array = [1, 2, 4, 5, 6, 7, 9];

const bst = new Tree(array);

prettyPrint(bst.root);

