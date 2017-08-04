
new Vue({
    el: '#app',
    data: {
        list: [
            {
                checked: false,
                text: '1',
                children: [
                    {
                        checked: true,
                        text: 11
                    },
                    {
                        checked: false,
                        text: 21
                    },
                    {
                        checked: false,
                        text: 31
                    }
                ]
            },
            {
                checked: false,
                text: '2',
                children: [
                    {
                        checked: false,
                        text: 12
                    },
                    {
                        checked: true,
                        text: 22
                    },
                    {
                        checked: false,
                        text: 32
                    }
                ]
            },
            {
                checked: false,
                text: '3',
                children: [
                    {
                        checked: false,
                        text: 13
                    },
                    {
                        checked: false,
                        text: 23
                    },
                    {
                        checked: false,
                        text: 33
                    }
                ]
            },
            {
                checked: false,
                text: '4',
                children: [
                    {
                        checked: false,
                        text: 14
                    },
                    {
                        checked: false,
                        text: 24
                    },
                    {
                        checked: false,
                        text: 34
                    }
                ]
            }]
    },
    methods: {
        parentClick(index) {
            // this.reSetall(index)
            var _obj = this.list[index]
            _obj.checked = !_obj.checked;
            var arr = _obj.children.map(function (item) {
                item.checked = _obj.checked
                return item
            })
            _obj.children = arr
            this.$set(this.list, index, _obj)
        },
        childrenClick(item, pindex) {
            // this.reSetall(pindex)
            item.checked = !item.checked;
            var _obj = this.list[pindex]
            _obj.checked = this.checkAll(_obj.children)
            this.$set(this.list, pindex, _obj)
        },
        reSetall(pindex) {
            var self = this
            var value = self.list.map(function (item, index) {
                if (pindex !== index) {
                    item.checked = false
                    item.children = item.children.map(function (item1, index1) {
                        item1.checked = false
                        return item1
                    })
                }
                return item
            })
            this.list = value
        },
        checkAll: function (arr) {
            var r = true
            arr.forEach(function (item) {
                if (!item.checked) {
                    r = false
                    return false
                }
            })
            return r
        }
    }
})