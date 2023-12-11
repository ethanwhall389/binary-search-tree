import { mergeSort, hasChildren } from "./utility-functions.js";

class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}


export default class Tree {
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

  find(value) {
    let temp = this.root;
    while(temp !== null && temp.data !== value) {
      if (value > temp.data) {
        temp = temp.rightChild;
      } else {
        temp = temp.leftChild;
      }
    }
    return temp == null ? null : temp;
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

  levelOrder(root, cb) {
    const queue = [root];
    const endArray = []
    while(queue.length !== 0) {
      //Read first queue item
      endArray.push(queue[0].data);
      
      //push .left and .right children into queue
      //shift 0 off of queue
      if (queue[0].leftChild !== null) {
        queue.push(queue[0].leftChild);
      }
      if (queue[0].rightChild !== null) {
        queue.push(queue[0].rightChild);
      }
      queue.shift();
    }
    if (cb) {
      cb(endArray);
    } else {
      return endArray;
    }
  }

  inOrder(root, cb) {
    if (root === null) return [];
    const left = this.inOrder(root.leftChild);
    const rootData = root.data;
    const right = this.inOrder(root.rightChild);

    const array = left.concat(rootData, right);
    
    //cb will only exist in the first call of inOrder
    if (cb) {
      return cb(array);
    } else {
      return array;
    }
  }

  preOrder(root, cb) {
    if (root === null) return [];
    const rootData = [root.data];
    const left = this.preOrder(root.leftChild);
    const right = this.preOrder(root.rightChild);

    const array = rootData.concat(left, right);

    if (cb) {
      return cb(array);
    } else {
      return array;
    }
  }

  postOrder(root, cb) {
    if (root === null) return [];
    const left = this.postOrder(root.leftChild);
    const right = this.postOrder(root.rightChild);
    const rootData = root.data;

    const array = left.concat(right, rootData);

    if (cb) {
      return cb(array);
    } else {
      return array;
    }
  }

  height(value) {
    const node = this.find(value);

    function findHeight (node) {
      if (node === null) return -1;
      let heightLeft = findHeight(node.leftChild);
      let heightRight = findHeight(node.rightChild);

      if (heightLeft > heightRight) {
        return heightLeft + 1;
      } else {
        return heightRight + 1;
      }
    }
    return findHeight(node);
  }

  depth(value) {
    let node = this.root;
    let depth = 0;
    while (node.data !== value) {
      if (value > node.data) {
        node = node.rightChild;
      } else {
        node = node.leftChild;
      }
      depth += 1;
    }
    return depth;
  }

  isBalanced(root) {
    const checkBalance = (node) => {
      if (node === null) return 0;
      // console.log(`Node: ${node.data}`);
      // console.log(`LeftChild: ${node.leftChild.data}`);
      const leftHeight = node.leftChild ? this.height(node.leftChild.data) : 0;
      const rightHeight = node.rightChild ? this.height(node.rightChild.data) : 0;
      const checkL = checkBalance(node.leftChild);
      const checkR = checkBalance(node.rightChild);

      if (Math.abs(leftHeight - rightHeight) <= 2) {
        return checkL + checkR + 0;
      } else {
        return checkL + checkR + 1;
      }
    }
    
    if (checkBalance(root) === 0) {
      return true;
    } else {
      return false;
    }
  }

  rebalance(root) {
    const newArray = this.inOrder(root);
    return new Tree (newArray);
  }
}