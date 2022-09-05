Vue.component('question', {
    name: 'question',
    template: ' \
		<div class="question" v-show="show"> \
			<slot></slot> \
		</div>',
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
        update() {
            this.$parent.update();
        }
    },
    mounted() {
        this.update();
    }
});