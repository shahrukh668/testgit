function override_Ext_clone() {
Ext._clone_base = Ext.clone;
Ext.clone = function(item, cloneDom) {
	if (item === null || item === undefined) {
	    return item;
	}
	if (cloneDom !== false && item.nodeType && item.cloneNode) {
	    return item.cloneNode(true);
	}
	if(Ext.isDate(item) && Ext.isDefined(item.timeDefined)) {
	    var cloneDate = new Date(item.getTime());
	    cloneDate.timeDefined = item.timeDefined;
	    return(cloneDate);
	}
	return(Ext._clone_base(item, cloneDom));
}
}

Ext.decode = function(string, noDebug) {
	string = repairJsonResult(string, noDebug);
	var rslt = {};
	if(string) {
		try {
			rslt = Ext.JSON.decode(string, noDebug);
			if(noDebug && rslt === null) {
				rslt = {};
			}
		} catch(e) {
			rslt = {};
		}
	}
	return(rslt);
}

Ext.override(Ext.Component, {
	afterRender: function() {
		if(this.helpText && Ext.isString(this.helpText)){
			Ext.QuickTips.register({
				target: this.helpInField || !this.labelEl || this.xtype && (this.xtype.match('displayfield') || this.xtype.match('checkbox')) ? this.el : this.labelEl,
				title: '',
				text: this.helpText,
				enabled: true,
				dismissDelay: 120000
			});
		}
		this.callOverridden();
	},
	destroy: function() {
		if(this.helpText && Ext.isString(this.helpText)){
			Ext.QuickTips.unregister(this.helpInField || !this.labelEl || this.xtype && (this.xtype.match('displayfield') || this.xtype.match('checkbox')) ? this.el : this.labelEl);
		}
		this.callOverridden();
	},
	getAbsolutePosition: function() {
		if(this.getEl() && this.getEl().dom) {
			return(getAbsolutePosition(this.getEl().dom));
		} else {
			var position = this.getPosition();
			var item = this;
			while(item.ownerCt) {
				item = item.ownerCt;
				var nextPosition = item.getPosition();
				for(var i = 0; i < 2; i++) {
					position[i] += nextPosition[i];
				}
			}
			return(position);
		}
	},
	startActiveRequest: function(config) {
		if(this.activeRequestKill && this.activeRequestKill[config.timestamp_id]) {
			delete this.activeRequestKill[config.timestamp_id];
		}
		Ext.defer(function() {
				config.ignoreExistElement = config.element && !config.element.getEl();
				this.doActiveRequest(config);
			}, 1000, this);
	},
	killActiveRequest: function(config) {
		if(!this.activeRequestKill) {
			this.activeRequestKill = {};
		}
		this.activeRequestKill[config.timestamp_id] = true;
		if(this.activeRequestTimeoutId && this.activeRequestTimeoutId[config.timestamp_id]) {
			clearTimeout(this.activeRequestTimeoutId[config.timestamp_id]);
			delete this.activeRequestTimeoutId[config.timestamp_id];
		}
		ajaxSafeRequest({
			scope: this,
			url: 'php/model/utilities.php',
			params: {
				task: 'setActiveRequest',
				params: Ext.encode({
					kill: true,
					timestamp_id: config.timestamp_id
				})
			},
			success: function() {
				if(this.activeRequestKill && this.activeRequestKill[config.timestamp_id]) {
					delete this.activeRequestKill[config.timestamp_id];
				}
			},
			errorFailure2: function() {
			}
		});
	},
	doActiveRequest: function(config) {
		if(!config.element ||
		   (!config.ignoreExistElement && !config.element.getEl()) ||
		   (config.request && !config.request.xhr) ||
		   (config.proxy && config.proxy._request && !config.proxy._request.xhr) ||
		   (this.activeRequestKill && this.activeRequestKill[config.timestamp_id])) {
			if(this.activeRequestKill && this.activeRequestKill[config.timestamp_id]) {
				delete this.activeRequestKill[config.timestamp_id];
			}
			return;
		}
		ajaxSafeRequest({
			scope: this,
			url: 'php/model/utilities.php',
			params: {
				task: 'setActiveRequest',
				params: Ext.encode({
					timestamp_id: config.timestamp_id,
					interval_ms: config.interval_ms
				})
			},
			success: function() {
				if(this.activeRequestKill && this.activeRequestKill[config.timestamp_id]) {
					delete this.activeRequestKill[config.timestamp_id];
				} else {
					this.setActiveRequestTimeout(config);
				}
			},
			errorFailure2: function() {
				if(this.activeRequestKill && this.activeRequestKill[config.timestamp_id]) {
					delete this.activeRequestKill[config.timestamp_id];
				} else {
					this.setActiveRequestTimeout(config);
				}
			}
		});
	},
	setActiveRequestTimeout: function(config) {
		if(!this.activeRequestTimeoutId) {
			this.activeRequestTimeoutId = {};
		}
		this.activeRequestTimeoutId[config.timestamp_id] = setTimeout(Ext.bind(this.doActiveRequest, this, [config]), config.interval_ms);
	}
});

Ext.override(Ext.data.Store, {
    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();
        if (me.destroyed) {
            return;
        }
        if (resultSet) {
            me.totalCount = resultSet.getTotal();
        }
        // ADD begin
        me.fireEvent('load_before_renders', me, records, successful, operation);
        // ADD end
        if (successful) {
            records = me.processAssociation(records);
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
        } else {
            me.loading = false;
        }
        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
        me.callObservers('AfterLoad', [
            records,
            successful,
            operation
        ]);
    }
});

Ext.override(Ext.toolbar.Paging, {
    onLoadOrig: Ext.toolbar.Paging.prototype.onLoad,
    getPagingItems: function(){
        var pagingItems = this.callOverridden();
        // ADD - begin
        for(var i = 0; i < pagingItems.length; i++) {
            if(pagingItems[i].itemId == 'afterTextItem') {
                pagingItems.splice(i, 0, {
                    itemId: 'reloadingTotal_afterTextItem',
                    iconCls: 'icon_loading'
                });
                break;
            }
        }
        // ADD - end
        return(pagingItems);
    },
    initComponent: function(){
        var me = this,
            userItems = me.items || me.buttons || [],
            pagingItems;
        me.bindStore(me.store || 'ext-empty-store', true);
        if (me.store && !me.store.nextPage) {
            Ext.raise('Store is not compatible with this component (does not support paging)');
        }
        pagingItems = me.getPagingItems();
        if (me.prependButtons) {
            me.items = userItems.concat(pagingItems);
        } else {
            me.items = pagingItems.concat(userItems);
        }
        // ADD begin
        if(me.behindButtonsItems && me.behindButtonsItems.length) {
            me.items = me.items.concat(me.behindButtonsItems);
        }
        // ADD end
        delete me.buttons;
        if (me.displayInfo) {
            me.items.push('->');
            me.items.push({
                xtype: 'tbtext',
                itemId: 'displayItem'
            });
            // ADD begin
            me.items.push({
                itemId: 'reloadingTotal_displayItem',
                iconCls: 'icon_loading'
            });
            // ADD end
        }
        // MODIFY add
        // - me.callParent();
        Ext.toolbar.Paging.superclass.initComponent.call(this);
        // MODIFY end
        
        // ADD begin
        if(me.suppressTotal) {
            me.child('#afterTextItem').hide();
            me.child('#last').hide();
        }
        me.child('#reloadingTotal_afterTextItem').hide();
        if (me.displayInfo) {
            me.child('#reloadingTotal_displayItem').hide();
        }
        me.store.on('beforeload', this.onBeforeLoad, this);
        // ADD end
    },
    onBeforeLoad: function() {
        if(this.totalRequest) {
            abortRequest(this.totalRequest, this.totalRequest_timestampId);
            delete this.totalRequest;
            delete this.totalRequest_timestampId;
        }
    },
    onLoad : function(store, records, success){
        // ADD begin
        if(success &&
           store.proxy && store.proxy.reader && store.proxy.reader.rawData && 
           store.proxy.reader.rawData.deferTotal) {
            this.deferringTotal = true;
            this.child('#reloadingTotal_afterTextItem').show();
            this.child('#afterTextItem').hide();
            if (this.displayInfo) {
                this.child('#reloadingTotal_displayItem').show();
            }
            var params = cloneObject(store.proxy.extraParams);
            var filters = store.getFilters();
            if(filters && filters.items && filters.items.length) {
                params['filter'] = store.proxy.encodeFilters(filters.items);
            }
            params.task = 'TOTAL';
            this.totalRequest_timestampId = (new Date).getTime();
            params['timestampId'] = this.totalRequest_timestampId;
            if(this.totalRequest) {
                abortRequest(this.totalRequest, this.totalRequest_timestampId);
            }
            this.totalRequest = ajaxSafeRequest({
                scope: this,
                url: 'php/model/sql.php',
                params: params,
                success: function(result) {
                    delete this.totalRequest;
                    delete this.totalRequest_timestampId;
                    delete this.deferringTotal;
                    this.store.totalCount = result.total;
                    this.child('#reloadingTotal_afterTextItem').hide();
                    this.child('#afterTextItem').show();
                    this.onLoadOrig();
                    if (this.displayInfo) {
                        this.child('#reloadingTotal_displayItem').hide();
                        this.updateInfo();
                    }
                },
                error: function() {
                },
                failure: function() {
                },
                timeout: store.proxy.timeout
            });
            this._currentPageIsPageCount = true;
        } else if(this._currentPageIsPageCount) {
            delete this._currentPageIsPageCount;
        }
        // ADD end
        this.callOverridden();
        // ADD begin
        if(this.suppressTotal) {
            this.child('#next').setDisabled(this.getPageData().total <= this.store.pageSize);
        }
        // ADD end
    },
    moveNext : function(){
        var me = this,
            store = me.store,
            total = me.getPageData().pageCount,
            next = store.currentPage + 1;
        // MODIFY begin
        if (me.suppressTotal || next <= total) {
        // MODIFY end
            if (me.fireEvent('beforechange', me, next) !== false) {
                store.nextPage();
                return true;
            }
        }
        return false;
    },
    updateInfo : function() {
        var me = this,
            displayItem = me.child('#displayItem'),
            store = me.store,
            pageData = me.getPageData(),
            count, msg;
        if (displayItem) {
            count = store.getCount();
            if (count === 0) {
                msg = me.emptyMsg;
            } else {
                // MODIFY begin
                // - msg = Ext.String.format(me.displayMsg, pageData.fromRecord, pageData.toRecord, pageData.total);
                msg = Ext.String.format(
                    me.displayMsg,
                    pageData.fromRecord,
                    this.deferringTotal ? pageData.fromRecord + pageData.total - 1 : pageData.toRecord,
                    this.deferringTotal ? '' : pageData.total
                );
                // MODIFY end
            }
            displayItem.setText(msg);
        }
    },
    getPageData: function() {
        var store = this.store,
            totalCount = store.getTotalCount(),
            pageCount = Math.ceil(totalCount / store.pageSize),
            toRecord = Math.min(store.currentPage * store.pageSize, totalCount);
        var currentPageIsPageCount = this._currentPageIsPageCount;
        if(this._currentPageIsPageCount) {
            delete this._currentPageIsPageCount;
        }
        return {
            total: totalCount,
            currentPage: store.currentPage,
            // MODIFY begin
            // - pageCount: Ext.Number.isFinite(pageCount) ? pageCount : 1,
            pageCount: currentPageIsPageCount &&
                       store.proxy && store.proxy.reader && store.proxy.reader.rawData && 
                       store.proxy.reader.rawData.deferTotal ?
                        store.currentPage :
                        (Ext.Number.isFinite(pageCount) ? pageCount : 1),
            // MODIFY end
            fromRecord: ((store.currentPage - 1) * store.pageSize) + 1,
            toRecord: toRecord || totalCount
        };
    }
});

function override_Ext_MessageBox() {
Ext.override(Ext.MessageBox, {
	show: function(config) {
		if(config && !config.cls) {
			config.cls = 'x-selectable';
		}
		this.callOverridden(arguments);
	},
	longalert: function(title, msg, fn, scope, force, msgConfig) {
		if(msg.split('<br>').length > 15 || force) {
			var width = Math.min(700, Ext.dom.Element.getViewportWidth() * 3 / 5);
			var height = Math.min(400, Ext.dom.Element.getViewportHeight() * 3 / 5);
			Ext.Msg.show(Ext.applyIf(msgConfig||{},{
				title: title,
				msg: '<div id="Ext_Msg_longalert_text" style="width: ' + width + 'px; height: ' + height +'px;"></div>',
				buttons: Ext.Msg.OK,
				fn: fn,
				scope: scope,
				minWidth: width + 30,
				minHeight: height + 30,
				width: width + 30,
				height: height + 30
			}));
			new Ext.Panel({
				renderTo: 'Ext_Msg_longalert_text',
				html: msg,
				width: width,
				height: height,
				autoScroll: true,
				border: false,
				bodyStyle: {
					'background-color': __color_WindowFrame
				}
			});
		} else {
			Ext.Msg.alert(title, msg, fn, scope);
		}
	}
});
}

Ext.override(Ext.Window, {
	constructor: function(config) {
		if(config && config.wikiId) {
			if(!config.tools) {
				config.tools = [];
			}
			config.tools.push(getWikiObject({
				id: config.wikiId,
				marginTop: config.wikiButtonMarginTop
			}));
		}
		if(config && !config.cls) {
			config.cls = 'x-selectable';
		}
		this.callOverridden([config]);
		if(config && config.createMaskEl && config.createMaskEl.maskLoad) {
			this.on('afterrender', function() {
					config.createMaskEl.unmask();
				},
				this);
		}
		this.initCheckPosition();
		if(this.formPanelForAutoAdjustSize) {
			this.on('afterlayout', function() {
					this.adjustSizeForFormPanel(this.formPanelForAutoAdjustSize, this.heightMax, true,
								    this.formPanelForAutoAdjustSizeForceScroller);
				},
				this,
				{ single: true });
		}
	},
	checkPosition: function() {
		if(this.el&&this.isVisible()) {
			var position = this.getPosition();
			if(position) {
				var repairPosition = false
				for(var i = 0; i < 2; i++) {
					if(position[i] < 0) {
						position[i] = 0;
						repairPosition = true;
					}
				}
				if(repairPosition) {
					this.setPosition(position);
				}
			}
		}
	},
	initCheckPosition: function() {
		this.checkPositionTask = {
			run: this.checkPosition,
			interval: 2000,
			scope: this
		}
		Ext.TaskManager.start(this.checkPositionTask);
		this.on('move', this.checkPosition, this);
		this.on('resize', this.checkPosition, this);
		this.on('destroy', this.stopCheckPositionTask, this);
		this.on('close', this.stopCheckPositionTask, this);
	},
	stopCheckPositionTask: function() {
		Ext.TaskManager.stop(this.checkPositionTask);
	},
	adjustSizeForFormPanel: function(formPanel, heightMax, addWidthForVerticalScroller, forceAddWidthForVerticalScroller) {
		adjustHeightWindow(this, formPanel, heightMax, addWidthForVerticalScroller, forceAddWidthForVerticalScroller);
	},
	setPositionAnimate: function(newXY, speed, step) {
		if(!Ext.isDefined(speed)) {
			speed = 1;
		}
		if(!Ext.isDefined(step)) {
			step = 5;
		}
		var oldXY = this.getPosition();
		var distance = Math.pow(Math.pow(newXY[0] - oldXY[0], 2) + Math.pow(newXY[0] - oldXY[0], 2), 1/2);
		Ext.defer(
			function() {
				this._setPositionAnimate(oldXY, newXY, distance, step, speed, step);
			}, speed, this);
	},
	_setPositionAnimate: function(oldXY, newXY, distance, pos, speed, step) {
		if(pos < distance - step) {
			var posX = oldXY[0] + (pos / distance * Math.abs(newXY[0] - oldXY[0]) * (newXY[0] > oldXY[0] ? 1 : -1));
			var posY = oldXY[1] + (pos / distance * Math.abs(newXY[1] - oldXY[1]) * (newXY[1] > oldXY[1] ? 1 : -1));
			this.setPosition(posX, posY);
			Ext.defer(
				function() {
					this._setPositionAnimate(oldXY, newXY, distance, pos + step, speed, step);
				}, speed, this);
		} else {
			this.setPosition(newXY);
		}
	}
});

Ext.override(Ext.Panel, {
	constructor: function(config) {
		if(config && config.wikiId) {
			var existsWikiInTools = false;
			if(config.tools) {
				for(var i = 0; i < config.tools.length; i++) {
					if(config.tools[i].type == 'wiki') {
						existsWikiInTools = true;
					}
				}
			}
			if(!existsWikiInTools) {
				if(!config.tools) {
					config.tools = [];
				}
				config.tools.push(getWikiObject({
					id: config.wikiId,
					marginTop: config.wikiButtonMarginTop
				}));
			}
		}
		this.callOverridden([config]);
	},
	mask: function(msg,msgCls,deferedTime) {
		if(this.getEl()) {
			if(deferedTime) {
				this.unmaskedDeferMask = false;
				Ext.defer(
					function() {
						if(!this.unmaskedDeferMask) {
							this.getEl().mask(msg,msgCls);
						}
					},
					deferedTime, this);
			} else {
				this.getEl().mask(msg,msgCls);
			}
		}
	},
	maskLoad: function(deferedTime, longOperation, msg) {
		this.mask(msg || (longOperation ? lang.longOperationPleaseWait : lang.pleaseWait), 'x-mask-loading', deferedTime);
	},
	maskLoadTime: function(time, deferedTime) {
		this.mask(lang.pleaseWait,'x-mask-loading',deferedTime);
		Ext.defer(function() { this.unmask(); }, time, this);
	},
	unmask: function() {
		if(this.getEl()) {
			this.getEl().unmask();
			this.unmaskedDeferMask = true;
		}
	},
	findWindow: function() {
		var owner = this.ownerCt;
		while(owner) {
			if(owner instanceof Ext.Window) {
				return(owner);
			}
			owner=owner.ownerCt;
		}
		return(null);
	},
	destroyWindow: function() {
		var window = this.findWindow();
		if(window) {
			window.destroy();
		}
	},
	getBtn: function(btnId, bar) {
		for(var i = 0; i < 4; i++) {
			if(!bar || bar == (i == 0 ? 'tbar' :
					   i == 1 ? 'bbar' :
					   i == 2 ? 'foreign_tbar' :
						    'foreign_bbar')) {
				var bar = i == 0 ? this.getTopToolbar() :
					  i == 1 ? this.getBottomToolbar() :
					  i == 2 ? this.foreignBarOwner && this.foreignBarOwner.getTopToolbar() :
						   this.foreignBarOwner && this.foreignBarOwner.getBottomToolbar();
				if(bar) {
					var btn = bar.getItem(btnId, '_id', bar.alias == 'widget.pagingtoolbar');
					if(!btn && bar.alias != 'widget.pagingtoolbar') {
						btn = bar.getItem(btnId, '_id', true);
					}
					if(btn) {
						return(btn);
					}
				}
			}
		}
		return(null);
	},
	enableBtn: function(btnId, enable, bar) {
		var btn = this.getBtn(btnId, bar);
		if(btn) {
			btn.enableIf(enable);
		}
	}
});

Ext.JSON.encodeDate = function(date) {
	pad = function(n) {
		return n < 10 ? "0" + n : n;
	}
	return '"' + date.getFullYear() + "-"
		+ pad(date.getMonth() + 1) + "-"
		+ pad(date.getDate())
		+ (date.timeDefined === false ? "" :  
		    "T"
		    + pad(date.getHours()) + ":"
		    + pad(date.getMinutes()) + ":"
		    + pad(date.getSeconds()))
		+ '"';
}

Ext.Date.toString = function(date) {
	pad = function(n) {
		return n < 10 ? "0" + n : n;
	}
	return date.getFullYear() + "-"
		+ pad(date.getMonth() + 1) + "-"
		+ pad(date.getDate())
		+ (date.timeDefined === false ? "" :  
		    "T"
		    + pad(date.getHours()) + ":"
		    + pad(date.getMinutes()) + ":"
		    + pad(date.getSeconds()));
}

Ext.override(Ext.form.field.Date, {
	getValue: function() {
		var value = this.callOverridden();
		if(value) {
			value.timeDefined = false;
		}
		return(value);
	}
});

Ext.override(Ext.tip.ToolTip, {
	onShow: function() {
		if(this.html !== null) {
			this.callOverridden();
		}
	},
	show: function() {
		if(this.title || this.html || this.dynamicContent) {
			this.callOverridden();
		}
	}
});

Ext.override(Ext.data.proxy.Ajax, {
    doRequest: function(operation) {
        var me = this,
            writer = me.getWriter(),
            request = me.buildRequest(operation),
            method = me.getMethod(request),
            jsonData, params;
        // ADD begin
        if(this.check_active_request) {
            if(this.check_active_request.element && this.check_active_request.element.id) {
                this.check_active_request.element_id = this.check_active_request.element.id;
            }
            Ext.apply(this.check_active_request, {
                timestamp_id: (new Date).getTime() + (user_id() ? '_' + user_id() : '') + 
                              (this.check_active_request.timestamp_id_suffix ? 
                                '_' + this.check_active_request.timestamp_id_suffix : 
                                '') +
                              (this.check_active_request.element_id ?
                                '_' + this.check_active_request.element_id :
                                '')
            });
            Ext.applyIf(this.check_active_request, {
                interval_ms: 5000,
                proxy: this
            });
            if(this.check_active_request.element && this.check_active_request.element.startActiveRequest) {
                this.check_active_request.element.startActiveRequest(this.check_active_request);
            }
        }
        var timestampId = (this.check_active_request && this.check_active_request.timestamp_id) ||
                          ((new Date).getTime() + (user_id() ? '_' + user_id() : ''));
        if(request._params) {
            request._params['timestampId'] = timestampId;
            if(isEnableClientTimezone()) {
                request._params['clientTimezone'] = getClientTimezone();
                request._params['clientOsTimezone'] = getClientOsTimezone();
            }
            if(request._proxy && request._proxy.timeout) {
                request._params['timeout'] = request._proxy.timeout / 1000;
            }
            if(this.check_active_request) {
                request._params['check_active_request'] = true;
            }
        }
        // ADD end
        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }
        request.setConfig({
            binary: me.getBinary(),
            headers: me.getHeaders(),
            timeout: me.getTimeout(),
            scope: me,
            callback: me.createRequestCallback(request, operation),
            method: method,
            useDefaultXhrHeader: me.getUseDefaultXhrHeader(),
            disableCaching: false
        });
        // explicitly set it to false, ServerProxy handles caching
        if (method.toUpperCase() !== 'GET' && me.getParamsAsJson()) {
            params = request.getParams();
            if (params) {
                jsonData = request.getJsonData();
                if (jsonData) {
                    jsonData = Ext.Object.merge({}, jsonData, params);
                } else {
                    jsonData = params;
                }
                request.setJsonData(jsonData);
                request.setParams(undefined);
            }
        }
        if (me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUsername());
            request.setPassword(me.getPassword());
        }
        // MODIFY begin
        // -return me.sendRequest(request);
        var _rsltRequest = me.sendRequest(request);
        _rsltRequest._rawRequest.timestampId = timestampId;
        this._request = _rsltRequest._rawRequest;
        return(_rsltRequest);
        // MODIFY end
    }
});

Ext.override(Ext.data.request.Ajax, {
    onComplete : function(request) {
        // MODIFY
        if(this.proxy && this.proxy.check_active_request &&
           this.proxy.check_active_request.element && this.proxy.check_active_request.element.killActiveRequest) {
            this.proxy.check_active_request.element.killActiveRequest(this.proxy.check_active_request);
        }
        if(this.xhr) {
            var response = null;
            if(this.xhr.response)
                response = this.xhr.response;
            else if(this.xhr.responseText)
                response = this.xhr.responseText;
            if(response) {
                if(response.match(/"ioncube_clock_skew"/)) {
                    Ext.Msg.alert('', 'Ioncube clock skew. Please check time on server side!');
                    return;
                }
                if(response.match(/"ioncube_error"/)) {
                    window.location = "./";
                    return;
                }
                var matchRslt = response.match(/"_vm_version":"?(\d+)"?/);
                if(matchRslt && matchRslt.length == 2) {
                    window._server_vm_version = matchRslt[1] * 1;
                }
                if(response.match(/"_debug":/) &&
                   window.debug && window.console && console.log && Ext.isFunction(console.log)) {
                    var responseDecode = Ext.decode(response);
                    if(responseDecode && responseDecode._debug) {
                        showDebugData(responseDecode._debug);
                        this._showDebugData = true;
                    }
                }
            }
        }
        this.callOverridden(arguments);
    }
});

Ext.override(Ext.form.action.Submit, {
    onSuccess: function(response) {
        // ADD - begin
        if(response && response.responseText &&
           response.responseText.match(/"ioncube_error"/)) {
            window.location = "./";
            return;
        }
        if(!(response.request && response.request._showDebugData) &&
           response && response.responseText &&
           response.responseText.match(/"_debug":/) &&
           window.debug && window.console && console.log && Ext.isFunction(console.log)) {
            var responseDecode = Ext.decode(response.responseText);
            if(responseDecode && responseDecode._debug)
                showDebugData(responseDecode._debug);
        }
        // ADD - end
        this.callOverridden(arguments);
    }
});

Ext.override(Ext.picker.Date, {
    initComponent : function() {
        // ADD - begin
        if(window.weekStart == 'monday') {
            this.startDay = 1;
        }
        // ADD - end
        this.callOverridden(arguments);
    }
});

Ext.override(Ext.menu.Menu, {
	showAtMouse: function(event) {
		this.showAt(window.XY || 
			    event && (event.xy || [event.x, event.y]) || 
			    [ null, null ]);
	}
});


// ---------------------------------------
// EXT JS 6.2.0


Ext.override(Ext.grid.plugin.RowExpander, {
    // ADD - begin
    rowBodyContentCls: null,
    rowBodyContentConfig: null,
    delayedRender: true,
    autoRelayoutExpanders: false,
    autoRelayoutExpanders_mask: false,
    enableSelectRowOnClick: true,
    // ADD - end
    setCmp: function(grid) {
        var me = this,
            features;
        // MODIFY begin
        // - me.callParent(arguments);
        Ext.grid.plugin.RowExpander.superclass.setCmp.call(this, grid);
        // MODIFY end
        // Keep track of which record internalIds are expanded.
        me.recordsExpanded = {};
        // MODIFY begin
        // - if (!me.rowBodyTpl) {
        if (!me.rowBodyTpl && !me.getRowBody && !me.rowBodyContentCls) {
        // MODIFY end
            Ext.raise("The 'rowBodyTpl' config is required and is not defined.");
        }
        me.rowBodyTpl = Ext.XTemplate.getTpl(me, 'rowBodyTpl');
        features = me.getFeatureConfig(grid);
        if (grid.features) {
            grid.features = Ext.Array.push(features, grid.features);
        } else {
            grid.features = features;
        }
        // ADD begin
        grid.rowExpander = this;
        // ADD end
    },
    getRowBodyContentsFn: function(rowBodyTpl) {
        var me = this;
        return function(rowValues) {
            // ADD begin
            if(!rowBodyTpl)
                return '';
            // ADD end
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues.record.getData());
        };
    },
    init: function(grid) {
        this.callOverridden(arguments);
        // ADD begin
        grid.on('resize', this.onResizeGrid, this);
        grid.on('columnresize', this.onResizeGrid, this);
        grid.store.on('beforeload', this.onBeforeLoadGridStore, this);
        // ADD end
    },
    toggleRow: function(rowIdx, record) {
        // MODIFY
        var me = this,
            view = me.normalView || me.view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
            record = this.view.getRecord(rowNode),
            grid = this.getGrid();
        if(wasCollapsed) {
            if(grid.fireEvent('beforeexpandbody', grid, record) === false) {
                return;
            }
        } else {
            if(grid.fireEvent('beforecollapsebody', grid, record) === false) {
                return;
            }
        }
        if(this.delayedRender || this.rowBodyContentCls) {
            if(wasCollapsed) {
                this._expandRow(rowIdx, record);
            } else {
                this._collapseRow(rowIdx, record);
            }
        } else {
            this.callOverridden(arguments);
        }
        if(wasCollapsed) {
            grid.fireEvent('expandbody', grid, record);
        } else {
            grid.fireEvent('collapsebody', grid, record);
        }
    },
    _expandRow: function(rowIdx, record) {
        // ADD
        var me = this,
            view = me.normalView || me.view,
            fireView = view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            nextBd = normalRow.down(me.rowBodyTrSelector, true),
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
            addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls',
            record = this.view.getRecord(rowNode),
            grid = this.getGrid(),
            row = Ext.get(rowNode),
            rowBody = Ext.DomQuery.selectNode('.x-grid-rowbody', row.dom);
        if(rowBody && (!rowBody.innerHTML || rowBody.innerHTML == ' ')) {
            normalRow[addOrRemoveCls](me.rowCollapsedCls);
            Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
            me.recordsExpanded[record.internalId] = wasCollapsed;
            rowBody.style.padding = 0;
            if(this.rowBodyTpl || this.getRowBody) {
                var data = cloneObject(record.data);
                data.__record_id = record.internalId;
                data.__grid_id = grid.id;
                data.__panel_id = grid.ownerCt.id;
                var bodyContent = this.rowBodyTpl ? this.rowBodyTpl.applyTemplate(data) : this.getRowBody(data, this.getCmp());
                var idProperty = record.store && record.store.proxy && record.store.proxy.reader && record.store.proxy.reader.idProperty;
                bodyContent = bodyContent.replaceall('__RECORD_ID__', idProperty ? record.data[idProperty] : record.internalId).
                                          replaceall('__GRID_ID__', grid.id).
                                          replaceall('__PANEL_ID__', grid.ownerCt.id);
                                          
                var rowIndex = grid.store.indexOf(record);
                var idExpanderAreaOwner = this.getIdExpanderAreaOwner(rowIndex);
                Ext.dom.Helper.append(rowBody, {
                    tag: 'div',
                    id: idExpanderAreaOwner,
                    cls: 'expander-area-owner' + (grid && grid.prefixCls ? ' ' + grid.prefixCls + '-cell' : ''),
                    html: bodyContent,
                    style: {
                        padding: this.rowBodyPadding
                    }
                });
            } else {
                var rowIndex = grid.store.indexOf(record);
                var idExpanderAreaOwner = this.getIdExpanderAreaOwner(rowIndex);
                Ext.dom.Helper.append(rowBody, {
                    tag: 'div',
                    id: idExpanderAreaOwner,
                    cls: 'expander-area-owner' + (grid && grid.prefixCls ? ' ' + grid.prefixCls + '-cell' : ''),
                    style: {
                        'border-style': 'none'
                    }
                });
                var area = this.getExpArea(rowIdx);
                area.area.render(rowBody.children[idExpanderAreaOwner]);
                record.expanderArea = area.area;
                record.expanderBodyContent = area.bodyContent;
                this._lastGridWidthRow = area.widthRow;
            }
            fireView.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd);
            view.refreshSize(true);
            if (me.scrollIntoViewOnExpand && wasCollapsed) {
                me.grid.ensureVisible(rowIdx);
            }
        }
    },
    _collapseRow: function(rowIdx, record) {
        // ADD
        var me = this,
            view = me.normalView || me.view,
            fireView = view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            nextBd = normalRow.down(me.rowBodyTrSelector, true),
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
            addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls';
            record = this.view.getRecord(rowNode),
            grid = this.getGrid(),
            row = Ext.get(rowNode),
            rowBody = Ext.DomQuery.selectNode('.x-grid-rowbody', row.dom);
        if(rowBody) {
            normalRow[addOrRemoveCls](me.rowCollapsedCls);
            Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
            me.recordsExpanded[record.internalId] = wasCollapsed;
            if(rowBody.innerHTML) {
                rowBody.innerHTML = '';
            }
            if(this.rowBodyContentCls) {
                if(record.expanderBodyContent) {
                    record.expanderBodyContent.destroy();
                    delete record.expanderBodyContent;
                    record.expanderBodyContent = null;
                }
                if(record.expanderArea) {
                    record.expanderArea.destroy();
                    delete record.expanderArea;
                    record.expanderArea = null;
                }
            }
            fireView.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd);
            view.refreshSize(true);
            if (me.scrollIntoViewOnExpand && wasCollapsed) {
                me.grid.ensureVisible(rowIdx);
            }
        }
    },
    getExpArea: function(rowIdx) {
        // ADD
        var me = this,
            view = me.normalView || me.view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            record = this.view.getRecord(rowNode),
            grid = this.getGrid();
            rowIndex = grid.store.indexOf(record);
        var idExpanderAreaOwner = this.getIdExpanderAreaOwner(rowIndex),
            idExpanderArea = this.getIdExpanderArea(rowIndex),
            idExpanderBodyContent = this.getIdExpanderBodyContent(rowIndex);
        var gridTable = this.getGridTable();
        var widthRow = gridTable.dom.offsetWidth,
            widthExpArea = this.getWidthExpArea(),
            heightExpArea = this.getHeightExpArea(rowIndex);
        var expanderBodyContent = Ext.create(this.rowBodyContentCls, 
            Ext.apply({}, 
                this.rowBodyContentConfig, {
                    id: idExpanderBodyContent,
                    record: record,
                    grid: grid,
                    widthExpArea: widthExpArea,
                    heightExpArea: heightExpArea
                })
            );
        var expanderArea = new Ext.Panel({
            border: false,
            items: new Ext.Panel({
                border: false,
                width: widthRow,
                items: {
                    xtype: 'panel',
                    items: expanderBodyContent,
                    border: false,
                    cls: grid && grid.prefixCls ? grid.prefixCls + '-cell' : undefined,
                    bodyCls: grid && grid.prefixCls ? grid.prefixCls + '-cell' : undefined,
                    style: {
                        marginLeft: 2,
                        marginRight: widthRow - widthExpArea - 2,
                        marginBottom: 2,
                        'border-style': 'none'
                    }
                },
                id: idExpanderArea,
                cls: grid && grid.prefixCls ? grid.prefixCls + '-cell' : undefined,
                bodyCls: grid && grid.prefixCls ? grid.prefixCls + '-cell' : undefined,
                style: {
                    'border-style': 'none'
                }
            }),
            listeners: {
                scope: this,
                afterrender: function() {
                    Ext.defer(function() {
                             expanderArea.updateLayout();
                        }, 100);
                    var stopEvents = ['click', 'dblclick', 'mousedown'];
                    for(var i = 0; i < stopEvents.length; i++) {
                        expanderArea.getEl().on(stopEvents[i], function(e) {
                                e.stopPropagation();
                                if(this.enableSelectRowOnClick) {
                                    grid.selModel.select([record], false, true);
                                    grid.selModel.fireEvent('selectionchange', grid.selModel);
                                }
                            }, this);
                    }
                    var expanderBodyContentOuterCt = Ext.get(idExpanderBodyContent + '-outerCt')
                    if(expanderBodyContentOuterCt && expanderBodyContentOuterCt.dom) {
                        if(grid && grid.prefixCls) {
                            expanderBodyContentOuterCt.dom.className += ' ' + grid.prefixCls + '-cell';
                        }
                        expanderBodyContentOuterCt.dom.style['border-style'] = 'none';
                    }
                },
                afterlayout: function() {
                    this._onAfterLayout_recursCounter = (this._onAfterLayout_recursCounter || 0) + 1;
                    if(this._onAfterLayout_recursCounter < 2) {
                        for(var pass = 0; pass < 2; pass++) {
                            var gridTable = this.getGridTable();
                            var newGridheight = 
                                gridTable.getHeight() + 
                                (grid.headerCt ? grid.headerCt.getHeight() : 0) + 
                                (grid.getTopToolbar() ? grid.getTopToolbar().getHeight() : 0) + 
                                (grid.getBottomToolbar() ? grid.getBottomToolbar().getHeight() : 0) + 2;
                            if(grid.getHeight() != newGridheight && Math.abs(grid.getHeight() - newGridheight) > 2) {
                                if(pass == 0) {
                                    grid.updateLayout();
                                } else {
                                    grid.setHeight(newGridheight);
                                }
                                if(this.noVerticalScroller) {
                                    grid.getView().getEl().setStyle( { overflow: 'hidden' } );
                                }
                            }
                        }
                    }
                    --this._onAfterLayout_recursCounter;
                }
            },
            style: {
               'border-style': 'none'
            },
            bodyCls: 'expander-area-container',
            width: widthRow,
            grid: this.view.ownerCt
        });
        return({
           bodyContent: expanderBodyContent,
           area: expanderArea,
           widthRow: widthRow
        });
    },
    getWidthExpArea: function() {
        // ADD
        var grid = this.getGrid();
        var gridBody = this.getGridBody();
        var gridTable = this.getGridTable();
        var widthBody = gridBody.dom.offsetWidth;
        var widthRow = gridTable.dom.offsetWidth;
        var existHorizontalSroller = widthRow > widthBody;
        return(Math.min(grid.getWidth() - this.expanderColumn.getWidth()
                           - (this.noVerticalScroller ? (existHorizontalSroller ? 7 : 0) : __width_Scroller + 5),
                        widthRow - this.expanderColumn.getWidth() - 5));
    },
    getHeightExpArea: function(rowIndex) {
        // ADD
        var grid = this.getGrid();
        var row = Ext.get(this.view.getNode(rowIndex));
        var gridBody = this.getGridBody();
        var gridTable = this.getGridTable();
        var gridHeader = grid.el.down('.x-grid-header-ct');
        var tbar = grid.getTopToolbar();
        var bbar = grid.getBottomToolbar();
        var widthBody = gridBody.dom.offsetWidth;
        var widthRow = gridTable.dom.offsetWidth;
        var existHorizontalSroller = widthRow > widthBody;
        return(grid.getHeight() -
               (tbar ? tbar.getHeight() : 0) - (bbar ? bbar.getHeight() : 0) -
               row.getHeight() -
               (gridHeader ? gridHeader.getHeight() : 0) -
               (existHorizontalSroller ? __height_Scroller : 0) -
               1);
    },
    getIdExpanderAreaOwner: function(rowIndex) {
        // ADD
        return(this.getIdExpanderArea(rowIndex) + '_owner');
    },
    getIdExpanderArea: function(rowIndex) {
        // ADD
        var grid = this.getGrid();
        var store = grid.store;
        var record = store.getAt(rowIndex);
        var prefix = '';
        if(grid.prefixCls) {
            prefix = grid.prefixCls + '-'; 
        }
        return(prefix + 'expander_area_rec_' + fix_id(record.id) + 
               (this.level ||
                this.rowBodyContentConfig && this.rowBodyContentConfig.level ? 
                   '_' + (this.level || this.rowBodyContentConfig && this.rowBodyContentConfig.level) :
                   ''));
    },
    getIdExpanderBodyContent: function(rowIndex) {
        // ADD
        var grid = this.getGrid();
        var store = grid.store;
        var record = store.getAt(rowIndex);
        var prefix = '';
        if(grid.prefixCls) {
            prefix = grid.prefixCls + '-';
        }
        return(prefix + 'expander_body_content_rec_' + fix_id(record.id));
    },
    getGrid: function() {
        // ADD
        var grid = this.getCmp();
        return(grid);
    },
    getGridBody: function() {
        // ADD
        var grid = this.getGrid();
        if(!grid) {
            return(null);
        }
        var gridBody = grid.body;
        return(gridBody);
    },
    getGridTable: function() {
        // ADD
        var gridBody = this.getGridBody();
        if(!gridBody) {
            return(null);
        }
        var gridTable = gridBody.down('.x-grid-item-container');
        return(gridTable);
    },
    getHeaderConfig: function() {
        var me = this,
            lockable = me.grid.lockable && me.grid;
        return {
            width: me.headerWidth,
            ignoreExport: true,
            lockable: false,
            autoLock: true,
            sortable: false,
            resizable: false,
            draggable: false,
            hideable: false,
            // ADD begin
            hidden: this.disableExpandColumn,
            // ADD end
            menuDisabled: true,
            tdCls: Ext.baseCSSPrefix + 'grid-cell-special',
            innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-expander',
            // MODIFY begin
            // - renderer: function() {
            renderer: function(value, metadata, record) {
            // MODIFY end
                // ADD begin
                if(me.enableExpand && Ext.isFunction(me.enableExpand) && !me.enableExpand(record))
                    return '<div class="' + Ext.baseCSSPrefix + '" role="presentation" tabIndex="0"></div>';
                // ADD end
                return '<div class="' + Ext.baseCSSPrefix + 'grid-row-expander" role="presentation" tabIndex="0"></div>';
            },
            processEvent: function(type, view, cell, rowIndex, cellIndex, e, record) {
                var isTouch = e.pointerType === 'touch',
                    isExpanderClick = !!e.getTarget('.' + Ext.baseCSSPrefix + 'grid-row-expander');
                if ((type === "click" && isExpanderClick) || (type === 'keydown' && e.getKey() === e.SPACE)) {
                    // Focus the cell on real touch tap.
                    // This is because the toggleRow saves and restores focus
                    // which may be elsewhere than clicked on causing a scroll jump.
                    if (isTouch) {
                        cell.focus();
                    }
                    me.toggleRow(rowIndex, record, e);
                    e.stopSelection = !me.selectRowOnExpand;
                } else if (e.type === 'mousedown' && !isTouch && isExpanderClick) {
                    e.preventDefault();
                }
            },
            // This column always migrates to the locked side if the locked side is visible.
            // It has to report this correctly so that editors can position things correctly
            isLocked: function() {
                return lockable && (lockable.lockedGrid.isVisible() || this.locked);
            },
            // In an editor, this shows nothing.
            editRenderer: function() {
                return '&#160;';
            }
        };
    },
    onResizeGrid: function() {
        // ADD
        if(!this.rowBodyContentCls) {
            return;
        }
        var grid = this.getGrid();
        var gridTable = this.getGridTable();
        if(grid && gridTable) {
            var widthRow = gridTable.dom.offsetWidth;
            if(this._lastGridWidthRow && widthRow != this._lastGridWidthRow) {
                var widthExpArea = this.getWidthExpArea();
                var store = grid.store;
                for(var i = 0; i < store.getCount(); i++) {
                    if(this.isExpand(i)) {
                        var idExpanderArea = this.getIdExpanderArea(i);
                        var expanderArea = Ext.getCmp(idExpanderArea);
                        if(expanderArea && expanderArea.getEl()) {
                            if(expanderArea.getWidth() == widthRow) {
                                expanderArea.setWidth(widthRow + 1);
                            }
                            expanderArea.setWidth(widthRow);
                            for(var j = 0; j < 2; j++) {
                                expanderArea.ownerCt.updateLayout();
                            }
                        }
                    }
                }
            }
            this._lastGridWidthRow = widthRow;
        }
    },
    onBeforeLoadGridStore: function() {
        // ADD
        if(!this.keepExpand) {     
            this.collapseAll();
        }
    },
    isExpand: function(rowIndex) {
        // ADD
        var me = this,
            view = me.normalView || me.view,
            rowNode = view.getNode(rowIndex),
            normalRow = Ext.fly(rowNode);
        if(!normalRow) {
            return(false);
        }
        wasCollapsed = normalRow && normalRow.hasCls(me.rowCollapsedCls);
        return(!wasCollapsed);
    },
    expandRow: function(rowIndex) {
        // ADD
        if(!this.isExpand(rowIndex)) {
            this.toggleRow(rowIndex);
        }
    },
    collapseRow: function(rowIndex) {
        // ADD
        if(this.isExpand(rowIndex)) {
            this.toggleRow(rowIndex);
        }
    },
    expandAll: function() {
        // ADD
        var grid = this.getGrid();
        var store = grid.store;
        for(var i = 0; i < store.getCount(); i++) {
            this.expandRow(i);
        }
    },
    collapseAll: function() {
        // ADD
        var grid = this.getGrid();
        var store = grid.store;
        for(var i = 0; i < store.getCount(); i++) {
            this.collapseRow(i);
        }
    },
    isAnyExpand: function() {
        // ADD
        var grid = this.getGrid();
        var store = grid.store;
        for(var i = 0; i < store.getCount(); i++) {
            if(this.isExpand(i)) {
                return(true);
            }
        }
        return(false);
    }
});

Ext.override(Ext.grid.column.Action, {
    // MODIFY begin
    stopSelection: false,
    sortable: true,
    // MODIFY end
    defaultRenderer: function(v, cellValues, record, rowIdx, colIdx, store, view) {
        var me = this,
            scope = me.origScope || me,
            items = me.items,
            len = items.length,
            i, item, ret, disabled, tooltip, altText, icon, glyph, tabIndex, ariaRole;
        // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
        // Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
        // we will pass an incorrect value to getClass/getTip
        // ADD begin
        var globalEnableHandler = !me.enableHandler || me.enableHandler.apply(me, arguments);
        var baseContent = '';
        if(me.rendererBase) {
            baseContent = me.rendererBase.apply(scope, arguments) || '';
            if(!globalEnableHandler && me.baseContentFirst) {
                return('<div class="x-grid-item" ' + 
                            'style="position: initial; ' +
                                   'margin-top: 1px; ' + 
                                   'padding-left: 4px; ' + 
                                   'padding-right: 4px; ' +
                                   'background-color: transparent; ' + 
                                   'border: none;">'  +
                       baseContent + 
                       '</div>');
            }
            if(!me.baseContentTdStyle) {
                baseContent = '<div class="x-grid-item" ' + 
                                   'style="position: initial; ' +
                                          'margin-top: 1px; ' + 
                                          'padding-left: 4px; ' + 
                                          'padding-right: 4px; ' +
                                          'background-color: transparent; ' + 
                                          'border: none; ' + 
                                          (me.baseContentDivStyle || '') + '">' + 
                              baseContent + 
                              '</div>';
            }
        }
        // ADD end
        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';
        cellValues.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
        // ADD begin
        if(me.iconVert) {
            ret += '<table>';
        }
        // ADD end
        for (i = 0; i < len; i++) {
            // ADD begin
            if(me.iconVert) {
                ret += '<tr><td>';
            }
            // ADD end
            item = items[i];
            icon = item.icon;
            glyph = item.glyph;
            disabled = item.disabled || (item.isDisabled ? Ext.callback(item.isDisabled, item.scope || me.origScope, [
                view,
                rowIdx,
                colIdx,
                item,
                record
            ], 0, me) : false);
            tooltip = item.tooltip || (item.getTip ? Ext.callback(item.getTip, item.scope || me.origScope, arguments, 0, me) : null);
            altText = item.getAltText ? Ext.callback(item.getAltText, item.scope || me.origScope, arguments, 0, me) : item.altText || me.altText;
            // Only process the item action setup once.
            if (!item.hasActionConfiguration) {
                // Apply our documented default to all items
                item.stopSelection = me.stopSelection;
                item.disable = Ext.Function.bind(me.disableAction, me, [
                    i
                ], 0);
                item.enable = Ext.Function.bind(me.enableAction, me, [
                    i
                ], 0);
                item.hasActionConfiguration = true;
            }
            // If the ActionItem is using a glyph, convert it to an Ext.Glyph instance so we can extract the data easily.
            if (glyph) {
                glyph = Ext.Glyph.fly(glyph);
            }
            // Pull in tabIndex and ariarRols from item, unless the item is this, in which case
            // that would be wrong, and the icon would get column header values.
            tabIndex = (item !== me && item.tabIndex !== undefined) ? item.tabIndex : me.itemTabIndex;
            ariaRole = (item !== me && item.ariaRole !== undefined) ? item.ariaRole : me.itemAriaRole;
            // MODIFY begin
            // - ret += '<' + (icon ? 'img' : 'div') + (typeof tabIndex === 'number' ? ' tabIndex="' + tabIndex + '"' : '') + (ariaRole ? ' role="' + ariaRole + '"' : ' role="presentation"') + (icon ? (' alt="' + altText + '" src="' + item.icon + '"') : '') + ' class="' + me.actionIconCls + ' ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (disabled ? me.disabledCls + ' ' : ' ') + (item.hidden ? Ext.baseCSSPrefix + 'hidden-display ' : '') + (item.getClass ? Ext.callback(item.getClass, item.scope || me.origScope, arguments, undefined, me) : (item.iconCls || me.iconCls || '')) + '"' + (tooltip ? ' data-qtip="' + tooltip + '"' : '') + (icon ? '/>' : glyph ? (' style="font-family:' + glyph.fontFamily + '">' + glyph.character + '</div>') : '></div>');
            ret += '<' + (icon ? 'img' : 'div') + 
                   (typeof tabIndex === 'number' ? 
                       ' tabIndex="' + tabIndex + '"' : 
                       '') + 
                   (ariaRole ? 
                       ' role="' + ariaRole + '"' : 
                       ' role="presentation"') + 
                   (icon ? 
                       ' alt="' + altText + '" src="' + item.icon + '"' : 
                       '') + 
                   ' class="' + me.actionIconCls + ' ' + 
                                Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + 
                                (disabled ? me.disabledCls + ' ' : ' ') + 
                                (item.hidden ? Ext.baseCSSPrefix + 'hidden-display ' : '') + 
                                (item.getClass ? Ext.callback(item.getClass, item.scope || me.origScope, arguments, undefined, me) : (item.iconCls || me.iconCls || '')) + '"' + 
                   (tooltip ? 
                       ' data-qtip="' + (Ext.isFunction(item.tooltip) ? item.tooltip.apply(item.scope || scope, arguments) : item.tooltip) + '"' : 
                       '') + 
                   (icon || !glyph ? 
                       ' style="width: ' + (item.width || 16)+ '; ' +
                               'height: ' + (item.height || 16)+ '; ' +
                               (globalEnableHandler && item.handler && (!item.enableHandler || item.enableHandler.apply(item.scope || scope, arguments)) ?
                               'cursor: pointer;' : 'cursor: default;' )  + '"' : 
                       '') +
                   (icon ? '/>' : glyph ? (' style="font-family:' + glyph.fontFamily + '">' + glyph.character + '</div>') : '></div>');
            // MODIFY end
            // ADD begin
            if(me.iconVert) {
                ret += '</td></tr>';
            }
            // ADD end
        }
        // ADD begin
        if(me.iconVert) {
            ret += '</table>';
        }
        // ADD end
        // ADD begin
        if(!me.iconTdStyle && (me.iconDivStyle || me.rendererBase)) {
            ret = '<div style="' + (me.iconDivStyle || '') + '">' + ret + '</div>';
        }
        if(me.baseContentTdStyle || me.iconTdStyle) {
            if(!me.baseContentTdStyle) {
                me.baseContentTdStyle = 'font: ' + __font_Grid + '; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
            }
            baseContent = '<td style="' + me.baseContentTdStyle + '">' + baseContent + '</td>';
            ret = '<td style="' + me.iconTdStyle + '">' + ret + '</td>';
            ret = '<table border=0 cellpadding=0 cellspacing=0 ' + 
                         'style="width: 100%; ' + 
                                'table-layout: fixed; ' + 
                                'padding-left: 4px; ' + 
                                'padding-right: 4px;">' +
                  (me.baseContentFirst ? baseContent + ret : ret + baseContent) +
                  '</table>';
        } else {
            ret = me.baseContentFirst ? baseContent + ret : ret + baseContent;
        }
        // ADD end
        return ret;
    },
    processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            target = e.getTarget(),
            key = type === 'keydown' && e.getKey(),
            match, item, disabled,
            cellFly = Ext.fly(cell);
        // Flag event to tell SelectionModel not to process it.
        e.stopSelection = !key && me.stopSelection;
        // If the target was not within a cell (ie it's a keydown event from the View), then
        // IF there's only one action icon, action it. If there is more than one, the user must
        // invoke actionable mode to navigate into the cell.
        if (key && (target === cell || !cellFly.contains(target))) {
            target = cellFly.query('.' + me.actionIconCls, true);
            if (target.length === 1) {
                target = target[0];
            } else {
                return;
            }
        }
        // NOTE: The statement below tests the truthiness of an assignment.
        if (target && (match = target.className.match(me.actionIdRe))) {
            item = me.items[parseInt(match[1], 10)];
            disabled = item.disabled || (item.isDisabled ? Ext.callback(item.isDisabled, item.scope || me.origScope, [
                view,
                recordIndex,
                cellIndex,
                item,
                record
            ], 0, me) : false);
            if (item && !disabled) {
                // Do not allow focus to follow from this mousedown unless the grid is already in actionable mode
                if (type === 'mousedown' && !me.getView().actionableMode) {
                    e.preventDefault();
                    // ADD begin
                    if(item.onMouseDown) {
                        item.onMouseDown.call(item.scope, [
                            view,
                            recordIndex,
                            cellIndex,
                            item,
                            e,
                            record
                        ]);
                    }                    
                    // ADD end
                } else if (type === 'click' || (key === e.ENTER || key === e.SPACE)) {
                    Ext.callback(item.handler || me.handler, item.scope || me.origScope, [
                        view,
                        recordIndex,
                        cellIndex,
                        item,
                        e,
                        record,
                        row
                    ], undefined, me);
                    // Handler could possibly destroy the grid, so check we're still available.
                    // 
                    // If the handler moved focus outside of the view, do not allow this event to propagate
                    // to cause any navigation.
                    if (view.destroyed) {
                        return false;
                    } else {
                        // If the record was deleted by the handler, refresh
                        // the position based upon coordinates.
                        if (!e.position.getNode()) {
                            e.position.refresh();
                        }
                        if (!view.el.contains(Ext.Element.getActiveElement())) {
                            return false;
                        }
                    }
                }
            }
        }
        // MODIFY begin
        // - return me.callParent(arguments);
        return Ext.grid.column.Action.superclass.processEvent.apply(this, arguments)
        // MODIFY end
    }
});

Ext.override(Ext.data.proxy.Ajax, {
    getMethod: function(request) {
        var actions = this.getActionMethods(),
            action = request.getAction(),
            method;
        if (actions) {
            // MODIFY begin
            // - method = actions[action];
            method = Ext.isString(actions) ? actions : actions[action];
            // MODIFY end
        }
        return method || this.defaultActionMethods[action];
    }
});

Ext.override(Ext.grid.column.Column, {
    beforeLayout: function() {
        // ADD begin
        if(this.xtype == 'actioncolumn') {
        	Ext.grid.header.Container.superclass.beforeLayout.call(this);
            return;
        }
        // ADD end
        this.callOverridden();
    },
    hide: function() {
        // ADD begin
        var me = this,
            rootHeaderCt = me.getRootHeaderCt();
        if(rootHeaderCt && rootHeaderCt.ownerCt) {
            rootHeaderCt.ownerCt.fireEvent('beforecolumnhide', rootHeaderCt, me);
        }
        // ADD end
        this.callOverridden();
    },
    show: function() {
        // ADD begin
        var me = this,
            rootHeaderCt = me.getRootHeaderCt();
        if(rootHeaderCt && rootHeaderCt.ownerCt) {
            rootHeaderCt.ownerCt.fireEvent('beforecolumnshow', rootHeaderCt, me);
        }
        // ADD end
        this.callOverridden();
    }
});

Ext.override(Ext.grid.filters.Filters, {
    initColumns: function() {
        var grid = this.grid,
            store = grid.getStore(),
            columns = grid.columnManager.getColumns(),
            len = columns.length,
            i, column, filter, filterCollection;
        // We start with filters defined on any columns.
        for (i = 0; i < len; i++) {
            column = columns[i];
            filter = column.filter;
            if (filter && !filter.isGridFilter) {
                // MODIFY begin
                // - if (!filterCollection) {
                if (filter.value && !filterCollection) {
                // MODIFY end
                    filterCollection = store.getFilters();
                    filterCollection.beginUpdate();
                }
                this.createColumnFilter(column);
            }
        }
        if (filterCollection) {
            filterCollection.endUpdate();
        }
    }
});

Ext.override(Ext.data.reader.Reader, {
    // MODIFY begin
    getKeepRawData: function() {
        return(true);
    }
    // MODIFY end
});

Ext.override(Ext.form.field.Checkbox, {
    getModelData: function() {
        // MODIFY begin
        // - var o = this.callParent(arguments);
        // - if (o) {
        // -     o[this.getName()] = this.getSubmitValue();
        // - }
        var o = Ext.form.field.Checkbox.superclass.getModelData.call(this);
        // MODIFY end
        return o;
    }
});

Ext.override(Ext.view.Table, {
    renderRow: function(record, rowIdx, out) {
        // ADD begin
        if(this.xtype == 'tableview') {
            var _recordData = record.data;
            record.data = htmlEncodeObject(_recordData);
            record.dataHtml = record.data;
        }
        var rslt = this.callOverridden(arguments);
        if(this.xtype == 'tableview') {
            record.data = _recordData;
        }
        return(rslt);
        // ADD end
    },
    renderCell: function(column, record, recordIndex, rowIndex, columnIndex, out) {
        var me = this,
            fullIndex,
            selModel = me.selectionModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            fieldValue = record.data[column.dataIndex],
            cellTpl = me.cellTpl,
            enableTextSelection = column.enableTextSelection,
            value, clsInsertPoint,
            lastFocused = me.navigationModel.getPosition();
        // ADD begin
        if(this.xtype == 'tableview' && column && column.htmlEncode) {
            fieldValue = htmlEncode(fieldValue);
        }
        // ADD end
        // Only use the view's setting if it's not been overridden on the column
        if (enableTextSelection == null) {
            enableTextSelection = me.enableTextSelection;
        }
        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.rowIndex = rowIndex;
        cellValues.columnIndex = cellValues.cellIndex = columnIndex;
        cellValues.align = column.textAlign;
        cellValues.innerCls = column.innerCls;
        cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = "";
        cellValues.unselectableAttr = enableTextSelection ? '' : 'unselectable="on"';
        // Begin setup of classes to add to cell
        classes[1] = column.getCellId();
        // On IE8, array[len] = 'foo' is twice as fast as array.push('foo')
        // So keep an insertion point and use assignment to help IE!
        clsInsertPoint = 2;
        if (column.renderer && column.renderer.call) {
            fullIndex = me.ownerCt.columnManager.getHeaderIndex(column);
            value = column.renderer.call(column.usingDefaultRenderer ? column : column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.dataSource, me);
            if (cellValues.css) {
                // This warning attribute is used by the compat layer
                // TODO: remove when compat layer becomes deprecated
                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                cellValues.css = null;
            }
            // Add any tdCls which was added to the cellValues by the renderer.
            if (cellValues.tdCls) {
                classes[clsInsertPoint++] = cellValues.tdCls;
            }
        } else {
            value = fieldValue;
        }
        cellValues.value = (value == null || value.length === 0) ? column.emptyCellText : value;
        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.dirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;
            if (column.dirtyTextElementId) {
                cellValues.tdAttr = (cellValues.tdAttr ? cellValues.tdAttr + ' ' : '') + 'aria-describedby="' + column.dirtyTextElementId + '"';
            }
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.lastCls;
        }
        if (!enableTextSelection) {
            classes[clsInsertPoint++] = me.unselectableCls;
        }
        if (selModel && (selModel.isCellModel || selModel.isSpreadsheetModel) && selModel.isCellSelected(me, recordIndex, column)) {
            classes[clsInsertPoint++] = me.selectedCellCls;
        }
        if (lastFocused && lastFocused.record.id === record.id && lastFocused.column === column) {
            classes[clsInsertPoint++] = me.focusedItemCls;
        }
        // Chop back array to only what we've set
        classes.length = clsInsertPoint;
        cellValues.tdCls = classes.join(' ');
        cellTpl.applyOut(cellValues, out);
        // Dereference objects since cellValues is a persistent var in the XTemplate's scope chain
        cellValues.column = cellValues.record = null;
    }
});

Ext.override(Ext.data.Store, {
    load: function(options) {
        // MODIFY begin
        if(!this.disableLoad) {
            this.callOverridden(arguments);
        }
        // MODIFY end
    }
});

Ext.override(Ext.form.field.Picker, {
    privates: {
        onGlobalScroll: function(scroller) {
            // Collapse if the scroll is anywhere but inside the picker
            // MODIFY - begin
            // - if (!this.picker.owns(scroller.getElement())) {
            if (!this._multiSelect2 && !this.picker.owns(scroller.getElement())) {
            // MODIFY - end
                this.collapse();
            }
        }
    }
});

Ext.override(Ext.button.Button, {
	constructor: function(config) {
		this.callOverridden(arguments);
		if(config && config.innerStyle) {
			this.on('afterrender', function(button) {
				var innerEl = button.getEl().down('.x-btn-inner');
				if(innerEl) {
					innerEl.setStyle(config.innerStyle);
				}
			});
		}
	}
});

Ext.override(Ext.grid.GridPanel, {
	_renderRecord: function(record, newData, fieldsChanged) {
		var grid = this;
		var view = grid.view;
		var store = grid.store;
		var readData = store.proxy.reader.readRecords({
			results: [newData],
			total: 1
		});
		if(!readData || !readData.records || !readData.records.length) {
			return;
		}
		var columns = grid.columnManager.getColumns();
		var columnsChanged = [];
		for(var i = 0; i < columns.length; i++) {
			if(columns[i].dataIndex && fieldsChanged.isIn(columns[i].dataIndex)) {
				columnsChanged.push(columns[i]);
			}
		}
		var rowNode = view.getNodeByRecord(record);
		if(!rowNode) {
			return;
		}
		for(var i = 0; i < fieldsChanged.length; i++) {
			record.data[fieldsChanged[i]] = readData.records[0].data[fieldsChanged[i]];
		}
		var newRowNode = view.createRowElement(record, 0, columnsChanged);
		for(var i = 0; i < columnsChanged.length; i++) {
			for(var j = 0; j < columns.length; j++) {
				if(columns[j].id == columnsChanged[i].id) {
					var cssSelectorCellSource = '.x-grid-cell' + (i ? ':nth-child(' + (i+1) + ')' : '');
					var cssSelectorCellDest = '.x-grid-cell' + (j ? ':nth-child(' + (j+1) + ')' : '');
					Ext.fly(rowNode).down('[role=row]').down(cssSelectorCellDest).down('.x-grid-cell-inner', true).innerHTML = 
						Ext.fly(newRowNode).down('[role=row]').down(cssSelectorCellSource).down('.x-grid-cell-inner', true).innerHTML;
				}
			}
		}
	}
});

Ext.override(Ext.data.field.Date, {
	convert: function(v) {
		if (!v) {
			return null;
		}
		// instanceof check ~10 times faster than Ext.isDate. Values here will not be
		// cross-document objects
		if (v instanceof Date) {
			return v;
		}
		var dateFormat = this.dateReadFormat || this.dateFormat,
		    parsed;
		if (dateFormat) {
			// ADD begin
			if(Ext.isArray(dateFormat)) {
				for(var i = 0; i < dateFormat.length; i++) {
					var rslt = Ext.Date.parse(v, dateFormat[i], this.useStrict);
					if(rslt) {
						return(rslt);
					}
				}
				return(null);
			} else {
			// ADD end
				return Ext.Date.parse(v, dateFormat, this.useStrict);
			}
		}
		parsed = Date.parse(v);
		return parsed ? new Date(parsed) : null; 
	}
});

Ext.override(Ext.grid.header.Container, {
	getColumnMenu: function(headerContainer) {
		var menuItems = this.callOverridden(arguments);
		if (menuItems &&
		    this.initialConfig && this.initialConfig.items && 
		    this.initialConfig.items.length == menuItems.length) {
			var menuItemsRslt = [];
			for (var i = 0; i < menuItems.length; i++) {
				if (!this.initialConfig.items[i].removeFromColumnMenu) {
					menuItemsRslt.push(menuItems[i]);
				}
			}
			menuItems = menuItemsRslt;
		}
		return menuItems.length ? menuItems : null;
	}
});

Ext.override(Ext.tip.QuickTip, {
	activateTarget: function(target, event) {
		var dismissDelay = this.currentTarget.getAttribute(this.tagConfig.namespace + 'dismissDelay') * 1;
		if(dismissDelay > 0) {
			this.activeTarget.dismissDelay = dismissDelay;
		} else if(Ext.isDefined(this.activeTarget.dismissDelay)) {
			delete this.activeTarget.dismissDelay;
		}
		this.callParent(arguments);
	}
});
