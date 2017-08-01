require(['account', 'dropdown', 'template', 'validate', 'laydate'],
    function (account, dropdown, template, validate, laydate) {
        $(function () {
            var app = {
                init: function () {
                    this.events();
                },
                events: function () {
                    account.pagination('J_pagination');

                    var $app = $('#app');
                    this.query($app);

                    var $table = $app.find('#J_layout').find('.grid-table');
                    //跟进
                    $table.find('.btn-follow').off('click').on('click', function () {
                        var _id = $(this).closest('.grid-tr').attr('data-id');
                        var _status = $(this).closest('.grid-tr').attr('data-status');
                        layer.confirm({
                            skin: 'account',
                            width: 480,
                            title: '跟进',
                            ok: '<i class="icon i-delete"></i>',
                            success: function ($layer, index) {
                                utilAjax({
                                    url: _baseConfigs.path + '/track/list.do',
                                    data: { customerId: _id },
                                    success: function (data) {
                                        var html = template('J_followTmpl', { customerId: _id, status: _status, list: data.data });
                                        var $content = $layer.find('.layer-content');
                                        $content.html(html);
                                        $content.find('.tab').tab({ hash: false });
                                        var $form = $content.find('form');
                                        $form.find('.radiobox').radiobox({
                                            success: function ($this) {
                                                $this.nextAll('input[type=hidden]').val($this.attr('data-val'));
                                            }
                                        });
                                        layer.refresh($layer);
                                        app.followSubmit($form);
                                        app.cancel($form, index);
                                    }
                                });
                            }
                        });
                    });
                },
                //查询
                query: function ($app) {
                    var $form = $app.find('#J_formfilter');
                    //开始时间
                    var start = {
                        istoday: false,
                        choose: function (datas) {
                            end.min = datas; //开始日选好后，重置结束日的最小日期
                            end.start = datas //将结束日的初始值设定为开始日
                        }
                    };
                    /*$form.find('#start').on('click', function () {
                        laydate(start);
                    });*/
                    //结束时间
                    var end = {
                        istoday: false,
                        choose: function (datas) {
                            start.max = datas; //结束日选好后，重置开始日的最大日期
                        }
                    };
                    /* $form.find('#end').on('click', function () {
                         laydate(end);
                     });*/
                    //搜索
                    $form.find('.btn-submit').on('click', function () {
                        location.href = $form.attr('action') + '?' + $form.serialize();
                    });
                },
                followSubmit: function ($form) {
                    $form.validate({
                        ignore: '.ignore',
                        rules: {
                            currentStatus: 'required'
                        },
                        messages: {
                            currentStatus: '请选择跟进状态'
                        },
                        submitHandler: function () {
                            utilAjax({
                                url: $form.attr('action'),
                                data: $form.serialize(),
                                type: $form.attr('method'),
                                submit: $form.find('.btn-submit'),
                                success: function (data) {
                                    layer.msg(data.msg, 1, {
                                        timeCallback: function () {
                                            location.reload();
                                        }
                                    });
                                },
                            });
                        },
                        success: function (label) {
                            label.remove();
                        }
                    });
                },
                cancel: function ($form, index) {
                    $form.find('.form-btn').children('.btn-cancel').on('click', function () {
                        layer.close(index);
                    })
                }

            }
            app.init();
        });
    });