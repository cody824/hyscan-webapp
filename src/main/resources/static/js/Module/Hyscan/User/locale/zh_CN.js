USERMANAGE_LABEL = {
		lockStatus : '锁定',
		unknownStatus : '未知',
		status : '状态',
		email : '电子邮件(Email)',
	mobilePhone:'手机号码',
	selectValidUser : '请选择有效的用户',
	userLock : '用户锁',
	unlockUser : '解除锁定',
	typeSelect : '选择用户类型',
	userNotInGroup : '用户不在任何组中',
	lockUser : '锁定用户',
	resetPwd: '修改密码',
	operation : '用户操作',
	check : '查看',
	checkGroup : '查看组',
	checkRole : '查看角色',
	groupInfo : '组信息',
	userInfo : '用户信息',
	delMapping:'删除映射',
	ldapUser:'LDAP用户',
	domainUser:'域用户',
	localUser:'本地用户',
	ldapUserName:'LDAP用户',
	domainUserName:'域用户',
	localUserName:'本地用户',
	MappingUser:'映射用户',
	ladpUsersManager:'LDAP用户配置',
	delUsers: '删除用户',
	modifyUser:'修改用户',
	modifyPwd: '修改密码',
	addUsersToGroup: '添加到组',
	addUsersToRole: '赋予角色',
	groupName: '组名',
	newGroupWin: '新建组',
	chooseGroup: '选择组',
	deleteGroupWin: '删除组',
	chooseUsers: '选择用户',
	delUsersFromGroup: '从组中删除用户',
	userName: '用户名',
	password: '密码',
	rePassword: '重复密码',
	newUser: '新建用户',
	groups: '组',
	users: '用户',
	newGroup: '新建组',
	delGroup: '删除组',
	user: '用户',
	group: '组',
	group_user: '组/用户',
	default_group: '首选组',
	gid : 'gid',
	uid : 'uid',
	gid_uid:'gid/uid',
	type : '类型',
	renameGroup:'重命名组',
	setGroupGid:'设置gid',
	getAllUsers:'查询全部',
	groupType0:'系统',
	groupType1:'LDAP',
	groupType2:'Windows域',
	groupType3:'NIS',
	userType0:'系统',
	userType1:'LDAP',
	userType2:'Windows域',
	userType3:'NIS',
	userManage:'用户管理',
	mapManage:'映射管理',
	addMapping:'添加映射',
	mapType:'映射类型',
	remove : '移除',
	del:'删除',
	role : '角色',
	group: '组',
	isActive : '激活状态',
	ctime : '创建时间',
	setStaff : '设置管理员',
	staff : '管理员',
	commonUser : '普通用户',
	active : '激活',
	unactive : '未激活',
	delGroup:'退出组',
	delRole:'解除角色',
	createUser:'创建账户',
	userPre:'账户名前缀',
	userNum:'账户数',
	pw:'密码'
};

USERMANAGE_MESSAGE = {
	addUserToGroup : '添加用户[{0}]到指定的组中！',
	addUserToRole : '添加用户[{0}]到指定的角色中！',
	removeUserToRole : '移除用户[{0}]指定的角色！',
	removeUserToGroup : '从指定的组中移除用户[{0}]！',
	cancelAdmin : '取消[{0}]的管理员角色！',
	setAdmin : '将[{0}]设置为管理员！',
	removeUsersFromGroup : '从组[{0}]中移除用户[{1}]',
	userNotInGroup : '{0}没有加入任何组',
	userInGroup : '用户[{0}]在{1}个组中，点击查看详情',
	userIsLock : '用户[{0}]已经锁定，请用“重设密码”功能解锁用户！',
	lockUser : '锁定用户[{0}]！',
	resetPasswd : '重新设置用户[{0}]的密码',
	unLockUser : '解锁用户[{0}]，并设置新密码',
	delUser : '删除用户[{0}], 不建议执行此操作，可以使用“锁定用户”功能来锁定不能使用的用户',
	confirmDelUsers: '确定要删除用户: [{0}]？不建议执行此操作，可以使用“锁定用户”功能来锁定不能使用的用户！',
	confirmLockUsers: '确定要锁定用户: [{0}]?',
	confirmUnLockUsers : '确定要解锁用户: [{0}]?',
	confirmRestUsersPasswd: '确定要重置用户: [{0}]的密码?',
	confirmRemoveUsersFromGroup : '确定要从组[{0}]中移除用户[{1}]?',
	confirmChangeToAdmin : '确定将[{0}]设为管理员?',
	confirmCancelAdmin : '确定取消[{0}]的管理员角色?',
	invalidUser : '无效的用户[{0}]',
	confirmLockSelectUsers : '确定要删除所选用户吗?',
	
	invalidUser : '无此用户',
	userExist : '用户存在',
	invalidUserGroup : '无此用户（组）',
	userGroupExist : '用户（组）存在',
	noUser : '没有用户',
	typeError : '类型不一致',
	noMappingFound: '没有映射',
	confirmDelMapping: '确定要删除映射',
	groupName_blankText: '组名是必须的',
	userName_blankText: '用户名是必须的',
	password_blankText:'密码是必须的',
	password_vtypeText:'密码不一致',
	gid_blankText:'gid是必须的',
	selectGroup:'请选择组',
	selectUser:'请选择用户',
	uid_blankText:'uid是必须的',
	integerOnly:'只能是正整数',
	viewGroups:'查看所有组',
	chooseSameType:'请选择相同类型的用户',
	noSelectForUpdate:'没有选择数据',
	mustactivation:'必须激活才能赋予角色'
};

USERMANAGE_SELF_HELP = {
	groupName:'组',
	gid:'组的标识,必须大于1000，如果不填写，系统会分配默认gid！',
	newGroupName:'组',
	newGid:'组的标识',
	userName:'用户名',
	userPwd:'登录密码',
	userPwd1:'确认登录密码',
	uid:'用户的标识，组的标识,必须大于1000，如果不填写，系统会分配默认uid！',
	oldPwd:'原密码',
	newPwd:'新密码',
	newPwd1:'确认新密码',
	winname:'win用户/组名',
	unixname:'UA用户/组名',
	userType1:'用户类型',
	mapType1:'映射类型'
};

USERMANAGE_CREATE_HELP = {
	gid:'用户首选组，如果不填写，默认为other（gid：1）'
};


USER_PROPERTY = {
	name : '用户名',
	email : '电子邮件',
	status : "状态",
	registAppId : "注册应用",
	registdate : "注册时间",
	updatedate : "更新时间",
	field1 : "属性1",
	field2 : "属性2",
	field3: "属性3",
	type : "类型",
	firstLoginTime : "首次登陆时间",
	lastLoginTime : "上次登陆时间",
	source : "来源",
	avatar : '头像',
	avatarHd : '头像',
	fullName : '名称',
	mobile : '手机号'

}