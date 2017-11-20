class Loader {
    constructor (options) {
        this.options = options;
        this.isLoading = false;
    }

    success (wrap) {
        var that = this;
        wrap.setAttribute('data-lazyload-state', 'complete');
        that.isLoading = false;
        that.options.success && that.options.success(wrap);
    }

    fail (wrap) {
        var that = this;
        // pop图片，不再加载
        that.isLoading = false;
        wrap.setAttribute('data-lazyload-state', 'error');
        that.options.fail && that.options.fail(wrap);
    }

    load (wrap, image) {
        var that = this,
            state = wrap.getAttribute('data-lazyload-state'),
            src = wrap.getAttribute('src');

        if (state !== 'interactive') {
            return;
        }

        this.isLoading = true;

        wrap.setAttribute('data-lazyload-state', 'loading');

        const success = () => {
            this.success(wrap);
            image.removeEventListener('load', success);
        };

        const fail = () => {
            this.fail(wrap);
            image.removeEventListener('error', fail);
            image.removeEventListener('abort', fail);
        };

        image.addEventListener('load', success);
        image.addEventListener('error', fail);
        image.addEventListener('abort', fail);

        image.src = src;
    }
}

export default Loader;
