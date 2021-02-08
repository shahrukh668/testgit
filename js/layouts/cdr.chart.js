Ext.ns('CDR');

Ext.define('CDR.Chart', {
	extend: 'Ext.Panel',
	alias: 'widget.CDR_ChartPanelX',
	subsystem: 'charts',
	constructor: function(config) {
		config = config || {};
		this.maxRows = 3;
		this.maxColumns = 3;
		this.chartPanels = [];
		this.chartContainers = [];
		this.chartContainersH = [];
		if(!config.filtersFromParent) {
			this.dateFrom = config.chartWindow ?
						config.dateFrom :
						date((new Date).getTime()/1000-defaultCdrInterval*24*60*60);
		}
		for(var i = 0; i < this.maxRows; i++) {
			this.chartContainers[i] = [];
			for(var j = 0; j < this.maxColumns; j++) {
				this.chartContainers[i][j] = new CDR.Chart.ChartPanel({
					layout: 'fit',
					border: false,
					flex: 1,
					disabled: true
				});
			}
			this.chartContainersH[i] = new Ext.Panel({
				layout: {
					type:'hbox',
					align:'stretch'
				},
				border: false,
				flex: 1,
				items: this.chartContainers[i],
				bodyStyle: {
					'background-color': 'grey'
				}
			})
		}
		var tbar = [];
		if(!config.filtersFromParent) {
			tbar.push({
				xtype: 'buttongroup',
				title: this.findLangS('title', 'date_range'),
				columns: 2,
				defaults: {
					xtype: 'displayfield'
				},
				items: [
					{xtype: 'container', height: 1, colspan: 2},
					{value: this.findLangS('field', 'from')+':', fieldCls: 'x-toolbar-text'},
					{xtype: 'SearchDateTimeX', value: this.dateFrom,
					 _gridForm: this, _buttonGroup: true,
					 onSetDate: function(field, date) {
						this.dateFrom = date;
					 },
					 scope: this},
					{value: this.findLangS('field', 'to')+':', fieldCls: 'x-toolbar-text'},
					{xtype: 'SearchDateTimeX', value: config.dateTo,
					 _gridForm: this, _buttonGroup: true,
					 onSetDate: function(field, date) {
						this.dateTo = date;
					 },
					scope: this}
				],
				style: {
					background: __color_TabGroupBackgroud,
					'border-width': 0
				}
			});
		}
		if(!config.btnAdd && !config.disableCreateBtnAdd) {
			this.btnAdd = new Ext.Button({
				iconCls: 'icon_add',
				handler: !user_can_messages() ? function() {
					this.addChart();
				} : undefined,
				scope: this,
				menu: user_can_messages() ? {
					defaults: {
						handler: function(menuItem) {
							this.addChart(menuItem._typeChart);
						},
						scope: this
					},
					items: [{
						text: 'CDR',
						_typeChart: 'CDR'
					},{
						text: 'MESSAGES',
						_typeChart: 'MESSAGES'
					},{
						text: 'SIP Opt., Subsc., Notify',
						_typeChart: 'SIP_MSG'
					}]
				} : undefined
			});
			tbar.push(this.btnAdd);
		}
		config = Ext.applyIf(config, {
			layout: 'fit',
			border: true,
			items: {
				layout: {
					type:'vbox',
					align:'stretch'
				},
				border: false,
				items: this.chartContainersH,
				tbar: tbar.length ? tbar : undefined,
				listeners: {
					scope: this,
					afterrender: function() {
						this.setChartsLayout();
					},
					destroy: function() {
						this.removeAllCharts();
					}
				},
				bodyStyle: {
					'background-color': 'grey'
				}
			}
		});
		if(!config.chartWindow && !config.childPanel) {
			config = Ext.applyIf(config, {
				layout: 'fit',
				id: 'CDR_Chart-panel',
				title:  this.findLangS('title', 'charts'),
				iconCls: 'icon_menu_diag_system',
				wikiId: 'Charts'
			});
		}
		this.callParent([config]);
		if(config.chartWindow) {
			config.chartWindow.on('beforeclose', function() {
					if(this.chartPanels.length) {
						this.maskLoad();
						Ext.defer(function() {
								this.removeAllCharts();
								this.unmask();
								this.chartWindow.close();
							},
							100,
							this);
						return(false);
					}
				},
				this);
		}
	},
	addChart: function(typeChart) {
		if(!typeChart) {
			typeChart = 'CDR';
		}
		var countChartPanels = this.chartPanels.length;
		if(countChartPanels == this.maxRows * this.maxColumns) {
			return;
		}
		var chartDefault = {
			chartType: 'TCH_count'
		};
		if(!this.filtersFromParent) {
			Ext.apply(chartDefault, {
				dateFrom: this.dateFrom,
				dateTo: this.dateTo
			});
		}
		new CDR.Chart.ConfigForm({
			filtersFromParent: this.filtersFromParent,
			chartDefault: chartDefault,
			onApply: function(chartConfig) {
				this.chartPanels.push(new CDR.Chart.ChartPanel({
					chartsOwner: this
				}));
				this.chartPanels[countChartPanels].loadChart(chartConfig, true, {
					fceInvalidQuery: function() {
						this.deleteChart(this.chartPanels[countChartPanels]);
					},
					fceInvalidQueryScope: this,
					fceError: function(param, error, result, response) {
						alertAjaxError(response);
						this.deleteChart(this.chartPanels[countChartPanels]);
					},
					fceErrorScope: this,
					fceFailure: function(param, error, response) {
						if(!requestIsAborted(response)) {
							alertAjaxFailure(response);
						}
						this.deleteChart(this.chartPanels[countChartPanels]);
					},
					fceFailureScope: this
				});
				if(this.btnAdd) {
					this.btnAdd.setDisabled(countChartPanels == this.maxRows * this.maxColumns - 1);
				}
			},
			onApplyScope: this,
			_typeChart: typeChart
		});
	},
	deleteChart: function(chartPanel) {
		var index = null;
		for(var i = 0; i < this.chartPanels.length; i++) {
			if(this.chartPanels[i] == chartPanel) {
				index = i;
				break;
			}
		}
		if(index !== null) {
			this.chartPanels[index].destroy();
			this.chartPanels.splice(index, 1);
		}
	},
	removeChart: function(chartPanel) {
		this.maskLoad();
		Ext.defer(function() {
				var index = null;
				for(var i = 0; i < this.chartPanels.length; i++) {
					if(this.chartPanels[i] == chartPanel) {
						index = i;
						break;
					}
				}
				if(index !== null) {
					this.chartPanels[index].destroy();
					this.chartPanels.splice(index, 1);
					this.setChartsLayout();
				}
				this.unmask();
				if(this.btnAdd) {
					this.btnAdd.setDisabled(false);
				}
			},
			100,
			this);
	},
	removeAllCharts: function() {
		while(this.chartPanels.length) {
			var index = this.chartPanels.length - 1;
			this.chartPanels[index].destroy();
			this.chartPanels.splice(index, 1);
		}
	},
	setChartsLayout: function(refreshCharts) {
		var countChartPanels = this.chartPanels.length;
		var countColumns = countChartPanels <= 2 ? 1:
				   countChartPanels <= 4 ? 2:
							   3;
		this.body.setStyle({
			'background-color': this.chartPanels.length ? 'grey' : __color_PanelBackgroud
		});
		var countRows = parseInt(countChartPanels/countColumns) + (countChartPanels%countColumns?1:0);
		var indexChartPanels = 0;
		for(var i = 0; i < this.maxColumns; i++) {
			this.chartContainersH[i].flex = i < countRows ? 1 : 0;
			this.chartContainersH[i].el.setStyle({
				'padding-bottom': i < countRows - 1 ? 1 : 0
			});
			for(var j = 0; j < this.maxRows; j++) {
				this.chartContainers[i][j].flex = j < countColumns ? 1 : 0;
				this.chartContainers[i][j].el.setStyle({
					'padding-right': j < countColumns - 1 ? 1 : 0
				});
				this.chartContainers[i][j].removeAll(false);
				if(i < countRows && j < countColumns &&
				   indexChartPanels < countChartPanels) {
					this.chartContainers[i][j].setDisabled(false);
					this.chartContainers[i][j].add(this.chartPanels[indexChartPanels]);
					this.chartContainers[i][j].unmask();
					++indexChartPanels;
				} else {
					this.chartContainers[i][j].setDisabled(true);
				}
			}
		}
		this.updateLayout();
	},
	reloadCharts: function(enableInvalidData) {
		for(var i = 0; i < this.chartPanels.length; i++) {
			this.chartPanels[i].reloadChart(enableInvalidData);
		}
	},
	changeTimezone: function() {
		this.reloadCharts();
	}
});


Ext.define('CDR.Chart.ChartPanel', {
	extend: 'Ext.Panel',
	subsystem: 'charts',
	constructor: function(config) {
		config = Ext.applyIf(config||{}, {
			layout: 'absolute',
			border: false,
			listeners: {
				resize: function() {
					this.setToolsPanelPosition();
				},
				scope: this
			}
		});
		this.callParent([config]);
	},
	loadChart: function(chartConfig, newChart, config) {
		this.completeChartConfig(chartConfig);
		if(!chartConfig._typeChart) {
			chartConfig._typeChart = 'CDR';
		}
		for(var i = 0; i < chartConfig.series.length; i++) {
			chartConfig.series[i].varName2 = 's_' + (i + 1);
		}
		var store = new CDR.Chart.Store({
			chartConfig: chartConfig
		});
		var me = this;
		this.loadRequest = store.loadChartData({
			onLoad: function(result, store) {
				if(result) {
					this.clearChart();
					this.createChart(chartConfig, store, newChart);
					if(config && config.fceOkQuery) {
						config.fceOkQuery.call(config.fceOkQueryScope || this,
								       config.fceOkQueryParam);
					}
				} else  {
					if(!this._disableAlertInvalidQuery) {
						Ext.Msg.alert(me.findLangS('text', 'msgInvalidQuery'), 
							      chartConfig._typeChart == 'CDR' ? me.findLangS('text', 'msgInvalidQueryDescr') :
							      chartConfig._typeChart == 'MESSAGES' ? me.findLangS('text', 'msgInvalidQueryDescr_messages') : 
							      chartConfig._typeChart == 'SIP_MSG' ? me.findLangS('text', 'msgInvalidQueryDescr_sip_msg') : 
												    me.findLangS('text', 'msgInvalidQueryDescr_records'),
							function() {
								if(config && config.fceInvalidQuery) {
									config.fceInvalidQuery.call(config.fceInvalidQueryScope || this,
												    config.fceInvalidQueryParam,
												    store);
								}
							},
							this);
					} else {
						if(config && config.fceInvalidQuery) {
							config.fceInvalidQuery.call(config.fceInvalidQueryScope || this,
										    config.fceInvalidQueryParam,
										    store);
						}
					}
					if(newChart) {
						if(this.chartsOwner && this.chartsOwner.removeChart) {
							Ext.defer(this.chartsOwner.deleteChart, 100, this.chartsOwner, [this]);
						}
					} else {
						delete store;
					}
				}
			},
			onError: config && config.fceError ? function(error, result, response) {
				config.fceError.call(config.fceErrorScope || this,
						     config.fceErrorParam, error, result, response);
			} : undefined,
			onFailure: config && config.fceFailure ? function(error, response) {
				config.fceFailure.call(config.fceFailureScope || this,
						       config.fceFailureParam, error, response);
			} : undefined,
			scope: this,
			maskCmp: this._disableMaskOnLoad ? undefined : this.chartsOwner || this
		});
	},
	createChart: function(chartConfig, store, newChart) {
		this.chart = new CDR.Chart.Chart({
			store: store,
			anchor: '0, 0',
			_id: 'chart',
			_chartPanel: this,
			_typeChart: chartConfig._typeChart
			
		});
		this.addChart();
		if(newChart && this.chartsOwner && this.chartsOwner.setChartsLayout) {
			this.chartsOwner.setChartsLayout();
		}
	},
	addChart: function() {
		var panelItems = [ { flex: 1 } ];
		if(this._enableBtns !== false) {
			if((!this.chart.store.chartConfig || !this.chart.store.chartConfig.filtersFromParent) && 
			   this._enableBtnNextPrev !== false) {
				panelItems.push({
					xtype: 'button',
					iconCls: 'x-tbar-page-prev',
					handler: function(btn) {
						this.chart.timeShift(false);
					},
					tooltip: this.findLangS('tooltip', 'prev')
				},{
					xtype: 'button',
					iconCls: 'x-tbar-page-next',
					handler: function(btn) {
						this.chart.timeShift(true);
					},
					tooltip: this.findLangS('tooltip', 'next')
				});
			}
			panelItems.push({
				xtype: 'button',
				iconCls: 'icon_save2_blue',
				handler: function(btn) {
					this.saveChart('svg');
				},
				tooltip: this.findLangS('tooltip', 'saveAsSVG')
			},{
				xtype: 'button',
				iconCls: 'icon_save2_pdf',
				handler: function(btn, e) {
					if(this.chart.engine == Ext.draw.engine.Svg) {
						var menu = new Ext.menu.Menu({
							defaults: {
								handler: function(menuItem) {
									this.saveChart(menuItem._saveType);
								},
								scope: this
							},
							items: [{
								text: this.findLangS('menu', 'simpleConvert'),
								_saveType: 'pdf'
							},{
								text: this.findLangS('menu', 'pageFormat'),
								_saveType: 'pdf_page'
							}]
						});
						menu.showAtMouse(e);
					} else {
						this.saveChart('pdf_page');
					}
				},
				tooltip: this.findLangS('tooltip', 'saveAsPDF')
			});
			if(this._enableBtnTracker !== false && user_can_tracker()) {
				panelItems.push({
					xtype: 'button',
					iconCls: 'icon_tracker',
					handler: function(btn) {
						this.newTrackerTicket();
					},
					tooltip: this.findLangS('tooltip', 'newTrackerTicket')
				});
			}
			if(this._enableBtnEdit !== false) {
				panelItems.push({
					xtype: 'button',
					iconCls: 'icon_edit',
					handler: function(btn) {
						this.editChartConfig();
					},
					tooltip: this.findLangS('tooltip', 'editChart')
				});
			}
			if(this._enableBtnRemove !== false) {
				panelItems.push({
					xtype: 'button',
					iconCls: 'icon_remove',
					handler: function(btn) {
						this.removeChart();
					},
					tooltip: this.findLangS('tooltip', 'closeChart')
				});
			}
			if(this._enableBtnUndock) {
				panelItems.push({
					xtype: 'button',
					text: this.findLangS('button', 'undock'),
					handler: this.undock,
					scope: this,
					border: true,
					tooltip: this.findLangS('tooltip', 'undockChart'),
					height: 17,
					style: {
						marginLeft: 4,
						marginTop: 2,
						marginRight: 4
					},
					innerStyle: {
						marginTop: -5
					}
				});
			}
		}
		this.add([
			this.chart,
			this._enableBtns !== false ? 
				new Ext.panel.Panel({
					layout: 'hbox',
					x: 5, y: 5,
					width: 20 * (panelItems.length - 1) + (this._enableBtnUndock ? 35 : 0),
					border: false,
					_id: 'tools',
					defaults: {
						border: false,
						style: { background: 'transparent' },
						scope: this
					},
					items: panelItems,
					hidden: true
				}) :
				undefined
		]);
		Ext.defer(this.setToolsPanelPosition, 100, this);
	},
	editChartConfig: function() {
		new CDR.Chart.ConfigForm({
			chartConfig: this.chart.store.chartConfig,
			onApply: function(chartConfig) {
				this.loadChart(chartConfig);
			},
			onApplyScope: this
		});
	},
	setToolsPanelPosition: function() {
		if(!this.getEl() || this._enableBtns === false) {
			return;
		}
		if(!this.items || this.items.getCount() < 2 || this.items.items[1]._id != 'tools' || !this.items.items[1].getEl()) {
			return;
		}
		var panelWidth = this.getWidth();
		var panelPosition = this.getPosition();
		var toolsWidth = this.items.items[1].getWidth() || this.items.items[1].width;
		this.items.items[1].show();
		this.items.items[1].setStyle({ 'z-index': 10 });
		this.items.items[1].setXY([
			panelPosition[0] + panelWidth - toolsWidth,
			panelPosition[1]]);
	},
	clearChart: function() {
		this.removeAll(true);
	},
	removeChart: function() {
		if(this.chartsOwner && this.chartsOwner.removeChart) {
			this.chartsOwner.removeChart(this);
		}
	},
	okChart: function() {
		return(this.chart &&
		       this.chart.store && this.chart.store.getCount() && this.chart.store.validData);
		 
	},
	saveChart: function(saveType) {
		this.chart.saveChart(saveType);
		/* old simply get method
		window.location='php/reports/charts.php?task=saveChart&chartConfigData='+
				encodeURIComponent(Ext.encode(this.chart.store.chartConfig));
		*/
	},
	newTrackerTicket: function() {
		this.chart.newTrackerTicket();
	},
	reloadChart: function(enableInvalidData) {
		this.chart.reloadChart(null, enableInvalidData);
	},
	reloadChartWithNewChartConfig: function(newChartConfig, enableInvalidData, copySeriesDataFromStore) {
		if(newChartConfig && copySeriesDataFromStore && 
		   this.chart.store && this.chart.store.chartConfig && this.chart.store.chartConfig.series) {
			newChartConfig.series = this.chart.store.chartConfig.series;
		}
		this.chart.reloadChart(newChartConfig, enableInvalidData);
	},
	onReloadChart: function() {
		this.chart.setVisible(this.chart.store.validData);
		this.enableIf(this.chart.store.validData);
	},
	undock: function() {
		var width = Ext.dom.Element.getViewportWidth() - 20;
		var height = Ext.dom.Element.getViewportHeight() - 50;
		var window = new Ext.Window({
			title: this.undockTitle,
			iconCls: this.undockCls || 'icon_menu_diag_system',
			closable: true,
			maximizable: true,
			resizable: true,
			layout: 'fit',
			items: this.chart,
			border: false,
			width: width,
			height: height,
			modal: true,
			listeners: {
				scope: this,
				beforeclose: function() {
					window.removeAll(false);
					this.removeAll();
					this.addChart();
				}
			}
		});
		window.show();
	},
	completeChartConfig: function(chartConfig) {
		if(!chartConfig) {
			return;
		}
		if(chartConfig.series) {
			for(var i = 0; i < chartConfig.series.length; i++) {
				this.completeSeries(chartConfig.series[i]);
			}
		}
	},
	completeSeries: function(series) {
		if(series.series == 'TCHS_sipResponse_base' &&
		   !series.multiSeriesIntervals) {
			series.multiSeriesIntervals = getDataArrayItem(arCdrChart_chartSeriesTypes, series.series, 0, 8);
		}
	}
});


Ext.define('CDR.Chart.Chart', {
	extend: 'Ext.chart.CartesianChart',
	subsystem: 'charts',
	constructor: function(config) {
		config = config || {};
		legendPosition = config.store.chartConfig.legendPosition || 'top';
		var chartTitle = config.store.chartConfig.title || getTitle(config.store.chartConfig.series);
		if(!config.store.chartConfig._title) {
			config.store.chartConfig._title = chartTitle;
		}
		if(!config.store.chartConfig.theme) {
			config.store.chartConfig.theme = 'CdrChart';
		}
		Ext.applyIf(config, {
			xtype: 'cartesian',
			animation: false,
			border: false,
			axes: config.store.chartConfig.combinationToArea ?
			       createChart_axes_combinationToArea.call(this, config.store.chartConfig, config.store.chartData, config.store) :
			       createChart_axes.call(this, config.store.chartConfig, config.store.chartData, config.store),
			series: config.store.chartConfig.defSeries ?
				 config.store.chartConfig.defSeries :
				 config.store.chartConfig.combinationToArea ?
				  createChart_series_combinationToArea.call(this, config.store.chartConfig, config.store.chartData, config.store, config) :
				  createChart_series.call(this, config.store.chartConfig, config.store.chartData, config.store, config),
			shadow: true,
			theme: config.store.chartConfig.theme,
			background: 'white',
			legend: config.store.chartConfig.legendPosition == 'none' ? false : {
				docked: legendPosition,
				type: 'sprite',
				border: {
					strokeStyle: '#FFFFFF'
				},
				label: {
					fontSize: 11
				},
				padding: 3
			},
			insetPadding: {
				top: config.paddingTop || 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			_saveType: 'auto',
			_saveViaSenchaIo: false,
			_typeChart: 'CDR',
			plugins: {
				ptype: 'chartitemevents',
				moveEvents: true
			},
			interactions: [{
				type: 'itemhighlight',
				sticky: false
			}],
			listeners: {
				scope: this,
				render: function() {
					ch = this;
					if(!this._init_zindex_processed) {
						for(var i = 0; i < this.series.length; i++) {
							if(this.series[i]._style && this.series[i]._style.zIndex) {
								this.series[i].sprites[0].setAttributes({ zIndex: this.series[i]._style.zIndex});
							}
						}
						this._init_zindex_processed = true;
					}
				}
			}
		});
		if(chartTitle && !['none', 'blank'].isIn(chartTitle)) {
			var topPadding = 0;
			var titleY = 0;
			if(legendPosition == 'top') {
				topPadding = 30;
				titleY = 14;
			} else {
				topPadding = 30;
				titleY = 14;
			}
			config.insetPadding.top = topPadding;
			Ext.applyIf(config, {
				sprites: [{
					type: 'text',
					text: chartTitle,
					font: 'bold 13px tahoma,arial,verdana,sans-serif',
					width: 200,
					height: 20,
					x: 10,
					y: titleY
				}]
			});
		}
		this.callParent([config]);
		function createChart_axes(chartConfig, chartData, chartStore) {
			var me = this;
			var axes = [];
			for(var i = 0; i < chartConfig.series.length; i++) {
				if(chartConfig.series[i]._multipleFactorAxis) {
					chartConfig.series[i]._multipleFactorAxis = null;
					this.applyMultipleFactorAxis(chartData.axis, chartConfig.series[i], chartData.multiSeriesItems, chartStore);
				}
			}
			for(var i = 0; i < 2; i++) {
				var iPrimaryFirst = null;
				var iFirst= null;
				var colorPrimary = null;
				for(var j = 0; j < chartConfig.series.length && iPrimaryFirst === null; j++) {
					if(chartConfig.series[j].sideAxis == (i ? 'right' : 'left')) {
						if(iFirst === null) {
							iFirst = j;
						}
						if(chartConfig.series[j].primaryAxis) {
							iPrimaryFirst = j;
						}
					}
				}
				if(iPrimaryFirst === null) {
					iPrimaryFirst = iFirst;
				}
				if(iPrimaryFirst !== null) {
					chartConfig.series[iPrimaryFirst]._primary = true;
					chartConfig.series[iPrimaryFirst]._primaryMain = true;
					var iPrimary = [ iPrimaryFirst ];
					var iSecondary = [];
					var fieldsAxis = getFieldsAxes(chartConfig.series[iPrimaryFirst], chartData.multiSeriesItems);
					var colorPrimary = chartConfig.series[iPrimaryFirst].primaryAxis ? chartConfig.series[iPrimaryFirst].color : null;
					var colorsAxis = [ chartConfig.series[iPrimaryFirst].color ];
					for(var j = 0; j < chartConfig.series.length; j++) {
						if(chartConfig.series[j].sideAxis == (i ? 'right' : 'left') &&
						   j != iPrimaryFirst) {
							if(chartConfig.series[j].unit == chartConfig.series[iPrimaryFirst].unit) {
								iPrimary.push(j);
								fieldsAxis = fieldsAxis.concat(getFieldsAxes(chartConfig.series[j], chartData.multiSeriesItems));
								colorsAxis.push(chartConfig.series[j].color);
								chartConfig.series[j]._primary = true;
							} else {
								iSecondary.push(j);
							}
						}
					}
					var maxAxisValue = null;
					var maxSumAxisValue = null;
					var multipleFactorPrimaryAxis = 1;
					if(chartConfig.series[iPrimaryFirst].percent) {
						maxAxisValue = 100;
						maxSumAxisValue = 100;
					} else {
						for(var j = 0; j < iPrimary.length; j++) {
							maxAxisValue = Math.max(maxAxisValue, this.getMaxSeries(chartData.axis, chartConfig.series[iPrimary[j]], chartData.multiSeriesItems));
							maxSumAxisValue = Math.max(maxSumAxisValue, this.getMaxSeries(chartData.axis, chartConfig.series[iPrimary[j]], chartData.multiSeriesItems, true));
						}
						multipleFactorPrimaryAxis = 1;
						if(maxAxisValue) {
							if(maxAxisValue < 0.5) {
								while(maxAxisValue < 0.5) {
									maxAxisValue *= 10;
									maxSumAxisValue *= 10;
									multipleFactorPrimaryAxis *= 10;
								}
								for(var j = 0; j < iPrimary.length; j++) {
									chartConfig.series[iPrimary[j]]._multipleFactorAxis = multipleFactorPrimaryAxis;
									this.applyMultipleFactorAxis(chartData.axis, chartConfig.series[iPrimary[j]], chartData.multiSeriesItems, chartStore);
								}
							}
							for(var j = 0; j < iSecondary.length; j++) {
								var maxSecondaryValue = this.getMaxSeries(chartData.axis, chartConfig.series[iSecondary[j]], chartData.multiSeriesItems);
								if(maxSecondaryValue) {
									chartConfig.series[iSecondary[j]]._multipleFactorAxis = maxAxisValue / maxSecondaryValue;
									this.applyMultipleFactorAxis(chartData.axis, chartConfig.series[iSecondary[j]], chartData.multiSeriesItems, chartStore);
								}
							}
						}
					}
					var axis = {
						type: 'numeric',
						position: (i ? 'right' : 'left'),
						grid: i==0,
						gridColor: '#E0E0E0',
						fields: fieldsAxis,
						renderer: function(axis, label, layoutContext, lastLabel) {
							var labelConfig = axis.config.label;
							return(labelConfig._scope.renderChartValue(label / (labelConfig._multipleFactorPrimaryAxis || 1),
												   labelConfig._type, 'axes'));
						},
						label: {
							_type: chartConfig.series[iPrimaryFirst].percent ? '%' : chartConfig.series[iPrimaryFirst].varName,
							_multipleFactorPrimaryAxis: multipleFactorPrimaryAxis,
							_scope: this
						},
						minimum: 0,
						title: chartConfig[i ? 'axisTitleRight' : 'axisTitleLeft'] || chartConfig.series[iPrimaryFirst].title,
						minAxisWidth: chartConfig[i ? 'rightAxisMinWidth' : 'leftAxisMinWidth'] * 1,
						_iPrimaryFirst: iPrimaryFirst
					};
					var renderChartValueConfig = this.renderChartValue_config(chartConfig.series[iPrimaryFirst].percent ? '%' : chartConfig.series[iPrimaryFirst].varName);
					Ext.apply(axis, {
						_decPrecision: renderChartValueConfig.decAxes,
						_maxTickSteps: function() {
							return(me.getHeight() ?
								Math.min(Math.max(Math.floor(me.getHeight() / 20), 4), 20) :
								10);
						}
					});
					var limitLineValue = window.charts_suppress_limit_value ?
							      0 :
							      (i ? chartConfig.rightLimitLineValue : chartConfig.leftLimitLineValue);
					if(chartConfig.series[iPrimaryFirst].percent) {
						axis.maximum = Math.max(100, limitLineValue * 1);
						axis.constrain = false;
					} else if(limitLineValue && limitLineValue > maxAxisValue) {
						axis.maximum = limitLineValue * 1;
						axis.constrain = false;
					}
					var limits = this.getAxisLimits(chartConfig, chartData, i == 0 ? 'left' : 'right', axis);
					if(limits) {
						axis.limits = limits;
					}
					var colorAxis = colorPrimary ||
							colorsAxis.length == 1 && colorsAxis[0];
					if(colorAxis) {
						var lightColorAxis = lightColor(colorAxis, 1.5, 1.2);
						axis.label.fill = lightColorAxis;
						axis.labelTitle = {
							fill: colorAxis
						};
						axis.axisStyle = {
							stroke: lightColorAxis
						};
					}
					axes.push(axis);
				} else if(chartConfig[i ? 'rightAxisMinWidth' : 'leftAxisMinWidth'] * 1 > 0) {
					var axis = {
						type: 'category',
						position: (i ? 'right' : 'left'),
						fields: [0],
						minimum: 0,
						maximum: 1,
						majorTickSteps: 0,
						renderer: function(axis, label, layoutContext, lastLabel) {
							return('');
						},
						title: '-',
						labelTitle: {
							fill: 'white'
						},
						disableTicks: true,
						minAxisWidth: chartConfig[i ? 'rightAxisMinWidth' : 'leftAxisMinWidth'] * 1
					};
					axes.push(axis);
				}
			}
			axes.push(createChart_timeAxis.call(this, chartConfig, chartData, chartStore));
			return(axes);
		}
		function createChart_axes_combinationToArea(chartConfig, chartData, chartStore) {
			var fieldsAxis = [];
			for(var i = 0; i < chartConfig.series.length; i++) {
				fieldsAxis.push(getFieldsAxes(chartConfig.series[i])[0]);
			}
			var axes = [];
			var axis = {
				type: 'numeric',
				position: 'left',
				grid: true,
				gridColor: '#E0E0E0',
				fields: fieldsAxis,
				renderer: function(axis, label, layoutContext, lastLabel) {
					var labelConfig = axis.config.label;
					return(labelConfig._scope.renderChartValue(label, labelConfig._type, 'axes'));
				},
				label: {
					_type: chartConfig.series[0].varName,
					_scope: this
				},
				minimum: 0,
				title: chartConfig.axisTitleLeft || chartConfig.series[0].title
			};
			axes.push(axis);
			axes.push(createChart_timeAxis.call(this, chartConfig, chartData, chartStore));
			return(axes);
		}
		function getFieldsAxes(series, multiSeriesItems) {
			var fields = [];
			var varName2  = series.varName2;
			if(series.multiSeries) {
				if(multiSeriesItems[varName2]) {
					for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
						fields.push('y_' + varName2 + '_' + j + (series.percent ? '_perc' : ''));
					}
				}
			} else {
				fields.push('y_' + varName2);
			}
			return(fields);
		}
		function createChart_series(chartConfig, chartData, chartStore, config) {
			var series = [];
			for(var i = 0; i < chartConfig.series.length; i++) {
				var type = chartConfig.series[i].baseType == 'column' ?
					    'bar' :
					   chartConfig.series[i].baseType == 'column_line' ?
					    (chartData.axis.length > 80 ? 'line' : 'bar') :
					    chartConfig.series[i].baseType;
				var seriesColor = undefined;
				if(!Ext.isEmpty(chartConfig.series[i].color)) {
					seriesColor = {
						base: chartConfig.series[i].color,
						light: lightColor(chartConfig.series[i].color)
					};
				}
				var style = {
					lineWidth: type == 'bar' ? 2 :
						   type == 'line' || type == 'trend' ? (config.lineWidth || 2) : undefined,
						   // inactive border column width
					lineDash:
						chartConfig.series[i].lineType == 'dashed' ? [10, 2] :
						chartConfig.series[i].lineType == 'dotted' ? [2, 2] : undefined,
					minGapWidth: 1
					};
				var markerCfg = 
					chartConfig.series[i].markers ? {
						type: 'circle',
						size: 2,
						radius: 2
					} : undefined;
				var highlightCfg = undefined;
				if(Ext.isDefined(seriesColor)) {
					Ext.apply(style, {
						_seriesColor: seriesColor,
						stroke: type == 'line' || type == 'trend' ? seriesColor.base : seriesColor.light,
						// line color, inactive border column color
						fill: type == 'line' || type == 'trend' ? seriesColor.base : seriesColor.light
						// inactive column full color, base color markers in legend
					});
					if(chartConfig.series[i].markers) {
						Ext.apply(markerCfg, {
							stroke: seriesColor.base
							// marker color
						});
					}
					highlightCfg = {
						fillStyle: type == 'line' || type == 'trend' ? seriesColor.light : seriesColor.light,
						strokeStyle: type == 'line' || type == 'trend' ? seriesColor.light : seriesColor.base
						// highlight colors
					};
				}
				if(chartConfig.series[i].opacity) {
					style.opacity = chartConfig.series[i].opacity;
				}
				if(type == 'line' || type == 'trend') {
					style.zIndex = 20000 + i;
				}
				var yFields = [];
				var titles = [];
				if(chartConfig.series[i].multiSeries) {
					var varName2 = chartConfig.series[i].varName2;
					if(chartData.multiSeriesItems[varName2]) {
						for(var j = 0; j < chartData.multiSeriesItems[varName2].length; j++) {
							yFields.push('y_' + varName2 + '_' + j + (chartConfig.series[i].percent ? '_perc' : ''));
							var title = chartData.multiSeriesItems[varName2][j];
							if(chartConfig.series[0].multiSeriesIntervals) {
								for(var k = 0; k < chartConfig.series[0].multiSeriesIntervals.length; k++) {
									if(Ext.isString(chartConfig.series[0].multiSeriesIntervals[k][0])) {
										var descr = chartConfig.series[0].multiSeriesIntervals[k][0];
										if(descr.match('/') && descr.split('/')[0] == title) {
											title = descr.split('/')[1];
										}
									}
								}
							}
							titles.push(title);
						}
					}
				} else {
					var yField = 'y_' + chartConfig.series[i].varName2;
					var title = chartConfig.series[i].title;
					if(chartConfig.series[i].paramSeries) {
						if(chartConfig.series[i].titleBase) {
							var title = chartConfig.series[i].titleBase;
						}
					}
					var titleOverride = '';
					if(chartConfig.series[i].filter && chartConfig.series[i].filter.series_title) {
						titleOverride += chartConfig.series[i].filter.series_title;
					}
					if(chartConfig.series[i].timeOffset && chartConfig.series[i].timeOffset.name) {
						if(titleOverride) {
							titleOverride += ' / ';
						}
						titleOverride += chartConfig.series[i].timeOffset.name;
					}
					if(titleOverride) {
						title = titleOverride;
					}
					yFields.push(yField);
					titles.push(title);
				}
				for(var j = 0; j < titles.length; j++) {
					if(titles[j].length > 26) {
						titles[j] = titles[j].substr(0, 26) + '...';
					}
				}
				for(var j = 0; j < (type == 'area' ? 1 : yFields.length); j++) {
					var useStackedArea = type == 'area' && chartData.axis.length > 80;
					var useStackedColumn = type == 'area' && !useStackedArea;
					var seriesItem = {
						title: type == 'area' ? titles : titles[j],
						type: type == 'area' ? (useStackedArea ? 'area' : 'bar') : (type == 'trend' ? 'line' : type),
						stacked: type == 'area',
						xField: 'x',
						yField: type == 'area' ? yFields : yFields[j],
						axis: chartConfig.series[i].sideAxis,
						_multipleFactorAxis: chartConfig.series[i]._multipleFactorAxis || 1,
						_percent: chartConfig.series[i].percent,
						tips: {
							trackMouse: true,
							renderer: function(tooltip, storeItem, item) {
								var tip = '';
								var timeFrom = null;
								var timeTo = null;
								var timeFromToString = null;
								var chartConfig = item.series && item.series._chart.store.chartConfig;
								if(storeItem.data.x && storeItem.data.x.getTime &&
								   chartConfig && chartConfig.timeAxis) {
									timeFrom = clone(storeItem.data.x);
									timeTo = clone(new Date(dateTime(storeItem.data.x).getTime() + 
										       arCdrChart_timeAxisTypes[chartConfig.timeAxis].step * 1000));
									if(!Ext.isArray(item.series._yField)) {
										for(var i = 0; i < chartConfig.series.length; i++) {
											if('y_' + chartConfig.series[i].varName2 == item.series._yField) {
												if(chartConfig.series[i].timeOffset) {
													timeFrom = applyTimeOffset(timeFrom, chartConfig.series[i].timeOffset);
													timeTo = applyTimeOffset(timeTo, chartConfig.series[i].timeOffset);
												}
												break;
											}
										}
									}
									timeFromToString = trimTimeFormatString(timeFrom, timeTo) + 
											   ' - ' + 
											   trimTimeFormatString(timeTo, timeFrom);
								}
								if(Ext.isArray(item.series._yField)) {
									var yFields = item.series._yField;
									var perc = yFields.length && yFields[0].match(/_perc$/);
									var sum = 0;
									if(!perc) {
										for(var i = 0; i < yFields.length; i++) {
											if(!item.series._title[i] || !item.record.data[yFields[i]]) {
												continue;
											}
											var value = item.record.data[yFields[i]];
											sum += value / (item.series._multipleFactorAxis || 1);
										}
									}
									for(var i = 0; i < yFields.length; i++) {
										if(!item.series._title[i] || !item.record.data[yFields[i]]) {
											continue;
										}
										if(!tip) {
											if(timeFromToString) {
												tip += '<p style="font-weight: normal; color: black; margin: 0; padding-left: 3px; padding-bottom: 2px; white-space:nowrap;">' + 
												       timeFromToString +
												       '</p>';
											}
											tip += '<table style="font-size: 11;">'
										}
										var color = '#FFFFFF';
										if(item.series._legendColors) {
											color = item.series._multiSeriesIntervalsFix ?
												 getMultiSeriesFixColorForTitle(item.series._legendColors, item.series._title[i]) :
												 item.series._legendColors[item.series._title[i]];
										} else if(item.series.colorArrayStyle) {
											color = item.series.colorArrayStyle[i % item.series.colorArrayStyle.length];
										} else if(item.series._chart.theme._colors) {
											var offsetColorIndex = 0;
											for(var j = 0; j < item.series._chart.series.length; j++) {
												if(item.series._chart.series[j].id == item.series.id) {
													break;
												}
												++offsetColorIndex;
											}
											color = item.series._chart.theme._colors[(i + offsetColorIndex) % item.series._chart.theme._colors.length];
										}
										tip += '<tr>';
										tip += '<td style="color: ' + color + '; white-space:nowrap;">';
										tip += '<b><i>' + item.series._title[i] + '</i></b>';
										tip += '<td style="text-align: right; padding-left: 20px; white-space:nowrap;">';
										var value = item.series._scope.renderChartValue(
												item.record.data[yFields[i]] / (item.series._multipleFactorAxis || 1),
												perc ? '%' : item.series._varName, 
												'tip');
										tip += '<b>' + value + '</b>';
										if(perc) {
											tip += '<td style="text-align: right; padding-left: 20px; white-space:nowrap;">';
											value = item.series._scope.renderChartValue(
													item.record.data[yFields[i].substr(0, yFields[i].length - 5)],
													item.series._varName, 
													'tip');
											tip += '<b>' + value + '</b>';
										} else {
											tip += '<td style="text-align: right; padding-left: 20px; white-space:nowrap;">';
											value = roundNumber(value / sum * 100, 1) + ' %';
											tip += '<b>' + value + '</b>';
										}
									}
									widthInc = 30;
								} else {
									var yField = item.series._yField;
									if(yField) {
										tip += '<p style="font-weight: normal; color: black; margin: 0; padding-left: 3px; padding-bottom: 2px; white-space:nowrap;">' + 
										       timeFromToString +
										       '</p>';
										tip += '<table style="font-size: 11;">';
										if(item.series._title) {
											var color = '#FFFFFF';
											if(item.series && item.series._style && item.series._style.fillStyle) {
												color = lightColor(item.series._style.fillStyle, 1, 0.7);
											}
											tip += '<tr>';
											tip += '<td style="color: ' + color + '; white-space:nowrap;">';
											tip += '<b><i>' + item.series._title + '</i></b>';
										}
										var value = item.series._scope.renderChartValue(
												storeItem.get(yField) / (item.series._multipleFactorAxis || 1),
												item.series._varName, 'tip');
										tip += '<td style="text-align: right; padding-left: 20px; white-space:nowrap;">' +
										       '<b>' + value + '</b>';
									}
								}
								if(tip && tip.length) {
									if(tip && tip.length) {
										tip += '</table>';
									}
									if(chartConfig) {
										if(!chartConfig.disableClickHereForAnalyze && 
										   Ext.isArray(item.series._yField)) {
											var intervalSeries = false;
											for(var i = 0; i < chartConfig.series.length; i++) {
												if(chartConfig.series[i].varName.match(/^sm_.*_intervals$/)) {
													intervalSeries = true;
												}
											}
											if(intervalSeries) {
												tip += '<p style="font-weight: normal; color: chocolate; margin: 0; padding-left: 3px; padding-top: 2px; white-space:nowrap;">' + 
												       '<i>' + 'click for analyze top IP adresses' + '</i>' + 
												       '</p>';
											}
										}
									}
									window.chartsTipCount = window.chartsTipCount ? window.chartsTipCount + 1 : 1;
									Ext.defer(function() {
											if(window.chartsTipCount > 0) {
												--window.chartsTipCount;
											}
										}, 100, this);
									if(window.chartsTipCount == 1) {
										var size = getSizeHtml(tip);
										tooltip.setWidth(size[0] + 10);
										tooltip.setHeight(size[1] + 5);
										tooltip.setTitle(tip);
									}
								} else {
									tooltip.setTitle(null);
								}
							}
						},
						_scope: this,
						_varName: chartConfig.series[i].varName
					};
					if(type != 'area') {
						Ext.apply(seriesItem, {
							smooth: chartConfig.series[i].smooth, // && this.isGapLess(chartData.axis, chartConfig.series[i] /* not needed for fixed smoth in charts_overrides */
							fill: chartConfig.series[i].fill,
							style: style
							/* OBSOLETE FOR EXTJS-6
							renderer: function(sprite, config, renderData, index) {
								if(Ext.isDefined(this._style._seriesColor)) {
									var color = this._style._seriesColor.light;
									sprite.setAttributes({
										fill: color, 
										stroke: color
									});
									return({
										fillStyle: color,
										strokeStyle: color
									});
								}
							}
							*/
						});
						if(markerCfg) {
							seriesItem.marker = markerCfg;
						}
						if(highlightCfg) {
							seriesItem.highlight = true;
							seriesItem.highlightCfg = highlightCfg;
						}
					} else {
						Ext.apply(seriesItem, {
							style: {
								minGapWidth: 1
							}
						});
						if(chartData.multiSeriesColors &&
						  chartData.multiSeriesColors[chartConfig.series[i].varName2]) {
							var multiseriesColors = cloneObject(chartData.multiSeriesColors[chartConfig.series[i].varName2]);
							var legendColors = cloneObject(chartData.multiSeriesColors[chartConfig.series[i].varName2]);
							if(chartConfig.series.length > 1) {
								for(var indexColor in multiseriesColors) {
									 multiseriesColors[indexColor] = lightColor(multiseriesColors[indexColor], 1.5, 1.5);
								}
								for(var indexColor in legendColors) {
									 legendColors[indexColor] = lightColor(legendColors[indexColor], 1.5, 1.5);
								}
							}
							var lineColors = [];
							for(var indexColor in multiseriesColors) {
								 lineColors.push(multiseriesColors[indexColor]);
							}
							Ext.apply(seriesItem, {
								_multiSeriesColors: multiseriesColors,
								_legendColors: legendColors,
								colors: lineColors
								/* OBSOLETE FOR EXTJS-6
								renderer: function(sprite, config, renderData, index) {
									var yFieldIndex = this._yField.indexOf(sprite._field);
									var color = this._multiSeriesColors[this._title[yFieldIndex]];
									sprite.setAttributes({
										fill: color, 
										stroke: color
									});
									return({
										fillStyle: color,
										strokeStyle: color
									});
								},
								getLegendColor: function(index) {
									return(this._legendColors[this._title[index % this._title.length]]);
								}
								*/
							});
						} else if(chartConfig.series[0].chartType == 'TCH_sipResponse_base' &&
							  chartConfig.series[0].multiSeriesIntervals) {
							var multiseriesColors = cloneObject(chartConfig.series[0].multiSeriesIntervals);
							var legendColors = cloneObject(chartConfig.series[0].multiSeriesIntervals);
							var lineColors = [];
							for(var i = 0; i < seriesItem.title.length; i++) {
								 lineColors.push(getMultiSeriesFixColorForTitle(multiseriesColors, seriesItem.title[i]));
							}
							Ext.apply(seriesItem, {
								_multiSeriesColors: multiseriesColors,
								_legendColors: legendColors,
								_multiSeriesIntervalsFix: true,
								colors: lineColors
								/* OBSOLETE FOR EXTJS-6
								renderer: function(sprite, config, renderData, index) {
									var yFieldIndex = this._yField.indexOf(sprite._field);
									var color = getMultiSeriesFixColorForTitle(this._multiSeriesColors, this._title[yFieldIndex]);
									sprite.setAttributes({
										fill: color, 
										stroke: color
									});
									return({
										fillStyle: color,
										strokeStyle: color
									});
								},
								getLegendColor: function(index) {
									return(getMultiSeriesFixColorForTitle(this._legendColors, this._title[index % this._title.length]));
								}
								*/
							});
						} else if(Ext.chart.theme[chartConfig.theme]) {
							var themeColors = Ext.create('Ext.chart.theme.' + chartConfig.theme, {}).getColors();
							var legendColors = {};
							for(var indexTitleSeries = 0; indexTitleSeries < seriesItem.title.length; indexTitleSeries++) {
								legendColors[seriesItem.title[indexTitleSeries]] = themeColors[indexTitleSeries % themeColors.length];
							}
							var lineColors = [];
							for(var indexThemeColor = 0; indexThemeColor < themeColors.length; indexThemeColor++) {
								lineColors.push(themeColors[indexThemeColor]);
							}
							Ext.apply(seriesItem, {
								_legendColors: legendColors,
								colors: lineColors
							});
						}
						if(seriesItem.type == 'bar') {
							Ext.apply(seriesItem, {
								highlight: true,
								highlightCfg: {
									lineWidth: 2,
									opacity: 0.5
								}
							});
						} else if(seriesItem.type == 'area') {
							if(!seriesItem.marker) {
								seriesItem.marker = {
									opacity: 0
								};
							}
							Ext.apply(seriesItem, {
								highlight: true,
								highlightCfg: {
									type: 'circle',
									radius: 5,
									lineWidth: 2,
									opacity: 1
								}
							});
						}
					}
					Ext.apply(seriesItem, {
						listeners: {
							scope: this,
							itemmouseover: function(series, item, event) {
								series._chart.setHighlightSeries(series);
								if(series._chart.isEnableEvClick(series, item, event)) {
									this.setStyle('cursor', 'pointer');
								}
							},
							itemmouseout: function(series, item, event) {
								series._chart.setHighlightSeries(null);
								this.setStyle('cursor', 'auto');
							}
						}
					});
					if(Ext.isArray(seriesItem.yField)) {
						seriesItem.listeners.itemclick = function(series, item, event) {
							series._chart.evClick(series, item, event);
						}
					}
					series.push(seriesItem);
				}
			}
			return(series);
			
			function applyTimeOffset(dateTime, timeOffset) {
				if(timeOffset.hours) {
					dateTime = decHour(dateTime, timeOffset.hours);
				}
				if(timeOffset.days) {
					dateTime = decDay(dateTime, timeOffset.days);
				}
				if(timeOffset.months) {
					dateTime = decMonth(dateTime, timeOffset.months);
				}
				return(dateTime);
			}
		}
		function createChart_series_combinationToArea(chartConfig, chartData, chartStore, config) {
			var yFields = [];
			var titles = [];
			for(var i = 0; i < chartConfig.series.length; i++) {
				var yField = getFieldsAxes(chartConfig.series[i]);
				yFields = yFields.concat(yField);
				titles.push(chartConfig.series[i].filter && chartConfig.series[i].filter.series_title ?
					     chartConfig.series[i].filter.series_title :
					     yField[0]);
			}
			var useStackedArea = chartData.axis.length > 80;
			var series = {
				title: titles,
				type: useStackedArea ? 'area' : 'bar',
				stacked: true,
				yField: yFields,
				xField: 'x',
				axis: 'left',
				highlight: useStackedArea,
				tips: {
					trackMouse: true,
					width: 150, height: 34,
					renderer: function(tooltip, storeItem, item) {
						var yField = null;
						var title = null;
						if(Ext.isArray(item.series._yField)) {
							var indexField = item.series._yField.indexOf(item.yField || item.storeField);
							if(indexField>=0) {
								yField = item.series._yField[indexField];
								var series = item.series._scope.store.chartConfig.series;
								for(var i = 0; i < series.length; i++) {
									if(yField == getFieldsAxes(series[i])[0]) {
										title = series[i].filter && series[i].filter.series_title ?
											 series[i].filter.series_title :
											 yField;
										break;
									}
								}
							}
						}
						if(yField) {
							tipTitle = '';
							if(title) {
								tipTitle = '<b><i>' + title + '</i></b><br>';
							}
							tipTitle += item.series._scope.renderChartValue(
									storeItem.get(yField),
									item.series._varName, 'tip');
							this.setTitle(tipTitle);
						}
					}
				},
				_scope: this,
				_varName: chartConfig.series[0].varName
			}
			return([series]);
		}
		function createChart_timeAxis(chartConfig, chartData, chartStore) {
			var me = this;
			var axisConfig = {
				position: 'bottom',
				fields: 'x',
				grid: true,
				gridColor: '#E0E0E0',
				renderer: function(axis, label, layoutContext, lastLabel) {
					return chartConfig.timeAxis ?
						Ext.Date.format(Ext.isDate(label) ? label : new Date(label), 
								arCdrChart_timeAxisTypes[chartConfig.timeAxis].format) :
						(Ext.isOpera ? ' ' : '');
				},
				label: {
					rotate: {
						degrees: -60
					}
				},
				title: this.getTitleTimeAxis(chartConfig, chartData),
				limits: [{
					value: -1
				}]
			};
			Ext.apply(axisConfig, {
				type: 'category',
				_typeTimeAxis: chartConfig.timeAxis,
				_maxTickSteps: function() {
					return(me.getWidth() ?
						Math.min(Math.max(Math.floor(me.getWidth() / 40), 4), 40) :
						20);
				}
			});
			return(axisConfig);
		}
		function getTitle(series) {
			var title = ''
			for(var i = 0; i < 2; i++) {
				var iPrimaryFirst = null;
				var iFirst= null;
				for(var j = 0; j < series.length && iPrimaryFirst === null; j++) {
					if(series[j].sideAxis == (i ? 'right' : 'left')) {
						if(iFirst === null) {
							iFirst = j;
						}
						if(series[j].primaryAxis) {
							iPrimaryFirst = j;
						}
					}
				}
				if(iPrimaryFirst === null) {
					iPrimaryFirst = iFirst;
				}
				if(iPrimaryFirst !== null) {
					title = title + (title ? ' / ' : '') +
						(series[iPrimaryFirst].titleBase || series[iPrimaryFirst].title);
				}
			}
			return(title);
		}
		function getMultiSeriesFixColorForTitle(colors, title) {
			var color = '#000000';
			for(var i = 0; i < colors.length; i++) {
				if(Ext.isString(colors[i][0]) && colors[i][0].match('/') ?
				    title == colors[i][0].split('/')[0] ||
				    title == colors[i][0].split('/')[1] :
				    title == colors[i][0]) {
					color = colors[i][1];
				}
			}
			return(color);
		}
	},
	renderChartValue_config: function(type) {
		var testPrefix = [ '', 'y_', 's_', 'y_s_' ];
		var testPostfix = [ '', '_all', '_max', '_avg', '_min', '_avg1', '_min1', '_perc95', '_perc99' ];
		var unit = null;
		var decAxes = 0;
		var decTip = 1;
		for(var i = 0; i < testPrefix.length; i++)
		for(var j = 0; j < testPostfix.length; j++) {
			if(type == testPrefix[i] + '%' + testPostfix[j]) {
				unit='%';
				decAxes=1;
				break;
			} else if(type == testPrefix[i] + 'delay' + testPostfix[j]) {
				unit=__unit_xPDV;
				decAxes=1;
				break;
			} else if(type == testPrefix[i] + 'acd' + testPostfix[j]) {
				unit='s';
				break;
			} else if(type == testPrefix[i] + 'pdd' + testPostfix[j]) {
				unit='s';
				decAxes=1;
				break;
			} else if(type == testPrefix[i] + 'asr' + testPostfix[j]) {
				unit='%';
				break;
			} else if(type == testPrefix[i] + 'ner' + testPostfix[j]) {
				unit='%';
				break;
			} else if(type == testPrefix[i] + 'packet_lost' + testPostfix[j]) {
				unit='%';
				decAxes=3;
				decTip=3;
				break;
			} else if(type == testPrefix[i] + 'rtcp_avgfr' + testPostfix[j] ||
				  type == testPrefix[i] + 'rtcp_maxfr' + testPostfix[j]) {
				unit='%';
				decAxes=1;
				decTip=1;
				break;
			} else if(type == testPrefix[i] + 'silence_end_caller' + testPostfix[j] ||
				  type == testPrefix[i] + 'silence_end_called' + testPostfix[j]) {
				unit='s';
				decAxes=0;
				decTip=0;
				break;
			} else if(type == testPrefix[i] + 'silence_caller' + testPostfix[j] ||
				  type == testPrefix[i] + 'silence_called' + testPostfix[j]) {
				unit='%';
				decAxes=0;
				decTip=0;
				break;
			} else if(type == testPrefix[i] + 'clipping' + testPostfix[j] ||
				  type == testPrefix[i] + 'clipping_caller' + testPostfix[j] ||
				  type == testPrefix[i] + 'clipping_called' + testPostfix[j]) {
				decAxes=0;
				decTip=0;
				break;
			}
		}
		return({
			unit: unit,
			decAxes: decAxes,
			decTip: decTip
		});
	},
	renderChartValue: function(value, type, reason) {
		if(reason == 'axes' && value == 0) {
			return(Ext.isOpera ? ' ' : '');
		}
		var config = this.renderChartValue_config(type);
		if(reason == 'axes') {
			if(roundNumber(value, config.decAxes + (config.decAxes == 0 ? 2 : 1)) == roundNumber(value, config.decAxes)) {
				return(roundNumber(value, config.decAxes) + (config.unit ? ' ' + config.unit : ''));
			} else {
				return(Ext.isOpera ? ' ' : '');
			}
		} else {
			return(roundNumber(value, config.decTip) + (config.unit ? ' ' + config.unit : ''));
		}
	},
	reloadChart: function(chartConfig, enableInvalidData) {
		var me = this;
		chartConfig = chartConfig || this.store.chartConfig;
		if(chartConfig && !chartConfig._typeChart) {
			chartConfig._typeChart = 'CDR';
		}
		var oldTimeAxis = chartConfig.timeAxis;
		applyFiltersFromParentToChartConfig(chartConfig);
		if(chartConfig.filtersFromParent) {
			adjustChartConfigTimeAxisForFiltersFromParent(chartConfig);
		}
		if(chartConfig.timeAxis != oldTimeAxis) {
			this._chartPanel.loadChart(chartConfig);
			return;
		}
		var oldMultiseriesItems1 = this.store.chartData && this.store.chartData.multiSeriesItems &&
					   this.store.chartData.multiSeriesItems.s_1 ?
					    this.store.chartData.multiSeriesItems.s_1 :
					    null;
		this.store.loadChartData({
				onLoad: function(result, store) {
					if(result == 'olddata') {
						Ext.Msg.alert(findLangS('charts', 'text', 'msgInvalidNewQuery'), 
							      chartConfig._typeChart == 'CDR' ? findLangS('charts', 'text', 'msgInvalidNewQueryDescr') :
							      chartConfig._typeChart == 'MESSAGES' ? findLangS('charts', 'text', 'msgInvalidNewQueryDescr_messages') : 
							      chartConfig._typeChart == 'SIP_MSG' ? findLangS('charts', 'text', 'msgInvalidNewQueryDescr_sip_msg') : 
												    findLangS('charts', 'text', 'msgInvalidNewQueryDescr_records'));
					}
					if(me.getEl()) {
						var newMultiseriesItems1 = store.chartData && store.chartData.multiSeriesItems &&
									   store.chartData.multiSeriesItems.s_1 ?
									    store.chartData.multiSeriesItems.s_1 :
									    null;
						var diffMultiseriesItems1 = false;
						if(oldMultiseriesItems1 || newMultiseriesItems1) {
							if(!oldMultiseriesItems1 != !newMultiseriesItems1 ||
							   oldMultiseriesItems1.length != newMultiseriesItems1.length) {
								diffMultiseriesItems1 = true;
							} else {
								for(var i = 0; i < oldMultiseriesItems1.length; i++) {
									if(oldMultiseriesItems1[i] != newMultiseriesItems1[i]) {
										diffMultiseriesItems1 = true;
									}
								}
							}
						}
						if(diffMultiseriesItems1 && me._chartPanel) {
							me._chartPanel.clearChart();
							me._chartPanel.createChart(chartConfig, store);
						} else {
							me.adjustMultipleFactorSecondaryAxis(store.chartConfig, store.chartData, store);
							me.updateTitleTimeAxis(chartConfig, store.chartData);
							me.updateAxisLimits(chartConfig, store.chartData);
						}
						if(me._chartPanel) {
							me.updateLayout();
							me._chartPanel.onReloadChart();
						}
					}
				},
				onError: me._chartPanel && me._chartPanel.onError ? function(error) {
					me._chartPanel.onError(error);
				} : undefined,
				onFailure: me._chartPanel && me._chartPanel.onFailure ? function(error) {
					me._chartPanel.onFailure(error);
				} : undefined,
				chartConfig: chartConfig,
				chart: this,
				maskCmp: this._chartPanel && this._chartPanel._disableMaskOnReload ? undefined : this._chartPanel
			},
			enableInvalidData);
	},
	timeShift: function(next) {
		var chartConfig = cloneChartConfig(this.store.chartConfig);
		if(!chartConfig.dateFrom) {
			chartConfig.dateFrom = dateTime();
		}
		if(!chartConfig.dateTo) {
			chartConfig.dateTo = date(dateTime().getTime() / 1000 + 24 * 3600);
		}
		var shift = (chartConfig.dateTo.getTime() - chartConfig.dateFrom.getTime()) / 1000 / 2 *
				(next ? 1 : -1);
		chartConfig.dateFrom = new Date(chartConfig.dateFrom.getTime() + shift*1000);
		chartConfig.dateTo = new Date(chartConfig.dateTo.getTime() + shift*1000);
		this.reloadChart(chartConfig);
	},
	serializeNode: function(node) {
		var result = '';
		if(node.nodeType === document.TEXT_NODE) {
			return(htmlEncode(node.nodeValue));
		}
		result += '<' + node.nodeName;
		if(node.attributes.length) {
			for (var i = 0; i < node.attributes.length; i++) {
				result += ' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"';
			}
		}
		if(node.childNodes && node.childNodes.length) {
			result += '>';
			for (var i = 0; i < node.childNodes.length; i++) {
				result += this.serializeNode(node.childNodes[i]);
			}
			result += '</' + node.nodeName + '>';
		} else {
			result += '/>';
		}
		return result;
	},
	getSvg: function() {
		if(this.engine != Ext.draw.engine.Svg) {
			return(undefined);
		}
		var size = this.innerElement.getSize(),
		    surfaces = Array.prototype.slice.call(this.items.items),
		    zIndexes = this.surfaceZIndexes,
		    i, j, surface, zIndex;
		for(j = 1; j < surfaces.length; j++) {
			if(Ext.getClassName(surfaces[j]) != 'Ext.draw.engine.Svg') {
				continue;
			}
			surface = surfaces[j];
			zIndex = zIndexes[surface.type];
			i = j - 1;
			while(i >= 0 && zIndexes[surfaces[i].type] > zIndex) {
				surfaces[i + 1] = surfaces[i];
				i--;
			}
			surfaces[i + 1] = surface;
		}
		var svg = '<?xml version="1.0" standalone="yes"?>' + 
			  '<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"' + ' width="' + size.width + '"' + ' height="' + size.height + '">';
		for(i = 0; i < surfaces.length; i++) {
			surface = surfaces[i];
			rect = surface.getRect();
			svg += '<g transform="translate(' + rect[0] + ',' + rect[1] + ')">';
			svg += surface.svgElement.dom.innerHTML || this.serializeNode(surface.svgElement.dom);
			svg += '</g>';
		}
		svg += '</svg>';
		return(svg);
	},
	saveChart: function(saveType) {
		ajaxSafeRequest({
			url: 'php/reports/charts.php',
			params: {
				task: 'testSaveChart',
				params: Ext.encode({
					chartConfigData: this.store.chartConfig,
					svg: Ext.isDefined(saveType) && saveType == 'pdf_page' ? undefined : this.getSvg(),
					saveType: Ext.isDefined(saveType) ? 
						   (saveType == 'pdf_page' ? 'pdf' : saveType) : 
						   this._saveType
				})
			},
			success: function(result) {
				this.doSaveChart(saveType);
			},
			scope: this,
			maskEl: this
		});
	},
	doSaveChart: function(saveType) {
		formPostSafe(
			'php/reports/charts.php', 
			'POST', 
			{
				task: 'saveChart',
				params: Ext.encode({
					chartConfigData: this.store.chartConfig,
					svg: Ext.isDefined(saveType) && saveType == 'pdf_page' ? undefined : this.getSvg(),
					saveType: Ext.isDefined(saveType) ? 
						   (saveType == 'pdf_page' ? 'pdf' : saveType) : 
						   this._saveType
				})
			});
	},
	newTrackerTicket: function(ajaxParams) {
		if(!ajaxParams) {
			ajaxSafeRequest({
				scope: this,
				url: 'php/model/utilities.php',
				params: {
					task: 'checkFillCbTracker'
				},
				success: function(result) {
					this.newTrackerTicket(result);
				}
			});
			return;
		}
		var svg = this.getSvg();
		Tracker.Utils.createNewTicketFormWindow(ajaxParams, {
				chart: {
					svg: svg
				}
			},
			this);
	},
	updateTitleTimeAxis: function(chartConfig, chartData) {
		var timeAxis = this.getTimeAxis();
		if(timeAxis) {
			timeAxis.setTitle(this.getTitleTimeAxis(chartConfig, chartData));
		}
	},
	getTitleTimeAxis: function(chartConfig, chartData) {
		if(chartConfig._disableLegendTimeAxis) {
			return(null);
		}
		chartConfig = chartConfig || this.store.chartConfig;
		var title = '';
		if((chartConfig.dateFrom && chartConfig.dateFrom.getTime) ||
		   (chartConfig.dateTo && chartConfig.dateTo.getTime)) {
			var dateFrom = chartConfig.dateFrom && chartConfig.dateFrom.getTime ? chartConfig.dateFrom : null;
			var dateTo = chartConfig.dateTo && chartConfig.dateTo.getTime ? chartConfig.dateTo : null;
			var timeLineIndication_autoTimeOffsetM = 
				chartConfig && chartConfig._titleTimeAxis_autoOffset && chartData ?
				 chartData.timeOffsetClientToClientOs :
				 0;
			if(timeLineIndication_autoTimeOffsetM) {
				if(dateFrom) {
					dateFrom = new Date(dateFrom.getTime() + timeLineIndication_autoTimeOffsetM * 60*1000);
				}
				if(dateTo) {
					dateTo = new Date(dateTo.getTime() + timeLineIndication_autoTimeOffsetM * 60*1000);
				}
			}
			title = (dateFrom && dateTo &&
				 (dateFrom.getTime() == dateTo.getTime() ||
				  (dateFrom.timeDefined && dateTo.timeDefined &&
				   !time_sec(dateFrom) && !time_sec(dateTo) &&
				   date(dateFrom).getTime() == date_prev(dateTo).getTime()))) ?
					Ext.Date.format(dateFrom, 
							!time_sec(dateFrom) ? 'Y-m-d' : 
							!(time_sec(dateFrom) % 60) ? 'Y-m-d H:i' : 'Y-m-d H:i:s') :
					((dateFrom ?
					       'from ' +
					       Ext.Date.format(dateFrom,
							       !time_sec(dateFrom) ? 'Y-m-d' : 
							       !(time_sec(dateFrom) % 60) ? 'Y-m-d H:i' : 'Y-m-d H:i:s') :
					       '') +
					 (dateFrom && dateTo ? ' ' : '') +
					 (dateTo ?
					       'to ' +
					       Ext.Date.format(!time_sec(dateTo) && dateTo.timeDefined ?
								date_prev(dateTo) :
								dateTo,
							       !time_sec(dateTo) ? 'Y-m-d' :
							       (date(dateFrom).getTime() == date(dateTo).getTime() ?
								 (!(time_sec(dateTo) % 60) ? 'H:i' : 'H:i:s') :
								 (!(time_sec(dateTo) % 60) ? 'Y-m-d H:i' : 'Y-m-d H:i:s'))) :
					       ''));
		}
		if(title) {
		       title += ' / ';
		}
		title += arLang['LtimeAxis_' + (chartData.timeAxisForce ? chartData.timeAxisForce : chartConfig.timeAxis)];
		return(title);
	},
	updateAxisLimits: function(chartConfig, chartData) {
		for(var i = 0; i < 2; i++) {
			var position = i == 0 ? 'left' : 'right';
			var axis = null;
			for(var j = 0; j < this.axes.length; j++) {
				if(this.axes[j]._position == position) {
					axis = this.axes[j];
					break;
				}
			}
			if(axis) {
				var oldLimits = Ext.Array.from(axis.getLimits());
				var newLimits = this.getAxisLimits(chartConfig, chartData, i == 0 ? 'left' : 'right', axis) || [];
				while(newLimits.length < oldLimits.length) {
					newLimits.push({});
				}
				if(newLimits.length) {
					axis.setLimits(newLimits);
					if(axis.limits) {
						axis.renderLimits();
					}
					this.updateLayout();
				}
			}
		}
	},
	getAxisLimits: function(chartConfig, chartData, position, axis) {
		var limits = null;
		var limitLineValue = chartConfig[position + 'LimitLineValue'];
		var limitLineColor = chartConfig[position + 'LimitLineColor'];
		if(limitLineValue && limitLineColor) {
			if(!limits) {
				limits = [];
			}
			limits.push({
				value: limitLineValue,
				line: {
					strokeStyle: limitLineColor,
					lineDash: [6, 3],
					title: {
						text: limitLineValue,
						fontSize: 11
					}
				}
			});
		}
		if(chartConfig[position + 'PercTrend'] &&
		   (chartConfig[position + 'Perc95_Color'] || chartConfig[position + 'Perc99_Color'])) {
			for(var i = 0; i < 2; i++) {
				var perc = i == 0 ? 95 : 99;
				var trend = chartConfig[position + 'PercTrend'];
				var color = chartConfig[position + 'Perc' + perc + '_Color'];
				if(color) {
					var percValue = this.getPercSeries(perc, trend, chartData.axis, chartConfig.series[axis._iPrimaryFirst], chartData.multiSeriesItems, true);
					if(percValue) {
						if(!limits) {
							limits = [];
						}
						limits.push({
							value: percValue,
							line: {
								strokeStyle: color,
								lineDash: [2, 2],
								title: {
									text: 'perc ' + perc,
									fontSize: 11
								}
							}
						});
					}
				}
			}
		}
		return(limits);
	},
	needTimeLineIndicationUpdateLayout: function() {
		this._needTimeLineIndicationUpdateLayout_flag = 3;
	},
	setTimeLineIndication: function(time) {
		var enableTimeLineIndication = 
			this._chartPanel && 
			(this._chartPanel._enableTimeLineIndication || 
			 this._chartPanel.chartConfig && this._chartPanel.chartConfig._enableTimeLineIndication) ||
			this.store && this.store.chartConfig && this.store.chartConfig._enableTimeLineIndication;
		var timeLineIndication_timeOffsetH = 
			this._chartPanel && 
			(this._chartPanel._timeLineIndication_timeOffsetH || 
			 this._chartPanel.chartConfig && this._chartPanel.chartConfig._timeLineIndication_timeOffsetH) ||
			this.store && this.store.chartConfig && this.store.chartConfig._timeLineIndication_timeOffsetH;
		var timeLineIndication_autoTimeOffsetM = 
			this.store && this.store.chartConfig && this.store.chartConfig._timeLineIndication_autoOffset && this.store.chartData ?
			 this.store.chartData.timeOffsetClientToClientOs :
			 0;
		if(!enableTimeLineIndication) {
			return;
		}
		if(!Ext.isDefined(time)) {
			var time = (this.store && this.store._loadTime) || new Date;
			if(timeLineIndication_timeOffsetH) {
				time = new Date(time.getTime() + timeLineIndication_timeOffsetH * 60*60*1000);
			} else if(timeLineIndication_autoTimeOffsetM) {
				time = new Date(time.getTime() + timeLineIndication_autoTimeOffsetM * 60*1000);
			}
		}
		var timeIndex = this.getIndexStoreForTime(time);
		if(timeIndex < 0) {
			return;
		}
		var timeAxis = this.getTimeAxis();
		if(timeAxis) {
			timeAxis.setLimits({
				value: timeIndex,
				line: {
					strokeStyle: 'red',
					lineDash: [6, 3]
				}
			});
			if(this._needTimeLineIndicationUpdateLayout_flag > 0) {
				this.updateLayout();
				--this._needTimeLineIndicationUpdateLayout_flag;
			}
		}
	},
	getTimeAxis: function() {
		var axisX = null;
		for(var i = 0; i < this.axes.length; i++) {
			if(this.axes[i]._position == 'bottom') {
				axisX = this.axes[i];
			}
		}
		return(axisX);
	},
	getIndexStoreForTime: function(time) {
		var indexMinDiff = -1;
		if(this.store) {
			var minDiff = -1;
			for(var i = 0; i < this.store.getCount(); i++) {
				var data = this.store.getAt(i).data;
				var diff = Math.abs(time.getTime() - data.x);
				if(indexMinDiff < 0 ||
				   diff < minDiff) {
					minDiff = diff;
					indexMinDiff = i;
				}
			}
		}
		return(indexMinDiff);
	},
	redraw: function() {
		if(this._disableRedraw || this.store && this.store._disableRedraw) {
			return;
		}
		this.callParent();
		this.setTimeLineIndication();
	},
	adjustMultipleFactorSecondaryAxis: function(chartConfig, chartData, chartStore) {
		for(var i = 0; i < 2; i++) {
			var maxAxisValue = null;
			var multipleFactorPrimaryAxis = 1;
			for(var j = 0; j < chartConfig.series.length; j++) {
				if(chartConfig.series[j].sideAxis == (i ? 'right' : 'left') &&
				   chartConfig.series[j]._primary) {
					maxAxisValue = Math.max(maxAxisValue, this.getMaxSeries(chartData.axis, chartConfig.series[j], chartData.multiSeriesItems));
					this.applyMultipleFactorAxis(chartData.axis, chartConfig.series[j], chartData.multiSeriesItems, chartStore);
					if(chartConfig.series[j]._multipleFactorAxis) {
						multipleFactorPrimaryAxis = chartConfig.series[j]._multipleFactorAxis;
					}
				}
			}
			if(multipleFactorPrimaryAxis && multipleFactorPrimaryAxis != 1) {
				maxAxisValue *= multipleFactorPrimaryAxis;
			}
			for(var j = 0; j < chartConfig.series.length; j++) {
				if(chartConfig.series[j].sideAxis == (i ? 'right' : 'left') &&
				   !chartConfig.series[j]._primary) {
					var maxSecondaryValue = this.getMaxSeries(chartData.axis, chartConfig.series[j], chartData.multiSeriesItems);
					if(maxSecondaryValue) {
						chartConfig.series[j]._multipleFactorAxis = maxAxisValue / maxSecondaryValue;
						this.applyMultipleFactorAxis(chartData.axis, chartConfig.series[j], chartData.multiSeriesItems, chartStore);
					}
				}
			}
		}
	},
	getMaxSeries: function(axis, series, multiSeriesItems, sumMultiSeries) {
		var max = null;
		for(var i = 0; i < axis.length; i++) {
			var varName2  = series.varName2;
			if(series.multiSeries) {
				if(multiSeriesItems[varName2]) {
					if(sumMultiSeries) {
						var sum = 0;
						for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
							var varNameMS = varName2 + '_' + j;
							sum += axis[i].data && axis[i].data[varNameMS] || 0;
						}
						max = Math.max(max, sum);
					} else {
						for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
							var varNameMS = varName2 + '_' + j;
							max = Math.max(max, axis[i].data && axis[i].data[varNameMS] || 0);
						}
					}
				}
			} else {
				max = Math.max(max, axis[i].data && axis[i].data[varName2] || 0);
			}
		}
		return(max);
	},
	getPercSeries: function(perc, trend, axis, series, multiSeriesItems, sumMultiSeries) {
		var values = [];
		for(var i = 0; i < axis.length; i++) {
			var varName2  = series.varName2;
			if(series.multiSeries) {
				if(multiSeriesItems[varName2]) {
					if(sumMultiSeries) {
						var sum = null;
						for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
							var varNameMS = varName2 + '_' + j;
							if(axis[i].data && !Ext.isEmpty(axis[i].data[varNameMS])) {
								if(Ext.isEmpty(sum)) {
									sum = 0;
								}
								sum += axis[i].data && axis[i].data[varNameMS] || 0;
							}
						}
						if(!Ext.isEmpty(sum)) {
							values.push(sum);
						}
					} else {
						for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
							var varNameMS = varName2 + '_' + j;
							if(axis[i].data && !Ext.isEmpty(axis[i].data[varNameMS])) {
								values.push(axis[i].data && axis[i].data[varNameMS] || 0);
							}
						}
					}
				}
			} else {
				if(axis[i].data && !Ext.isEmpty(axis[i].data[varName2])) {
					values.push(axis[i].data && axis[i].data[varName2] || 0);
				}
			}
		}
		if(values.length) {
			var countZeroAtEnd = 0;
			for(var i = values.length - 1; i >= 0; i--) {
				if(!values[i]) {
					++countZeroAtEnd;
				} else {
					break;
				}
			}
			if(countZeroAtEnd < values.length) {
				if(countZeroAtEnd) {
					values.splice(values.length - countZeroAtEnd, countZeroAtEnd);
				}
				values.sort(function(a, b) { return(a - b); });
				var percIndex = Math.min(Math.round(values.length * perc / 100), values.length - 1);
				if(trend == 'desc') {
					percIndex = values.length - 1 - percIndex;
				}
				return(values[percIndex]);
			}
		}
		return(null);
	},
	applyMultipleFactorAxis: function(axis, series, multiSeriesItems, chartStore) {
		for(var i = 0; i < axis.length; i++) {
			if(chartStore.data.items[i] && axis[i].data) {
				var varName2  = series.varName2;
				if(series.multiSeries) {
					if(multiSeriesItems[varName2]) {
						for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
							var varNameMS = varName2 + '_' + j;
							var value = axis[i].data[varNameMS] || 0;
							chartStore.data.items[i].data['y_' + varNameMS] = value * (series._multipleFactorAxis || 1);
						}
					}
				} else {
					var value = axis[i].data[varName2] || 0;
					chartStore.data.items[i].data['y_' + varName2] = value * (series._multipleFactorAxis || 1);
				}
			}
		}
	},
	isGapLess: function(axis, series) {
		var zeroCounter = 0;
		for(var i = 0; i < axis.length; i++) {
			var zero = true;
			var varName2  = series.varName2;
			if(series.multiSeries) {
				if(multiSeriesItems[varName2]) {
					for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
						var varNameMS = varName2 + '_' + j;
						var value = axis[i].data && axis[i].data[varNameMS];
						if(value) {
							zero = false;
						}
					}
				}
			} else {
				var value = axis[i].data && axis[i].data[varName2];
				if(value) {
					zero = false;
				}
			}
			if(zero) {
				++zeroCounter;
			} else {
				zeroCounter = 0;
			}
			if(zeroCounter >= 2) {
				return(false);
			}
		}
		return(true);
	},
	isEnableEvClick: function(series, item, event) {
		if(!Ext.isArray(series._yField)) {
			return(false);
		}
		chartConfig = this.store.chartConfig;
		if(chartConfig.disableClickHereForAnalyze) {
			return(false);
		}
		for(var i = 0; i < this.store.chartConfig.series.length; i++) {
			if(this.store.chartConfig.series[i].varName.match(/^sm_.*_intervals$/)) {
				return(true);
			}
		}
	},
	evClick: function(series, item, event) {
		if(!Ext.isArray(series._yField)) {
			return;
		}
		chartConfig = this.store.chartConfig;
		if(chartConfig.disableClickHereForAnalyze) {
			return;
		}
		for(var i = 0; i < this.store.chartConfig.series.length; i++) {
			if(this.store.chartConfig.series[i].varName.match(/^sm_.*_intervals$/)) {
				this.evClick_interval(this.store.chartConfig.series[i].chartType,
						      series, item,
						      this.store.chartConfig.series[i]);
				return;
			}
		}
	},
	evClick_interval: function(type, series, item, seriesConfig) {
		debug_log(type);
		debug_log(series);
		debug_log(seriesConfig);
		debug_log(item);
		chartConfig = this.store.chartConfig;
		var timeAxis = chartConfig.timeAxis;
		var timeFrom = item.record.data.x;
		var timeTo = new Date(dateTime(item.record.data.x).getTime() + 
				      arCdrChart_timeAxisTypes[timeAxis].step * 1000);
		var filter = chartConfig.filters;
		debug_log(timeFrom);
		debug_log(timeTo);
		debug_log(timeAxis);
		ajaxSafeRequest({
			url: 'php/reports/charts.php',
			params: {
				task: 'intervalDetail',
				params: Ext.encode({
					type: type + (type.match(/_intervals$/) ? '' : '_intervals'),
					time_from: timeFrom,
					time_to: timeTo,
					filter: filter,
					multiSeriesIntervals: seriesConfig.multiSeriesIntervals || null
				})
			},
			success: function(result) {
				new CDR.Chart.IntervalDetail.Grid.Panel({
					type: type,
					timeFrom: timeFrom,
					timeTo: timeTo,
					data: {
						ip: result.ip,
						types: result.types,
						aliases: result.aliases,
						colors: result.colors
					},
					chart: this,
					showWindow: true
				});
			},
			error: function(result, response) {
				var error = getStringAjaxError(result);
				if(error == 'empty interval') {
					Ext.Msg.alert(findLangS('charts', 'text', 'emptyIntervalMsgHeader'), 
						      findLangS('charts', 'text', 'emptyIntervalMsgText'));
				} else {
					alertAjaxError(response);
				}
			},
			scope: this,
			maskEl: this.ownerCt
		});
	}
});


Ext.define('CDR.Chart.Store', {
	extend: 'Ext.data.ArrayStore',
	subsystem: 'charts',
	constructor: function(config) {
		config = config || {};
		config.fields = [ 'x' ];
		for(var i = 0; i < config.chartConfig.series.length; i++) {
			var series = config.chartConfig.series[i];
			var varName2  = series.varName2;
			if(series.multiSeries) {
				for(var j = 0; j < 50; j++) {
					config.fields.push('y_' + varName2 + '_' + j);
					if(series.percent) {
						config.fields.push('y_' + varName2 + '_' + j + '_perc');
					}
				}
			} else {
				config.fields.push('y_' + varName2);
			}
		}
		config.data = [];
		this.callParent([config]);
		this.chartConfig = cloneChartConfig(config.chartConfig);
		if(config.chartData) {
			this.setStoreData(config.chartData);
		}
	},
	loadChartData: function(configLoad, enableInvalidData) {
		var enableMask = false;
		var timestampId = (new Date).getTime();
		if(configLoad.maskCmp && configLoad.maskCmp.getEl() && configLoad.maskCmp.getEl().mask) {
			beginLoadMaskWithStopButton_ajax(configLoad.maskCmp, 'loadChartData_loadMask' + '_' + configLoad.maskCmp.id);
			timestampId = configLoad.maskCmp._loadMask_timestampId;
			enableMask = true;
		}
		var chartConfig = configLoad.chartConfig || this.chartConfig;
		this._disableRedraw = true;
		var request = ajaxSafeRequest({
			scope: this,
			url: configLoad && configLoad.url || 'php/reports/charts.php',
			params: {
				task: chartConfig._typeChart == 'CDR' ? 'getCdrChart' :
				      chartConfig._typeChart == 'MESSAGES' ? 'getMessagesChart' : 
				      chartConfig._typeChart == 'SIP_MSG' ? 'getSipMsgChart' : null,
				params: Ext.encode(chartConfig)
			},
			success: function(responseData) {
				if(responseData.axis) {
					if(!chartConfig.timeAxis) {
						chartConfig.timeAxis = responseData.timeAxis;
					}
					var chartData = {
						axis: responseData.axis,
						timeAxisForce: responseData.timeAxisForce,
						multiSeriesItems: responseData.multiSeriesItems,
						multiSeriesColors: responseData.multiSeriesColors,
						timeOffsetClientToClientOs: responseData.timeOffsetClientToClientOs
					};
					if(this.setStoreData(chartData, chartConfig, enableInvalidData)) {
						this._loadTime = new Date;
						if(!responseData.binaryCalc && window.debug) {
							Ext.Msg.alert(findLangS('charts', 'text', 'msgPhpCalcWarningMsgHeader'), 
								      findLangS('charts', 'text', 'msgPhpCalcWarningMsgText'));
							window.warningChartPhpCalc = true;
						}
						this.chartData = chartData;
						this.chartConfig = cloneChartConfig(chartConfig);
						this.fields = [ 'x' ];
						for(var i = 0; i < chartConfig.series.length; i++) {
							this.fields.push('y_' + chartConfig.series[i].varName2);
						}
					}
				} else if(this.validData) {
					if(enableInvalidData) {
						this.validData = false;
					} else {
						this.useOldData = true;
					}
				}
				this.useCache = responseData.useCache;
				this.existsCache = responseData.existsCache;
				this._disableRedraw = false;
				if(configLoad.onLoad) {
					configLoad.onLoad.call(
						configLoad.scope,
						this.validData ? (this.useOldData ? 'olddata' : true) :
								 false,
						this);
				}
				if(enableInvalidData && !this.validData) {
					this.removeAll();
				}
				if(enableMask) {
					endLoadMaskWithStopButton_ajax(configLoad.maskCmp);
				}
			},
			error: configLoad.onError ? function(result, response) {
				this._disableRedraw = false;
				configLoad.onError.call(
					configLoad.scope,
					getStringAjaxError(result),
					result, response);
			} : undefined,
			failure: configLoad.onFailure ? function(response) {
				this._disableRedraw = false;
				configLoad.onFailure.call(
					configLoad.scope,
					getStringAjaxFailure(response),
					response);
			} : undefined,
			errorFailure2: function() {
				if(enableMask) {
					endLoadMaskWithStopButton_ajax(configLoad.maskCmp);
				}
				this.removeAll();
			},
			timeout: 60*60*1000,
			timestampId: timestampId
		});
		if(enableMask) {
			startLoadMaskWithStopButton_ajax(configLoad.maskCmp, request);
			if(this.chartConfig && this.chartConfig.startSecTimeMask) {
				configLoad.maskCmp._loadMask.secTime = this.chartConfig.startSecTimeMask;
			}
		}
		return(request);
	},
	setStoreData: function(chartData, chartConfig, enableInvalidData) {
		var oldDataIsValid = this.validData;
		this.validData = false;
		this.useOldData = false;
		this._setStoreData(chartData, chartConfig, enableInvalidData);
		if(this.validData) {
			return(true);
		} else if(!enableInvalidData && oldDataIsValid) {
			this._setStoreData(this.chartData, chartConfig);
			this.useOldData = true;
		}
		return(false);
	},
	_setStoreData: function(chartData, chartConfig, enableInvalidData) {
		this.removeAll();
		for(var i = 0; i < chartData.axis.length; i++) {
			var dataItem = this.setStoreDataItem(chartData.axis[i], chartData.multiSeriesItems, chartConfig);
			this.add(dataItem);
			if(dataItem._valid) {
				this.validData = true
			}
		}
		if(!this.validData && !enableInvalidData) {
			this.removeAll();
		}
	},
	setStoreDataItem: function(dataItem, multiSeriesItems, chartConfig) {
		var storeItem = {
			x: dateTimeStringToDate(dataItem.timeFromStr)
		};
		for(var i = 0; i < chartConfig.series.length; i++) {
			var varName2 = chartConfig.series[i].varName2;
			if(chartConfig.series[i].multiSeries) {
				if(multiSeriesItems[varName2]) {
					for(var j = 0; j < multiSeriesItems[varName2].length; j++) {
						var varNameMS = varName2 + '_' + j;
						var value = dataItem.data && dataItem.data[varNameMS];
						storeItem['y_' + varNameMS] =  value || 0;
						if(chartConfig.series[i].percent) {
							var varNameMS_perc = varName2 + '_' + j + '_perc';
							var value = dataItem.data && dataItem.data[varNameMS_perc];
							storeItem['y_' + varNameMS_perc] =  value || 0;
						}
						if(!storeItem._valid && value) {
							storeItem._valid = true;
						}
					}
				}
			} else {
				var value = dataItem.data && dataItem.data[varName2];
				storeItem['y_' + varName2] =  value || 0;
				if(!storeItem._valid && value) {
					storeItem._valid = true;
				}
			}
		}
		return(storeItem);
	}
});


Ext.define('CDR.Chart.IntervalDetail.Grid.Panel', {
	extend: 'Ext.Panel',
	constructor: function(config) {
		Ext.applyIf(config, {
			sortByColumn: 'sum'
		});
		if(config.type && config.type.match && config.type.match(/_intervals$/)) {
			config.type = config.type.substr(0, config.type.length - 10);
		}
		this.filterFields = {
			TCH_mos: {
				src_lt: 'fmos_min_lt',
				src_ge: 'fmos_min_ge',
				dst_lt: 'fmos_min_lt_called',
				dst_ge: 'fmos_min_ge_called',
				both_lt: 'fmos_min_lt',
				both_ge: 'fmos_min_ge',
				src_select: 'fmos_min_callerd_type',
				dst_select: 'fmos_min_callerd_type',
				set_chart_field: 'fmos_min_chart_field'
			},
			TCH_mos_xr_avg: {
				src_lt: 'fmos_xr_avg_lt',
				src_ge: 'fmos_xr_avg_ge',
				dst_lt: 'fmos_xr_avg_lt_called',
				dst_ge: 'fmos_xr_avg_ge_called',
				both_lt: 'fmos_xr_avg_lt',
				both_ge: 'fmos_xr_avg_ge',
				src_select: 'fmos_xr_avg_callerd_type',
				dst_select: 'fmos_xr_avg_callerd_type'
			},
			TCH_mos_xr_min: {
				src_lt: 'fmos_xr_min_lt',
				src_ge: 'fmos_xr_min_ge',
				dst_lt: 'fmos_xr_min_lt_called',
				dst_ge: 'fmos_xr_min_ge_called',
				both_lt: 'fmos_xr_min_lt',
				both_ge: 'fmos_xr_min_ge',
				src_select: 'fmos_xr_min_callerd_type',
				dst_select: 'fmos_xr_min_callerd_type'
			},
			TCH_mos_silence_avg: {
				src_lt: 'fmos_silence_avg_lt',
				src_ge: 'fmos_silence_avg_ge',
				dst_lt: 'fmos_silence_avg_lt_called',
				dst_ge: 'fmos_silence_avg_ge_called',
				both_lt: 'fmos_silence_avg_lt',
				both_ge: 'fmos_silence_avg_ge',
				src_select: 'fmos_silence_avg_callerd_type',
				dst_select: 'fmos_silence_avg_callerd_type'
			},
			TCH_mos_silence_min: {
				src_lt: 'fmos_silence_min_lt',
				src_ge: 'fmos_silence_min_ge',
				dst_lt: 'fmos_silence_min_lt_called',
				dst_ge: 'fmos_silence_min_ge_called',
				both_lt: 'fmos_silence_min_lt',
				both_ge: 'fmos_silence_min_ge',
				src_select: 'fmos_silence_min_callerd_type',
				dst_select: 'fmos_silence_min_callerd_type'
			},
			TCH_packet_lost: {
				src_lt: 'fpacket_loss_perc_lt',
				src_ge: 'fpacket_loss_perc_ge',
				dst_lt: 'fpacket_loss_perc_lt_called',
				dst_ge: 'fpacket_loss_perc_ge_called',
				both_lt: 'fpacket_loss_perc_lt',
				both_ge: 'fpacket_loss_perc_ge',
				src_select: 'fpacket_loss_perc_callerd_type',
				dst_select: 'fpacket_loss_perc_callerd_type'
			}
		};
		var me = this;
		var storeFields = [
			{name: 'ip', type: 'string'}
		];
		for(var src_dst_i = 0; src_dst_i < 3; src_dst_i++) {
			var src_dst = src_dst_i == 0 ? '' : (src_dst_i == 1 ? 'src_' : 'dst_');
			for(var i = 0; i < config.data.aliases.length; i++) {
				storeFields.push({name: src_dst + config.data.aliases[i], type: 'number'});
			}
			storeFields.push({name: src_dst + 'sum', type: 'number'});
		}
		var storeData = [];
		for(var i = 0; i < config.data.ip.length; i++) {
			var dataItem = {
				ip: config.data.ip[i].ip
			}
			var exists = false;
			for(var j = 0; j < storeData.length; j++) {
				if(storeData[j].ip == dataItem.ip) {
					dataItem = storeData[j];
					exists = true;
				}
			}
			var valueIndex = config.data.types.indexOf(config.data.ip[i].value);
			if(valueIndex >= 0) {
				var dataValueColumn = (config.data.ip[i].src_dst == 'src' ? 'src_' : 'dst_') +
						    config.data.aliases[valueIndex];
				dataItem[dataValueColumn] = (dataItem[dataValueColumn] || 0) + config.data.ip[i].cnt*1;
			}
			if(!exists) {
				storeData.push(dataItem);
			}
		}
		var max_sum = 0;
		for(var i = 0; i < storeData.length; i++) {
			var sum = [ 0, 0, 0 ];
			for(var j = 0; j < config.data.aliases.length; j++) {
				storeData[i][config.data.aliases[j]] = (storeData[i]['src_' + config.data.aliases[j]] || 0) + 
								       (storeData[i]['dst_' + config.data.aliases[j]] || 0);
				sum[0] += (storeData[i]['src_' + config.data.aliases[j]] || 0) + 
					  (storeData[i]['dst_' + config.data.aliases[j]] || 0);
				sum[1] += storeData[i]['src_' + config.data.aliases[j]] || 0; 
				sum[2] += storeData[i]['dst_' + config.data.aliases[j]] || 0;
			}
			storeData[i].sum = sum[0];
			storeData[i].src_sum = sum[1];
			storeData[i].dst_sum = sum[2];
			if(sum[1] > max_sum) {
				max_sum = sum[1];
			}
			if(sum[2] > max_sum) {
				max_sum = sum[2];
			}
		}
		var store = new Ext.data.JsonStore({
			fields: storeFields,
			data: storeData,
			_max_sum: max_sum
		});
		store.sort([{
			property : config.sortByColumn,
			direction: 'DESC'
		},{
			property : 'ip',
			direction: 'ASC'
		}])
		var widthSrcDst = 230;
		var gridColumns = this.getGridColumns(config.sortByColumn, config.data, widthSrcDst);
		var grid = new Ext.grid.Panel({
			store: store,
			columns: {
				defaults: {
					sortable: false
				},
				items: gridColumns
			},
			viewConfig: {
				_panel: this,
				listeners: {
					scope: this,
					render: function(view) {
						view.tip = Ext.create('Ext.tip.ToolTip', {
							target: view.el,
							delegate: view.cellSelector,
							trackMouse: true,
							renderTo: Ext.getBody(),
							dismissDelay: 15000,
							floating: true,
							dynamicContent: true,
							listeners: {
								beforeshow: function updateTipBody(tip) {
									var record = view.getRecord(Ext.fly(tip.triggerElement).up('.x-grid-row'));
									var column = view.getHeaderByCell(tip.triggerElement);
									if(record && column && 
									   (column.dataIndex == 'src' || column.dataIndex == 'dst')) {
										var tipText = me.createTipText(record.data, column.dataIndex);
										if(tipText) {
											tip.update(tipText);
											return;
										}
									}
									tip.update(null);
								}
							}
						});
					}
				}
			},
			border: false,
			style: __style_SubgridBorder()
		});
		var tbar = [];
		tbar.push({
			xtype: 'displayfield',
			value: 'sort by:',
			fieldCls: 'x-form-item-label',
			fieldStyle: {
				paddingTop: 0,
				marginBottom: 2
			}
		},{
			text: '<b style="font-size: 110%;">∑</b> SUM',
			enableToggle: true,
			toggleHandler: toggleSortBy,
			_field: 'sum',
			pressed: config.sortByColumn == 'sum'
		});
		for(var i = 0; i < config.data.types.length; i++) {
			tbar.push({
				text: '<div style="float: left; width: 12; height: 12; background-color: ' + config.data.colors[config.data.types[i]] + '; margin-right: 5; margin-top: 1;"></div>' + 
					  config.data.types[i],
				enableToggle: true,
				toggleHandler: toggleSortBy,
				_field: config.data.aliases[i],
				pressed: config.sortByColumn == config.data.aliases[i]
			})
		}
		Ext.applyIf(config, {
			layout: 'fit',
			items: grid,
			tbar: tbar,
			border: false
		});
		this.callParent([config]);
		
		if(config.showWindow) {
			this.window = this.createWindow();
			this.window.show();
		}
		
		function toggleSortBy(btn) {
			if(me._disableToggleSortBy) {
				return;
			}
			var tbar = me.getTopToolbar();
			if(btn._field != 'sum') {
				var _btn = tbar.findC('_field', 'sum');
				if(_btn) {
					me._disableToggleSortBy = true;
					_btn.toggle(false);
					delete me._disableToggleSortBy;
				}
			}
			for(var i = 0; i < config.data.aliases.length; i++) {
				if(btn._field != config.data.aliases[i]) {
					var _btn = tbar.findC('_field', config.data.aliases[i]);
					if(_btn) {
						me._disableToggleSortBy = true;
						_btn.toggle(false);
						delete me._disableToggleSortBy;
					}
				}
			}
			if(!btn.pressed) {
				me._disableToggleSortBy = true;
				btn.toggle(true);
				delete me._disableToggleSortBy;
			}
			me.sortByColumn = btn._field;
			store.sort({
				property : me.sortByColumn,
				direction: 'DESC'
			},{
				property : 'ip',
				direction: 'ASC'
			});
			grid.reconfigure(store, me.getGridColumns(me.sortByColumn, me.data, widthSrcDst));
		}
	},
	getGridColumns: function(sortByColumn, data, widthSrcDst) {
		var me = this;
		var columns = [{
			xtype: 'actioncolumn',
			rendererBase: renderString,
			dataIndex: 'ip',
			text: 'IP',
			flex: 1,
			items: [{
				getClass: function(v,meta,rec) {
					return('icon_menu_cdr');
				},
				handler: function(grid, rowIndex, colIndex, column, event) {
					var rec = grid.store.getAt(rowIndex);
					var menu = this.createContextMenu(rec.data);
					menu.showAtMouse(event);
				},
				tooltip: 'select CDR records',
				scope: this
			}],
			iconDivStyle: 'float:left; height:15; width: 15;',
			baseContentDivStyle: 'padding-left: 20'
		},{
			dataIndex: sortByColumn,
			text: '# ' + (sortByColumn == 'sum' ? '∑' : data.types[data.aliases.indexOf(sortByColumn)]),
			width: __width_ColumnChar(17),
			align: 'right'
		},{
			dataIndex: 'dst',
			text: 'IN',
			renderer: function(value, cell, record, rowIndex, columnIndex, store, view) {
				return(view._panel.renderValueBar(record.data, 2, widthSrcDst - 10, store));
			},
			width: widthSrcDst
		},{
			dataIndex: 'src',
			text: 'OUT',
			renderer: function(value, cell, record, rowIndex, columnIndex, store, view) {
				return(view._panel.renderValueBar(record.data, 1, widthSrcDst - 10, store));
			},
			width: widthSrcDst
		}];
		for(var i = 0; i < columns.length; i++) {
			if(!columns[i].text) {
				columns[i].text = gridColumns[i].dataIndex;
			}
		}
		return(columns);
	},
	renderValueBar: function(data, src_dst, width, store) {
		if(Ext.isNumber(src_dst)) {
			src_dst = src_dst == 0 ? '' : (src_dst == 1 ? 'src_' : 'dst_');
		}
		if(src_dst[src_dst.length - 1] != '_') {
			src_dst += '_';
		}
		var sum = data[src_dst + 'sum'];
		var table = '<table><tr>';
		for(var i = 0; i < this.config.data.aliases.length; i++) {
			var dataIndex = src_dst + this.config.data.aliases[i];
			if(data[dataIndex]) {
				var dataWidth = width * data[dataIndex] / store._max_sum;
				if(dataWidth) {
					 table += '<td bgcolor="' + this.config.data.colors[this.config.data.types[i]] + '" style="height: 10px; width: ' + dataWidth+ 'px;">';
				}
			}
		}
		table += '</table>';
		return(table);
	},
	createTipText: function(data, src_dst) {
		if(Ext.isNumber(src_dst)) {
			src_dst = src_dst == 0 ? '' : (src_dst == 1 ? 'src_' : 'dst_');
		}
		if(src_dst[src_dst.length - 1] != '_') {
			src_dst += '_';
		}
		var tipText = '';
		for(var i = 0; i < this.config.data.aliases.length; i++) {
			var dataIndex = src_dst + this.config.data.aliases[i];
			if(data[dataIndex]) {
				if(!tipText) {
					tipText += '<table style="font-size: 11;">' + 
						   '<tr><td colspan="2" style="padding-bottom: 4px; width: 1px; white-space:nowrap;">' + 
						   '<b>IP: ' + data.ip + ' / ' + 
						   (src_dst == 'src_' ? 'OUT' : 'IN') + '</b>';
				}
				var color = this.config.data.colors[this.config.data.types[i]] || 'black';
				tipText += '<tr>';
				tipText += '<td style="color: ' + color + '; width: 1px; white-space:nowrap;">';
				tipText += '<b><i>' + this.config.data.types[i] + '</i></b>',
				tipText += '<td style="padding-left: 10px; width: 1px; white-space:nowrap;">';
				var value = data[dataIndex];
				tipText += '<b>' + value + '</b>';
			}
		}
		if(tipText && tipText.length) {
			tipText += '</table>';
			return(tipText);
		}
		return(null);
	},
	createContextMenu: function(data) {
		var valueFilters = [];
		for(var i = 0; i < this.config.data.types.length; i++) {
			var valueFrom = null;
			var valueTo = null;
			var valueFromMatch = this.config.data.types[i].match(/>= ([\d\.]+)/);
			if(valueFromMatch && valueFromMatch.length == 2) {
				valueFrom = valueFromMatch[1] * 1;
			}
			var valueToMatch = this.config.data.types[i].match(/< ([\d\.]+)/);
			if(valueToMatch && valueToMatch.length == 2) {
				valueTo = valueToMatch[1] * 1;
			}
			valueFilters.push({
				valueTo: valueTo ? valueTo : undefined,
				valueToText: '< ' + valueTo,
				valueFrom: valueFrom ? valueFrom : undefined,
				valueFromText: '>= ' + valueFrom
			});
		}
		var subMenuSrcValue = [];
		var subMenuDstValue = [];
		var subMenuSrcOrDestValue = [];
		for(var i = 0; i < 3; i++) {
			var subMenu = [];
			var prefixData = i == 0 ? 'src_' : (i == 1 ? 'dst_' : '');
			var srcDst = i == 0 ? 'src' : (i == 1 ? 'dst' : 'both');
			for(var j = 0; j < this.config.data.aliases.length; j++) {
				if(data[prefixData + this.config.data.aliases[j]]) {
					var menuItem = {
						_valueSrcDst: srcDst,
						_ip: data.ip,
						handler: showCdr,
						scope: this
					};
                                        if(valueFilters[j].valueFrom) {
						menuItem.text = valueFilters[j].valueFromText;
						menuItem._valueFilterFrom = valueFilters[j].valueFrom;
					}
					if(valueFilters[j].valueTo) {
						if(menuItem.text) {
							menuItem.text += ' AND ';
						} else {
							menuItem.text = ''
						}
						menuItem.text += valueFilters[j].valueToText;
						menuItem._valueFilterTo = valueFilters[j].valueTo;
					}
					subMenu.push(menuItem);
				}
			}
			switch(i) {
			case 0:
				subMenuSrcValue = subMenu;
				break;
			case 1:
				subMenuDstValue = subMenu;
				break;
			case 2:
				subMenuSrcOrDestValue = subMenu;
				break;
			}
		}
		var menu = [];
		if(this.filterFields[this.type]) {
			menu.push(
				'<div class="menu-title" style="font-weight:bold; font-size: 90%; padding-left: 33; padding-right: 30; margin-top: 4; margin-bottom: 4;">' + 
				'select CDR records' +
				'</div>'
			);
			if(subMenuSrcValue.length) {
				menu.push({
					text: 'IP ' + data.ip + ' / OUT',
					menu: subMenuSrcValue
				});
			}
			if(subMenuDstValue.length) {
				menu.push({
					text: 'IP ' + data.ip + ' / IN',
					menu: subMenuDstValue
				});
			}
			if(subMenuSrcValue.length && subMenuDstValue.length &&
			   subMenuSrcOrDestValue.length) {
				menu.push({
					text: 'IP ' + data.ip + ' / IN or OUT',
					menu: subMenuSrcOrDestValue
				});
			}
		}
		menu.push(
			'<div class="menu-title" style="font-weight:bold; font-size: 90%; padding-left: 33; padding-right: 30; margin-top: 4; margin-bottom: 4;">' + 
			'add filter to chart' +
			'</div>'
		);
		if(subMenuSrcValue.length) {
			menu.push({
				text: 'IP ' + data.ip + ' / OUT',
				_valueSrcDst: 'src',
				_ip: data.ip,
				handler: showChart,
				scope: this
			});
		}
		if(subMenuDstValue.length) {
			menu.push({
				text: 'IP ' + data.ip + ' / IN',
				_valueSrcDst: 'dst',
				_ip: data.ip,
				handler: showChart,
				scope: this
			});
		}
		if(subMenuSrcValue.length && subMenuDstValue.length &&
		   subMenuSrcOrDestValue.length) {
			menu.push({
				text: 'IP ' + data.ip + ' / IN or OUT',
				_valueSrcDst: 'both',
				_ip: data.ip,
				handler: showChart,
				scope: this
			});
		}
		
		return(new Ext.menu.Menu({ 
			items: menu
		}));
		
		function showCdr(menuItem) {
			var filter = {
				fdatefrom: this.timeFrom,
				fdateto: this.timeTo
			}
			var title = [];
			title.push(
				'from: ' + trimTimeFormatString(this.timeFrom, this.timeTo));
			title.push(
				'to: ' + trimTimeFormatString(this.timeTo, this.timeFrom));
			if(menuItem._ip) {
				var ip = menuItem._ip;
				switch(menuItem._valueSrcDst) {
				case 'src':
					filter.fsipcallerip = ip;
					filter.fsipcallerdip_type = 1;
					break;
				case 'dst':
					filter.fsipcalledip = ip;
					filter.fsipcallerdip_type = 1;
					break;
				default:
					filter.fsipcallerip = ip;
					break;
				}
				title.push('IP: ' + ip);
				switch(menuItem._valueSrcDst) {
				case 'src':
					title.push('OUT');
					break;
				case 'dst':
					title.push('IN');
					break;
				}
			}
			if(menuItem._valueFilterTo || menuItem._valueFilterFrom) {
				if(menuItem._valueFilterTo) {
					switch(menuItem._valueSrcDst) {
					case 'src':
						filter[this.filterFields[this.type].src_lt] = menuItem._valueFilterTo;
						break;
					case 'dst':
						filter[this.filterFields[this.type].dst_lt] = menuItem._valueFilterTo;
						break;
					default:
						filter[this.filterFields[this.type].both_lt] = menuItem._valueFilterTo;
						break;
					}
				}
				if(menuItem._valueFilterFrom) {
					switch(menuItem._valueSrcDst) {
					case 'src':
						filter[this.filterFields[this.type].src_ge] = menuItem._valueFilterFrom;
						break;
					case 'dst':
						filter[this.filterFields[this.type].dst_ge] = menuItem._valueFilterFrom;
						break;
					default:
						filter[this.filterFields[this.type].both_ge] = menuItem._valueFilterFrom;
						break;
					}
				}
				switch(menuItem._valueSrcDst) {
				case 'src':
					if(this.filterFields[this.type].src_select) {
						filter[this.filterFields[this.type].src_select] = 1;
					}
					break;
				case 'dst':
					if(this.filterFields[this.type].dst_select) {
						filter[this.filterFields[this.type].dst_select] = 1;
					}
					break;
				default:
					if(this.filterFields[this.type].both_select) {
						filter[this.filterFields[this.type].both_select] = 1;
					}
					break;
				}
				if(this.filterFields[this.type].set_chart_field) {
					filter[this.filterFields[this.type].set_chart_field] = true;
				}
				title.push(menuItem.text);
			}
			var cdrGrid = new CDR.Grid({
				extraParams: filter,
				disableCharts: true,
				disableMenu: true,
				disablePagingToolbar: true,
				enableTbarRibbonDateFromTo: true,
				enableTbarRibbonFilterButton: true,
				enableTbarRibbonPaginator: true,
				loadAtInit: true,
				border: false
			});
			var win = new Ext.Window({
				layout: 'fit',
				items: cdrGrid,
				title: 'CDR ' + title.join(', '),
				width: Math.round(Ext.dom.Element.getViewportWidth()*7/8),
				height: Math.round(Ext.dom.Element.getViewportHeight()*7/8),
				modal: true,
				closable: true,
				maximizable: true
			});
			win.show();
		}
		function showChart(menuItem) {
			var chartConfig = cloneObject(this.chart.store.chartConfig);
			var title = 'value analysis';
			if(menuItem._ip) {
				if(!chartConfig.filters) {
					chartConfig.filters = {};
				}
				var ip = menuItem._ip;
				switch(menuItem._valueSrcDst) {
				case 'src':
					chartConfig.filters.fsipcallerip = ip;
					chartConfig.filters.fsipcallerdip_type = 1;
					break;
				case 'dst':
					chartConfig.filters.fsipcalledip = ip;
					chartConfig.filters.fsipcallerdip_type = 1;
					break;
				default:
					chartConfig.filters.fsipcallerip = ip;
					break;
				}
				title += ' - IP: ' + ip;
				switch(menuItem._valueSrcDst) {
				case 'src':
					title += ' / OUT';
					break;
				case 'dst':
					title += ' / IN';
					break;
				}
			}
			chartConfig.disableClickHereForAnalyze = true;
			var chart = new CDR.Chart.ChartPanel();
			var window = this.createWindow(chart, title, {
				maximizable: true
			});
			window.show();
			chart.loadChart(chartConfig);
		}
	},
	createWindow: function(content, title, configWindow) {
		var window = new Ext.Window(Ext.applyIf(configWindow || {}, {
			layout: 'fit',
			items: content || this,
			width: 800,
			height: 600,
			title: title ||
			       ('value analysis (top IP) - [' + 
			        trimTimeFormatString(this.timeFrom, this.timeTo) + 
			        ' - ' + 
			        trimTimeFormatString(this.timeTo, this.timeFrom) +
			        ']'),
			modal: true,
			border: false
		}));
		return(window);
	}
});


Ext.define('CDR.Chart.ConfigForm', {
	extend: 'Ext.form.Panel',
	subsystem: 'charts',
	constructor: function(config) {
		config = config || {};
		if(!config._typeChart && config.chartConfig) {
			config._typeChart = config.chartConfig._typeChart || 'CDR';
		}
		if(!config._typeChart) {
			config._typeChart = 'CDR';
		}
		if(config.chartConfig && config.chartConfig.filtersFromParent) {
			config.filtersFromParent = config.chartConfig.filtersFromParent;
		}
		var _labelWidth_char = 12;
		var _labelWidth = __width_FieldChar(_labelWidth_char);
		this.disableClearChartType = 0;
		this.disableLoadTypeTimeAxises = 0;
		this.fixTypeTimeAxis = null;
		this.initMinSeries = 6;
		this.cfgFieldsBase = [
			'chartType'
		];
		if(!config.cdrChartConfig) {
			this.cfgFieldsBase.push(
				'timeAxis');
		}
		if(config.dailyReportConfig) {
			this.cfgFieldsBase.push(
				'typeTimeInterval',
				'intervalOffset');
		} else if(!config.cdrChartConfig && !config.filtersFromParent) {
			this.cfgFieldsBase.push(
				'typeTimeInterval',
				'intervalOffset',
				'dateFrom',
				'dateTo');
		}
		this.cfgFieldsAppearance = [];
		if(!config.disableChartTitle) {
			this.cfgFieldsAppearance.push('title');
		}
		this.cfgFieldsAppearance.push(
			//'theme',
			'axisTitleLeft',
			'axisTitleRight',
			'leftAxisMinWidth',
			'rightAxisMinWidth',
			'legendPosition',
			'combinationToArea',
			'maximumAreaItems',
			'leftLimitLineValue',
			'leftLimitLineColor',
			'leftPercTrend',
			'leftPerc95_Color',
			'leftPerc99_Color',
			'rightLimitLineValue',
			'rightLimitLineColor',
			'rightPercTrend',
			'rightPerc95_Color',
			'rightPerc99_Color'
		);
		this.seriesFields = [
			'series_a',
			'series_b',
			'param',
			'sideAxis',
			'primaryAxis',
			'baseType',
			'lineType',
			'color',
			'trend',
			'fill',
			'markers',
			'smooth',
			'percent'
		];
		this.seriesFieldsDefault = [
			null,
			null,
			'left',
			false,
			'line',
			'solid',
			null,
			false,
			false
		];
		if(!config.chartConfig && !config.chartDefault) {
			return;
		}
		var cfgCmbChartTypeInitValue = config.chartConfig ?
						config.chartConfig.chartType :
						config.chartDefault.chartType;
		var arCdrChart_chartTypes_clone = cloneObject(config._typeChart == 'CDR' ? arCdrChart_chartTypes :
							      config._typeChart == 'MESSAGES' ? arMessagesChart_chartTypes : 
							      config._typeChart == 'SIP_MSG' ? arSipMsgChart_chartTypes : null);
		for(var i = 0; i < arCdrChart_chartTypes_clone.length; i++) {
			arCdrChart_chartTypes_clone[i][2] = arCdrChart_chartTypes_clone[i][1];
		}
		var cfgCmbChartType = {
			xtype: 'ComboBoxA',
			name: 'chartType',
			fieldLabel: this.findLangS('field', 'templates'),
			_tpl: '{descrMenu}',
			width: __width_Form(_labelWidth, 180) + 6,
			labelWidth: _labelWidth + 19,
			listConfig: {
				minWidth: 250
			},
			aData: {
				data: arCdrChart_chartTypes_clone,
				fields: [ 'id', 'descr', 'descrMenu', 'customId', 'chartConfig' ]
			},
			value: cfgCmbChartTypeInitValue,
			_initValue: cfgCmbChartTypeInitValue,
			listeners: {
				scope: this,
				select: onSelectChartType
			}
		};
		var cfgCmbTypeTimeAxises = null;
		if(!config.cdrChartConfig) {
			var cfgCmbTypeTimeAxisesInitValue = config.chartConfig ?
								config.chartConfig.timeAxis :
								config.chartDefault.timeAxis;
			cfgCmbTypeTimeAxises = {
				xtype: 'ComboBoxA',
				name: 'timeAxis',
				fieldLabel: this.findLangS('field', 'timeAxis'),
				width: __width_Form(_labelWidth, 180),
				aData: {
					data: [],
					fields: [ 'id', 'descr', 'count' ]
				},
				tpl: config.dailyReportConfig ? undefined :
					'<tpl for=".">'+
						'<tpl if="[xindex]==1">'+
							'<table class="comboBox-menuList" style="table-layout: fixed; text-align: left; width: 177;">'+
							'<col width=137>'+
							'<col width=40>'+
						'</tpl>'+
						'<tr class="x-boundlist-item">'+
							'<td style="font-size: 12;">{descr}</td>'+
							'<td style="font-size: 11; text-align: right; color: grey">{count}</td>'+
						'</tr>'+
						'<tpl if="[xcount-xindex]==0">'+
							'</table>'+
						'</tpl>'+
					'</tpl>',
				listConfig: {
					minWidth: 185
				},
				value: cfgCmbTypeTimeAxisesInitValue,
				_initValue: cfgCmbTypeTimeAxisesInitValue,
				allowBlank: false
			};
			if(config.dashboardConfig) {
				Ext.apply(cfgCmbTypeTimeAxises, {
					labelWidth: _labelWidth + 19,
					width: __width_Form(_labelWidth, 180) + 6,
					emptyText: this.findLangS('text', 'autoSet'),
					allowBlank: true,
					_clearButton: true,
					style: {
						marginTop: __height_FieldSeparator
					}
				});
			}
		}
		if(!config.cdrChartConfig && !config.dashboardConfig) {
			if(!config.disableSaveDeleteChartButtons) {
				this.btnSaveChartConfig = new Ext.Button({
					text: this.findLangS('button', 'saveTemplate'),
					handler: this.saveChartConfig,
					scope: this,
					style: { marginLeft: 4 }
				});
				this.btnDeleteChartConfig = new Ext.Button({
					text: this.findLangS('button', 'deleteTemplate'),
					handler: this.deleteChartConfig,
					scope: this,
					style: { marginLeft: 4 }
				});
			}
			var initTypeTimeInterval = config.dailyReportConfig?
						    (config.dailyReportConfigData && config.dailyReportConfigData.at_or_every == 'every' ?  'last_hour' : 'yesterday') :
						   config.chartConfig ?
						    config.chartConfig.typeTimeInterval :
						    config.chartDefault.typeTimeInterval;
			var initDateFrom = null;
			var initDateTo = null;
			var initIntervalOffset = config.chartConfig && config.chartConfig.intervalOffset || 0;
			var useIntervalOffsetField = !config.dailyReportConfig;
			if(initTypeTimeInterval) {
				var timeInterval = getTimeInterval(initTypeTimeInterval, {
								   prevInterval: config.prevInterval,
								   prevIntervalHourTolerance: config.prevIntervalHourTolerance,
								   actTime: null,
								   forChart: true,
								   intervalOffset: initIntervalOffset});
				initDateFrom = timeInterval[0];
				initDateTo = timeInterval[1];
				if(initTypeTimeInterval == 'today' ||
				   initTypeTimeInterval == 'yesterday') {
					var configDateFrom = config.chartConfig ?
								config.chartConfig.dateFrom :
								config.chartDefault.dateFrom;
					var configDateTo = config.chartConfig ?
								config.chartConfig.dateTo :
								config.chartDefault.dateTo;
					if(configDateFrom && time_sec(configDateFrom)) {
						initDateFrom = completeDateTime(timeInterval[0], configDateFrom);
					}
					if(configDateTo && time_sec(configDateTo)) {
						initDateTo = completeDateTime(timeInterval[1] ? timeInterval[1] : timeInterval[0], configDateTo);
					}
				}
			} else {
				initDateFrom = config.chartConfig ?
							config.chartConfig.dateFrom :
							config.chartDefault.dateFrom;
				initDateTo = config.chartConfig ?
							config.chartConfig.dateTo :
							config.chartDefault.dateTo;
			}
			var baseItemsDateRange = [];
			if(!config.filtersFromParent) {
				baseItemsDateRange.push({
					xtype: 'ComboBoxA', name: 'typeTimeInterval', fieldLabel: this.findLangS('field', 'timeInterval'),
					value: initTypeTimeInterval,
					aData: arTimeIntervals,
					asFilter: config.dailyReportConfig ? 
						   (config.dailyReportConfigData && config.dailyReportConfigData.at_or_every == 'every' ?
						     [ 'last_hour',
						       'last_2h',
						       'last_3h',
						       'last_8h',
						       'last_24h'
						     ] : [ 
						       'today',
						       'yesterday',
						       'this_week_m',
						       'this_week_s',
						       'this_month',
						       'prev_month',
						       'last_30d',
						       'last_60d',
						       'last_90d' ]) : 
						   undefined,
					_clearButton: !config.dailyReportConfig,
					width: __width_Form(_labelWidth, 180),
					listeners: {
						scope: this,
						select: onSelectTimeInterval
					},
					allowBlank: !config.dailyReportConfig
				});
			}
			baseItemsDateRange.push(cfgCmbTypeTimeAxises);
			var itemsDateRange = [{
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'container',
					items: baseItemsDateRange
				}]
			}];
			if(!config.filtersFromParent) {
				var dateToFields = 
					{xtype: 'datetimefield', name: 'dateTo', fieldLabel: this.findLangS('field', 'to'),
					 value: initDateTo, disabled: initTypeTimeInterval,
					 inEditor: true, zeroTimeEmpty: true,
					 labelWidth: __width_FieldChar(6), width: __width_Form(__width_FieldDateTimeM, __width_FieldChar(6)),
					 listeners: {
						scope: this,
						select: onChangeDateRange,
						change: onChangeDateRange}};
				if(useIntervalOffsetField) {
					dateToFields = {
						xtype: 'container',
						layout: 'hbox',
						items: [
							dateToFields,
							{xtype: 'displayfield_h16', value: this.findLangS('field', 'intervalOffset') + ':',
							 style: {marginLeft: 20, marginRight: __width_FieldSeparator},
							 helpText: this.findLangS('tooltip', 'intervalOffsetHelp')},
							{xtype: 'numberfield', name: 'intervalOffset',
							 minValue: 0, hideLabel: true,
							 value: initIntervalOffset,
							 width: __width_FieldNum(3) + __width_Trigger,
							 fieldStyle: {
								'text-align': 'right'
							 },
							 listeners: {
								scope: this,
								change: onSelectTimeInterval}},
							{xtype: 'displayfield_h16', value: '[' + lang.minuteShort2 + ']',
							 style: {marginLeft: __width_FieldSeparator}}
						]
					};
				}
				itemsDateRange[0].items.push({
					width: 20, border: false
				},{
					xtype: 'container',
					items: [
						{xtype: 'datetimefield', name: 'dateFrom', fieldLabel: this.findLangS('field', 'from'),
						 value: initDateFrom, disabled: initTypeTimeInterval,
						 inEditor: true, zeroTimeEmpty: true,
						 labelWidth: __width_FieldChar(6),
						 listeners: {
							scope: this,
							select: onChangeDateRange,
							change: onChangeDateRange}},
						dateToFields
					]
				});
			}
		} else {
			itemsDateRange = null;
		}
		var itemsSeries = [];
		var headerSeries = [
			{ header: 'series', name: 'series_a', width: 160, widthHeader: 215 + __width_FieldSeparator, colspan: 2 },
			{ header: null, name: 'series_b', width: 55 },
			{ header: 'param', name: 'param', width: __width_FieldChar(6) },
			{ header: 'sideAxis', name: 'sideAxis', width: __width_FieldChar(5) + __width_Trigger - 2 },
	                { header: 'baseType', name: 'baseType', width: __width_FieldChar(6) + __width_Trigger + 2 },
			{ header: 'lineType', name: 'lineType', width: __width_FieldChar(6) + __width_Trigger + 1 },
			{ header: 'color', name: 'color', width: 15 + __width_Trigger*2 - 4, style: { marginRight: 8 }},
			{ header: 'primaryAxis', v: true, name: 'primaryAxis', width: 16, tdAttrs: { 'align': 'center' }},
			{ header: 'trend', v: true, name: 'trend', width: 16, tdAttrs: { 'align': 'center' }},
			{ header: 'fill', v: true, name: 'fill', width: 16, tdAttrs: { 'align': 'center' }},
			{ header: 'markers', v: true, name: 'markers', width: 16, tdAttrs: { 'align': 'center' }},
			{ header: 'smooth', v: true, name: 'smooth', width: 16, tdAttrs: { 'align': 'center' }},
			{ header: 'percent', v: true, name: 'percent', width: 16, tdAttrs: { 'align': 'center' }},
			{ header: 'filters', v: true, name: 'filter', width: 18, style: { marginLeft: 2, marginRight: 0 }, tdAttrs: { 'align': 'center' }},
			{ header: 'tools', v: true, name: 'tools', width: 18, style: { marginLeft: 2, marginRight: 0 }, tdAttrs: { 'align': 'center' }}
		];
		for(var i = 0; i < headerSeries.length; i++) {
			if(!headerSeries[i].header) {
				continue;
			}
			headerSeries[i].header = this.findLangS('column', headerSeries[i].header);
			if(headerSeries[i].v) {
				headerSeries[i].header = 
					'<svg width="16" height="40">' +
						'<text x="0" y="0" fill="black" ' +
							'text-anchor="left" transform="rotate(-90 0,0) translate(-38,9)" ' +
							'font-family="tahoma, arial, verdana, sans-serif" font-size=11>' +
						headerSeries[i].header +
						'</text>' + '</svg>';
			}
		}
		var headerItems = [];
		for(var i = 0; i < headerSeries.length; i++) {
			if(!headerSeries[i].header) {
				continue;
			}
			headerItems.push({
				xtype: 'displayfield',
				value: headerSeries[i].header,
				colspan: headerSeries[i].colspan,
				width: headerSeries[i].widthHeader || headerSeries[i].width,
				tdAttrs: {
					'align': 'center',
					'valign': 'bottom'
				},
				style: headerSeries[i].style || { marginRight: __width_FieldSeparator }
			});
		}
		this.seriesHeader = new Ext.Container({
			layout: {
				type: 'table',
				columns: headerSeries.length,
				tableAttrs: {
					border: 0
				}
			},
			items: headerItems
		});
		this._headerSeries = headerSeries;
		this._onChangePrimary = onChangePrimary;
		this.seriesRows = [];
		for(var i = 0; i < this.initMinSeries; i++) {
			this.seriesRows.push(this.createSeriesRow(i, config));
		}
		var itemsChartAppearance = [];
		var defChartType = null;
		if(config.chartDefault && config.chartDefault.chartType && 
		   arCdrChart_defChartTypes[config.chartDefault.chartType]) {
			defChartType = arCdrChart_defChartTypes[config.chartDefault.chartType][config._typeChart] ||
				       arCdrChart_defChartTypes[config.chartDefault.chartType];
		}
		if(!config.disableChartTitle) {
			itemsChartAppearance.push(
				{xtype: 'textfield', name: 'title', fieldLabel: this.findLangS('field', 'title'),
				 width: __width_Form(_labelWidth, 300),
				 value: config.chartConfig ?
					 config.chartConfig.title :
					 defChartType ?
					  defChartType.title :
					  null}
			);
		}
		itemsChartAppearance.push(
			/*
			{xtype: 'ComboBoxA', name: 'theme', fieldLabel: this.findLangS('field', 'theme'),
			 width: __width_Form(_labelWidth, 300),
			 value: config.chartConfig ?
				 config.chartConfig.theme :
				 defChartType ?
				  defChartType.theme :
				  null,
			 aData: arCdrChart_chartThemes},
			*/
			{xtype: 'container',
			 layout: 'hbox',
			 items: [
				{xtype: 'textfield', name: 'axisTitleLeft', fieldLabel: this.findLangS('field', 'axisTitleLeft'),
				 width: __width_Form(_labelWidth, 300),
				 value: config.chartConfig ?
					 config.chartConfig.axisTitleLeft :
					 defChartType ?
					  defChartType.axisTitleLeft :
					  null},
				{xtype: 'numberfield', name: 'leftAxisMinWidth', fieldLabel: this.findLangS('field', 'minAxisWidth'),
				 labelWidth: __width_FieldChar(15), width: __width_FormChar(15, 6),
				 value: config.chartConfig ? config.chartConfig.leftAxisMinWidth : null,
				 minValue: 0, maxValue: 100, step: 5,
				 style: {marginLeft: __width_FieldSeparator * 2}}
			 ],
			 style: {marginBottom: __height_FieldSeparator}},
			{xtype: 'container',
			 layout: 'hbox',
			 items: [
				{xtype: 'textfield', name: 'leftLimitLineValue', fieldLabel: this.findLangS('field', 'limitLineValue'),
				 width: __width_Form(_labelWidth, __width_FieldChar(11)),
				 value: config.chartConfig ? config.chartConfig.leftLimitLineValue : null,
				 style: {marginLeft: _labelWidth + 20},
				 enableKeyEvents: true,
				 listeners: {
					scope: this,
					keyup: this.setContextSeriesFields,
					change: this.setContextSeriesFields
				 }},
				{xtype: 'colorpickerfield', name: 'leftLimitLineColor', fieldLabel: this.findLangS('field', 'limitLineColor'),
				 labelWidth: __width_FieldChar(6), width: __width_FormChar(6, 8) + __width_Trigger,
				 value: config.chartConfig && config.chartConfig.leftLimitLineColor || '#E92424',
				 style: {marginLeft: __width_FieldSeparator * 2}}
			 ],
			 style: {marginBottom: __height_FieldSeparator}},
			{xtype: 'container',
			 layout: 'hbox',
			 items: [
				{xtype: 'ComboBoxA', name: 'leftPercTrend', fieldLabel: this.findLangS('field', 'percTrend'),
				 aData: [
					[ 'asc', this.findLangS('combodata', 'asc') ],
					[ 'desc', this.findLangS('combodata', 'desc') ]
				 ],
				 width: __width_Form(_labelWidth, __width_FieldChar(11)),
				 value: config.chartConfig ? config.chartConfig.leftPercTrend : null,
				 _clearButton: true,
				 style: {marginLeft: _labelWidth + 20},
				 listeners: {
					scope: this,
					select: this.setContextSeriesFields
				 }},
				{xtype: 'colorpickerfield', name: 'leftPerc95_Color', fieldLabel: this.findLangS('field', 'perc95_Color'),
				 labelWidth: __width_FieldChar(6), width: __width_FormChar(6, 8) + __width_Trigger,
				 value: config.chartConfig && config.chartConfig.leftPerc95_Color,
				 style: {marginLeft: __width_FieldSeparator * 2}},
				{xtype: 'colorpickerfield', name: 'leftPerc99_Color', fieldLabel: this.findLangS('field', 'perc99_Color'),
				 labelWidth: __width_FieldChar(6), width: __width_FormChar(6, 8) + __width_Trigger,
				 value: config.chartConfig && config.chartConfig.leftPerc99_Color,
				 style: {marginLeft: __width_FieldSeparator * 2}}
			 ],
			 style: {marginBottom: __height_FieldSeparator}},
			{xtype: 'container',
			 layout: 'hbox',
			 items: [
				{xtype: 'textfield', name: 'axisTitleRight', fieldLabel: this.findLangS('field', 'axisTitleRight'),
				 width: __width_Form(_labelWidth, 300),
				 value: config.chartConfig ?
					 config.chartConfig.axisTitleRight :
					 defChartType ?
					  defChartType.axisTitleRight :
					  null},
				{xtype: 'numberfield', name: 'rightAxisMinWidth', fieldLabel: this.findLangS('field', 'minAxisWidth'),
				 labelWidth: __width_FieldChar(15), width: __width_FormChar(15, 6),
				 value: config.chartConfig ? config.chartConfig.rightAxisMinWidth : null,
				 minValue: 0, maxValue: 100, step: 5,
				 style: {marginLeft: __width_FieldSeparator * 2}}
			 ],
			 style: {marginBottom: __height_FieldSeparator}},
			{xtype: 'container',
			 layout: 'hbox',
			 items: [
				{xtype: 'textfield', name: 'rightLimitLineValue', fieldLabel: this.findLangS('field', 'limitLineValue'),
				 width: __width_Form(_labelWidth, __width_FieldChar(11)),
				 value: config.chartConfig ? config.chartConfig.rightLimitLineValue : null,
				 style: {marginLeft: _labelWidth + 20},
				 enableKeyEvents: true,
				 listeners: {
					scope: this,
					keyup: this.setContextSeriesFields,
					change: this.setContextSeriesFields
				 }},
				{xtype: 'colorpickerfield', name: 'rightLimitLineColor', fieldLabel: this.findLangS('field', 'limitLineColor'),
				 labelWidth: __width_FieldChar(6), width: __width_FormChar(6, 8) + __width_Trigger,
				 value: config.chartConfig && config.chartConfig.rightLimitLineColor || '#E92424',
				 style: {marginLeft: __width_FieldSeparator * 2}}
			 ],
			 style: {marginBottom: __height_FieldSeparator}},
			{xtype: 'container',
			 layout: 'hbox',
			 items: [
				{xtype: 'ComboBoxA', name: 'rightPercTrend', fieldLabel: this.findLangS('field', 'percTrend'),
				 aData: [
					[ 'asc', this.findLangS('combodata', 'asc') ],
					[ 'desc', this.findLangS('combodata', 'desc') ]
				 ],
				 _clearButton: true,
				 width: __width_Form(_labelWidth, __width_FieldChar(11)),
				 value: config.chartConfig ? config.chartConfig.rightPercTrend : null,
				 style: {marginLeft: _labelWidth + 20},
				 listeners: {
					scope: this,
					select: this.setContextSeriesFields
				 }},
				{xtype: 'colorpickerfield', name: 'rightPerc95_Color', fieldLabel: this.findLangS('field', 'perc95_Color'),
				 labelWidth: __width_FieldChar(6), width: __width_FormChar(6, 8) + __width_Trigger,
				 value: config.chartConfig && config.chartConfig.rightPerc95_Color,
				 style: {marginLeft: __width_FieldSeparator * 2}},
				{xtype: 'colorpickerfield', name: 'rightPerc99_Color', fieldLabel: this.findLangS('field', 'perc99_Color'),
				 labelWidth: __width_FieldChar(6), width: __width_FormChar(6, 8) + __width_Trigger,
				 value: config.chartConfig && config.chartConfig.rightPerc99_Color,
				 style: {marginLeft: __width_FieldSeparator * 2}}
			 ],
			 style: {marginBottom: __height_FieldSeparator}},
			{xtype: 'ComboBoxA', name: 'legendPosition', fieldLabel: this.findLangS('field', 'legendPosition'),
			 width: __width_Form(_labelWidth, 300),
			 value: config.chartConfig ?
				 config.chartConfig.legendPosition :
				 defChartType ?
				  defChartType.legendPosition :
				  'top',
			 aData: arCdrChart_legendPosition}
		);
		var itemsChartConfig = [{
			xtype: 'container',
			layout: 'hbox',
			items: [
				cfgCmbChartType,
				this.btnSaveChartConfig || { border: false },
				this.btnDeleteChartConfig || { border: false }
			]
		}];
		if(config.dashboardConfig && cfgCmbTypeTimeAxises) {
			itemsChartConfig.push(cfgCmbTypeTimeAxises);
		}
		var widthFieldsetChartConfig = CDR.Filter.getWidthForm() - 8;
		if(itemsDateRange) {
			itemsChartConfig.push({
				xtype: 'fieldset',
				title: this.findLangS('fieldset', 'dateRange'),
				items: itemsDateRange,
				width: widthFieldsetChartConfig,
				style: __style_RedukFieldSet()
			});
		}
		this.seriesRowsContainer = new Ext.Container({
			layout: 'vbox',
			items: this.seriesRows,
		});
		itemsChartConfig.push({
			xtype: 'fieldset',
			title: this.findLangS('fieldset', 'series'),
			layout: 'vbox',
			items: [
				this.seriesHeader,
				this.seriesRowsContainer,
			{
				layout: {
					type: 'table',
					columns: headerSeries.length,
					tableAttrs: {
						border: 0
					}
				},
				defaults: {
					style: { marginRight: __width_FieldSeparator }
				},
				items: itemsSeries,
				border: false,
				bodyStyle: {
					'background-color': __color_FormBackground
				}
			},{
				xtype: 'checkbox', name: 'combinationToArea',
				checked: config.chartConfig && config.chartConfig.combinationToArea,
				boxLabel: this.findLangS('field', 'combinationToArea'),
				listeners: {
					scope: this,
					change: function() {
						this.clearChartType();
						this.setContextSeriesFields();
					}
				}
			},{
				xtype: 'numberfield', name: 'maximumAreaItems',
				value: config.chartConfig && config.chartConfig.maximumAreaItems,
				minValue: 1, maxValue: 20,
				fieldLabel: this.findLangS('field', 'maximumAreaItems'),
				width: __width_FormChar(17, 5),
				labelWidth: __width_FieldChar(17)
			}],
			width: widthFieldsetChartConfig,
			style: __style_RedukFieldSet()
		},{
			xtype: 'fieldset',
			title: this.findLangS('fieldset', 'description'),
			items: itemsChartAppearance,
			width: widthFieldsetChartConfig,
			style: __style_RedukFieldSet()
		});
		setItemsChangeListeners(itemsChartConfig, this);
		var itemsTabForm = [{
			xtype: 'container',
			fieldDefaults: {
				labelWidth: _labelWidth
			},
			items: itemsChartConfig,
			title: this.findLangS('title', 'baseChartData')
		}];
		if(!config.filtersFromParent &&
		   !config.disableFilters && !config.disableFilterCommon) {
			if(config._typeChart == 'CDR') {
				var itemsFilterCommon = CDR.Filter.getFieldset('common', {
					values: config.chartConfig && config.chartConfig.filters || {},
					disableTimeInterval: true,
					disableSelections: true
				});
				var itemsTemplate = CDR.Filter.getFieldset_template({
					disableTimeInterval: true,
					disableSelections: true
				});
				itemsFilterCommon.splice(0, 0, {
					 xtype: 'box',
					 autoEl: {
						tag: 'hr',
						color: __color_FieldBorder, size: 1,
						style: { marginTop: 0, marginBottom: 5 }}}
				);
				itemsFilterCommon.splice(0, 0, itemsTemplate);
				itemsTabForm.push({
					xtype: 'container',
					items: itemsFilterCommon,
					title: this.findLangS('title', 'filtersCommon')
				});
			} else if(config._typeChart == 'MESSAGES') {
				var itemsFilter = Message.Filter.getFieldset({
					values: config.chartConfig && config.chartConfig.filters || {},
					disableTimeInterval: true
				});
				itemsTabForm.push({
					xtype: 'container',
					items: itemsFilter,
					title: this.findLangS('title', 'filters')
				});
			} else if(config._typeChart == 'SIP_MSG') {
				var itemsFilter = SipMsg.Filter.getFieldset({
					modelType: 'stored',
					values: config.chartConfig && config.chartConfig.filters || {},
					disableTimeInterval: true
				});
				itemsTabForm.push({
					xtype: 'container',
					items: itemsFilter,
					title: this.findLangS('title', 'filters')
				});
			}
		}
		if(config._typeChart == 'CDR' &&
		   !config.filtersFromParent &&
		   !config.disableFilters && !config.disableFilterRTP) {
			var itemsFilterRTP = CDR.Filter.getFieldset('rtp', {
				values: config.chartConfig && config.chartConfig.filters || {}
			});
			itemsTabForm.push({
				xtype: 'container',
				items: itemsFilterRTP,
				title: this.findLangS('title', 'filtersRtp')
			});
			if(window.existsDscpCdr) {
				var itemsFilterDSCP = CDR.Filter.getFieldset('dscp', {
					values: config.chartConfig && config.chartConfig.filters || {}
				});
				itemsTabForm.push({
					xtype: 'container',
					items: itemsFilterDSCP,
					title: this.findLangS('title', 'filtersDscp')
				});
			}
			var itemsFilterFiltersComb = CDR.Filter.getFieldset('filters_comb', {
				values: config.chartConfig && config.chartConfig.filters || {}
			});
			itemsTabForm.push({
				xtype: 'container',
				items: itemsFilterFiltersComb,
				title: this.findLangS('title', 'filtersComb')
			});
		}
		var widthForm = CDR.Filter.getWidthForm();
		var itemsForm = {
			xtype: 'tabpanel',
			items: [],
			border: false
		};
		for(var i = 0; i < itemsTabForm.length; i++) {
			itemsForm.items.push({
				xtype: 'container',
				layout: 'fit',
				items: {
					xtype: 'container',
					items: itemsTabForm[i],
					style: {
						paddingTop: 4, paddingLeft: 4, paddingRight: 4,
						marginRight: __width_Scroller,
						'background-color': __color_FormBackground
					},
					width: widthForm
				},
				border: false,
				width: widthForm + __width_Scroller + 4,
				autoScroll: true,
				title: itemsTabForm[i].title,
				style: {
					'background-color': __color_FormBackground
				}
			});
		}
		if(!config.disableSaveCancelFormButtons) {
			Ext.applyIf(config, {
				buttons: [{
					text: this.findLangS('button', 'apply'),
					iconCls: 'icon_save',
					handler: applyConfig,
					scope: this
				},{
					text: this.findLangS('button', 'cancel'),
					iconCls: 'icon_cancel',
					handler: function() {
						this.destroyWindow();
					},
					scope: this
				}]
			});
		}
		Ext.applyIf(config, {
			layout: 'fit',
			frame: true,
			border:false,
			items: itemsForm,
			seriesFilters: [],
			seriesTimeOffset: [],
			seriesIntervals: [],
			flex: 1,
			listeners: {
				scope: this,
				afterrender: function() {
					Ext.create('Ext.util.KeyNav', this.el, {
						enter: applyConfig,
						scope: this
					});
					if(this.chartConfig && this.chartConfig.series) {
						this.setSeriesFields(this.chartConfig.series);
					} else if(this.chartDefault && this.chartDefault.chartType && defChartType) {
						var chartConfig = cloneChartConfig(defChartType, this.filtersFromParent);
						this.completeSeries(chartConfig.series);
						this.setSeriesFields(chartConfig.series);
					}
					this.loadTypeCharts();
					this.enablerSaveDeleteChartConfig();
					if(!this.dailyReportConfig && !this.cdrChartConfig && !this.dashboardConfig) {
						this.loadTypeTimeAxises();
						this.updateTimeIntervalTask = {
							run: function() {
								++this.disableLoadTypeTimeAxises;
								this.setTimeInterval();
								--this.disableLoadTypeTimeAxises;
							},
							interval: 30000,
							scope: this
						};
						this.taskRunner = new Ext.util.TaskRunner();
						this.taskRunner.start(this.updateTimeIntervalTask);
						this.getForm().findField('chartType').focus(false, 500);
					}
					if(config._typeChart == 'CDR') {
						CDR.Filter.setContextFields(this);
						CDR.Filter.loadTemplates(this, 
									 config.chartConfig && config.chartConfig.filters ?
									  config.chartConfig.filters.ffilterTemplate :
									  null);
					} else if(config._typeChart == 'MESSAGES') {
						Message.Filter.setContextFields(this);
					} else if(config._typeChart == 'SIP_MSG') {
						SipMsg.Filter.setContextFields(this);
					}
					var refreshFields = [ 'leftLimitLineColor', 'rightLimitLineColor' ];
					for(var i = 0; i < refreshFields.length; i++) {
						var field = this.getForm().findField(refreshFields[i]);
						if(field) {
							var value = field.getValue();
							if(!Ext.isEmpty(value)) {
								field.setValue(value);
							}
						}
					}
				},
				destroy: function() {
					if(!this.dailyReportConfig && !this.cdrChartConfig && !this.dashboardConfig) {
						this.taskRunner.stop(this.updateTimeIntervalTask);
					}
				}
			}
		});
		if(!this.disableCreateWindow) {
			Ext.apply(config, {
				width: widthForm + __width_Scroller + 4 + 8
			});
		}
		this.callParent([config]);
		if(!this.disableCreateWindow) {
			this.window = new Ext.Window({
				layout: 'fit',
				title: this.findLangS('title', 'chartConfiguration'),
				closable: true,
				modal: true,
				border: false,
				resizable: false,
				items: this,
				wikiId: 'Charts#Chart_configuration',
				height: Math.min(900, Ext.dom.Element.getViewportHeight() - 40)
			});
			if(!this.disableShowWindow) {
				this.window.show();
			}
		}
		function applyConfig() {
			var chartConfig = this.getChartConfig();
			var error = this.checkErrorInChartConfig(chartConfig);
			if(error) {
				Ext.Msg.alert(lang.error, error);
				return;
			}
			if(this.getForm().isValid()) {
				this.onApply.call(this.onApplyScope, chartConfig);
				this.destroyWindow();
			}
		}
		function onSelectChartType(combo) {
			this.maskLoad();
			Ext.defer(function() {
				this.lastChartTypeId = null;
				this.lastChartTypeName = null;
				var chartConfig = null;
				var selectChartType = combo.getValue();
				if(selectChartType) {
					var selectRecord = combo.findRecordByValue(combo.getValue());
					chartConfig = this.completeChartConfig(
							selectChartType,
							selectRecord && selectRecord.data.customId && selectRecord.data.chartConfig);
					this.chartConfig = cloneChartConfig(chartConfig,
									    this.filtersFromParent);
				}
				if(chartConfig) {
					++this.disableClearChartType;
					this.fixTypeTimeAxis = chartConfig.timeAxis;
					this.setSeriesFields(chartConfig.series);
					this.setFilterFields(chartConfig.filters);
					if(selectRecord && selectRecord.data.customId) {
						for(var i = 0; i < this.cfgFieldsBase.length; i++) {
							if(this.cfgFieldsBase[i] != 'chartType') {
								var field = this.getForm().findField(this.cfgFieldsBase[i]);
								if(field) {
									field.setValue(chartConfig[this.cfgFieldsBase[i]]);
								}
							}
						}
					}
					for(var i = 0; i < this.cfgFieldsAppearance.length; i++) {
						this.getForm().findField(this.cfgFieldsAppearance[i]).setValue(chartConfig[this.cfgFieldsAppearance[i]]);
					}
					--this.disableClearChartType;
					this.fixTypeTimeAxis = null;
				}
				this.setTimeInterval();
				this.enablerSaveDeleteChartConfig();
				this.unmask();
			}, 100, this);
		}
		function onSelectTimeInterval(combo) {
			this.setTimeInterval();
			this.clearChartType();
		}
		function onChangeDateRange() {
			if(this.rendered) {
				this.loadTypeTimeAxises();
				this.clearChartType();
				this.onChangeTimeInterval();
			}
		}
		function onChangePrimary(checkBox, select) {
			if(select) {
				var side = this.getForm().findField('sideAxis_' + checkBox._indexSeries).getValue();
				for(var i = 0; i < this.seriesRows.length; i++) {
					if(i != checkBox._indexSeries &&
					   side == this.getForm().findField('sideAxis_' + i).getValue()) {
						this.getForm().findField('primaryAxis_' + i).setValue(false);
					}
				}
			}
			this.clearChartType();
		}
		function setItemsChangeListeners(items, scope) {
			if(Ext.isArray(items)) {
				for(var i = 0; i < items.length; i++) {
					setItemChangeListeners(items[i], scope);
				}
			} else if(items) {
				 setItemChangeListeners(items, scope);
			}
		}
		function setItemChangeListeners(item, scope) {
			if(item.xtype && item.name && !item.listeners) {
				Ext.apply(item, {
					listeners: {
						scope: scope,
						change: scope.clearChartType,
						select: scope.clearChartType
					}
				});
			}
			if(item.items) {
				setItemsChangeListeners(item.items, scope);
			}
		}
	},
	createSeriesRow: function(indexSeries, config) {
		var rowItems = [];
		for(var indexColumn = 0; indexColumn < this._headerSeries.length; indexColumn++) {
			var item = null;
			switch(this._headerSeries[indexColumn].name) {
			case 'series_a':
				item = {
					xtype: 'ComboBoxA', 
					aData: {
						data: config._typeChart == 'CDR' ? arCdrChart_chartSeriesTypes :
						      config._typeChart == 'MESSAGES' ? arMessagesChart_chartSeriesTypes : 
						      config._typeChart == 'SIP_MSG' ? arSipMsgChart_chartSeriesTypes : [],
						fields: [ 'id_main', 'descr1', 'descr2', 'comb', 'id' ]
					},
					aFilter: function(dataItem) {
						return(dataItem[1]);
					},
					valueField: 'id',
					displayField: 'descr1',
					_clearButton: true,
					listeners: {
						scope: this,
						select: function(combo, value) {
							if(value === null) {
								this.clearChartType();
								this.setSeriesFields(this.getSeries());
							} else {
								this.createSeriesRowIfNeed();
								this.clearChartType();
								this.fillComboSeriesB(combo._indexSeries, combo.getValue());
								this.setFirstValueInComboSeriesB(combo._indexSeries);
								for(var i = 0; i < 2; i++) {
									this.setContextSeriesFields(combo, 'select');
									this.setDefaultParamSeries(combo);
									this.setDefaultIntervalsSeries(combo);
								}
							}
						}
					},
					allowBlank: config.dashboardConfig && indexSeries == 0 ? false : true
				};
				break;
			case 'series_b':
				item = {
					xtype: 'ComboBoxA',
					aData: {
						data: config._typeChart == 'CDR' ? arCdrChart_chartSeriesTypes :
						      config._typeChart == 'MESSAGES' ? arMessagesChart_chartSeriesTypes : 
						      config._typeChart == 'SIP_MSG' ? arSipMsgChart_chartSeriesTypes : [],
						fields: [ 'id', 'descr1', 'descr2', 'comb', 'id_a' ]
					},
					aFilter: function(dataItem, filterFceParam) {
						return(dataItem[4] == filterFceParam);
					},
					displayField: 'descr2',
					listeners: {
						scope: this,
						select: function(combo) {
							this.clearChartType();
							for(var i = 0; i < 2; i++) {
								this.setContextSeriesFields();
								this.setDefaultParamSeries(combo);
								this.setDefaultIntervalsSeries(combo);
							}
						}
					},
					allowBlank: config.dashboardConfig && indexSeries == 0 ? false : true
				};
				break;
			case 'param':
				item = {
					xtype: 'textfield',
					allowBlank: false
				};
				break;
			case 'sideAxis':
				item = {
					xtype: 'ComboBoxA',
					aData: [
						'left',
						'right'
					],
					listeners: {
						scope: this,
						select: function(combo) {
							this.clearChartType();
							this.setContextSeriesFields();
						}
					}
				};
				break;
			case 'baseType':
				item = {
					xtype: 'ComboBoxA',
					aData: [
						'line',
						'column',
						'column_line',
						'area'
						//'trend'
					],
					aFilter: function(dataItem, filterFceParam) {
						return(!filterFceParam || !Ext.isArray(filterFceParam) ||
						       filterFceParam.isIn(dataItem[0]));
					},
					listeners: {
						scope: this,
						select: function(combo) {
							this.clearChartType();
							this.setContextSeriesFields();
						}
					}
				};
				break;
			case 'lineType':
				item = {
					xtype: 'ComboBoxA',
					aData: [
						'solid',
						'dashed',
						'dotted'
					]
				};
				break;
			case 'color':
				item = {
					xtype: 'colorpickerfield',
					allowBlank: false,
					_color_and_background: true
				};
				break;
			case 'primaryAxis':
			case 'trend':
			case 'fill':
			case 'markers':
			case 'smooth':
			case 'percent':
				item = {
					xtype: 'checkbox'
				};
				if(this._headerSeries[indexColumn].name == 'primaryAxis') {
					Ext.applyIf(item, {
						listeners: {
							scope: this,
							change: this._onChangePrimary
						}
					});
				}
				break;
			case 'filter':
				item = {
					xtype: 'container',
					items: {
						xtype: 'button',
						border: false,
						style: { background: 'none', marginTop: -5 },
						innerStyle: { 'padding-left': 7 },
						tooltip: this.findLangS('tooltip', 'seriesFilter'),
						iconCls: 'icon_filter_blue',
						width: 18, height: 18,
						_id: 'filter_' + indexSeries,
						_indexSeries: indexSeries,
						handler: function(button) {
							this.setSeriesFilter(button._indexSeries);
						},
						scope: this
					}
				};
				break;
			case 'tools':
				item = {
					xtype: 'container',
					items: {
						xtype: 'button',
						border: false,
						style: { background: 'none', marginTop: -5 },
						innerStyle: { 'padding-left': 7 },
						tooltip: this.findLangS('tooltip', 'seriesTools'),
						iconCls: 'icon_wrench_small',
						width: 18, height: 18,
						_id: 'tools_' + indexSeries,
						_indexSeries: indexSeries,
						handler: function(button) {
							this.setSeriesTools(button, button._indexSeries);
						},
						scope: this
					}
				};
				break;
			}
			Ext.applyIf(item, {
				name: this._headerSeries[indexColumn].name + '_' + indexSeries,
				width: this._headerSeries[indexColumn].width,
				style: this._headerSeries[indexColumn].style || { marginRight: __width_FieldSeparator },
				tdAttrs: this._headerSeries[indexColumn].tdAttrs,
				_indexSeries: indexSeries,
			});
			if(item.aData && item.aData.length &&
			   Ext.isString(item.aData[0])) {
				for(var k = 0; k < item.aData.length; k++) {
					item.aData[k] = [
						item.aData[k],
						this.findLangS('combodata', item.aData[k])
					];
				}
			}
			rowItems.push(item);
		}
		return(new Ext.Container({
			layout: {
				type: 'table',
				columns: this._headerSeries.length,
				tableAttrs: {
					border: 0
				}
			},
			items: rowItems,
			_indexSeries: indexSeries
		}));
	},
	getChartConfig: function(setTimeInterval, onlyTime) {
		var chartConfig = this.chartConfig ?
					cloneChartConfig(this.chartConfig,
							 this.filtersFromParent) :
					{};
		chartConfig._typeChart = this._typeChart;
		for(var i = 0; i < this.cfgFieldsBase.length; i++) {
			var field = this.getForm().findField(this.cfgFieldsBase[i]);
			if(field) {
				chartConfig[this.cfgFieldsBase[i]] = field.getValue();
			}
		}
		for(var i = 0; i < this.cfgFieldsAppearance.length; i++) {
			chartConfig[this.cfgFieldsAppearance[i]] = this.getForm().findField(this.cfgFieldsAppearance[i]).getValue();
		}
		if(setTimeInterval && chartConfig.typeTimeInterval &&
		   (!onlyTime || onlyTime && (chartConfig.typeTimeInterval == 'today' || chartConfig.typeTimeInterval == 'yesterday'))) {
			var timeInterval = getTimeInterval(chartConfig.typeTimeInterval, {
							   prevInterval: this.prevInterval,
							   prevIntervalHourTolerance: this.prevIntervalHourTolerance,
							   actTime: null,
							   forChart: true,
							   intervalOffset: chartConfig.intervalOffset});
			if((chartConfig.typeTimeInterval == 'today' ||
			    chartConfig.typeTimeInterval == 'yesterday') &&
			   this.getForm().findField('dateFrom')) {
				var dateFrom = this.getForm().findField('dateFrom').getValue();
				var dateTo = this.getForm().findField('dateTo').getValue();
				if(dateFrom && time_sec(dateFrom)) {
					timeInterval[0] = completeDateTime(onlyTime ? 0 : timeInterval[0], dateFrom);
				}
				if(dateTo && time_sec(dateTo)) {
					timeInterval[1] = completeDateTime(onlyTime ? 0 : (timeInterval[1] ? timeInterval[1] : timeInterval[0]), dateTo);
				}
			}
			chartConfig.dateFrom=timeInterval[0];
			chartConfig.dateTo=timeInterval[1];
		}
		chartConfig.series = this.getSeries();
		chartConfig.filters = {};
		if(this.filtersFromParent) {
			applyFiltersFromParentToChartConfig(chartConfig, this.filtersFromParent);
		} else if(!this.disableFilters) {
			if(this._typeChart == 'CDR') {
				if(!this.disableFilterCommon) {
					Ext.apply(chartConfig.filters,
						  CDR.Filter.fetchValuesFromFieldset(this, 'common'),
						  CDR.Filter.fetchValuesFromFieldset(this, 'template'));
				}
				if(!this.disableFilterRTP) {
					Ext.apply(chartConfig.filters,
						  CDR.Filter.fetchValuesFromFieldset(this, 'rtp'));
					if(window.existsDscpCdr) {
						Ext.apply(chartConfig.filters,
							  CDR.Filter.fetchValuesFromFieldset(this, 'dscp'));
					}
					Ext.apply(chartConfig.filters,
						  CDR.Filter.fetchValuesFromFieldset(this, 'filters_comb'));
				}
			} else if(this._typeChart == 'MESSAGES') {
				Ext.apply(chartConfig.filters,
					  Message.Filter.fetchValuesFromFieldset(this));
			} else if(this._typeChart == 'SIP_MSG') {
				Ext.apply(chartConfig.filters,
					  SipMsg.Filter.fetchValuesFromFieldset(this));
			}
		}
		return(chartConfig);
	},
	setChartConfigFields: function(chartConfig) {
		++this.disableClearChartType;
		for(var i = 0; i < this.cfgFieldsBase.length; i++) {
			var field = this.getForm().findField(this.cfgFieldsBase[i]);
			if(field) {
				field.setValue(chartConfig[this.cfgFieldsBase[i]]);
				if(this.cfgFieldsBase[i] == 'timeAxis' && chartConfig[this.cfgFieldsBase[i]] != field.setValue()) {
					field._initValue = chartConfig[this.cfgFieldsBase[i]];
				}
			}
		}
		for(var i = 0; i < this.cfgFieldsAppearance.length; i++) {
			this.getForm().findField(this.cfgFieldsAppearance[i]).setValue(
				chartConfig[this.cfgFieldsAppearance[i]]);
		}
		this.setSeriesFields(chartConfig.series);
		this.setFilterFields(chartConfig.filters);
		if((chartConfig.typeTimeInterval == 'today' ||
		    chartConfig.typeTimeInterval == 'yesterday') &&
		   this.getForm().findField('dateFrom')) {
			var setDateWithTime = false;
			var dateFrom = this.getForm().findField('dateFrom').getValue();
			var dateTo = this.getForm().findField('dateTo').getValue();
			if(chartConfig.dateFrom && time_sec(chartConfig.dateFrom)) {
				setDateWithTime = true;
				dateFrom = completeDateTime(dateFrom, dateTime(chartConfig.dateFrom));
			}
			if(chartConfig.dateTo && time_sec(chartConfig.dateTo)) {
				setDateWithTime = true;
				dateTo = completeDateTime(dateTo ? dateTo : dateFrom, dateTime(chartConfig.dateTo));
			}
			if(setDateWithTime) {
				++this.disableLoadTypeTimeAxises;
				this.getForm().findField('dateFrom').setValue(dateFrom);
				this.getForm().findField('dateTo').setValue(dateTo);
				--this.disableLoadTypeTimeAxises;
			}
		}
		--this.disableClearChartType;
	},
	setSeriesFields: function(series) {
		++this.disableClearChartType;
		if(series) {
			var needSeriesRows = 0;
			for(var i = 0; i < series.length; i++) {
				if(series[i].series) {
					needSeriesRows = i + 1;
				}
			}
			while(needSeriesRows + 1 > this.seriesRows.length) {
				this.addSeriesRow();
			}
		}
		for(var i = 0; i < this.seriesRows.length; i++) {
			for(var j = 0; j < this.seriesFields.length; j++) {
				var fieldName = this.seriesFields[j] + '_' + i;
				var field = this.getForm().findField(fieldName);
				if(field) {
					if(!series || i >= series.length || !series[i] || !series[i].series) {
						field.setValue(null);
					} else {
						switch(this.seriesFields[j]) {
						case 'series_a':
							var seriesA_value = getDataArrayItem(field.aData.data, 
											     series[i]['series'], 
											     field.aData.fields.indexOf('id_main'), 
											     field.aData.fields.indexOf('id'));
							field.setValue(seriesA_value);
							this.fillComboSeriesB(i, seriesA_value);
							break;
						case 'series_b':
							field.setValue(series[i]['series']);
							break;
						default:
							field.setValue(series[i][this.seriesFields[j]]);
						}
					}
				}
			}
			this.seriesFilters[i] = series && i < series.length ? series[i]['filter'] : null;
			this.setSeriesFilterBtnIconCls(i, this.seriesFilters[i] && isDataSet(this.seriesFilters[i]));
			this.seriesTimeOffset[i] = series && i < series.length ? series[i]['timeOffset'] : null;
			this.seriesIntervals[i] = series && i < series.length ? series[i]['multiSeriesIntervals'] : null;
			this.setSeriesToolsBtnIconCls(i, 
				this.isMultiSeriesIntervals(this.getSeriesForIndexSeries(i)) ?
				 this.seriesIntervals[i] && this.isDiffIntervalSeries(this.seriesIntervals[i], i) :
				 this.seriesTimeOffset[i] && isDataSet(this.seriesTimeOffset[i]));
		}
		this.setContextSeriesFields();
		--this.disableClearChartType;
	},
	setFilterFields: function(filters) {
		if(!this.disableFilters) {
			if(this._typeChart == 'CDR') {
				if(!this.disableFilterCommon) {
					CDR.Filter.setValueFieldsFieldset(filters, this, 'common');
					CDR.Filter.loadTemplates(this, filters && filters.ffilterTemplate);
				}
				if(!this.disableFilterRTP) {
					CDR.Filter.setValueFieldsFieldset(filters, this, 'rtp');
					if(window.existsDscpCdr) {
						CDR.Filter.setValueFieldsFieldset(filters, this, 'dscp');
					}
					CDR.Filter.setValueFieldsFieldset(filters, this, 'filters_comb');
				}
			} else if(this._typeChart == 'MESSAGES') {
				Message.Filter.setValueFieldsFieldset(filters, this);
			} else if(this._typeChart == 'SIP_MSG') {
				SipMsg.Filter.setValueFieldsFieldset(filters, this);
			}
		}
	},
	getSeries: function() {
		var series = [];
		for(var i = 0; i < this.seriesRows.length; i++) {
			var fieldSeries = this.getForm().findField('series_a_' + i);
			if(fieldSeries && fieldSeries.getValue()) {
				var seriesItem  = {};
				for(var j = 0; j < this.seriesFields.length; j++) {
					var fieldName = this.seriesFields[j] + '_' + i;
					var field = this.getForm().findField(fieldName);
					if(field) {
						seriesItem[this.seriesFields[j]] = field.getValue();
					}
				}
				seriesItem['filter'] = this.seriesFilters[i];
				seriesItem['timeOffset'] = this.seriesTimeOffset[i];
				seriesItem['multiSeriesIntervals'] = this.seriesIntervals[i];
				series.push(seriesItem);
			}
		}
		this.completeSeries(series);
		return(series);
	},
	setContextSeriesFields: function(field, event) {
		var okCombinationToArea = null;
		var fieldCombinationToArea = this.getForm().findField('combinationToArea');
		var valueCombinationToArea = fieldCombinationToArea.getValue();
		var fieldMaximumAreaItems = this.getForm().findField('maximumAreaItems');
		var existsArea = false;
		var firstSeriesType = null;
		var setLeftAxis = false;
		var setRightAxis = false;
		for(var i = 0; i < this.seriesRows.length; i++) {
			var fieldSeriesA = this.getForm().findField('series_a_' + i);
			var fieldSeriesB = this.getForm().findField('series_b_' + i);
			if(fieldSeriesA && fieldSeriesB) {
				var seriesA = fieldSeriesA.getValue();
				var seriesB = fieldSeriesB.getValue();
				var series = this.getSeriesFromAB(seriesA, seriesB, fieldSeriesA);
				var paramSeries = this.isParamSeries(series);
				var multiSeries = this.isMultiSeries(series);
				var multiSeriesIntervals = this.isMultiSeriesIntervals(series);
				var fieldValuesSeries = {};
				for(var j = 1; j < this.seriesFields.length; j++) {
					var fieldNameBase = this.seriesFields[j];
					var fieldName = this.seriesFields[j] + '_' + i;
					var field = this.getForm().findField(fieldName);
					if(field) {
						var fieldValue = field.getValue();
						fieldValuesSeries[fieldNameBase] = field.getValue();
						var enableField = false;
						if(series) {
							switch(this.seriesFields[j]) {
							case 'series_b':
								enableField = fieldSeriesB.store.getCount() > 1;
								break;
							case 'param':
								enableField = paramSeries;
								break;
							case 'sideAxis':
							case 'primaryAxis':
								enableField = !valueCombinationToArea;
								break;
							case 'baseType':
							case 'lineType':
							case 'color':
								enableField = !multiSeries && !valueCombinationToArea;
								break;
							case 'trend':
								enableField = true;
								break;
							case 'fill':
							case 'markers':
							case 'smooth':
								enableField = (fieldValuesSeries['baseType'] == 'line' ||
									       fieldValuesSeries['baseType'] == 'column_line' ||
									       fieldValuesSeries['baseType'] == 'trend') &&
									      !multiSeries && !valueCombinationToArea;
								break;
							case 'percent':
								enableField = multiSeries;
								break;
							}
						}
						field.setDisabled(!enableField);
						if(!enableField && fieldNameBase == 'param') {
							field.setValue(null);
						}
						if(series) {
							if(fieldValue === null) {
								var defaultFieldValue = this.seriesFields[j] == 'baseType' && multiSeries ?
											 'area' :
											 this.seriesFieldsDefault[j-1]
								field.setValue(defaultFieldValue);
								fieldValue = defaultFieldValue;
							} else {
								if(this.seriesFields[j] == 'baseType') {
									if(multiSeries ? (fieldValue != 'area') : (fieldValue == 'area')) {
										var fixFieldValue = multiSeries ? 'area' : this.seriesFieldsDefault[j-1];
										field.setValue(fixFieldValue);
										fieldValue = fixFieldValue;
									}
								}
							}
							fieldValuesSeries[fieldNameBase] = field.getValue();
							if(this.seriesFields[j] == 'baseType') {
								field.fillData(multiSeries ? [
									'area'
								] : [
									'line',
									'column',
									'column_line'
								]);
								field.setValue(fieldValue);
							}
						} else {
							field.setValue(null);
						}
						if(series) {
							if(i == 0) {
								firstSeriesType = series;
							} else if(firstSeriesType != series) {
								okCombinationToArea = false;
							} else if(i == 1 && okCombinationToArea === null) {
								okCombinationToArea = true;
							}
							switch(this.seriesFields[j]) {
							case 'baseType':
								if(fieldValue == 'area') {
									okCombinationToArea = false;
									existsArea = true;
								}
								break;
							case 'sideAxis':
								switch(fieldValue) {
								case 'left':
									setLeftAxis = true;
									break;
								case 'right':
									setRightAxis = true;
									break;
								}
								break;
							}
						}
					}
				}
				var btnFilter = this.findC('_id', 'filter_' + i);
				btnFilter.showIf(series);
				var btnTools = this.findC('_id', 'tools_' + i);
				btnTools._isMultiseriesIntervals = !!multiSeriesIntervals;
				btnTools.showIf(series && (multiSeriesIntervals || !multiSeries));
			}
		}
		if(fieldCombinationToArea) {
			fieldCombinationToArea.enableIf(okCombinationToArea);
			fieldCombinationToArea.showIf(okCombinationToArea);
			if(!okCombinationToArea) {
				fieldCombinationToArea.setValue(false);
			}
		}
		if(fieldMaximumAreaItems) {
			fieldMaximumAreaItems.enableIf(existsArea);
			fieldMaximumAreaItems.showIf(existsArea);
			if(!existsArea) {
				fieldMaximumAreaItems.setValue(null);
			}
		}
		this.fieldEnableIf([
			'axisTitleLeft',
			'leftAxisMinWidth',
			'leftLimitLineValue',
			'leftPercTrend' ], 
			setLeftAxis);
		this.fieldEnableIf('leftLimitLineColor', setLeftAxis && this.getFieldValue('leftLimitLineValue'));
		this.fieldEnableIf('leftPerc95_Color', setLeftAxis && this.getFieldValue('leftPercTrend'));
		this.fieldEnableIf('leftPerc99_Color', setLeftAxis && this.getFieldValue('leftPercTrend'));
		this.fieldEnableIf([
			'axisTitleRight',
			'rightAxisMinWidth',
			'rightLimitLineValue',
			'rightPercTrend' ],
			setRightAxis);
		this.fieldEnableIf('rightLimitLineColor', setRightAxis && this.getFieldValue('rightLimitLineValue'));
		this.fieldEnableIf('rightPerc95_Color', setRightAxis && this.getFieldValue('rightPercTrend'));
		this.fieldEnableIf('rightPerc99_Color', setRightAxis && this.getFieldValue('rightPercTrend'));
	},
	createSeriesRowIfNeed: function() {
		var lastFieldSeriesA = this.getForm().findField('series_a_' + (this.seriesRows.length-1));
		if(lastFieldSeriesA.getValue()) {
			this.addSeriesRow();
		}
	},
	addSeriesRow: function() {
		var newSeriesRow = this.createSeriesRow(this.seriesRows.length, this);
		this.seriesRows.push(newSeriesRow);
		this.seriesRowsContainer.add(newSeriesRow);
	},
	fillComboSeriesB: function(indexSeries, valueSeriesA) {
		var comboSeriesB = this.getForm().findField('series_b_' + indexSeries);
		comboSeriesB.fillData(valueSeriesA);
	},
	setFirstValueInComboSeriesB: function(indexSeries) {
		var comboSeriesB = this.getForm().findField('series_b_' + indexSeries);
		comboSeriesB.setFirstValue();
	},
	getSeriesFromAB: function(seriesA, seriesB, comboSeriesA) {
		if(!comboSeriesA) {
			comboSeriesA = this.getForm().findField('series_a_0');
		}
		var menuData = comboSeriesA.aData.data;
		var idIndexComboSeriesA = comboSeriesA.aData.fields.indexOf('id');
		var id = null;
		var counter = 0;
		for(var i = 0; i < menuData.length; i++) {
			if(menuData[i][idIndexComboSeriesA] == seriesA) {
				id = menuData[i][0];
				++counter;
			}
		}
		if(counter == 1) {
			return(id);
		}
		return(seriesB);
	},
	getSeriesForIndexSeries: function(indexSeries) {
		var fieldSeriesA = this.getForm().findField('series_a_' + indexSeries);
		var fieldSeriesB = this.getForm().findField('series_b_' + indexSeries);
		if(fieldSeriesA && fieldSeriesB) {
			var seriesA = fieldSeriesA.getValue();
			var seriesB = fieldSeriesB.getValue();
			return(this.getSeriesFromAB(seriesA, seriesB));
		}
		return(null);
	},
	setDefaultParamSeries: function(comboSeries) {
		var series = this.getSeriesForIndexSeries(comboSeries._indexSeries);
		var defaultParam = this.getDefaultParamSeries(series);
		if(defaultParam) {
			var paramField = this.getForm().findField('param_' + comboSeries._indexSeries);
			if(paramField) {
				paramField.setValue(defaultParam);
			}
		}
	},
	setDefaultIntervalsSeries: function(comboSeries) {
		var series = this.getSeriesForIndexSeries(comboSeries._indexSeries);
		var defaultIntervals = this.getDefaultIntervalsSeries(series);
		if(defaultIntervals) {
			this.seriesIntervals[comboSeries._indexSeries] = defaultIntervals;
		}
	},
	clearChartType: function() {
		if(!this.disableClearChartType) {
			var chartTypeField = this.getForm().findField('chartType');
			var lastChartTypeId = chartTypeField.getValue();
			var lastChartTypeName = chartTypeField.getRawValue();
			var lastChartTypeSelectRecord = chartTypeField.findRecordByValue(lastChartTypeId);
			if(lastChartTypeId && lastChartTypeName && lastChartTypeSelectRecord) {
				chartTypeField.setValue(null);
				this.enablerSaveDeleteChartConfig();
				if(lastChartTypeSelectRecord.data && lastChartTypeSelectRecord.data.customId) {
					chartTypeField.setRawValue(lastChartTypeName + ' *');
					this.lastChartTypeId = lastChartTypeId;
					this.lastChartTypeName = lastChartTypeName;
				}
			}
		}
	},
	loadTypeCharts: function() {
		ajaxSafeRequest({
			scope: this,
			url: 'php/reports/charts.php',
			params: {
				task: this._typeChart == 'CDR' ? 'getCdrChartTypeCharts' :
				      this._typeChart == 'MESSAGES' ? 'getMessagesChartTypeCharts' : 
				      this._typeChart == 'SIP_MSG' ? 'getSipMsgChartTypeCharts' : null
			},
			success: function(result) {
				this.fillStoreTypeCharts(result.typeCharts);
			}
		});
	},
	fillStoreTypeCharts: function(typeChartsData) {
		var cmbChartType = this.getForm().findField('chartType');
		if(typeChartsData) {
			for(var i = 0; i < typeChartsData.length; i++) {
				var id = 'TCH_custom_' + typeChartsData[i].id;
				this.addTypeChart(cmbChartType, {
					id: id,
					name: typeChartsData[i].name,
					customId: typeChartsData[i].id,
					chartConfig: typeChartsData[i].config
				});
			}
		}
		if(cmbChartType._initValue && !cmbChartType._initValueSet) {
			cmbChartType.setValue(cmbChartType._initValue);
			cmbChartType._initValueSet = true;
		}
		this.enablerSaveDeleteChartConfig();
	},
	addTypeChart: function(cmbChartType, data, newItem, enableUpdate) {
		var insertPosition = 0;
		for(var i = 0; i < cmbChartType.store.getCount(); i++) {
			if(!(cmbChartType.store.getAt(i).data.id.match &&
			     cmbChartType.store.getAt(i).data.id.match(/^TCH_custom/))) {
				++insertPosition;
			} else if(cmbChartType.store.getAt(i).data.descr <= data.name) {
				++insertPosition;
			} else {
				break;
			}
		}
		cmbChartType.addMenuItem({
				id: data.id,
				descr: data.name,
				descrMenu: (newItem ? 
					     '<span style="color: green;">' :
					    data.customId ?
					     '<span style="color: blue;">' :
					     '') + 
					   data.name + 
					   (newItem || data.customId ? '</span>' : ''),
				customId: data.customId,
				chartConfig: data.chartConfig
			}, enableUpdate, false, insertPosition);
	},
	loadTypeTimeAxises: function() {
		if(this.cdrChartConfig) {
			return;
		}
		var fixTypeTimeAxis = this.fixTypeTimeAxis;
		if(!this.disableLoadTypeTimeAxises && !this.dashboardConfig) {
			if(this.dailyReportConfig) {
				var typeTimeInterval = this.getForm().findField('typeTimeInterval').getValue();
				if(!typeTimeInterval) {
					typeTimeInterval = 'this_month';
				}
				var typeTimeAxises;
				switch(typeTimeInterval) {
				case 'last_hour':
				case 'last_2h':
				case 'last_3h':
					typeTimeAxises = [
						[ 'TA_MINUTES',  3 ],
						[ 'TA_QUARTER',  2 ],
						[ 'TA_HOURS',    1 ]
					];
					break;
				case 'last_8h':
					typeTimeAxises = [
						[ 'TA_5MINUTES', 3 ],
						[ 'TA_QUARTER',  2 ],
						[ 'TA_HOURS',    1 ]
					];
					break;
				case 'last_24h':
				case 'today':
				case 'yesterday':
					typeTimeAxises = [
						[ 'TA_QUARTER',  2 ],
						[ 'TA_HOURS',    1 ]
					];
					break;
				case 'this_week_m':
				case 'this_week_s':
					typeTimeAxises = [
						[ 'TA_HOURS',    2 ],
						[ 'TA_DAYS',     1 ]
					];
					break;
				case 'this_month':
				case 'prev_month':
				case 'last_30d':
				case 'last_60d':
				case 'last_90d':
					typeTimeAxises = [
						[ 'TA_DAYS',     2 ],
						[ 'TA_WEEKS',    1 ]
					];
					break;
				default:
					typeTimeAxises = [
						[ 'TA_HOURS',    2 ]
						[ 'TA_DAYS',     1 ]
					];
				}
				this.fillStoreTypeTimeAxises(typeTimeAxises, fixTypeTimeAxis);
			} else {
				var params = {};
				if(this.filtersFromParent) {
					applyDateFromToFromFiltersFromParent(params, this.filtersFromParent, this._typeChart);
				} else {
					Ext.applyIf(params, {
						dateFrom: this.getForm().findField('dateFrom').getValue(),
						dateTo: this.getForm().findField('dateTo').getValue()
					});
				}
				ajaxSafeRequest({
					scope: this,
					url: 'php/reports/charts.php',
					params: {
						task: this._typeChart == 'CDR' ? 'getCdrChartTypeTimeAxises' :
						      this._typeChart == 'MESSAGES' ? 'getMessagesChartTypeTimeAxises' : 
						      this._typeChart == 'SIP_MSG' ? 'getSipMsgChartTypeTimeAxises' : null,
						params: Ext.encode(params)
					},
					success: function(result) {
						this.fillStoreTypeTimeAxises(result.typeTimeAxises, fixTypeTimeAxis);
					}
				});
			}
		}
	},
	fillStoreTypeTimeAxises: function(typeTimeAxisesData, fixTypeTimeAxis, keepEmpty) {
		var cmbTypeTimeAxises = this.getForm().findField('timeAxis');
		var oldSelectValue = fixTypeTimeAxis || cmbTypeTimeAxises.getValue() || cmbTypeTimeAxises._initValue;
		var initSelectValue = null;
		if(cmbTypeTimeAxises.store) {
			cmbTypeTimeAxises.store.removeAll();
		}
		if(typeTimeAxisesData.length) {
			var newData = [];
			var existOldSelectValue;
			for(var i = 0; i < typeTimeAxisesData.length; i++) {
				newData.push([
					typeTimeAxisesData[i][0],
					arLang['LtimeAxis_'+typeTimeAxisesData[i][0]],
					typeTimeAxisesData[i][1]
				]);
				if(oldSelectValue===typeTimeAxisesData[i][0]) {
					existOldSelectValue = true
				}
				if(initSelectValue===null && typeTimeAxisesData[i][1] < 200) {
					initSelectValue = typeTimeAxisesData[i][0]
				}
			}
			cmbTypeTimeAxises.store.loadData(newData);
			cmbTypeTimeAxises.store.proxy.data = newData;
			++this.disableClearChartType;
			cmbTypeTimeAxises.setValue(existOldSelectValue || keepEmpty ?
						    oldSelectValue :
						    initSelectValue || typeTimeAxisesData[0]);
			--this.disableClearChartType;
		}
	},
	completeChartConfig: function(chartType, chartConfigData, chartConfig) {
		if(!chartConfig) {
			if(chartConfigData) {
				chartConfig = Ext.isString(chartConfigData) ? Ext.decode(chartConfigData) : chartConfigData;
			} else if(chartType) {
				defChartType = this._typeChart && arCdrChart_defChartTypes[chartType][this._typeChart] ||
					       arCdrChart_defChartTypes[chartType];
				chartConfig = cloneChartConfig(defChartType, this.filtersFromParent);
			}
		}
		if(chartConfig) {
			if(!chartConfig._typeChart) {
				chartConfig._typeChart = this._typeChart || 'CDR';
			}
			if(!this._typeChart) {
				this._typeChart = chartConfig._typeChart;
			}
			if(chartConfig.dateFrom && Ext.isString(chartConfig.dateFrom)) {
				chartConfig.dateFrom = dateTimeStringToDate(chartConfig.dateFrom);
				if(!Ext.isDefined(chartConfig.dateFrom.timeDefined) && chartConfig.isDashboardExport) {
					chartConfig.dateFrom.timeDefined = true;
				}
			}
			if(chartConfig.dateTo && Ext.isString(chartConfig.dateTo)) {
				chartConfig.dateTo = dateTimeStringToDate(chartConfig.dateTo);
				if(!Ext.isDefined(chartConfig.dateTo.timeDefined) && chartConfig.isDashboardExport) {
					chartConfig.dateTo.timeDefined = true;
				}
			}
			this.completeSeries(chartConfig.series);
		}
		return(chartConfig);
	},
	completeSeries: function(series) {
		for(var i = 0; i < series.length; i++) {
			if(series[i].series_a || series[i].series_b) {
				series[i].series = this.getSeriesFromAB(series[i].series_a, series[i].series_b);
				delete series[i].series_a;
				delete series[i].series_b;
			}
			Ext.applyIf(series[i], {
				sideAxis: 'left',
				baseType: 'line',
				lineType: 'solid',
				trend: false,
				fill: false,
				markers: false,
				smooth: true
			});
			if(Ext.isDefined(series[i].color)) {
				series[i].color = aliasColorToHexRgb(series[i].color);
			}
			var dataSeries = this.getDataSeries(series[i].series);
			if(dataSeries) {
				var data2Series = this.getData2Series(series[i].series);
				Ext.applyIf(series[i], {
					varName: dataSeries[5],
					varName2: 's_' + (i + 1),
					title: dataSeries[3],
					titleBase: this.formatTitleBase(dataSeries[4], dataSeries[1], series[i].param),
					chartType: dataSeries[4],
					multiSeries: dataSeries.length>6 ? dataSeries[6] == 'multiSeries' : null,
					multiSeriesIntervals: dataSeries.length>8 ? dataSeries[6] == 'multiSeries' && dataSeries[8] : null,
					paramSeries: dataSeries.length>6 ? dataSeries[6] == 'param' : null,
					param: dataSeries.length>7 ? dataSeries[6] == 'param' && dataSeries[7] : null,
					unit: data2Series && data2Series.unit
				});
			}
		}
	},
	formatTitleBase: function(type, name, param) {
		return(type == 'TCH_count_perc_short' ?
			name + ' <' + param + 's' :
			name + (name && param ? ' - ' + param : ''));
	},
	getDataSeries: function(seriesType) {
		var data = this._typeChart == 'CDR' ? arCdrChart_chartSeriesTypes :
			   this._typeChart == 'MESSAGES' ? arMessagesChart_chartSeriesTypes : 
			   this._typeChart == 'SIP_MSG' ? arSipMsgChart_chartSeriesTypes : [];
		for(var i = 0; i < data.length; i++) {
			if(data[i][0] == seriesType) {
				return(data[i]);
			}
		}
		return(null);
	},
	getData2Series: function(seriesType) {
		var data = this._typeChart == 'CDR' ? arCdrChart_chartSeriesData :
			   this._typeChart == 'MESSAGES' ? arMessagesChart_chartSeriesData :
			   this._typeChart == 'SIP_MSG' ? arSipMsgChart_chartSeriesData : [];
		for(var i = 0; i < data.length; i++) {
			if(data[i][0] == seriesType) {
				return(data[i][1]);
			}
		}
		return(null);
	},
	isParamSeries: function(seriesType) {
		var dataSeries = this.getDataSeries(seriesType);
		return(dataSeries && dataSeries.length > 6 &&
		       dataSeries[6] == 'param');
	},
	getDefaultParamSeries: function(seriesType) {
		var dataSeries = this.getDataSeries(seriesType);
		return(dataSeries && dataSeries.length > 7 && dataSeries[6] == 'param' ?
			dataSeries[7] : null);
	},
	getDefaultIntervalsSeries: function(seriesType) {
		var dataSeries = this.getDataSeries(seriesType);
		return(dataSeries && dataSeries.length > 8 && dataSeries[6] == 'multiSeries' ?
			dataSeries[8] : null);
	},
	isDiffIntervalSeries: function(intervals, indexSeries) {
		var series = this.getSeriesForIndexSeries(indexSeries);
		var defaultIntervals = this.getDefaultIntervalsSeries(series);
		if(!defaultIntervals && !intervals) {
			return(false);
		}
		if(!defaultIntervals && intervals && intervals.length ||
		   defaultIntervals && !intervals ||
		   defaultIntervals.length != intervals.length) {
			return(true);
		}
		for(var i = 0; i < intervals.length; i++) {
			for(var j = 0; j < 2; j++) {
				if(intervals[i][j] != defaultIntervals[i][j]) {
					return(true);
				}
			}
		}
		return(false);
	},
	isMultiSeries: function(seriesType) {
		var dataSeries = this.getDataSeries(seriesType);
		return(dataSeries && dataSeries.length > 6 &&
		       dataSeries[6] == 'multiSeries');
	},
	isMultiSeriesIntervals: function(seriesType) {
		var dataSeries = this.getDataSeries(seriesType);
		return(dataSeries && dataSeries.length > 8 &&
		       dataSeries[6] == 'multiSeries' &&
		       dataSeries[8]);
	},
	saveChartConfig: function() {
		var cmbChartType = this.getForm().findField('chartType');
		var formPanel = new Ext.FormPanel({
			frame: true,
			border: false,
			items: {xtype: 'textfield', name: 'name', fieldLabel: this.findLangS('field', 'chartName'),
				value: this.lastChartTypeName,
				width: __width_FormChar(12,25), allowBlank: false},
			buttons: [{
				text: this.findLangS('button', 'saveTemplate'),
				iconCls: 'icon_save',
				handler: save,
				scope: this
			},{
				text: this.findLangS('button', 'cancel'),
				iconCls: 'icon_cancel',
				handler: function() {
					formPanel.destroyWindow();
				},
				scope: this
			}],
			listeners: {
				scope: this,
				afterrender: function() {
					Ext.create('Ext.util.KeyNav', formPanel.el, {
						enter: save,
						scope: this
					});
				}
			}
		});
		var saveWindow = new Ext.Window({
			layout: 'fit',
			items: formPanel,
			border: false,
			title: this.findLangS('title', 'saveChartConfig'),
			modal: true,
			closable: true,
			listeners: {
				scope: this,
				activate: function() {
					formPanel.getForm().findField('name').focus(false, 200);
				}
			}
		});
		saveWindow.show();
		function save() {
			if(formPanel.getForm().isValid()) {
				var chartName = formPanel.getForm().findField('name').getValue();
				var chartConfig = this.getChartConfig();
				this.saveChartConfigAjax(chartName, chartConfig, false, formPanel, cmbChartType);
			}
		}
	},
	saveChartConfigAjax: function(chartName, chartConfig, enableUpdate, formPanel, cmbChartType) {
		ajaxSafeRequest({
			scope: this,
			url: 'php/reports/charts.php',
			params: {
				task: 'saveChartConfig',
				params: Ext.encode({
					name: chartName,
					user_id: user_id(),
					config:  Ext.encode(chartConfig),
					enableUpdate: enableUpdate,
					typeChart: this._typeChart
				})
			},
			success: function(responseData) {
				var id = 'TCH_custom_' + responseData.id;
				this.addTypeChart(cmbChartType, {
						id: id,
						name: chartName,
						customId: responseData.id,
						chartConfig: Ext.encode(chartConfig)
					}, true, true);
				cmbChartType.setValue(id);
				this.enablerSaveDeleteChartConfig();
				formPanel.destroyWindow();
			},
			error: function(responseData, response) {
				if(responseData.error == 'name_duplication') {
					Ext.Msg.confirm(
						this.findLangS('text', 'msgDuplicationNameTitle'),
						this.findLangS('text', 'msgDuplicationNameText'),
						function(rslt) {
							if(rslt == 'yes') {
								this.saveChartConfigAjax(chartName, chartConfig, true, formPanel, cmbChartType);
							} else {
								formPanel.destroyWindow();
							}
						},
						this);
				} else {
					alertAjaxError(response);
				}
			},
			maskEl: formPanel
		});
	},
	deleteChartConfig: function() {
		var cmbChartType = this.getForm().findField('chartType');
		var selectRecord = cmbChartType.findRecordByValue(cmbChartType.getValue());
		Ext.Msg.confirm(
			this.findLangS('text', 'msgDeleteChartConfirmTitle'),
			this.findLangS('text', 'msgDeleteChartConfirmText'),
			function(rslt) {
				if(rslt == 'yes') {
					this.deleteChartConfigAjax(selectRecord.data.customId, cmbChartType);
				}
			},
			this);
	},
	deleteChartConfigAjax: function(configId, cmbChartType) {
		ajaxSafeRequest({
			scope: this,
			url: 'php/reports/charts.php',
			params: {
				task: 'deleteChartConfig',
				params: Ext.encode({
					id: configId
				})
			},
			success: function(responseData) {
				cmbChartType.deleteMenuItem('TCH_custom_' + configId);
				cmbChartType.setValue(null);
				this.enablerSaveDeleteChartConfig();
			}
		});
	},
	setTimeInterval: function() {
		if(this.filtersFromParent || this.cdrChartConfig || this.dashboardConfig) {
			return;
		}
		++this.disableClearChartType;
		var typeTimeInterval = this.getForm().findField('typeTimeInterval').getValue();
		var intervalOffsetField = this.getForm().findField('intervalOffset');
		var intervalOffset = intervalOffsetField && intervalOffsetField.getValue() || null;
		if(typeTimeInterval) {
			var timeInterval = getTimeInterval(typeTimeInterval, {
							   prevInterval: this.prevInterval,
							   prevIntervalHourTolerance: this.prevIntervalHourTolerance,
							   actTime: null,
							   forChart: true,
							   intervalOffset: intervalOffset});
			++this.disableLoadTypeTimeAxises;
			if(typeTimeInterval == 'today' ||
			   typeTimeInterval == 'yesterday') {
				var dateFrom = this.getForm().findField('dateFrom').getValue();
				var dateTo = this.getForm().findField('dateTo').getValue();
				if(dateFrom && time_sec(dateFrom)) {
					timeInterval[0] = completeDateTime(timeInterval[0], dateFrom);
				}
				if(dateTo && time_sec(dateTo)) {
					timeInterval[1] = completeDateTime(timeInterval[1] ? timeInterval[1] : timeInterval[0], dateTo);
				}
			}
			this.getForm().findField('dateFrom').setValue(timeInterval[0]);
			this.getForm().findField('dateTo').setValue(timeInterval[1]);
			--this.disableLoadTypeTimeAxises;
			this.loadTypeTimeAxises();
			this.clearChartType();
			this.lastTimeInterval = {
				type: typeTimeInterval,
				interval: timeInterval
			};
			this.onChangeTimeInterval();
		} else {
			this.lastTimeInterval = null;
			this.onChangeTimeInterval();
		}
		if(typeTimeInterval == 'today' ||
		   typeTimeInterval == 'yesterday') {
			this.getForm().findField('dateFrom').enableTime(true);
			this.getForm().findField('dateTo').enableTime(true);
		} else {
			this.getForm().findField('dateFrom').setDisabled(typeTimeInterval || this.dailyReportConfig);
			this.getForm().findField('dateTo').setDisabled(typeTimeInterval || this.dailyReportConfig);
		}
		--this.disableClearChartType;
	},
	onChangeTimeInterval: function() {
		var intervalOffsetField = this.getForm().findField('intervalOffset');
		if(intervalOffsetField) {
			intervalOffsetField.enableIf(this.lastTimeInterval &&
						     this.lastTimeInterval.interval[2].applicableIntervalOffset);
		}
	},
	enablerSaveDeleteChartConfig: function() {
		var cmbChartType = this.getForm().findField('chartType');
		if(!cmbChartType.store) {
			return;
		}
		var selectValue = cmbChartType.getValue();
		var selectRecord = cmbChartType.findRecordByValue(selectValue);
		if(this.btnSaveChartConfig) {
			this.btnSaveChartConfig.setVisible(!selectRecord && !selectValue &&
							   !(cmbChartType._initValue && !cmbChartType._initValueSet));
		}
		if(this.btnDeleteChartConfig) {
			this.btnDeleteChartConfig.setVisible(selectRecord && selectRecord.data.customId &&
							     (user_is_admin() ||
							      user_can_delete_all_templates() ||
							      selectRecord.data.user_id == user_id()));
		}
	},
	setSeriesFilter: function(indexSeries) {
		if(this._typeChart == 'CDR') {
			var itemsForm_common = CDR.Filter.getFieldset('common', {
				disableTimeInterval: true,
				disableSelections: true,
				values: this.seriesFilters[indexSeries] || {}
			});
			var itemsForm_rtp = CDR.Filter.getFieldset('rtp', {
				values: this.seriesFilters[indexSeries] || {}
			});
			var itemsForm_dscp = window.existsDscpCdr ? CDR.Filter.getFieldset('dscp', {
				values: this.seriesFilters[indexSeries] || {}
			}) : null;
			var itemsForm_filtersComb = CDR.Filter.getFieldset('filters_comb', {
				values: this.seriesFilters[indexSeries] || {}
			});
			var widthForm = 705;
			var heightForm = __height_Form(itemsForm_common.length);
			var itemsFormTabs = [{
				xtype: 'container',
				items: itemsForm_common,
				title: this.findLangS('title', 'filterCommon'),
				style: {
					paddingTop: 4, paddingLeft: 4, paddingRight: 4,
					'background-color': __color_FormBackground
				},
				width: widthForm,
				height: heightForm
			},{
				xtype: 'container',
				items: itemsForm_rtp,
				title: this.findLangS('title', 'filterRTP'),
				style: {
					paddingTop: 4, paddingLeft: 4, paddingRight: 4,
					'background-color': __color_FormBackground
				},
				width: widthForm,
				height: heightForm
			}];
			if(itemsForm_dscp) {
				itemsFormTabs.push({
					xtype: 'container',
					items: itemsForm_dscp,
					title: this.findLangS('title', 'filterDSCP'),
					style: {
						paddingTop: 4, paddingLeft: 4, paddingRight: 4,
						'background-color': __color_FormBackground
					},
					width: widthForm,
					height: heightForm
				});
			}
			itemsFormTabs.push({
				xtype: 'container',
				items: itemsForm_filtersComb,
				title: this.findLangS('title', 'filterFiltersComb'),
				style: {
					paddingTop: 4, paddingLeft: 4, paddingRight: 4,
					'background-color': __color_FormBackground
				},
				width: widthForm,
				height: heightForm
			});
			var itemsForm = [{
				xtype: 'textfield', name: 'series_title', value: (this.seriesFilters[indexSeries] || {}).series_title,
				fieldLabel: this.findLangS('field', 'seriesTitle'), width: __width_FormChar(15, 35)
			},{
				xtype: 'tabpanel',
				items: itemsFormTabs,
				border: false
			}];
		} else if(this._typeChart == 'MESSAGES') {
			var itemsForm = Message.Filter.getFieldset({
				disableTimeInterval: true,
				values: this.seriesFilters[indexSeries] || {}
			});
			var widthForm = 705;
			var heightForm = __height_Form(itemsForm.length);
			var itemsForm = [{
				xtype: 'textfield', name: 'series_title', value: (this.seriesFilters[indexSeries] || {}).series_title,
				fieldLabel: this.findLangS('field', 'seriesTitle'), width: __width_FormChar(15, 35)
			},{
				xtype: 'tabpanel',
				items: [{
					xtype: 'container',
					items: itemsForm,
					title: this.findLangS('title', 'filterCommon'),
					style: {
						paddingTop: 4, paddingLeft: 4, paddingRight: 4,
						'background-color': __color_FormBackground
					},
					width: widthForm,
					height: heightForm
				}],
				border: false
			}];
		} else if(this._typeChart == 'SIP_MSG') {
			var itemsForm = SipMsg.Filter.getFieldset({
				modelType: 'stored',
				disableTimeInterval: true,
				values: this.seriesFilters[indexSeries] || {}
			});
			var widthForm = 705;
			var heightForm = __height_Form(itemsForm.length);
			var itemsForm = [{
				xtype: 'textfield', name: 'series_title', value: (this.seriesFilters[indexSeries] || {}).series_title,
				fieldLabel: this.findLangS('field', 'seriesTitle'), width: __width_FormChar(15, 35)
			},{
				xtype: 'tabpanel',
				items: [{
					xtype: 'container',
					items: itemsForm,
					title: this.findLangS('title', 'filterCommon'),
					style: {
						paddingTop: 4, paddingLeft: 4, paddingRight: 4,
						'background-color': __color_FormBackground
					},
					width: widthForm,
					height: heightForm
				}],
				border: false
			}];
		}
		var formPanelFilter = new Ext.FormPanel({
			frame: true,
			border:false,
			waitMsgTarget: true,
			autoHeight: true,
			items: itemsForm,
			buttons: [{
				scope: this,
				text: this.findLangS('button', 'ok'),
				iconCls: 'icon_ok',
				handler: function() {
					if(formPanelFilter.getForm().isValid()) {
						setSeriesFilter.call(this);
						windowFilter.destroy();
					}
				}
			},{
				iconCls: 'icon_cancel',
				text: this.findLangS('button', 'close'),
				handler: function () {
					windowFilter.destroy();
				}
			},{
				scope: this,
				iconCls: 'icon_cross',
				text: this.findLangS('button', 'remove'),
				handler: function () {
					this.seriesFilters[indexSeries] = null;
					this.setSeriesFilterBtnIconCls(indexSeries, false);
					windowFilter.destroy();
				}
			}],
			listeners: {
				scope: this,
				afterrender: function() {
					Ext.create('Ext.util.KeyNav', formPanelFilter.el, {
						enter: function() {
							if(formPanelFilter.getForm().isValid()) {
								setSeriesFilter.call(this);
								windowFilter.destroy();
							}
						},
						scope: this
					});
					if(this._typeChart == 'CDR') {
						CDR.Filter.setContextFields(formPanelFilter);
					} else if(this._typeChart == 'MESSAGES') {
						Message.Filter.setContextFields(formPanelFilter);
					} else if(this._typeChart == 'SIP_MSG') {
						SipMsg.Filter.setContextFields(formPanelFilter);
					}
				}
			}
		});
		var windowFilter = new Ext.Window({
			scope: this,
			title: this.findLangS('title', 'seriesFilter'),
			closable: true,
			border: false,
			plain: true,
			layout: 'fit',
			modal: true,
			items: formPanelFilter,
			formPanelForAutoAdjustSize: formPanelFilter
		});
		windowFilter.show();
		
		function setSeriesFilter() {
			if(this._typeChart == 'CDR') {
				this.seriesFilters[indexSeries] = CDR.Filter.fetchValuesFromFieldset_all(formPanelFilter, false, true);
			} else if(this._typeChart == 'MESSAGES') {
				this.seriesFilters[indexSeries] = Message.Filter.fetchValuesFromFieldset(formPanelFilter, false, true);
			} else if(this._typeChart == 'SIP_MSG') {
				this.seriesFilters[indexSeries] = SipMsg.Filter.fetchValuesFromFieldset(formPanelFilter, false, true);
			}
			this.seriesFilters[indexSeries].series_title = formPanelFilter.getForm().findField('series_title').getValue();
			if(isDataSet(this.seriesFilters[indexSeries])) {
				this.setSeriesFilterBtnIconCls(indexSeries, true);
			} else {
				this.seriesFilters[indexSeries] = null;
				this.setSeriesFilterBtnIconCls(indexSeries, false);
			}
			this.clearChartType();
		}
	},
	setSeriesTools: function(button, indexSeries) {
		if(button._isMultiseriesIntervals) {
			this.setSeriesTools_intervals(indexSeries);
		} else {
			this.setSeriesTools_timeOffset(indexSeries);
		}
	},
	setSeriesTools_timeOffset: function(indexSeries) {
		var subsystem = 'charts';
		var timeOffset = this.seriesTimeOffset[indexSeries] || [];
		var widthField_Name_char = 30;
		var widthField_Number_num = 5;
		var widthLabel_char = 15;
		var formPanel = new Ext.form.Panel({
			xtype: 'form',
			frame: true,
			border: false,
			autoWidth: true,
			autoHeight: true,
			items: [{
				xtype: 'textfield', name: 'name', fieldLabel: findLangS(subsystem, 'field', 'time_offset_name_title'),
				width: __width_FormChar(widthLabel_char, widthField_Name_char),
				labelWidth: __width_FieldChar(widthLabel_char)
			},{
				xtype: 'numberfield', name: 'hours', fieldLabel: findLangS(subsystem, 'field', 'time_offset_hours'),
				minValue: 1, maxValue: 7*24,
				width: __width_Form( __width_FieldChar(widthLabel_char), __width_FieldNum(widthField_Number_num)),
				labelWidth: __width_FieldChar(widthLabel_char)
			},{
				xtype: 'numberfield', name: 'days', fieldLabel: findLangS(subsystem, 'field', 'time_offset_days'),
				minValue: 1, maxValue: 31,
				width: __width_Form( __width_FieldChar(widthLabel_char), __width_FieldNum(widthField_Number_num)),
				labelWidth: __width_FieldChar(widthLabel_char)
			},{
				xtype: 'numberfield', name: 'months', fieldLabel: findLangS(subsystem, 'field', 'time_offset_months'),
				minValue: 1, maxValue: 12,
				width: __width_Form( __width_FieldChar(widthLabel_char), __width_FieldNum(widthField_Number_num)),
				labelWidth: __width_FieldChar(widthLabel_char)
			}],
			buttons: [{
				text: lang.okButtonText,
				iconCls: 'icon_ok',
				scope: this,
				handler: save
			},{
				text: lang.cancelButtonText,
				iconCls: 'icon_cancel',
				scope: this,
				handler: function () {
					formPanel.ownerCt.close();
				}
			}],
			listeners: {
				scope: this,
				afterrender: function(form) {
					for(var i in timeOffset) {
						var field = form.getForm().findField(i);
						if(field) {
							field.setValue(timeOffset[i]);
						}
					}
					Ext.create('Ext.util.KeyNav', formPanel.el, {
						enter: save,
						scope: this
					});
				}
			}
		});
		var win = new Ext.Window({
			title: findLangS(subsystem, 'title', 'time_offset'),
			layout: 'fit',
			items: formPanel,
			border: false,
			modal: true,
			closable: true,
			resizable: false,
			listeners: {
				scope: this,
				activate: function() {
					formPanel.getForm().findField('name').focus(false, 200);
				}
			}
		});
		win.show();
		
		function save() {
			if(formPanel.getForm().isValid()) {
				var fields = formPanel.getForm().getFieldValues();
				timeOffset = {};
				for(var i in fields) {
					if(fields[i]) {
						timeOffset[i] = fields[i];
					}
				}
				if(isDataSet(timeOffset)) {
					this.seriesTimeOffset[indexSeries] = timeOffset;
					this.setSeriesToolsBtnIconCls(indexSeries, true);
				} else {
					this.seriesTimeOffset[indexSeries] = null;
					this.setSeriesToolsBtnIconCls(indexSeries, false);
				}
				formPanel.ownerCt.close();
			}
		}
	},
	setSeriesTools_intervals: function(indexSeries) {
		var subsystem = 'charts';
		var intervals = this.seriesIntervals[indexSeries] || [];
		var fixIntervals = intervals.length > 0;
		for(var i = 0; i < intervals.length; i++) {
			if(!Ext.isString(intervals[i][0])) {
				fixIntervals = false;
				break;
			}
		}
		var recordStruct = [];
		var columns = [];
		var fpItems = [];
		if(fixIntervals) {
			recordStruct.push(
				{name: 'descr'},
				{name: 'color'}
			);
			columns.push(
				{dataIndex: 'descr', flex: 1,
				 renderer: function renderColor(value, metaData, record, rowIndex, colIndex, store, view) {
					return(Ext.isString(value) && value.match('/') ? value.split('/')[1] : value);
				 }}
			);
		} else {
			recordStruct.push(
				{name: 'order', type: 'float'},
				{name: 'interval_limit'},
				{name: 'interval_last', type: 'bool'},
				{name: 'color'}
			);
			columns.push(
				{dataIndex: 'interval_limit', flex: 1,
				 renderer: function renderColor(value, metaData, record, rowIndex, colIndex, store, view) {
					return(record.data.interval_last ? findLangS(subsystem, 'text', 'interval_last') : value);
				 }}
			);
			fpItems.push(
				{xtype: 'checkbox', name: 'interval_last'},
				{xtype: 'textfield', name: 'interval_limit', widthNum: 12}
			);
		}
		columns.push(
			{dataIndex: 'color', flex: 1,
			 renderer: function renderColor(value, metaData, record, rowIndex, colIndex, store, view) {
				return(renderStringStyle(value, {
					color: value || 'black'
				}));
			 }}
		);
		fpItems.push(
			{xtype: 'colorpickerfield', name: 'color', widthCh: 12}
		);
		var grid = new Ext.ux.grid.GridForm({
			subsystem: subsystem,
			subjectLang: 'interval',
			memoryStore: true,
			recordStruct: recordStruct,
			sortField: fixIntervals ? undefined : 'order',
			columns: columns,
			fpItems: fpItems,
			enableEdit: true,
			enableInsert: !fixIntervals,
			enableDelete: !fixIntervals,
			width: 200,
			height: 250,
			prepareDataForSave: function(data, formPanel, oldData) {
				if(fixIntervals) {
					data.descr = oldData.descr;
				} else {
					data.order = data.interval_last ? 1e9 : data.interval_limit * 1;
				}
			},
			setContextItems: function(formPanel, fieldValues, event, field, newValue, oldValue, eventObject) {
				if(!fixIntervals) {
					this.enableFieldIf('interval_limit', !this.getValueField('interval_last'));
				}
			},
			listeners: {
				afterrender: function() {
					for(var i = 0; i < intervals.length; i++) {
						grid.store.add(fixIntervals ? {
							descr: intervals[i][0],
							color: intervals[i][1]

						} : {
							order: i < intervals.length - 1 ? intervals[i][0] : 1e9,
							interval_limit: intervals[i][0],
							interval_last: i == intervals.length - 1,
							color: intervals[i][1]
						})
					}
				}
			}
		});
		var win = new Ext.Window({
			title: findLangS(subsystem, 'title', fixIntervals ? 'colors' : 'intervals'),
			layout: 'fit',
			items: {
				xtype: 'container',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				items: [
					grid, {
					xtype: 'button',
					text: lang.okButtonText,
					iconCls: 'icon_ok',
					style: {
						marginTop: 6,
						marginBottom: 6
					},
					scope: this,
					handler: function() {
						if(fixIntervals) {
							var intervals = cloneArray(this.seriesIntervals[indexSeries]);
							for(var i = 0; i < grid.store.getCount(); i++) {
								var data = grid.store.getAt(i).data;
								for(var j = 0; j < intervals.length; j++) {
									if(intervals[j][0] == data.descr) {
										intervals[j][1] = data.color;
									}
								}
							}
							this.seriesIntervals[indexSeries] = intervals;
							this.setSeriesToolsBtnIconCls(indexSeries, this.isDiffIntervalSeries(intervals, indexSeries));
						} else {
							var intervals = [];
							for(var i = 0; i < grid.store.getCount(); i++) {
								var data = grid.store.getAt(i).data;
								intervals.push([
									i < grid.store.getCount() - 1 ? data.interval_limit : null,
									data.color
								]);
							}
							if(intervals.length) {
								this.seriesIntervals[indexSeries] = intervals;
								this.setSeriesToolsBtnIconCls(indexSeries, this.isDiffIntervalSeries(intervals, indexSeries));
							} else {
								this.seriesIntervals[indexSeries] = null;
								this.setSeriesToolsBtnIconCls(indexSeries, false);
							}
						}
						this.clearChartType();
						win.close();
					}}
				]
			},
			border: false,
			modal: true,
			closable: true,
			resizable: false
		});
		win.show();
	},
	setSeriesFilterBtnIconCls: function(indexSeries, filled) {
		var btnFilter = this.findC('_id', 'filter_' + indexSeries);
		if(btnFilter) {
			btnFilter.setIconCls(filled ? 'icon_filter_red' : 'icon_filter_blue');
		}
	},
	setSeriesToolsBtnIconCls: function(indexSeries, filled) {
		var btnFilter = this.findC('_id', 'tools_' + indexSeries);
		if(btnFilter) {
			btnFilter.setIconCls(filled ? 'icon_wrench_small_red' : 'icon_wrench_small');
		}
	},
	checkErrorInChartConfig: function(chartConfig) {
		if(!chartConfig.series || !chartConfig.series.length) {
			return(this.findLangS('text', 'errorMissingSeries'));
		}
		var countArea = 0;
		for(var i = 0; i < chartConfig.series.length; i++) {
			if(chartConfig.series[i].baseType == 'area') {
				++countArea;
			}
		}
		if(countArea > 1) {
			return(this.findLangS('text', 'errorMultipleArea'));
		}
		return(false);
	},
	getFieldValue: function(fieldName) {
		var field = this.getForm().findField(fieldName);
		if(field) {
			return(field.getValue());
		}
		return(undefined);
	},
	fieldEnableIf: function(fieldName, enable) {
		if(Ext.isArray(fieldName)) {
			for(var i = 0; i < fieldName.length; i++) {
				this.fieldEnableIf(fieldName[i], enable);
			}
		} else {
			var field = this.getForm().findField(fieldName);
			if(field) {
				field.enableIf(enable);
			}
		}
	}
});


Ext.define('Ext.chart.theme.CdrChart', {
	extend: 'Ext.chart.theme.Base',
	alias: 'chart.theme.CdrChart',
	constructor: function(config) {
		config.axis = {
			left: {
				label: {
					font: '10px Tahoma, Arial, Helvetica, Sans-serif',
					fillStyle: '#303030'
				},
				title: {
					font: 'bold 11px Tahoma, Arial, Helvetica, Sans-serif',
					fillStyle: 'black'
				}
			},
			right: {
				label: {
					font: '10px Tahoma, Arial, Helvetica, Sans-serif',
					fillStyle: '#303030'
				},
				title: {
					font: 'bold 11px Tahoma, Arial, Helvetica, Sans-serif',
					fillStyle: 'black'
				}
			},
			bottom: {
				label: {
					font: '10px Tahoma, Arial, Helvetica, Sans-serif',
					fillStyle: '#303030'
				},
				title: {
					font: 'bold 11px Tahoma, Arial, Helvetica, Sans-serif',
					fillStyle: 'black'
				}
			}
		};
		this.callParent([config]);
	}
});

Ext.define('Ext.chart.theme.CdrChartLine', {
	extend: 'Ext.chart.theme.CdrChart',
	alias: 'chart.theme.CdrChartLine',
	constructor: function(config) {
		config.colors = [
			'red',
			'blue',
			'green'
		];
		this.callParent([config]);
	}
});

Ext.define('Ext.chart.theme.CdrChartColumn', {
	extend: 'Ext.chart.theme.CdrChart',
	alias: 'chart.theme.CdrChartColumn',
	constructor: function(config) {
		config.colors = [
			'blue'
		];
		this.callParent([config]);
	}
});

Ext.define('Ext.chart.theme.CdrChartLineWithGreySum', {
	extend: 'Ext.chart.theme.CdrChart',
	alias: 'chart.theme.CdrChartLineWithGreySum',
	constructor: function(config) {
		config.colors = [
			'lightgrey',
			'red',
			'blue',
			'green'
		];
		this.callParent([config]);
	}
});

Ext.define('Ext.chart.theme.CdrChartArea', {
	extend: 'Ext.chart.theme.CdrChart',
	alias: 'chart.theme.CdrChartArea',
	constructor: function(config) {
		config.colors = [
			'#94ae0a',
			'#115fa6',
			'#a61120',
			'#ff8809',
			'#ffd13e',
			'#a61187',
			'#24ad9a',
			'#7c7474',
			'#a66111',
			'#6101f9',
			'#1622ce',
			'#a7115a',
			'#ff6309',
			'#24ad5f',
			'#a68810',
			'#9602ff',
			'#1589b3',
			'#ff3209'
		];
		this.callParent([config]);
		/*
		<table>
		<tr><td bgcolor="#94ae0a">#94ae0a
		<tr><td bgcolor="#115fa6">#115fa6
		<tr><td bgcolor="#a61120">#a61120
		<tr><td bgcolor="#ff8809">#ff8809
		<tr><td bgcolor="#ffd13e">#ffd13e
		<tr><td bgcolor="#a61187">#a61187
		<tr><td bgcolor="#24ad9a">#24ad9a
		<tr><td bgcolor="#7c7474">#7c7474
		<tr><td bgcolor="#a66111">#a66111
		<tr><td bgcolor="#6101f9">#6101f9
		<tr><td bgcolor="#1622ce">#1622ce
		<tr><td bgcolor="#a7115a">#a7115a
		<tr><td bgcolor="#ff6309">#ff6309
		<tr><td bgcolor="#24ad5f">#24ad5f
		<tr><td bgcolor="#a68810">#a68810
		<tr><td bgcolor="#9602ff">#9602ff
		<tr><td bgcolor="#1589b3">#1589b3
		<tr><td bgcolor="#ff3209">#ff3209
		</table>
		*/
	}
});

function cloneChartConfig(chartConfig, filtersFromParent) {
	var clonedChartConfig = cloneObject(chartConfig);
	clonedChartConfig.filtersFromParent = filtersFromParent || chartConfig.filtersFromParent;
	return(clonedChartConfig);
}

function applyFiltersFromParentToChartConfig(chartConfig, filtersFromParent, typeChart) {
	if(!typeChart) {
		typeChart = chartConfig._typeChart;
	}
	filtersFromParent = filtersFromParent || chartConfig.filtersFromParent;
	if(!filtersFromParent) {
		return;
	}
	if(!Ext.isDefined(chartConfig.filters)) {
		chartConfig.filters = {};
	}
	Ext.apply(chartConfig.filters, filtersFromParent);
	applyDateFromToFromFiltersFromParent(chartConfig, filtersFromParent, typeChart);
	chartConfig.filtersFromParent = filtersFromParent;
}

function adjustChartConfigTimeAxisForFiltersFromParent(chartConfig, filtersFromParent, typeChart) {
	if(!typeChart) {
		typeChart = chartConfig._typeChart;
	}
	filtersFromParent = filtersFromParent || chartConfig.filtersFromParent;
	if(!filtersFromParent) {
		return;
	}
	var lastDays = null;
	var lastMinutes = null;
	var dateFrom = null;
	var dateTo = null;
	if(typeChart == 'CDR') {
		if(filtersFromParent.flast_days || filtersFromParent.flast_minutes) {
			lastDays = filtersFromParent.flast_days;
			lastMinutes = filtersFromParent.flast_minutes;
		} else {
			dateFrom = filtersFromParent.fdatefrom;
			dateTo = filtersFromParent.fdateto;
		}
	} else if(typeChart == 'MESSAGES') {
		var formFilters = Ext.decode(filtersFromParent.form_filters);
		if(formFilters) {
			if(formFilters.last_days || formFilters.last_minutes) {
				lastDays = formFilters.last_days;
				lastMinutes = formFilters.last_minutes;
			} else {
				dateFrom = dateTimeStringToDate(formFilters.calldate_from);
				dateTo = dateTimeStringToDate(formFilters.calldate_to);
			}
		}
	}
	var lengthTimeAxis = lastDays || lastMinutes ?
			      getLengthTimeAxisForCustomInterval(chartConfig.timeAxis, lastDays, lastMinutes) :
			     dateFrom || dateTo ?
			      getLengthTimeAxisForTimeRange(chartConfig.timeAxis, dateFrom, dateTo) :
			      null;
	if(lengthTimeAxis > 5 && lengthTimeAxis < 500) {
		return;
	}
	if(lastDays || lastMinutes) {
		chartConfig.timeAxis = getChartTimeAxisForCustomInterval(lastDays, lastMinutes);
	} else if(dateFrom || dateTo) {
		chartConfig.timeAxis = getChartTimeAxisForTimeRange(dateFrom, dateTo);
	}
}

function applyDateFromToFromFiltersFromParent(object, filtersFromParent, typeChart) {
	var lastDays = null;
	var lastMinutes = null;
	var dateFrom = null;
	var dateTo = null;
	if(typeChart == 'CDR') {
		if(filtersFromParent.flast_days || filtersFromParent.flast_minutes) {
			lastDays = filtersFromParent.flast_days;
			lastMinutes = filtersFromParent.flast_minutes;
		} else {
			dateFrom = filtersFromParent.fdatefrom;
			dateTo = filtersFromParent.fdateto;
		}
	} else if(typeChart == 'MESSAGES') {
		var formFilters = Ext.decode(filtersFromParent.form_filters);
		if(formFilters) {
			if(formFilters.last_days || formFilters.last_minutes) {
				lastDays = formFilters.last_days;
				lastMinutes = formFilters.last_minutes;
			} else {
				dateFrom = dateTimeStringToDate(formFilters.calldate_from);
				dateTo = dateTimeStringToDate(formFilters.calldate_to);
			}
		}
	}
	if(lastDays || lastMinutes) {
		object.dateFrom = dateTime();
		if(lastMinutes) {
			object.dateFrom = new Date(object.dateFrom.getTime() - lastMinutes * 60 * 1000);
		}
		if(lastDays) {
			object.dateFrom = decDay(object.dateFrom, lastDays);
		}
		if(!lastMinutes) {
			object.dateFrom = date(object.dateFrom);
		}
		object.dateTo = null;
	} else if(dateFrom || dateTo) {
		object.dateFrom = dateFrom;
		object.dateTo = dateTo;
	}
}

function getNumericAxisConfig(maxValue, maxIntervals, decAxes) {
	for(var i = -decAxes; i < 20; i++) {
		for(var j = 0; j < 3; j++) {
			var step = Math.pow(10, i) * (j == 0 ? 1 : (j == 1 ? 2 : 5));
			var max = Math.floor(maxValue / step) * step + ((maxValue % step) ? step : 0);
			var count = Math.round(max / step);
			if(count <= maxIntervals) {
				return({
					max: max,
					step: step,
					count: count
				});
			}
		}
	}
	return(null);
}


Ext.define('CDR.Chart.MosJitterLoss.Panel', {
	extend: 'Ext.Panel',
	constructor: function(config) {
		config = Ext.applyIf(config || {}, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [],
			border: false
		});
		this.callParent([config]);
		
		this.chartConfig = [];
		this.chartPanels = [];
		for(var i = 0; i < 3; i++) {
			this.chartConfig[i] = this.getChartConfig(i);
			this.chartPanels[i] = new CDR.Chart.ChartPanel({
				_enableBtnTracker: false,
				_enableBtnEdit: false,
				_enableBtnRemove: false,
				_enableBtnUndock: config.undockTitle,
				undockTitle: config.undockTitle,
				_disableAlertInvalidQuery: true
			});
			this.add({
				xtype: 'panel',
				layout: 'fit',
				items: this.chartPanels[i],
				flex: 1
			});
		}
	},
	loadCharts: function() {
		for(var i = 0; i < 3; i++) {
			this.loadChart(i);
		}
	},
	loadChart: function(indexChart) {
		this.chartPanels[indexChart].loadChart(this.chartConfig[indexChart], false, {
			fceOkQuery: function() {
			},
			fceInvalidQuery: function() {
				Ext.defer(function() {
						this.chartPanels[indexChart].disable();
					}, 100, this);
			},
			fceOkQueryScope: this,
			fceInvalidQueryScope: this
		});
	},
	getChartConfig: function(indexChart) {
		var series = indexChart == 0 ? {
			chartType: 'TCH_mos',
			varName: 'sm_mos_intervals',
			series: 'TCHS_mos_intervals',
			axisTitleLeft: 'MOS'
		} : indexChart == 1 ? {
			chartType: 'TCH_jitter',
			varName: 'sm_jitter_intervals',
			series: 'TCHS_jitter_intervals',
			axisTitleLeft: 'jitter'
		} : {
			chartType: 'TCH_packet_lost',
			varName: 'sm_packet_lost_intervals',
			series: 'TCHS_packet_lost_intervals',
			axisTitleLeft: 'packetr loss'
		};
		series.multiSeriesIntervals = getDataArrayItem(arCdrChart_chartSeriesTypes, series.series, 0, 8);
		Ext.applyIf(series, {
			baseType: 'area',
			multiSeries: true,
			sideAxis: 'left'
		});
		var chartConfig = {
			series: [ series ],
			title: '',
			axisTitleLeft: series.axisTitleLeft,
			chartType: null,
			dateFrom: this.dateFrom,
			dateTo: this.dateTo,
			filters: this.filters,
			filtersFromParent: null,
			legendPosition: null,
			title: 'none',
			theme: 'CdrChartArea',
			legendPosition: 'top'
		};
		return(chartConfig);
	},
	createWindow: function(configWindow) {
		var configWindow = cloneObject(configWindow || {});
		Ext.applyIf(configWindow, {
			iconCls: 'icon_menu_diag_system',
			closable: true,
			maximizable: true,
			resizable: true,
			layout: 'fit',
			items: this,
			border: false,
			width: Ext.dom.Element.getViewportWidth() / 2,
			height: Ext.dom.Element.getViewportHeight() - 50,
		        modal: false
		});
		this.window = new Ext.Window(configWindow);
		this.window.show();
	}
});

function getChartTimeAxisForStdDashboardInterval(interval, timeIntervalsData) {
	if(!timeIntervalsData) {
		timeIntervalsData = arDashboardTimeIntervals;
	}
	return(getDataArrayItem(timeIntervalsData, interval, 0, 2));
}

function getChartTimeAxisForCustomInterval(lastDays, lastMinutes) {
	return(getChartTimeAxisForTimeS((lastDays||0) * 24*60*60 + (lastMinutes||0) * 60));
}

function getChartTimeAxisForTimeRange(timeFrom, timeTo) {
	if(!timeFrom) {
		timeFrom = new Date();
	}
	if(!timeTo) {
		timeTo = new Date();
	} else {
		if(!time_sec(timeTo) &&
		   timeTo.timeDefined === false) {
			timeTo = date_next(timeTo);
		}
	}
	return(getChartTimeAxisForTimeS((timeTo.getTime() - timeFrom.getTime()) / 1000));
}

function getChartTimeAxisForTimeS(timeS) {
	return(timeS <= 5*60 ? 'TA_SECONDS' :
	       timeS <= 6*60*60 ? 'TA_MINUTES' :
	       timeS <= 2*24*60*60 ? 'TA_QUARTER' :
	       timeS <= 8*24*60*60 ? 'TA_HOURS' : 'TA_DAYS');
}

function getChartTimeAxisesForTimeS(timeS, lowLimit, highLimit) {
	if(!Ext.isDefined(lowLimit)) {
		lowLimit = 2;
	}
	if(!Ext.isDefined(highLimit)) {
		highLimit = 500;
	}
	var rslt = [];
	for(var i in arCdrChart_timeAxisTypes) {
		var intervals = Math.ceil(timeS / arCdrChart_timeAxisTypes[i].step);
		if(intervals >= lowLimit && intervals <= highLimit) {
			rslt.push([
				i,
				intervals
			]);
		}
	}
	return(rslt);
}

function getLengthTimeAxisForCustomInterval(timeAxis, lastDays, lastMinutes) {
	if(!timeAxis) {
		return(null);
	}
	var configTimeAxis = arCdrChart_timeAxisTypes[timeAxis];
	if(!configTimeAxis) {
		return(null);
	}
	var step = configTimeAxis.step;
	return((lastDays * 24*60*60 + lastMinutes * 60) / step);
}

function getLengthTimeAxisForTimeRange(timeAxis, timeFrom, timeTo) {
	if(!timeAxis) {
		return(null);
	}
	var configTimeAxis = arCdrChart_timeAxisTypes[timeAxis];
	if(!configTimeAxis) {
		return(null);
	}
	var step = configTimeAxis.step;
	if(!timeFrom) {
		timeFrom = new Date();
	}
	if(!timeTo) {
		timeTo = new Date();
	} else {
		if(!time_sec(timeTo) &&
		   timeTo.timeDefined === false) {
			timeTo = date_next(timeTo);
		}
	}
	return((timeTo.getTime() - timeFrom.getTime()) / 1000 / step);
}


/* TEST CHART
function testchart() {
	var win = new Ext.Window({
		layout: 'fit',
		items: testchartconfig()
	});
	window.w = win;
	win.show();
}
function testchartconfig() {
	return({
		xtype: 'cartesian',
		reference: 'chart',
		width: 600,
		height: 400,
		insetPadding: 40,
		store: testchartstore(),
		legend: {
			docked: 'top',
			type: 'sprite'
		},
		axes: testchartaxes(),
		series: testchartseries(),
		
		interactions: {
		    type: 'panzoom',
		    zoomOnPanGesture: true
		},
		animation: {
		    duration: 200
		},
	
		shadow: true,
	
		listeners: {
		    itemhighlightchange: function(chart, newHighlightItem, oldHighlightItem) {
			this.setSeriesLineWidth(newHighlightItem, 4);
			this.setSeriesLineWidth(oldHighlightItem, 2);
		    }
		},
		setSeriesLineWidth: function (item, lineWidth) {
		    if (item) {
			item.series.setStyle({
			    lineWidth: lineWidth
			});
		    }
		}
	});
}
function testchartstore() {
	return({
		fields: ['x', 'y_s_1'],
		data: [{
		    'x': '1',
		    'y_s_1': 0,
		    'y_s_2': 0
		},{
		    'x': '2',
		    'y_s_1': 0,
		    'y_s_2': 0
		},{
		    'x': '3',
		    'y_s_1': 0,
		    'y_s_2': 0
		},{
		    'x': '4',
		    'y_s_1': 0,
		    'y_s_2': 0
		},{
		    'x': '5',
		    'y_s_1': 0,
		    'y_s_2': 0
		},{
		    'x': 'metric one',
		    'y_s_1': 10,
		    'y_s_2': 5
		}, {
		    'x': 'metric two',
		    'y_s_1': 7,
		    'y_s_2': 12
		}, {
		    'x': 'metric three',
		    'y_s_1': 5,
		    'y_s_2': 3
		}]
	});
}
function testchartseries() {
	return([{
		type: 'line',
		style: {
		    stroke: '#30BDA7',
		    lineWidth: 2
		},
		xField: 'x',
		yField: 'y_s_1',
		smooth: true,
		marker: {
		    type: 'path',
		    path: ['M', - 4, 0, 0, 4, 4, 0, 0, - 4, 'Z'],
		    stroke: '#30BDA7',
		    lineWidth: 2,
		    fill: 'white'
		},
		highlight: {
		    fillStyle: '#000',
		    radius: 5,
		    lineWidth: 2,
		    strokeStyle: '#fff'
		}
	},{
		type: 'line',
		style: {
		    stroke: '#30BDA7',
		    lineWidth: 4
		},
		xField: 'x',
		yField: 'y_s_2',
		smooth: true,
		marker: {
		    type: 'path',
		    path: ['M', - 4, 0, 0, 4, 4, 0, 0, - 4, 'Z'],
		    stroke: '#30BDA7',
		    lineWidth: 2,
		    fill: 'white'
		}
	}]);
}
function testchartaxes() {
	return([{
		type: 'numeric',
		position: 'left',
		fields: ['y_s_1', 'y_s_2'],
		title: {
		    text: 'Sample Values',
		    fontSize: 15
		},
		grid: true,
		minimum: 0
	},{
		type: 'category',
		position: 'bottom',
		fields: ['x'],
		title: {
		    text: 'Sample Values',
		    fontSize: 15
		}
	}]);
}
*/
