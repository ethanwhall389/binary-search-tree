import Tree from "./bst.js";
import { prettyPrint } from "./utility-functions.js";

const tree = new Tree([1, 2, 3, 4]);

console.log(tree);

prettyPrint(tree.root);