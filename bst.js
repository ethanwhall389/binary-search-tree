class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}


class Tree {
    constructor(unsortedArray) {
        const array = mergeSort(unsortedArray);
        this.root = this.buildTree(array);
    }


    buildTree(array) {
        //find midpoint
        //create a root node using the midpoint
        //recursive call to the left using midpoint-1 as end
        //recursive call to the left using midpoint+1 as start
        //return the created node

        // const array = sortArray(unsortedArray);


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

//sorts array, removes duplicates
function mergeSort (array) {
  if (array.length === 1) return array;

  const mid = Math.floor((array.length) / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  const sortedArray = [];
  while (sortedLeft.length > 0 && sortedRight.length > 0) {
    if (sortedLeft[0] === sortedRight[0]) {
      sortedArray.push(sortedLeft[0]);
      sortedLeft.shift();
      sortedRight.shift();
    } else if (sortedLeft[0] < sortedRight[0]) {
      sortedArray.push(sortedLeft[0]);
      sortedLeft.shift();
    } else {
      sortedArray.push(sortedRight[0]);
      sortedRight.shift();
    }
  }

  return sortedArray.concat(sortedLeft, sortedRight);
}





const array = [1, 4, 2, 5, 9, 6, 3, 5];

const bst = new Tree(array);

prettyPrint(bst.root);

