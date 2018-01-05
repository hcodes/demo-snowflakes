import Vue from 'vue';
import {code, defaultProperties as defaultCodeProperties} from './code';
import {clone} from './utils';

const defaultDataProperties = clone(defaultCodeProperties);
defaultDataProperties.debug = false;
defaultDataProperties.bg = 'white';

const data = clone(defaultDataProperties);
data.isFpsDisabled = false;

const form = new Vue({
    el: '.form',
    data: data,
    created: function() {
        this.updateSnowflakes();

        Object.keys(defaultCodeProperties).forEach(prop => {
            this.$watch(prop, this.updateSnowflakes.bind(this, prop));
        });
    },
    methods: {
        updateSnowflakes(prop) {
            if (this._snow) {
                this._snow.destroy();
                delete this._snow;
            }

            const props = clone(this.$data);
            props.container = this.area === 'fullscreen' ? document.body : document.querySelector('.form__layer');

            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this._snow = new Snowflakes(props);
            }, 1);

            code.set(props);
        },
        setDefault() {
            Object.keys(defaultDataProperties).forEach(key => {
                this[key] = defaultDataProperties[key];
            });
        },
        toggleStop() {
            this.stop = !this.stop;
            this._snow[this.stop ? 'stop' : 'start']();
        },
        changeBg() {
            const body = document.body;

            body.classList.remove('body_bg_white');
            body.classList.remove('body_bg_black');
            body.classList.add('body_bg_' + this.bg);
        },
        setDebug() {
            const dom = document.body;

            if (this.debug) {
                dom.classList.add('debug');
            } else {
                dom.classList.remove('debug');
            }
        },
        loadFPS() {
            this.isFpsDisabled = true;

            const script = document.createElement('script');
            script.onload = () => {
                const stats = new window.Stats();
                stats.dom.style.right = '0';
                document.body.appendChild(stats.dom);
                requestAnimationFrame(function loop() {
                    stats.update();
                    requestAnimationFrame(loop);
                });
            };
            script.src = 'https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
            document.head.appendChild(script);
        }
    }
});

export default form;
