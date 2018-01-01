import Vue from 'vue';

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const defaultProperties = {
    debug: false,
    bg: 'white',
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

const data = clone(defaultProperties);
data.isFpsDisabled = false;

new Vue({
    el: '.demo',
    data: data,
    created: function() {
        this.updateSnowflakes();

        ['area', 'color', 'count', 'speed', 'rotation', 'minOpacity', 'maxOpacity', 'minSize', 'maxSize', 'wind'].forEach(prop => {
            this.$watch(prop, this.updateSnowflakes);
        });
    },
    computed: {
        stopButtonValue: function() {
            return this.stop ? 'Start' : 'Stop';
        }
    },
    methods: {
        updateSnowflakes() {
            if (this._snow) {
                this._snow.destroy();
                delete this._snow;
            }

            const props = clone(this.$data);
            props.container = this.area === 'fullscreen' ? document.body : document.querySelector('.demo__layer');
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this._snow = new Snowflakes(props);
            }, 1);
        },
        setDefault() {
            Object.keys(defaultProperties).forEach(key => {
                this[key] = defaultProperties[key];
            });
        },
        toggleStop() {
            this.stop = !this.stop;
            this._snow[this.stop ? 'stop' : 'start']();
        },
        changeBg() {
            document.body.style.background = this.bg;
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
