function slide(/** @type {HTMLImageElement} */ img, milliseconds) {
    var src = img.src;
    setInterval(() => {
        img.src = src + '?random=' + rand(1, 50);
    }, milliseconds);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printProtoTypes(object) {
    console.log(object);
    do {
        object = Object.getPrototypeOf(object);
        console.log(object);
    } while (object);
}

const locale = 'zh-TW';
const currencyCode = 'TWD';
const currency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
});

export function toggleModal() {
    $('#close').parent().toggleClass('hidden');
    $('#overlay').toggleClass('modal-open');
}

export const JSON_ = {
    stringify: function(obj) {
        return JSON.stringify(obj, (key, value) => {
            if (value !== null && typeof value === 'object') {
              // Include prototype properties
              const proto = Object.getPrototypeOf(value);
              if (proto !== null && Object.keys(proto).length > 0) {
                value.__proto__ = proto;
              }
            }
            return value;
        });
    },
    parse:function(json) {
        return JSON.parse(json, (key, value) => {
            if (value !== null && typeof value === 'object') {
              // Recreate prototype chain
              const proto = Object.create(null);
              Object.assign(proto, value.__proto__);
              value.__proto__ = proto;
            }
            return value;
        });
    }
}

globalThis.JSON_ = JSON_;

export { slide, rand, printProtoTypes, currency };