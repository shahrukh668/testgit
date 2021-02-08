Ext.define('Ext.ux.form.IconCombo', {
	extend:'Ext.form.field.ComboBox',
	alias:'widget.iconcombo',
	initComponent: function() {
		Ext.apply(this, {
			listConfig: {
				iconClsField:this.iconClsField,
				getInnerTpl: function() {
					return '<tpl for=".">'
						+ '<div class="x-combo-list-item ux-icon-combo-item '
						+ '{' +this.iconClsField+ '}">'
						+ '{' + this.displayField + '}'
						+ '</div></tpl>';
				}
			},
			fieldSubTpl: [
				'<div class="ux-icon-combo-wrap">',
				'<input id="{id}" data-ref="inputEl" type="{type}" {inputAttrTpl}',
				' size="1"',
				// allows inputs to fully respect CSS widths across all browsers
				'<tpl if="name"> name="{name}"</tpl>',
				'<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
				'<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
				'{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
				'<tpl if="readOnly"> readonly="readonly"</tpl>',
				'<tpl if="disabled"> disabled="disabled"</tpl>',
				'<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
				'<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
				'<tpl if="ariaEl == \'inputEl\'">',
				'<tpl foreach="ariaElAttributes"> {$}="{.}"</tpl>',
				'</tpl>',
				'<tpl foreach="inputElAriaAttributes"> {$}="{.}"</tpl>',
				' class="{fieldCls} {typeCls} {typeCls}-{ui} {editableCls} {inputCls}" autocomplete="off"/>',
				'</div>'
			],
			listeners: {
				scope: this,
				select: function() {
					this.setIconCls();
				}
			}
		});
		this.callParent(arguments);

		},
	onRender: function(ct, position) {
		this.callParent(arguments);
		var wrap = this.el.down('div.ux-icon-combo-wrap');
		if(wrap) {
			wrap.applyStyles({position:'relative'});
			this.icon = Ext.core.DomHelper.append(wrap, {
				tag: 'div',
				style:'position:absolute'
			});
		}
		var input = this.el.down('input');
		if(input) {
			input.addCls('ux-icon-combo-input');
		}
	},
	setIconCls: function() {
		if(this.rendered) {
			var rec = this.store.findRecord(this.valueField, this.getValue());
			if(rec) {
				this.icon.className = 'ux-icon-combo-icon ' + rec.get(this.iconClsField);
			}
		} else {
			this.on('render', this.setIconCls, this, { single: true });
		}
	},
	setValue: function(value) {
		this.callParent(arguments);
		this.setIconCls();
	}
});
