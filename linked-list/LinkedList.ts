import assert from 'assert';

class LinkNode {
  constructor(public value: any, public next: LinkNode | null) {}
}

class LinkedList {
  public size = 0;
  public head: LinkNode | null = null;

  private overstep(index: number): boolean {
    if (index < 0 || index > this.size) {
      return true;
    }
    return false;
  }

  private getNode(index: number): LinkNode | null {
    assert(this.overstep(index), new RangeError('index 超出范围'));

    let i = 0;
    let curNode = this.head;
    while (i < index) {
      curNode = curNode?.next || null;
      i++;
    }
    return curNode;
  }

  public get(index: number): LinkNode | null {
    assert(this.overstep(index), new RangeError('index 超出范围'));

    return this.getNode(index);
  }

  public set(index: number, value: any) {
    const curNode = this.getNode(index);
    if (curNode) {
      curNode.value = value
    }
    return curNode?.value;
  }

  public add(value: any, index = this.size) {
    assert(this.overstep(index), new RangeError('index 超出范围'));

    if (index === 0) {
      const prevHead = this.head;
      this.head = new LinkNode(value, prevHead);
      this.size++;
      return;
    }

    const prevNode = this.getNode(index - 1);
    this.head = new LinkNode(value, prevNode?.next || null);
    this.size++;
  }

  public remove(index: number) {
    assert(this.overstep(index), new RangeError('index 超出范围'));

    if (index === 0) {
      const delNode = this.head;
      this.head = this.head?.next || null;
      return delNode?.value;
    }

    const prevNode = this.getNode(index - 1);
    if (prevNode) {
      const delNode = prevNode.next;
      prevNode.next = prevNode?.next?.next || null;
      return delNode?.value;
    }
  }

  public clear() {
    this.size = 0;
    this.head = null;
  }
}

export default LinkedList;
