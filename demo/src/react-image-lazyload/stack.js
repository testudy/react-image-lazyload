/*
 * 栈
 */
class Stack {
    constructor () {
        this.container = [];
    }

    push (item) {
        return this.container.push(item);
    }

    /*
     * 删除容器中所有跟栈顶相同的元素
     */
    pop () {
        var item = this.container.pop(),
            i;

        for (i = this.container.length - 1; i >= 0; i -= 1) {
            if (item === this.container[i]) {
                this.container.splice(i, 1);
            }
        }

        return item;
    }

    peek () {
        return this.container[this.container.length - 1];
    }

    isEmpty () {
        return this.container.length === 0;
    }

    isFull () {
        return false;
    }

    clear () {
        this.container.length = 0;
    }
}

export default Stack;
