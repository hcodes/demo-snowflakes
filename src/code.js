import Vue from 'vue';

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
    data: {
        value: ''
    },
    methods: {
        set(props) {
            let
                result = '<script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>\n<script>\n    var sf = new Snowflakes(',
                count = 0,
                tab = '    ';

            Object.keys(defaultProperties).forEach(function(key) {
                if (typeof defaultProperties[key] !== 'undefined' && props[key] !== defaultProperties[key]) {
                    if (count) {
                        result += ',\n';
                    } else {
                        result += '{\n';
                    }

                    let value = props[key];
                    if (typeof value === 'string') {
                        value = '"' + value + '"';
                    }

                    if (key === 'area') {
                        if (value === 'fullscreen') {
                            return;
                        } else {
                            key = 'container';
                            value = 'document.querySelector(".snowflakes-container")';
                        }
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

            this.value = result;
        },
        selectAll() {
            this.$refs.textarea.select();
        },
        copy() {
            try {
                this.$refs.textarea.select();
                document.execCommand('copy');
            } catch (e) {}
        }
    }
});

export {code, defaultProperties};
