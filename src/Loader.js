class Loader {
    constructor (options) {
        this.options = options;
        this.isLoading = false;
    }

    success (image) {
        var that = this;
        image.setAttribute('data-lazyload-state', 'complete');
        that.isLoading = false;
        that.options.success && that.options.success(image);
    }

    fail (image) {
        var that = this;
        // pop图片，不再加载
        that.isLoading = false;
        image.setAttribute('data-lazyload-state', 'error');
        that.options.fail && that.options.fail(image);
    }

    load (uri, image) {
        var that = this,
            state = image.getAttribute('data-lazyload-state'),
            src = uri;

        if (state !== 'interactive') {
            return;
        }

        this.isLoading = true;

        image.setAttribute('data-lazyload-state', 'loading');

        const success = () => {
            this.success(image);
            image.removeEventListener('load', success);
        };

        const fail = () => {
            this.fail(image);
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
