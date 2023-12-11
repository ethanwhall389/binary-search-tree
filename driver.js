import Tree from "./bst.js";
import { prettyPrint, createRandomArray } from "./utility-functions.js";

const randomArray = createRandomArray();

console.log('Binary search tree created using these randomly generated values:');
console.log(randomArray);

console.log('\n******************\n');

let bst = new Tree(randomArray);

prettyPrint(bst.root);

console.log('\n******************\n');

console.log("Is balanced?");
console.log(bst.isBalanced(bst.root));

console.log('\n******************\n');

console.log('Printing in levelOrder:');
console.log(bst.levelOrder(bst.root));

console.log('\n******************\n');

console.log('Printing in preorder:');

console.log(bst.preOrder(bst.root));

console.log('\n******************\n');

console.log('Printing inOrder:');

console.log(bst.inOrder(bst.root));

console.log('\n******************\n');

console.log('Printing postOrder:');

console.log(bst.postOrder(bst.root));

console.log('\n******************\n');

console.log('inserting new nodes to unbalance tree...');

bst.insert(120);
bst.insert(101);
bst.insert(144);
bst.insert(131);

prettyPrint(bst.root);

console.log("Is balanced?");
console.log(bst.isBalanced(bst.root));

console.log('\n******************\n');

console.log('Rebalancing...');
bst = bst.rebalance(bst.root);

prettyPrint(bst.root);

console.log('\n******************\n');

console.log("Is balanced?");
console.log(bst.isBalanced(bst.root));

console.log('\n******************\n');

console.log('Printing in levelOrder:');
console.log(bst.levelOrder(bst.root));

console.log('\n******************\n');

console.log('Printing in preorder:');

console.log(bst.preOrder(bst.root));

console.log('\n******************\n');

console.log('Printing inOrder:');

console.log(bst.inOrder(bst.root));

console.log('\n******************\n');

console.log('Printing postOrder:');

console.log(bst.postOrder(bst.root));

console.log('\n******************\n');

console.log('End of script. Thanks for stopping by!\n');