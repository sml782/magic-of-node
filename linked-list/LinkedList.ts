import assert from 'assert';

/**
 * 递归反转
 * 两两转
 *
 * @param {LinkNode} head
 * @returns
 */
function reverse1(head: LinkNode) {
  if (head === null || head.next === null) {
    return head;
  }
  const newHead = arguments.callee(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

class LinkNode {
  constructor(public value: any, public next: LinkNode | null) {}
}

class LinkedList {
  public size = 0;
  public head: LinkNode | null = null;

  private getNode(index: number): LinkNode | null {
    assert(!(index < 0 || index >= this.size), new RangeError('index 超出范围'));

    let i = 0;
    let curNode = this.head;
    while (i < index) {
      curNode = curNode?.next || null;
      i++;
    }
    return curNode;
  }

  public get(index: number): LinkNode | null {
    assert(!(index < 0 || index >= this.size), new RangeError('index 超出范围'));

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
    assert(!(index < 0 || index > this.size), new RangeError('index 超出范围'));

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
    assert(!(index < 0 || index >= this.size), new RangeError('index 超出范围'));

    this.size--;
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

const ll = new LinkedList();
console.log('[[初始化]]', ll);

ll.add(1, 0);
ll.add(2, 0);
ll.add(5, 0);
console.log('\n[[添加]]');
console.dir(ll, { depth: 100 });

console.log('\n[[移除]]', ll.remove(2));
console.dir(ll, { depth: 100 });

console.log('\n[[获取]]', ll.get(1));

ll.set(1, 100);
console.log('\n[[设置]]');
console.dir(ll, { depth: 100 });

ll.clear();
console.log('\n[[清空]]');
console.dir(ll, { depth: 100 });

export default LinkedList;
