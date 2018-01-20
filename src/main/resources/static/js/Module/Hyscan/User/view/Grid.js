Ext.define('Module.Hyscan.User.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.usergrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.User.Data',
        'Module.Hyscan.User.Renderer',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    checkIndexes: ['name'], // 默认选择的列
    minChars: 1,
    minLength: 1,

    initComponent: function () {
        var columns = new Array();
        var me = this;
        var callbackFun = function () {
            me.updateView(me);
        };
        var renders = Module.Hyscan.User.Renderer;
        columns.push(
            // new Ext.grid.RowNumberer(),
            {
                text: "ID", sortable: true, dataIndex: 'id', searchType: 'number',
                width: 60
            },
            {
                text: USERMANAGE_LABEL.user, sortable: true, dataIndex: 'nick', searchType: 'string',
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"';
                    return (Soul.util.GridRendererUtil.getLinkName(Module.Hyscan.User.Renderer.getUserName(v, u, r, rowIndex, columnIndex - 1, s)));
                },
                flex: 1
            },
            {
                text: USERMANAGE_LABEL.email, width: 200, searchType: 'string',
                sortable: false, menuDisabled: true, dataIndex: 'email'
            },
            {
                text: USERMANAGE_LABEL.mobilePhone, width: 200, searchType: 'string',
                sortable: false, menuDisabled: true, dataIndex: 'mobile',
                renderer: function (val, u, r, rowIndex, columnIndex, s, v) {
                    if (val == 0) {
                        return "未填写";
                    } else {
                        return val;
                    }
                }
            },
            {
                text: USERMANAGE_LABEL.ctime, width: 200, dataIndex: 'createDate', searchType: 'date',
                renderer: function (val, u, r, rowIndex, columnIndex, s, v) {
                    return renders.translateCtime(val, u, r, rowIndex, columnIndex - 1, s, v);
                }
            },
            {
                text: "管理员", width: 80, dataIndex: 'roles', searchType: 'date',
                renderer: function (val, u, r, rowIndex, columnIndex, s, v) {
                    return me.isAdmin(r.data, "ROLE_ADMIN") ? "是" : "否";
                }
            },
            {
                text: "HYSCAN管理员", width: 80, dataIndex: 'roles', searchType: 'date',
                renderer: function (val, u, r, rowIndex, columnIndex, s, v) {
                    return me.isAdmin(r.data, "ROLE_HYSCAN_ADMIN") ? "是" : "否";
                }
            },
            {
                text: "水色管理员", width: 80, dataIndex: 'roles', searchType: 'date',
                renderer: function (val, u, r, rowIndex, columnIndex, s, v) {
                    return me.isAdmin(r.data, "ROLE_WQ_ADMIN") ? "是" : "否";
                }
            }
        );

        var sm = new Ext.selection.CheckboxModel({
            mode : 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();

                    var setAdminR = me.contextMenu.down('menuitem[name=setAdmin]');
                    var setAdmin = me.portlet.down('menuitem[name=setAdmin]');

                    var setHyscanAdminR = me.contextMenu.down('menuitem[name=setHyscanAdmin]');
                    var setHyscanAdmin = me.portlet.down('menuitem[name=setHyscanAdmin]');

                    var setWQAdminR = me.contextMenu.down('menuitem[name=setWQAdmin]');
                    var setWQAdmin = me.portlet.down('menuitem[name=setWQAdmin]');

                    if (records.length == 1) {
                        setAdminR.enable();
                        setAdmin.enable();
                        setHyscanAdminR.enable();
                        setHyscanAdmin.enable();
                        setWQAdminR.enable();
                        setWQAdmin.enable();

                        var isAdmin = me.isAdmin(records[0].data, "ROLE_ADMIN");
                        if (isAdmin) {
                            setAdminR.setText("取消管理员");
                            setAdmin.setText("取消管理员");
                        } else {
                            setAdminR.setText("设置管理员");
                            setAdmin.setText("设置管理员");
                        }

                        var isHyscanAdmin = me.isAdmin(records[0].data, "ROLE_HYSCAN_ADMIN");
                        if (isHyscanAdmin) {
                            setHyscanAdminR.setText("取消HYSCAN管理员");
                            setHyscanAdmin.setText("取消HYSCAN管理员");
                        } else {
                            setHyscanAdminR.setText("设置HYSCAN管理员");
                            setHyscanAdmin.setText("设置HYSCAN管理员");
                        }

                        var isWQAdmin = me.isAdmin(records[0].data, "ROLE_WQ_ADMIN");
                        if (isWQAdmin) {
                            setWQAdminR.setText("取消水色管理员");
                            setWQAdmin.setText("取消水色管理员");
                        } else {
                            setWQAdminR.setText("设置水色管理员");
                            setWQAdmin.setText("设置水色管理员");
                        }
                    } else {
                        setAdminR.setText("设置/取消管理员");
                        setAdmin.setText("设置/取消管理员");
                        setAdminR.disable();
                        setAdmin.disable();
                        setHyscanAdminR.setText("设置/取消HYSCAN管理员");
                        setHyscanAdmin.setText("设置/取消HYSCAN管理员");
                        setHyscanAdminR.disable();
                        setHyscanAdmin.disable();
                        setWQAdminR.setText("设置/取消水色管理员");
                        setWQAdmin.setText("设置/取消水色管理员");
                        setWQAdminR.disable();
                        setWQAdmin.disable();
                    }

                }
            }
        });

        var me = this;

        me.contextMenu = me.portlet.buildUserOptMenu();
        Ext.apply(this, {
            selModel: sm,
            store: Ext.data.StoreManager.lookup("Module.Hyscan.User.store.UserStore"),
            viewConfig: {
                emptyText: USERMANAGE_MESSAGE.noUser
            },
            columns: columns
        });
        this.callParent(arguments);
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

    setAdmin: function (user, adminRole,callback) {
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
            success: function (response, opts) {
                if (typeof callback == "function")
                    callback();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }

        });

    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var opt = Module.Hyscan.User.Operation;

        var sm = me.selModel;
        var callbackFn = function () {
            me.updateView(me);
            sm.deselectAll();
        };

        var setAdminR = me.contextMenu.down('menuitem[name=setAdmin]');
        var setAdmin = me.portlet.down('menuitem[name=setAdmin]');

        var setHyscanAdminR = me.contextMenu.down('menuitem[name=setHyscanAdmin]');
        var setHyscanAdmin = me.portlet.down('menuitem[name=setHyscanAdmin]');

        var setWQAdminR = me.contextMenu.down('menuitem[name=setWQAdmin]');
        var setWQAdmin = me.portlet.down('menuitem[name=setWQAdmin]');

        setAdminR.on('click', function () {
            var records = sm.getSelection();
            me.setAdmin(records[0].data, 'ROLE_ADMIN', callbackFn);
        });
        setAdmin.on('click', function () {
            var records = sm.getSelection();
            me.setAdmin(records[0].data, 'ROLE_ADMIN', callbackFn);
        });


        setHyscanAdminR.on('click', function () {
            var records = sm.getSelection();
            me.setAdmin(records[0].data, 'ROLE_HYSCAN_ADMIN', callbackFn);
        });
        setHyscanAdmin.on('click', function () {
            var records = sm.getSelection();
            me.setAdmin(records[0].data, 'ROLE_HYSCAN_ADMIN', callbackFn);
        });


        setWQAdminR.on('click', function () {
            var records = sm.getSelection();
            me.setAdmin(records[0].data, 'ROLE_WQ_ADMIN', callbackFn);
        });
        setWQAdmin.on('click', function () {
            var records = sm.getSelection();
            me.setAdmin(records[0].data, 'ROLE_WQ_ADMIN', callbackFn);
        });



    }
});
