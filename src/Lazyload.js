import Stack from './Stack';
import Loader from './Loader';
import animationFrame from './animation-frame';


class Lazyload {
    static instance = null;

    static getInstance () {
        console.log(Lazyload.instance);
        if (!Lazyload.instance) {
            Lazyload.instance = new Lazyload();
        }
 
        return Lazyload.instance;
    }

    constructor () {
        this.map = new Map();
        this.stack = new Stack();
        this.loader = new Loader({
            success: this.load,
            fail: this.load
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
        const item = this.stack.pop();
        console.log(item);
        this.loader.load(item.wrap, item.image);
    };

    add (wrap, image) {
        if (this.map.has(wrap)) {
            return;
        }
        if (wrap.getAttribute('data-lazyload-state')) {
            return;
        }

        const rect = wrap.getBoundingClientRect();
        if (rect.height) {
            this.interact(wrap);
            this.map.set(wrap, {
                wrap,
                image,
                top: rect.y,
                height: rect.height,
            });
        }

        this.update();
    }

    remove () {
    }

    interact (wrap) {
        wrap.setAttribute('data-lazyload-state', 'interactive');
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

        var that = this,
            images = this.map.values();

        this.requesting = false;

        for (const item of images) {
            if (that.inViewport(item.top, item.height)) {
                that.map.delete(item.wrap);
                that.stack.push(item);
                that.load();
            }
        }
    };

    isVisible ($elem) {
        return !!($elem.width() || $elem.height()) &&
            $elem.css('display') !== 'none';
    }

    belowTheFold (top, height) {
        var bottom = top + height + 200,
            scrollY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop,
            fold;

        fold = scrollY;

        return fold <= bottom;
    }

    aboveTheFold (top, height) {
        var fold,
            scrollY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;

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
