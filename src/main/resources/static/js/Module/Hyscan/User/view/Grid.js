Ext.define('Module.Hyscan.User.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.usergrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.User.Data',
        'Module.Hyscan.User.Renderer',
        "Module.Hyscan.User.operation",
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    checkIndexes: ['name'],
    minChars: 1,
    minLength: 1,

    initComponent: function () {
        var columns = [];
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
                        return HYSCAN_LABLE.noContent;
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
                text: HYSCAN_LABLE.setupAppAdmin,
                xtype: 'actioncolumn',
                width: 200,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        iconCls: 'lock',
                        name: 'view',
                        scope: this,
                        handler: this.onAdminClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            }
        );

        var sm = new Ext.selection.CheckboxModel({
            mode : 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
                    var itemsR = me.contextMenu.query('menuitem[needSelect=true]');
                    var items = me.portlet.query('menuitem[needSelect=true]');
                    if (records.length == 1) {
                        Ext.each(items, function (item) {
                            item.enable();
                        });
                        Ext.each(itemsR, function (item) {
                            item.enable();
                        });
                    } else {
                        Ext.each(items, function (item) {
                            item.disable();
                        });
                        Ext.each(itemsR, function (item) {
                            item.disable();
                        });
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

    onAdminClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;
        Module.Hyscan.User.Operation.doLookUserRoleFunction(record, function () {
            me.store.reload();
        });
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
        };

        me.addMenuHandler("add", function () {
            opt.addUserWin(callbackFn);
        });

        me.addMenuHandler("buildApiKey", function () {
            var records = sm.getSelection();
            opt.showApiKey(records[0].data);
        });

        me.addMenuHandler("setAppAdmin", function () {
            var records = sm.getSelection();
            opt.doLookUserRoleFunction(record[0], callbackFn);
        });

        me.addMenuHandler("resetPassword", function () {
            var records = sm.getSelection();
            Soul.Ajax.request({
                url: '/security/user/' + records[0].data.id + '/password/reset',
                method: 'PUT',
                confirm: HYSCAN_LABLE.confirmResetPassword
            })
        });

    }
});
