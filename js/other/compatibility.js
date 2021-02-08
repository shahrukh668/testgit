Ext.apply(Ext.Component.prototype, {
	find: function(inProperty, inValue)  {
		var rsltItems = [];
		this.items.each(function(inItem) {
			if(inItem[inProperty] == inValue) {
				rsltItems.push(inItem);
			}
                });
		return rsltItems;
	},
	findC: function(inProperty, inValue, withMenu)  {
		var rsltItems = [];
		this.cascade(function(inItem) {
			if(inItem[inProperty||'name'] == inValue) {
				rsltItems.push(inItem);
			} else if(withMenu && inItem.menu) {
				_rsltItem = inItem.menu.findC(inProperty, inValue, withMenu);
				if(_rsltItem) {
					rsltItems.push(_rsltItem);
				}
			}
		} );
		if(rsltItems && rsltItems.length) {
			return rsltItems[0];
		}
		return(null);
	},
	getFormPanel: function() {
		var checkItem = this.ownerCt;
		while(checkItem) {
			if(checkItem instanceof Ext.form.Panel) {
				return(checkItem);
			}
			checkItem = checkItem.ownerCt;
		}
		return(null);
	}
});

Ext.apply(Ext.panel.Panel.prototype, {
	getToolbars: function(dock) {
		return this.dockedItems &&
		       this.dockedItems.findBy(function(inItem) {
			return (inItem.alias == "widget.toolbar" ||
				inItem.alias == "widget.pagingtoolbar" ) &&
			       inItem.dock == dock;
		});
	},
	getTopToolbar: function() {
		return this.getToolbars('top');
	},
	getBottomToolbar: function() {
		return this.getToolbars('bottom');
	},
	ajaxSafeLoad: function(config) {
		if(!config) {
			config = this.loader;
		}
		if(!config) {
			return;
		}
		ajaxSafeRequest({
			url: config.url,
			params: config.params,
			scope: this,
			isLoader: true,
			success: function(result, response) {
				this.update(response.responseText);
				if(config && config.success) {
					config.success.call(this);
				}
			},
			maskEl: config.loadMask ? this : null
		});
	},
	findLangS: function(typeItem, nameItem, strict) {
		return(findLangS({primary: this.subsystem, secondary: this.secondarySubsystem}, 
				 typeItem, nameItem, strict));
	}
});

if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	}
}

if(!Array.prototype.inArray) {
	Array.prototype.inArray = function(item) {
		return this.indexOf(item) >=0;
	}
}

if(!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, ''); 
	}
}

if(!String.prototype.lpad) {
	String.prototype.lpad = function(length, padChar) {
		var rslt = this.toString();
		for(var i = rslt.length; i < length; i++) {
			rslt = padChar + rslt;
		}
		return(rslt);
	}
}

if(!String.prototype.template) {
	String.prototype.template = function(data) {
		var tpl = new Ext.Template(this.toString());
		return(tpl.apply(data));
	}
}

if(!Math.deg2rad) {
	Math.deg2rad = function(deg) {
		return(deg * (2 * Math.PI / 360));
	}
}

if(!Math.rad2deg) {
	Math.rad2deg = function(rad) {
		return(rad / (2 * Math.PI / 360));
	}
}
