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

  insert(value) {
    let temp = this.root;
    let previous = temp;
    while (temp !== null) {
      if (value > temp.data) {
        previous = temp;
        temp = temp.rightChild;
      } else {
        previous = temp;
        temp = temp.leftChild;
      }
    }
    if (value > previous.data) {
      previous.rightChild = new Node(value);
    } else {
      previous.leftChild = new Node(value);
    }
  }

  delete (value) {
    //traverse the tree to the node in question
    let temp = this.root;
    let previous = temp;
    while (temp.data !== value) {
      previous = temp;
      if (value > temp.data) {
        temp = temp.rightChild;
      } else {
        temp = temp.leftChild;
      }
    }

    const children = hasChildren(temp);
    //case one-- node is at the end of tree with no children
    if (children === 0) {
      value > previous.data ? 
      previous.rightChild = null : previous.leftChild = null;
    }

    //case two-- node has one single child
    if (children === 1) {
      if (temp.rightChild !== null) {
        temp.data = temp.rightChild.data;
        temp.rightChild = null;
      } else {
        temp.data = temp.leftChild.data;
        temp.leftChild = null;
      }
    }

    //case three-- node has two children
    if (children === 2) {
      //traversal temp variable
      let traversal = temp.rightChild;
      while(traversal.leftChild !== null) {
        traversal = traversal.leftChild;
      }
      const predecessor = traversal;
      this.delete(traversal.data);
      temp.data = predecessor.data;
    }
  }
}

function hasChildren(root) {
  if (root.leftChild === null && root.rightChild === null) {
    return 0;
  } else if (root.leftChild !== null && root.rightChild !== null) {
    return 2;
  } else if (root.leftChild !== null || root.rightChild !== null) {
    return 1;
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

console.log('Insert 7');
bst.insert(7);

console.log('Delete 1');
bst.delete(1);

prettyPrint(bst.root);

console.log('Delete 2');
bst.delete(2);
prettyPrint(bst.root);

console.log('Delete 6');
bst.delete(6);
prettyPrint(bst.root);

console.log('Delete root (4)');
bst.delete(4);
prettyPrint(bst.root);
