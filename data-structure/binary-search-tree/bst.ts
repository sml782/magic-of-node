
export class TNode {
  public left: TNode | null = null;
  public right: TNode | null = null;

  constructor(public value: unknown, public parent: TNode | null = null) {}
}

export type CompareCallback = (a: TNode['value'], b: TNode['value']) => boolean;

class BST {
  public root: TNode | null = null;

  constructor(public compare?: CompareCallback) {
    if (!compare) {
      this.compare = (a, b) => {
        return (a as number) > (b as number);
      }
    }
  }

  public add(value: TNode['value']) {
    // 本数没有东西，直接加
    if (this.root === null) {
      this.root = new TNode(value, null);
      return;
    }

    let currentNode: TNode | null = this.root;
    let currentParent: TNode | null = null;
    let dir = true;
    while (currentNode) {
      currentParent = currentNode;
      const isbig = this.compare!(currentNode.value, value);
      dir = isbig;

      // 左边
      if (isbig) {
        currentNode = currentNode.left;
        continue;
      }

      // 右边
      currentNode = currentNode.right;
    }

    currentParent![dir ? 'left' : 'right'] = new TNode(value, currentParent);
  }
}

export default BST;
