import Stack from './Stack';
import Loader from './Loader';
import animationFrame from './animation-frame';


class Lazyload {
    static instance = null;

    static getInstance () {
        if (!Lazyload.instance) {
            Lazyload.instance = new Lazyload();
        }
 
        return Lazyload.instance;
    }

    constructor () {
        this.map = new Map();
        this.stack = new Stack();
        this.loader = new Loader({
            success: this.loadSuccess,
            fail: this.loadFail,
        });
 
        this.listen();
    }

    listen () {
        window.addEventListener('resize', this.request, false);
        window.addEventListener('scroll', this.request, false);
    }

    load = () => {
        if (this.loader.isLoading || this.stack.isEmpty()) {
            return;
        }
        const entity = this.stack.pop();
        console.log(entity);
        this.loader.load(entity);
    };

    loadSuccess = (entity) => {
        this.map.delete(entity.hashcode);
        this.load();
    };

    loadFail = (entity) => {
        this.map.delete(entity.hashcode);
        this.load();
    };

    getScrollY () {
        return window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;
    }

    add (entity) {
        if (this.map.has(entity.hashcode)) {
            return;
        }

        const rect = entity.image.getBoundingClientRect();
        if (rect.height) {
            this.map.set(entity.hashcode, Object.assign(entity, {
                state: 'interactive',
                top: rect.y + this.getScrollY(),
                height: rect.height,
            }));
        }

        this.update();
    }

    remove (entity) {
        this.loader.abort();
        this.map.delete(entity.hashcode);
    }

    request = () => {
        if (this.requesting) {
            return;
        }
        this.requesting = true;
        animationFrame.request(this.update);
    };

    update = () => {
        if (this.map.size === 0) {
            return;
        }

        this.requesting = false;

        for (const [, entity] of this.map) {
            if (entity.state === 'interactive' &&
                    this.inViewport(entity.top, entity.height)) {

                this.stack.push(entity);
                this.load();
            }
        }
    };

    belowTheFold (top, height) {
        var bottom = top + height + 200,
            scrollY = this.getScrollY(),
            fold;

        fold = scrollY;

        return fold <= bottom;
    }

    aboveTheFold (top, height) {
        var fold,
            scrollY = this.getScrollY();

        top -= 200;
        fold = window.innerHeight + scrollY;

        return fold >= top;
    }

    inViewport (top, height) {
        return this.belowTheFold(top, height) &&
            this.aboveTheFold(top, height);
    }
}

export default Lazyload;
