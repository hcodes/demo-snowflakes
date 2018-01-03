import Vue from 'vue';
import {clone} from './utils';

const defaultProperties = {
    area: 'fullscreen',
    color: '#5ECDEF',
    count: 50,
    speed: 1,
    rotation: true,
    minOpacity: 0.6,
    maxOpacity: 1,
    minSize: 8,
    maxSize: 18,
    wind: true
};

const code = new Vue({
    el: '.code',
    data: clone(defaultProperties),
    methods: {
        getCode() {
            let
                result = '<script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>\n<script>\n    var sf = new Snowflakes(',
                count = 0,
                tab = '    ';

            Object.keys(defaultProperties).forEach(function(key, i) {
                if (this[key] !== defaultProperties[key]) {
                    if (count) {
                        result += ',\n';
                    } else {
                        result += '{\n';
                    }

                    let value = this[key];
                    if (typeof value === 'string') {
                        value = '"' + value + '"';
                    }
                    result += `${tab}${tab}${key}: ${value}`;

                    count++;
                }
            }, this);

            if (count) {
                result += `\n${tab}})`;
            } else {
                result += ')';
            }

            result += ';\n</script>';

            return result;
        },
        copy(e) {

        }
    }
});

export {code, defaultProperties};
