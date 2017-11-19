import $ from 'jquery';
import Stack from './stack';
import HashMap from './hashmap';
import Loader from './loader';
import animationFrame from './animation-frame';


class Lazyload {
    constructor () {
        this.$window = $(window);
 
        this.hashmap = new HashMap();
        this.stack = new Stack();
        this.loader = new Loader({
            success: this.load,
            fail: this.load
        });
 
        this.listen();
    }

    listen () {
        this.$window.on('resize', this.request);
        this.$window.on('scroll', this.request);
    }

    load = () => {
        if (this.loader.isLoading || this.stack.isEmpty()) {
            return;
        }
        this.loader.load(this.stack.pop());
    };

    init (element) {
        var that = this,
            $images = $(element).find('img[data-lazyload-original]');

        $images.each(function () {
            if (that.hashmap.containsKey(this)) {
                return;
            }
            if (this.getAttribute('data-lazyload-state')) {
                return;
            }

            var $this = $(this);
            if (that.isVisible($this)) {
                that.interact(this);
                that.hashmap.put(this, {
                    element: this,
                    top: $this.offset().top,
                    height: $this.innerHeight()
                });
            }
        });

        this.update();
    }

    interact (element) {
        element.setAttribute('data-lazyload-state', 'interactive');
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

        $.each(images, function () {
            if (that.inViewport(this.top, this.height)) {
                that.hashmap.remove(this.element);
                that.stack.push(this.element);
                that.load();
            }
        });
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
        fold = this.$window.height() + scrollY;

        return fold >= top;
    }

    inViewport (top, height) {
        return this.belowTheFold(top, height) &&
            this.aboveTheFold(top, height);
    }
}

const instance;
exports default function (element) {
    element = element || window;

    if (!instance) {
        instance = new Lazyload();
    }

    instance.init(element);

    return instance;
};
