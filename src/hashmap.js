class HashMap {
    constructor () {
        this.index = 0;
        this.map = new Map();
    }

    hashKey (key) {
        var type = typeof key;

        if (type === 'object') {
            if (key.getAttribute) {
                if (key.getAttribute('data-lazyload-hashcode')) {
                    return key.getAttribute('data-lazyload-hashcode');
                }
         
                this.index += 1;
                key.setAttribute('data-lazyload-hashcode', type + this.index);
                return type + this.index;
            }


            if (!key.__hashcode__) {
                this.index += 1;
                key.__hashcode__ = type + this.index;
            }
            return key.__hashcode__;
        }

        return type + key;
    },

    size () {
        return this.map.size;
    },

    values () {
        return this.map.values();
    },

    containsKey (key) {
        return this.map.has(this.hashKey(key));
    },

    get (key) {
        return this.map.get(this.hashKey(key));
    },

    put (key, value) {
        this.set(this.hashKey(key), value);
    },

    remove (key) {
        this.map.delete(hashKey);
    }
}

export default HashMap;
