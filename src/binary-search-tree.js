const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.Myroot = null;
  }


  root() {
    return this.Myroot
  }

  add(value) {
    this.Myroot = addIn(this.Myroot, value);
    function addIn(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.data === value) {
        return node;
      }

      if (value < node.data) {
        node.left = addIn(node.left, value);
      } else {
        node.right = addIn(node.right, value);
      }

      return node;
    }
  }

  has(value) {
    return searchWithin(this.Myroot, value);

    function searchWithin(node, value) {
      if (!node) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      return value < node.data ? 
        searchWithin(node.left, value) : 
        searchWithin(node.right, value);
    }
  }

  find(value) {
    return searchWithin(this.Myroot, value);

    function searchWithin(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      }

      return value < node.data ? 
        searchWithin(node.left, value) : 
        searchWithin(node.right, value);
    }
  }

  remove(value) {
    this.Myroot = removeNode(this.Myroot, value);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // equal - should remove this item
        if (!node.left && !node.right) {
          // put null instead of item
          return null;
        }

        if (!node.left) {
          // set right child instead of item
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left;
          return node;
        }

        // both children exists for this item
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
  }
  }
  min() {
    if (!this.Myroot) {
      return;
    }
   
    let node = this.Myroot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.Myroot) {
      return;
    }

    let node = this.Myroot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree, Node
};