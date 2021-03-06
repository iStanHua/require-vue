define(['text!/views/add/template.html', '../../store/mutation-types'],
    function (template, types) {
        return {
            name: 'add',
            template: template,
            data: function () {
                return {
                    error: '',
                    user: {
                        id: 0,
                        username: '',
                        phone: '',
                        email: ''
                    }
                }
            },
            methods: {
                closeError: function () {
                    this.error = '';
                },
                submitUser: function (e) {
                    e.preventDefault();
                    this.error = '';
                    if (!this.user.username) {
                        this.error = '姓名必填';
                        return false;
                    }
                    if (!this.user.phone) {
                        this.error = '电话必填';
                        return false;
                    }
                    if (!this.user.email) {
                        this.error = '邮箱必填';
                        return false;
                    }

                    // this.$store.state.user.users.push(this.user);
                    this.$store.dispatch(types.USER_ADD, this.user);
                    this.$router.replace('/');
                }
            },
            components: {
                
            }
        }
    });