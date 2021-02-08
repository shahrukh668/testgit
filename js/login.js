if(window.language) {
	loginLanguage = window.language;
} else {
	if(navigator.appName == 'Netscape') {
		brwlanguage = navigator.language;
	} else {
		brwlanguage = navigator.browserLanguage;
	}
	loginLanguage = brwlanguage.substring(0,2);
	if(window.cookiel) {
		loginLanguage = window.cookiel;
	}
}

loginLangStringEn = {
	username: 'Username',
	login: 'Login',
	rememberMe: 'Remember Me',
	exit: 'Exit',
	password: 'Password',
	cloudToken: 'Cloud',
	pleaseLogin: 'Please Log In',
	pleaseRelogin: 'Please enter password for continue',
	loginButton: 'Log In',
	waitTitle: 'Please wait',
	waitMsg: 'Transfering data...',
	loginSuccess: 'Login succesfull',
	serverUnavailable: 'Server unavailable',
	unknownError: 'Unknown error',
	warning: 'Warning',
	language: 'Language',
	loginFailed: 'Incorrect username or password.',
	code2fa: '2FA code',
	selectCloudToken: 'please select Cloud'
}

langData = [
	['English', 'en', 'ux-flag-en', loginLangStringEn]
];

reloginForm = null;
reloginTasks = null;

Ext.define('LoginPanel', {
	extend: 'Ext.FormPanel',
	alias: 'widget.LoginPanelX',
	initComponent:function() {
		var langStore = new Ext.data.ArrayStore({
			fields: [ 'name', 'value', 'flag', 'langData' ],
			data: langData
		});
		var cloudTokensStore = new Ext.data.ArrayStore({
			fields: [ 'id', 'name' ],
			data: []
		});
		Ext.apply(this, {
			relogin: window.username,
			frame: true,
			titleWindow: getLoginLangString('pleaseLogin'),
			defaultType: 'textfield',
			defaults: {
				labelWidth: 130,
				width: 160+5+130
			},
			monitorValid:true,
			items: [
				{xtype: 'hidden', name: 'module', value: window.username?'relogin':'login'},
				{xtype: 'hidden', name: 'dbcheck', value: window.dbcheck||window.debug?1:0},
				{xtype: 'container',
				 layout: { type: 'vbox', align: 'center'},
				 items: window.gEnableAuth ? {
					xtype: 'component',
					html: '<div id="gSignButton"></div>',
					style: {
						marginTop: '4px',
						marginBottom: '8px'
					},
					hidden: true
				 } : !window.gDisableButton ? {
					xtype: 'button',
					text: 'Google Sign in',
					handler: function() {
						Ext.Msg.alert('Info', "You need to enable the 'Google Sign In' in the Settings->System configuration.&nbsp;&nbsp;<a href='https://www.voipmonitor.org/doc/Google_Sign_in_usage'>Wiki</a>");
					},
					style: {
                                                marginTop: '4px',
                                                marginBottom: '8px'
                                        }
				 } : undefined},
				{fieldLabel: getLoginLangString('username') + (window.DEMO ? ' (admin)' : ''), name: 'user',
				 value: window.cookieu || window.username || (window.DEMO ? 'admin' : ''),
				 readOnly: window.username, allowBlank: false,
				 fieldStyle: window.username?{background: '#F5F5F5'}:undefined,
				 listeners: {
					scope: this,
					change: function() {
						hideCloudToken.call(this);
					},
					focusleave: function() {
						handle2FAelement.call(this);
					}
				 }},
				{fieldLabel: getLoginLangString('password') + (window.DEMO ? ' (admin)' : ''), name: 'pass',
				 inputType: 'password', value: window.cookiep  || (window.DEMO ? 'admin' : ''),
				 allowBlank: false},
				{xtype: 'combobox', id: 'cloud_token',
				 fieldLabel: getLoginLangString('cloudToken'),
				 editable: false, allowBlank: true,
				 name: 'cloud_token', mode: 'local', triggerAction: 'all',
				 store: cloudTokensStore, displayField: 'name', valueField: 'id',
				 hidden: true, width: 450,
				 listeners: {
					scope: this,
					expand: function(combo) {
						combo._expanded = true;
					},
					select: function() {
						Ext.getCmp('loginButton').enable();
					}
				 }},
				{fieldLabel: getLoginLangString('code2fa') + (window.DEMO ? ' (admin)' : ''), name: 'code2fa', value: '', allowBlank: true, hidden: true},
				window.username?
					{xtype: 'hidden', name: 'language', value: loginLanguage}:
					{xtype: 'iconcombo',
					 id: 'logincombo',
					 fieldLabel: getLoginLangString('language'),
					 editable: false,
					 allowBlank: false,
					 name: 'language',
					 mode: 'local',
					 triggerAction: 'all',
					 store: langStore,
					 displayField: 'name',
					 valueField: 'value',
					 iconClsField: 'flag',
					 value: loginLanguage,
					 listeners: {
						scope: this,
						select: onChangeLanguage
					 }},
				window.username?
					undefined:
					{xtype: 'checkbox', name: 'rememberme', fieldLabel: getLoginLangString('rememberMe'), checked: !!window.cookieu}
			],
			buttons: [window.isCloud ? {
				text: 'Register',
				handler: function() {
					window.open(appCloudPriceUrl);
				},
				style: {
					'background-image': Ext.isChrome ?
							     '-webkit-linear-gradient(top,#ccf,#aaf)' :
							     '-moz-linear-gradient(center top,#ccf,#aaf)',
					color: 'white'
				}
			} : undefined,'->',{ 
				id: 'loginButton',
				text: getLoginLangString('login'),
				formBind: true,
				scope: this,
				listeners: {
					scope: this,
					click: function() {
						if(!this.getForm().isValid()) {
							return;
						}
						this.getForm().submit({
							scope: this,
							url: 'php/model/sql.php',
							method: 'POST',
							success: function(form, action) {
								if(this.relogin) {
									Ext.getBody().unmask();
									Ext.defer(runReloginTasks,250);
								}
								obj = Ext.decode(action.response.responseText);
								if(this.relogin) {
									this.ownerCt.close();
									reloginForm=null;
								} else {
									if(obj.redirect) {
										window.location = obj.redirect + 
												  (window.urlParamsString ? 
													'?' + window.urlParamsString.replaceall('%22', '"').
																     replaceall('%', '__perc__').
																     replaceall('__perc__', '%25') : 
													'');
									} else if(obj.cloud_token_data) {
										showCloudToken.call(this);
										fillCloudToken.call(this, obj.cloud_token_data);
										Ext.getBody().unmask();
										this.ownerCt.show();
									}
								}
							},
							failure: function(form, action) {
								Ext.getBody().unmask();
								this.ownerCt.show();
								form.reset();
								Ext.defer(form.clearInvalid, 10, form);
								if(action.failureType == 'server'){
									obj = Ext.decode(action.response.responseText);
									Ext.defer(Ext.Msg.alert,
										  250, Ext.Msg,
										  [	getLoginLangString('warning'),
											obj.error ||
											obj.errors&&obj.errors.reason ||
											obj.msg ||
											getLoginLangString('unknownError')
										  ]);
								} else {
									Ext.defer(Ext.Msg.alert,
										  250, Ext.Msg,
										  [	getLoginLangString('serverUnavailable'),
											getLoginLangString('serverUnavailable') + ': ' + 
												(action.response.responseText || action.response.statusText || '')
										  ]);
								}
							}
						});
						Ext.getBody().mask(getLoginLangString('waitMsg'), 'x-mask-loading');
						this.ownerCt.hide();
					}
				}
			},
			!window.username?null:{
				id: 'exitButton',
				text: getLoginLangString('exit'),
				handler: function() {
					window.location = "./";
				}
			}],
			listeners: {
				scope: this,
				afterrender: function() {
					Ext.create('Ext.util.KeyNav', this.el, {
						enter: function() {
							Ext.getCmp('loginButton').fireEvent('click');
						},
						scope: this
					});
					var focusField = this.getForm().findField(window.username?'pass':'user');
					if(focusField) {
						Ext.defer(function() {
								focusField.focus();
							}, 200);
					}
				}
			}
		});
		this.callParent(arguments);
		handle2FAelement.call(this);
		
		function onChangeLanguage(combo, record) {
			loginLanguage = record.data.value;
			this.ownerCt.setTitle(getLoginLangString('pleaseLogin'));
			var fields = [
				[ 'user', 'username' ],
				[ 'pass', 'password' ],
				[ 'language', 'language' ],
				[ 'rememberme', 'rememberMe' ]
			];
			var buttons = [
				[ 'loginButton', 'login' ]
			];
			for(var i = 0; i < fields.length; i++) {
				this.getForm().findField(fields[i][0]).setFieldLabel(getLoginLangString(fields[i][1]));
			}
			for(var i = 0; i < buttons.length; i++) {
				loginButtons = this.dockedItems.get(0).items.items;
				for(var j = 0; j < loginButtons.length; j++) {
					if(loginButtons[j].id == buttons[i][0]) {
						loginButtons[j].setText(getLoginLangString(buttons[i][1]));
					}
				}
			}
		}
		function fillCloudToken(data) {
			flushCloudToken.call(this);
			var fieldCloudToken = this.getForm().findField('cloud_token');
			for(var i = 0; i < data.length; i++) {
				if(fieldCloudToken._expanded) {
					fieldCloudToken.store.add({id: data[i][0], name: data[i][1]});
				} else {
					fieldCloudToken.store.add(data[i]);
					fieldCloudToken.store.proxy.data.push(data[i]);
				}
			}
		}
		function flushCloudToken() {
			var fieldCloudToken = this.getForm().findField('cloud_token');
			fieldCloudToken.store.removeAll();
		}
		function showCloudToken() {
			var fieldCloudToken = this.getForm().findField('cloud_token');
			fieldCloudToken.show();
			fieldCloudToken.allowBlank = false;
			fieldCloudToken.markInvalid('Select cloud token!');
			Ext.getCmp('loginButton').disable();
		}
		function hideCloudToken() {
			var fieldCloudToken = this.getForm().findField('cloud_token');
			fieldCloudToken.hide();
			fieldCloudToken.allowBlank = true;
			fieldCloudToken.setValue(null);
			fieldCloudToken.clearInvalid();
			flushCloudToken.call(this);
			Ext.getCmp('loginButton').enable();
		}
		function handle2FAelement() {
			var uname = this.getForm().findField('user').getValue();
			ajaxSafeRequest({
				scope: this,
				url: 'php/model/utilities.php',
				params: {
					task: 'getExistsUserSecret',
					params: Ext.encode({ username: uname })
				},
				success: function(result) {
					this.getForm().findField('code2fa')[result.exists_secret*1 ? 'show' : 'hide']();
				}
			});
		}
	}
});

function login() {
	setLang();
	ajaxSafeRequest({
		url: 'php/model/utilities.php',
		params: {
			task: 'getLanguages',
			params: Ext.encode({
				loginLangString: treeToArray({ login: loginLangStringEn }, '//L//')
			})
		},
		success: function(result) {
			setLangData(result.lang);
			_login();
		},
		error: function(result) {
			loginLanguage = 'en';
			_login();
		}
	});
}

function _login() {
	var loginForm = Ext.create('LoginPanel');
	var win = new Ext.create('Ext.Window', {
		items: loginForm,
		title: loginForm.titleWindow,
		border: false,
		closable: false,
		resizable: false,
		listeners: {
			show: function() {
				if(window.gEnableAuth) {
					loadGoogleAuth(function() {
						gRenderButton(true);
					});
				}
			}
		}
	});
	win.show();
}

function reLogin(task) {
	if(window.kill_session) {
		return;
	}
	if(task) {
		if(reloginTasks) {
			reloginTasks.push(task);
		} else {
			reloginTasks = [ task ];
		}
	}
	if(reloginForm) {
		return;
	}
	loginLanguage = window.language;
	reloginForm = Ext.create('LoginPanel');
	var win = new Ext.create('Ext.Window', {
		items: reloginForm,
		title: getLoginLangString('pleaseRelogin'),
		border: false,
		closable: false,
		resizable: false,
		modal: true,
		listeners: {
			show: function() {
				if(window.gEnableAuth && user && user.glogin && window._google_auth_loaded) {
					loadGoogleAuth(function() {
						gRenderButton(false);
					});
				}
			}
		}
	});
	win.show();
	window.reLoginWindow = win;
}

function runReloginTasks() {
	if(reloginTasks) {
		for(var i=0; i<reloginTasks.length; i++) {
			reloginTasks[i].fce.apply(reloginTasks[i].scope, reloginTasks[i].params);
		}
		reloginTasks = null;
	}
}

function setLangData(langSourceData) {
	if(langSourceData) {
		for(var i = 0; i < langSourceData.length; i++) {
			flagStyle = '';
			if(langSourceData[i].flag_name) {
				flagStyle = 'ux-flag-' + langSourceData[i].lang_short;
				addRuleToStyleSheet(
					'.' + flagStyle, 
					'background-image: url("data:image/png;base64,' + langSourceData[i].flag_content + '");' +
					'background-size: Auto 11px',
					'loginCombo',
					false, false, true);
				
			}
			langData.push([
				langSourceData[i].lang,
				langSourceData[i].lang_short,
				flagStyle,
				langSourceData[i].lang_string
			]);
		}
	}
	var okLoginLanguage = false
	for(var i = 0; i < langData.length; i++) {
		if(langData[i][1] == loginLanguage) {
			okLoginLanguage = true;
			break;
		}
	}
	if(!okLoginLanguage) {
		loginLanguage = 'en';
	}
}

if(window.doLogin) {
	if(!window.disableFrameCheck) {
		try {
			if(top.location.hostname != self.location.hostname) throw 1;
		} catch(e) {
			top.location.href = self.location.href;
		}
	}
	Ext.Ajax.timeout = 300000;
        Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
        Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });
        Ext.override(Ext.data.Connection, { timeout: Ext.Ajax.timeout });
	Ext.onReady(function(){
		if(Ext.isIE && Ext.ieVersion < 11) {
			Ext.Msg.alert('Compatibility problem', 
				      'Internet explorer is supported from version 11.' + '<br><br>' +
				      Ext.userAgent);
			return;
		}
		Ext.QuickTips.init();
		login();
	});
}

function getLoginLangString(stringType) {
	if(window.user) {
		return(findLangS('login', stringType));
	} else {
		var loginLangString = null;
		for(var i = 0; i < langData.length; i++) {
			if(langData[i][1] == loginLanguage) {
				loginLangString = langData[i][3];
			}
		}
		return(loginLangString ? 
			loginLangString[stringType] || loginLangStringEn[stringType] :
			loginLangStringEn[stringType]);
	}
}
