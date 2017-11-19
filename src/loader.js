class Loader {
    constructor (options) {
        this.options = options;
        this.isLoading = false;
    }

    success (element) {
        var that = this;
        element.setAttribute('data-lazyload-state', 'complete');
        that.isLoading = false;
        that.options.success && that.options.success(element);
    }

    fail (element) {
        var that = this;
        // pop图片，不再加载
        that.isLoading = false;
        element.setAttribute('data-lazyload-state', 'error');
        that.options.fail && that.options.fail(element);
    }

    load (element) {
        var that = this,
            state = element.getAttribute('data-lazyload-state'),
            src = element.getAttribute('data-lazyload-original');

        if (state !== 'interactive') {
            return;
        }

        this.isLoading = true;

        element.setAttribute('data-lazyload-state', 'loading');

        const success = () => {
            this.success(element);
            element.removeEventListener('load', success);
        };

        const fail = () => {
            this.fail(element);
            element.removeEventListener('error', fail);
            element.removeEventListener('abort', fail);
        };

        element.addEventListener('load', success);
        element.addEventListener('error', fail);
        element.addEventListener('abort', fail);

        element.src = src;
    }
}

export default Loader;
