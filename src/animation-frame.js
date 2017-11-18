function detect(prefix) {
    if (!prefix) {
        return window.requestAnimationFrame &&
            (window.cancelAnimationFrame || window.cancelRequestAnimationFrame);
    }

    return window[prefix + 'RequestAnimationFrame'] &&
        (window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']);
}

function requestAnimationFrame() {
    if (detect()) {
        return window.requestAnimationFrame;
    }

    if (detect('webkit')) {
        return window.webkitRequestAnimationFrame;
    }

    if (detect('moz')) {
        return window.mozRequestAnimationFrame;
    }

    if (detect('ms')) {
        return window.msRequestAnimationFrame;
    }

    return function (callback) {
        return window.setTimeout(callback, 25);
    };
}

function cancelAnimationFrame() {
    if (detect()) {
        return window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
    }

    if (detect('webkit')) {
        return window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;
    }

    if (detect('moz')) {
        return window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame;
    }

    if (detect('ms')) {
        return window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame;
    }

    return function (id) {
        return window.clearTimeout(id);
    };
}

export default {
    request: requestAnimationFrame().bind(window),
    cancel: cancelAnimationFrame().bind(window),
};
