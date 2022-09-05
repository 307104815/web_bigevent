Vue.component('shell', {
    template: ' \
		<div class="main"> \
			<div class="content"> \
				<slot name="content">我是内容</slot> \
			</div>\
			<div class="menu">\
				<slot name="menu">我是菜单</slot>\
			</div>\
		</div>',
    data: function() {
        return {
            currentValue: this.value,
            questionList: []
        }
    },
    props: {
        value: {
            type: String
        }
    },
    methods: {
        submit() {
            alert("提交");
        },
        nextQuestion() {
            if (this.currentValue < this.getTabs().length) {
                this.currentValue = this.currentValue * 1 + 1 + '';
            }
        },
        backQuestion() {
            if (this.currentValue > 1) {
                this.currentValue = this.currentValue * 1 - 1 + '';
            }
        },
        reset() {
            var _this = this;
            var f = document.forms[this.currentValue * 1 - 1];
            f.reset();
        },
        getTabs() {
            return this.$children.filter(function(item) {
                return item.$options.name === 'question';
            });
        },
        getBtns() {
            return this.$children.filter(function(item) {
                return item.$options.name === 'my-btn';
            });
        },
        update() {
            this.questionList = [];
            var _this = this;
            this.getTabs().forEach(function(question, index) {
                _this.questionList.push({
                    name: question.name || index
                });
                if (!question.name) question.name = index;
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = question.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            var btns = this.getBtns();
            var _this = this;
            tabs.forEach(function(tab) {
                return tab.show = tab.name === _this.currentValue;
            });
            btns.forEach(function(btn) {
                if (btn.name == "next") {
                    return btn.show = _this.currentValue != _this.getTabs().length;
                }
                if (btn.name == "back") {
                    return btn.show = _this.currentValue != 1;
                }
                if (btn.name == "submit") {
                    return btn.show = _this.currentValue == _this.getTabs().length;
                }
            });
        }
    },
    mounted() {
        var _this = this;
        bus.$on('on-click', function(msg) {
            if (msg === "back") {
                _this.backQuestion();
            }
            if (msg === "next") {
                _this.nextQuestion();
            }
            if (msg === "reset") {
                _this.reset();
            }
            if (msg === "submit") {
                _this.submit();
            }
        });
    },
    watch: {
        currentValue() {
            this.updateStatus();
        }
    }
});