export {mergeSort, prettyPrint, hasChildren, createRandomArray};

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

function createRandomArray() {
    const iterations = Math.floor(Math.random() * 45);
    
    let array = []
    for (let i = 0; i < iterations; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}