let index = 0;

export default function (object) {
    const type = typeof object;

    if (type === 'object') {
        if (!object.__hashcode__) {
            index += 1;
            object.__hashcode__ = type + index;
        }
        return object.__hashcode__;
    }

    return type + object;
}
