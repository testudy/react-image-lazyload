import Stack from './stack';
import HashMap from './hashmap';
import Loader from './loader';
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
        this.hashmap = new HashMap();
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

    lazy (wrap, image) {
        if (this.hashmap.containsKey(wrap)) {
            return;
        }
        if (wrap.getAttribute('data-lazyload-state')) {
            return;
        }

        const rect = wrap.getBoundingClientRect();
        if (rect.height) {
            this.interact(wrap);
            this.hashmap.put(wrap, {
                wrap,
                image,
                top: rect.y,
                height: rect.height,
            });
        }

        this.update();
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
        var that = this,
            images = this.hashmap.values();

        this.requesting = false;

        if (images.length === 0) {
            return;
        }

        for (const item of images) {
            if (that.inViewport(item.top, item.height)) {
                that.hashmap.remove(item.wrap);
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
