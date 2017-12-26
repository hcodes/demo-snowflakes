import Vue from 'vue';

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const defaultProperties = {
    bg: 'white',
    area: 'fullscreen',
    color: '#5ECDEF',
    count: 50,
    speed: 1,
    useRotate: true,
    useScale: true,
    wind: true
};

const data = clone(defaultProperties);
data.isFpsDisabled = false;

new Vue({
    el: '.demo',
    data: data,
    created: function() {
        this.updateSnowflakes();

        ['area', 'color', 'count', 'speed', 'useRotate', 'useScale', 'wind'].forEach(prop => {
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
