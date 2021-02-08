__width_ColumnChar                 = function(chars) { return(parseInt(1.2*5.2*chars+10+0.5)); }
__width_ColumnNum                  = function(nums) { return(parseInt(1.2*6.5*nums+10+0.5)); }
__width_ColumnDate                 = 70;
__width_ColumnDateTime             = 116;
__width_ColumnDateTimeMs           = 140;
__width_ColumnTime                 = 70;
__width_ColumnTimeMs               = 80;
__width_FieldChar                  = function(chars) { return(parseInt(1.2*5.7*chars+5+0.5)); }
__width_FieldNum                   = function(nums) { return(parseInt(1.2*7.4*nums+5+0.5)); }
__width_FieldDate                  = 92;
__width_FieldTime                  = 77;
__width_FieldTimeM                 = 60;
__width_FieldDateTimeM             = 155;
__width_Label                      = 100;
__width_LabelFieldSeparator        = 5;
__width_FieldSeparator             = 4;
__width_Trigger                    = 17;
__width_Scroller                   = 20;
__width_Form                       = function(fieldWidth,labelWidth) { return(fieldWidth+(Ext.isDefined(labelWidth)?labelWidth:__width_Label)+__width_LabelFieldSeparator); }
__width_FormChar                   = function(labelWidthChar,fieldWidthChar) { return(__width_Form(__width_FieldChar(fieldWidthChar),Ext.isDefined(labelWidthChar)?__width_FieldChar(labelWidthChar):undefined)); }
__width_FormNum                    = function(labelWidthChar,fieldWidthNum) { return(__width_Form(__width_FieldNum(fieldWidthNum),Ext.isDefined(labelWidthChar)?__width_FieldChar(labelWidthChar):undefined)); }
__width_MarginsRedukFieldSet       = 11;

__height_Field                     = 22;
__height_FieldLines                = function(lines) { return(__height_Field+(lines-1)*(__height_Field-6)); }
__height_FieldSeparator            = 5;
__height_Form                      = function(fields) { return((__height_Field+__height_FieldSeparator)*fields); }
__height_Scroller                  = 20;
__height_MarginsRedukFieldSet      = 20;

__align_Label                      = 'right';

__color_FormBackground             = '#F0F0F0';
__color_TabGroupBackgroud          = '#F0F0F0';
__color_PanelBorder                = '#D0D0D0';
__color_TabPanelBorder             = '#B5B5B5';
__color_PanelBackgroud             = '#EAEAEA';
__color_FieldBorder                = '#B5B8C8';
__color_DisabledBackground         = '#E6E6E6';
__color_WindowFrame                = '#E8E8E8';
__color_DashboardBackground        = '#E1E1E1';
__color_ButtonsBackground          = '#E1E1E1';

__style_FormBackground             = function(addStyle) { return(Ext.applyIf(addStyle||{},{'background-color': __color_FormBackground})) };
__style_RedukFieldSet              = function(addStyle) { return(Ext.applyIf(addStyle||{},{paddingLeft: 5, paddingRight: 4, paddingTop: 2, paddingBottom: 0, marginTop: 0, marginBottom: 4})) };
__style_FieldBorder                = function() { return({'border': '1px solid ' + __color_PanelBorder}) };
__style_SubgridBorder              = function() { return({'border-left': '1px solid ' + __color_PanelBorder, 'border-right': '1px solid ' + __color_PanelBorder, 'border-bottom': '1px solid ' + __color_PanelBorder}) };
__style_SubgridBorderBottom        = function() { return({'border-left': '1px solid ' + __color_PanelBorder, 'border-right': '1px solid ' + __color_PanelBorder, 'border-top': '1px solid ' + __color_PanelBorder}) };
__style_SubgridBorderImp           = function() { return({'border-left': '1px solid ' + __color_PanelBorder + ' !important', 'border-right': '1px solid ' + __color_PanelBorder + ' !important', 'border-bottom': '1px solid ' + __color_PanelBorder + ' !important'}) };
__style_SubgridBorderTop           = function() { return({'border-top': '1px solid ' + __color_PanelBorder}) };

__format_DateDb                    = 'Y-m-d';
__format_TimeDb                    = 'H:i:s';
__format_TimeMsDb                  = 'H:i:s.u';
__format_DateTimeDb                = 'Y-m-d H:i:s';
__format_DateTimeMsDb              = 'Y-m-d H:i:s.u';

__format_Date                      = 'Y-m-d';
__format_Time                      = 'H:i:s';
__format_TimeMs                    = 'H:i:s.u';
__format_TimeM                     = 'H:i';
__format_DateTime                  = 'Y-m-d H:i:s';
__format_DateTimeMs                = 'Y-m-d H:i:s.u';
__format_DateTimeM                 = 'Y-m-d H:i';

__font_Style                       = 'tahoma,arial,verdana,sans-serif';
__font_Grid                        = 'normal 11px tahoma,arial,verdana,sans-serif';
__font_Style_Monospace             = 'courier';
__font_Monospace                   = 'normal 11px courier';

__tpl_simplyTabPanel               = [ '<tpl if="hasTabGuard">{% this.renderTabGuard(out, values, \'before\'); %}</tpl>' + 
				       '<div id="{id}-body" data-ref="body" role="presentation" class="{baseBodyCls} {baseBodyCls}-{ui} ' + 
				       '{bodyCls} {bodyTargetCls}{childElCls}" style="padding-bottom: 0px !important;<tpl if="bodyStyle">{bodyStyle}"</tpl>">' + 
				       '{%this.renderContainer(out,values)%}' + 
				       '</div>' + 
				       '<tpl if="hasTabGuard">{% this.renderTabGuard(out, values, \'after\'); %}</tpl>' + 
				       '<div id="{id}-strip" data-ref="strip" role="presentation" class="{stripCls} {stripCls}-{ui}{childElCls}" style="bottom: 2px; height: 1px;">' + 
				       '</div>'
				     ];
				     
__keyCode_space                    = 32;
__keyCode_cursLeft                 = 37;
__keyCode_cursRight                = 39;
__keyCode_delete                   = 46;
__keyCode_backspace                = 8;

__ip4_regex                        = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
__ip64_regex                       = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
__ip4_regex_enable_0               = /^(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

__extjs_images_path                = function() { return('extjs-' + window.extjs_version + '/build/classic/theme-gray/resources/images/'); }

__unit_xPDV                        = 'ms'

function setMeasure() {
	var scrollerWidth = getScrollerWidth();
	if(scrollerWidth) {
		__width_Scroller = scrollerWidth;
		__height_Scroller = scrollerWidth;
	}
}

__wikiUrl = !Ext.isDefined(window.wikiUrl) || wikiUrl;
if(__wikiUrl && __wikiUrl.match && !__wikiUrl.match(/\/$/)) {
	__wikiUrl += '/';
}
