class Loader {
    constructor (options) {
        this.options = options;
        this.isLoading = false;
    }

    success = (entity) => {
        entity.state = 'complete';
        this.isLoading = false;
        this.options.success && this.options.success(entity);
    };

    fail = (entity) => {
        // pop图片，不再加载
        this.isLoading = false;
        entity.state = 'error';
        this.options.fail && this.options.fail(entity);
    };

    load (entity) {
        const {state, image, source: {uri}} = entity;

        this.entity = entity;

        if (state !== 'interactive') {
            return;
        }

        this.isLoading = true;
        entity.state = 'loading';

        const success = () => {
            this.success(entity);
            image.removeEventListener('load', success);
        };

        const fail = () => {
            this.fail(entity);
            image.removeEventListener('error', fail);
            image.removeEventListener('abort', fail);
        };

        image.addEventListener('load', success);
        image.addEventListener('error', fail);
        image.addEventListener('abort', fail);

        image.src = uri;
    }

    abort () {
        this.entity = 'interactive';
        const { image, placeholder } = this.entity;
        if (placeholder) {
            image.src = placeholder;
        } else {
            image.removeAttribute('src');
        }
    }
}

export default Loader;
