import Vue from 'vue';

const toast = Vue.extend(require('./toast.vue'));

let instance;

export default {
    show(options) {
        if (!instance) {
            instance = new toast({
                el: document.createElement('div')
            });
        }
        if (instance.isShow) return;
        instance.isShow = true;
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                instance[prop] = options[prop];
            }
        }
        instance.hideCallback = function callback(isShow) {
            instance.isShow = isShow;
        };
        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
            instance.isShow = true;
        });
    },
    close() {
        if (instance) {
            instance.isShow = false;
        }
    }
};
