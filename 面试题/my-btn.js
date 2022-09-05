var bus = new Vue();
Vue.component('my-btn', {
    name: 'my-btn',
    template: ' \
		<button \
			class="button orange" \
			@click="clickBtn" \
			v-show="show">\
			<slot></slot>\
		</button>',
    data: function() {
        return {
            show: true
        }
    },
    props: {
        name: {
            type: String
        }
    },
    methods: {
        clickBtn: function() {
            bus.$emit('on-click', this.name);
        }
    }
});