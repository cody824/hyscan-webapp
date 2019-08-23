Ext.define('Module.Hyscan.Me.Operation', {
    singleton: true,

    addUserWin: function (cb) {

        var addForm = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 400,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 350
            },
            items: [{
                name: 'nick',
                fieldLabel: "登录名"
            }, {
                name: 'fullName',
                fieldLabel: "姓名"
            }, {
                name: 'email',
                fieldLabel: "Email",
                allowBlank: true
            },
                //     {
                //     name: 'mobile',
                //     fieldLabel: "手机"
                // },
                {
                    name: 'password',
                    id: 'password',
                    inputType: 'password',
                    minLength: 6,
                    maxLength: 30,
                    fieldLabel: "密码"
                }, {
                    name: 'rePassword',
                    inputType: 'password',
                    passwordField: 'password',
                    vtype: 'confirmPwd',
                    fieldLabel: "确认密码"
                }]
        });

        var win = new Ext.Window({
            title: "新建用户",
            items: [addForm],
            // height : 'auto',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: "新建用户",
                handler: function () {
                    var params = addForm.getForm().getValues();
                    params.params = {
                        fullName: params.fullName,
                    };

                    Soul.Ajax.request({
                        url: "/user-detail/",
                        method: 'post',
                        jsonData: params,
                        success: function () {
                            win.close();
                            cb();
                        }
                    });
                }
            }]

        });

        win.show();
    },

    editUserWin: function (user, cb) {

        var addForm = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 400,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 350
            },
            items: [{
                name: 'nick',
                disabled: true,
                fieldLabel: "登录名"
            }, {
                name: 'fullName',
                fieldLabel: "姓名"
            }, {
                name: 'email',
                fieldLabel: "Email"
            }/*, {
                name: 'mobile',
                fieldLabel: "手机"
            }*/]
        });

        addForm.getForm().setValues(user);

        var win = new Ext.Window({
            title: "编辑用户",
            items: [addForm],
            // height : 'auto',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: "编辑用户",
                handler: function () {
                    var params = addForm.getForm().getValues();
                    Soul.Ajax.request({
                        url: "/security/ud/" + user.id,
                        method: 'put',
                        jsonData: params,
                        success: function () {
                            win.close();
                            cb();
                        }
                    });
                }
            }]

        });

        win.show();
    },

    resetPasswdWin: function (user, cb) {

        var addForm = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 400,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 350
            },
            items: [{
                name: 'oldPassword',
                inputType: 'password',
                minLength: 6,
                maxLength: 30,
                fieldLabel: "旧密码"
            }, {
                name: 'newPassword',
                id: 'password',
                inputType: 'password',
                minLength: 6,
                maxLength: 30,
                fieldLabel: "新密码"
            }, {
                name: 'rePassword',
                inputType: 'password',
                passwordField: 'password',
                vtype: 'confirmPwd',
                fieldLabel: "确认密码"
            }]
        });

        var win = new Ext.Window({
            title: "修改密码",
            items: [addForm],
            // height : 'auto',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: "修改密码",
                handler: function () {
                    if (!addForm.getForm().isValid()) return;
                    var params = addForm.getForm().getValues();
                    Soul.Ajax.request({
                        url: "/security/user/" + user.id + "/password",
                        method: 'put',
                        params: params,
                        success: function () {
                            win.close();
                            cb();
                        }
                    });
                }
            }]

        });

        win.show();
    },

    doLookUserRoleFunction: function (user, roles, title, callbackFn) {
        var me = this;
        var userId = user.id;
        var userRoles = user.roles;
        var roleStore = Ext.create('Ext.data.Store', {
            fields: [{
                name: 'id',
                mapping: 'id'
            }, {
                name: 'comment',
                mapping: 'comment'
            }, {
                name: 'name',
                mapping: 'name'
            }],
            data: roles
        });
        var sm = new Ext.selection.CheckboxModel({
            mode: 'single',
            listeners: {
                selectionchange: function (model, selected, eOpts) {
                }
            }
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: roleStore,
            selModel: sm,
            height: 400,
            columns: [
                {header: 'ID', dataIndex: 'id', width: 50},
                {header: "描述", dataIndex: 'comment', width: 200, flex: 1},
                {header: 'KEY', dataIndex: 'name', width: 200},
                {
                    text: "设置",
                    xtype: 'actioncolumn',
                    width: 80,
                    sortable: false,
                    editor: false,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'lock',
                            tooltip: '设置',
                            name: 'view',
                            scope: this,
                            handler: function (grid, rowIdx, colIdx, item, e, record, row) {
                                me.setAdmin(user, record.data.name, function () {
                                    // callbackFn();
                                    user.roles.push(record.data);
                                    roleStore.reload();
                                });
                            },
                            isDisabled: function (v, r, c, item, r) {
                                var roleName = r.data.name;
                                var found = false;
                                Ext.each(userRoles, function (userRole) {
                                    if (roleName == userRole.name) {
                                        found = true;
                                        return false;
                                    }
                                });
                                return found;
                            }
                        }]
                },
                {
                    text: "取消",
                    xtype: 'actioncolumn',
                    width: 80,
                    sortable: false,
                    editor: false,
                    align: 'center',
                    items: [
                        {
                            icon: '/img/icon/unsupport.png',
                            tooltip: '取消',
                            name: 'view',
                            scope: this,
                            handler: function (grid, rowIdx, colIdx, item, e, record, row) {
                                me.setAdmin(user, record.data.name, function () {
                                    callbackFn();
                                    var obj = Ext.Array.findBy(user.roles, function (role, index) {
                                        if (role.name == record.data.name) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (obj != null) {
                                        Ext.Array.remove(user.roles, obj);
                                    }
                                    roleStore.reload();
                                });
                            },
                            isDisabled: function (v, r, c, item, r) {
                                var roleName = r.data.name;
                                var found = false;
                                Ext.each(userRoles, function (userRole) {
                                    if (roleName == userRole.name) {
                                        found = true;
                                        return false;
                                    }
                                });
                                return !found;
                            }
                        }]
                }
            ]
        });
        var newFormWin = Ext.create('Ext.window.Window', {
            region: 'center',
            buttonAlign: 'center',
            title: title,
            autoHeight: true,
            width: 700,
            height: 400,
            layout: 'form',
            force: true,
            forceFit: true,
            maximizable: true,
            minimizable: true,
            closeAction: 'hide',
            constrainHeader: true,
            defaultButton: 0,
            resizable: true,
            resizeHandles: 'se',
            modal: true,
            plain: true,
            animateTarget: 'target',
            items: [grid]
        }).show();
    },

    isAdmin: function (user, adminRole) {
        var isAdmin = false;
        Ext.each(user.roles, function (role, index, self) {
            if (role.name == adminRole) {
                isAdmin = true;
                return false;
            }
        });
        return isAdmin;
    },

    setAdmin: function (user, adminRole, callback) {
        var me = this;
        var isAdmin = me.isAdmin(user, adminRole);
        var method = isAdmin ? "delete" : "put";
        Soul.Ajax.request({
            url: "/security/user/" + user.id + "/role?roleName=" + adminRole,
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: 'application/json'
            },
            jsonData: [],
            success: callback
        });

    },

    resetPassword: function (id, cb) {
        Soul.Ajax.request({
            url: "/security/user/" + id + "/password/reset",
            confirm: '确认要把用户密码重置为123456吗？',
            method: 'put',
            success: function () {
                cb();
            }
        });
    }
});
