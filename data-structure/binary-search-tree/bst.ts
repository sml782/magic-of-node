
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

    let currentNode = this.root;
    while (currentNode) {
      const isbig = this.compare!(currentNode.value, value);
    }
  }
}

export default BST;
