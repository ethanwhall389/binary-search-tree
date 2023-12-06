class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}


class Tree {
    constructor(unsortedArray) {
        this.root = this.buildTree(unsortedArray);
    }

    buildTree(unsortedArray) {
        //find midpoint
        //create a root node using the midpoint
        //recursive call to the left using midpoint-1 as end
        //recursive call to the left using midpoint+1 as start
        //return the created node

        const array = sortArray(unsortedArray);

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

//TRY USING A DIFFEREND SORT ALGORITHM OTHER THAN MERGE SORT
// function sortArray(array) {
//     //divide array in half

//     if (array.length === 0) return array[0];

//     const mid = Math.floor((0 + array.length-1) / 2);
//     const leftHalf = array.slice(0, mid);
//     const rightHalf = array.slice(mid);


//     sortArray(leftHalf);
//     sortArray(rightHalf);


// }




const array = [1, 2, 4, 5, 6, 7, 9];

const bst = new Tree(array);

prettyPrint(bst.root);

