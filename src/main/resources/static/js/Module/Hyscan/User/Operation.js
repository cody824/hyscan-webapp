Ext.define('Module.Hyscan.User.Operation', {
    singleton: true,

    showApiKey: function (user) {

        Soul.Ajax.request({
            url: "/security/api/key/?userId=" + user.id,
            method: 'get',
            success: function (ret) {
                ret = ret || {"accessKey": "", "securityKey": ""};
                var infoGrid = Ext.create('Soul.view.PropertyGrid', {
                    width: 300,
                    propertyNames: {
                        "accessKey": HYSCAN_LABLE.accessKey,
                        "securityKey": HYSCAN_LABLE.securityKey
                    },
                    customRenderers: {
                        "size": Soul.util.RendererUtil.getCapacityStrFormBytes
                    },
                    properties: ["accessKey", "securityKey"],
                    source: ret
                });

                var win = new Ext.Window({
                    title: "ApiKey",
                    items: infoGrid,
                    stateful: false,
                    autoDestroy: true,
                    bodyStyle: 'padding:5px',
                    modal: true,
                    buttonAlign: 'center',
                    buttons: [{
                        text: HYSCAN_LABLE.buildNewSecurityKey,
                        handler: function () {
                            Soul.Ajax.request({
                                url: "/security/api/key/?userId=" + user.id,
                                method: 'post',
                                success: function (ret) {
                                    delete ret.createTime;
                                    delete ret.enable;
                                    delete ret.userId;
                                    infoGrid.setSource(ret);
                                }
                            });
                        }
                    }, {
                        text: LABEL.cancel,
                        handler: function () {
                            win.close();
                        }
                    }]
                });
                win.show();
            }
        });
    },

    doLookUserRoleFunction: function (record, callbackFn) {
        var me = this;
        var user = record.data;
        var userId = record.data.id;
        var userRoles = record.data.roles;
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
            proxy: {
                type: 'rest',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: 'application/json'
                },
                extraParams: {
                    filter: {}
                },
                api: {
                    read: '/security/role/'
                },
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
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
                {header: HYSCAN_LABLE.comment, dataIndex: 'comment', width: 100},
                {header: 'KEY', dataIndex: 'name', width: 200},
                {
                    text: LABEL.setup,
                    xtype: 'actioncolumn',
                    width: 80,
                    sortable: false,
                    editor: false,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'lock',
                            tooltip: LABEL.setup,
                            name: 'view',
                            scope: this,
                            handler: function (grid, rowIdx, colIdx, item, e, record, row) {
                                me.setAdmin(user, record.data.name, function () {
                                    callbackFn();
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
                    text: LABEL.cancel,
                    xtype: 'actioncolumn',
                    width: 80,
                    sortable: false,
                    editor: false,
                    align: 'center',
                    items: [
                        {
                            icon: '/img/icon/unsupport.png',
                            tooltip: LABEL.cancel,
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
            title: HYSCAN_LABLE.appAdmin,
            autoHeight: true,
            width: 600,
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
                fieldLabel: HYSCAN_LABLE.loginName
            }, {
                name: 'fullName',
                fieldLabel: HYSCAN_LABLE.fullName
            },
                {
                    name: 'password',
                    id: 'password',
                    inputType: 'password',
                    minLength: 6,
                    maxLength: 30,
                    fieldLabel: LABEL.password
                }, {
                    name: 'rePassword',
                    inputType: 'password',
                    passwordField: 'password',
                    vtype: 'confirmPwd',
                    fieldLabel: LABEL.confirmPwd
                }]
        });

        var win = new Ext.Window({
            title: HYSCAN_LABLE.createUser,
            items: [addForm],
            // height : 'auto',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: HYSCAN_LABLE.createUser,
                handler: function () {
                    var params = addForm.getForm().getValues();
                    params.params = {
                        fullName: params.fullName,
                    };

                    Soul.Ajax.request({
                        url: "/admin/user-detail/",
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
    }


});
