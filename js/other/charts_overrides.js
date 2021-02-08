Ext.override(Ext.chart.axis.layout.Layout, {
	calculateMajorTicks: function(context) {
		this.callOverridden(arguments);
		if(context.segmenter && context.segmenter._axis && 
		   context.segmenter._axis.type == 'numeric' &&
		   context.segmenter._axis._maxTickSteps &&
		   context.majorTicks) {
			//debug_log(context.majorTicks);
			var maxTickSteps = Ext.isFunction(context.segmenter._axis._maxTickSteps) ?
					    context.segmenter._axis._maxTickSteps() :
					    context.segmenter._axis._maxTickSteps;
			var decPrecision = context.segmenter._axis._decPrecision || 0;
			var numericAxisConfig = getNumericAxisConfig(context.majorTicks.max, maxTickSteps, decPrecision);
			if(numericAxisConfig) {
				//debug_log(numericAxisConfig);
				context.majorTicks.to = numericAxisConfig.max;
				context.majorTicks.step = numericAxisConfig.step;
				context.majorTicks.steps = numericAxisConfig.count;
				context.majorTicks.unit.scale = 1;
				//debug_log(context.majorTicks);
			}
		}
	}
});

Ext.override(Ext.chart.axis.layout.Discrete, {
	calculateMajorTicks: function(context) {
		this.callOverridden(arguments);
		if(context.segmenter && context.segmenter._axis && 
		   context.segmenter._axis.type == 'category' &&
		   context.segmenter._axis._typeTimeAxis &&
		   context.segmenter._axis._maxTickSteps &&
		   context.majorTicks) {
			//debug_log(context.majorTicks);
			var step = context.majorTicks.step;
			var steps = context.majorTicks.steps;
			var factor = context.segmenter._axis._typeTimeAxis && 
				     arCdrChart_timeAxisTypes[context.segmenter._axis._typeTimeAxis] &&
				     arCdrChart_timeAxisTypes[context.segmenter._axis._typeTimeAxis].factor ?
				      arCdrChart_timeAxisTypes[context.segmenter._axis._typeTimeAxis].factor :
				      [ 2, 4, 8, 16, 32 ];
			var useFactor = 1;
			var maxTickSteps = Ext.isFunction(context.segmenter._axis._maxTickSteps) ?
					    context.segmenter._axis._maxTickSteps() :
					    context.segmenter._axis._maxTickSteps;
			if(steps > maxTickSteps) {
				for(var factorIndex = 0; steps > maxTickSteps && factorIndex < factor.length; factorIndex++) {
					step = context.majorTicks.step * factor[factorIndex];
					steps = Math.ceil(context.majorTicks.to / step);
					useFactor = factor[factorIndex];
				}
			}
			var stepOffset = 0;
			if(useFactor > 1 &&
			   arCdrChart_timeAxisTypes[context.segmenter._axis._typeTimeAxis] &&
			   arCdrChart_timeAxisTypes[context.segmenter._axis._typeTimeAxis].step) {
				var stepSecLength = arCdrChart_timeAxisTypes[context.segmenter._axis._typeTimeAxis].step * useFactor;
				for(var i = 0; i < context.data.length; i++) {
					if(context.data[i].getTime() / 1000 % stepSecLength == 0) {
						stepOffset = i;
						break;
					}
				}
			}
			context.majorTicks._step = step;
			context.majorTicks._steps = steps;
			context.majorTicks._stepOffset = stepOffset;
			//debug_log(context.majorTicks);
		}
	}
});

Ext.override(Ext.chart.axis.sprite.Axis, {
	iterate: function(snaps, fn) {
		if(snaps.getLabel && snaps._step) {
			if(!snaps._stepOffset && snaps.min < snaps.from) {
				fn.call(this, snaps.min, snaps.getLabel(snaps.min), -1, snaps);
			}
			for(i = snaps._stepOffset; i <= snaps.steps; i+= snaps._step) {
				fn.call(this, snaps.get(i), snaps.getLabel(i), i, snaps);
			}
			if(!snaps._stepOffset && snaps.max > snaps.to) {
				fn.call(this, snaps.max, snaps.getLabel(snaps.max), snaps.steps + 1, snaps);
			}
		} else {
			this.callOverridden(arguments);
		}
	}
});

Ext.override(Ext.chart.series.sprite.Bar, {
	drawLabel: function(text, dataX, dataStartY, dataY, labelId) {
		var me = this,
		    attr = me.attr,
		    label = me.getMarker('labels'),
		    labelTpl = label.getTemplate(),
		    labelCfg = me.labelCfg || (me.labelCfg = {});
		if(labelTpl.attr.renderer) {
			params = [
				text,
				label,
				labelCfg,
				{
				    store: me.getStore()
				},
				labelId
			];
			rsltLabel = Ext.callback(labelTpl.attr.renderer, null, params, 0, me.getSeries());
			if(rsltLabel === null) {
				return;
			}
		}
		this.callOverridden(arguments);
        }
});

Ext.override(Ext.chart.series.Series, {
	getMarkerStyleByIndex: function(index) {
		var style = this.callOverridden(arguments);
		if(this.getLegendColor) {
			color = this.getLegendColor(index);
			if(color) {
				style.fillStyle = color;
				style.strokeStyle = color;
			}
		}
		return(style);
	}
});

Ext.override(Ext.chart.AbstractChart, {
	setHighlightSeries: function(series) {
		if(series && !this._highlightSeries ||
		   !series && this._highlightSeries ||
		   series != this._highlightSeries) {
			if(this._highlightSeries && this._highlightSeries.doUnhighlight) {
				this._highlightSeries.doUnhighlight();
			}
			if(series && series.doHighlight) {
				series.doHighlight();
			}
			this.processData();
			this.updateLayout();
			this.fireEvent('itemhighlightserieschange', this, series, this.highlightSeries);
			this._highlightSeries = series;
		}
	}
});

Ext.override(Ext.chart.series.Line, {
	doHighlight: function() {
		this._baseStyle = clone(this.getStyle());
		if(this._baseStyle.lineWidth) {
			this.setStyle({
				lineWidth: this._baseStyle.lineWidth * 2
			});
			if(!Ext.isDefined(this._baseStyle.fillStyle)) {
				this._baseSpriteAttr = cloneObject(this.sprites[0].attr, null, 2);
				this.sprites[0].setAttributes({
					zIndex: 1e9
				})
			}
		}
	},
	doUnhighlight: function() {
		if(this._baseStyle.lineWidth) {
			this.setStyle({
				lineWidth: this._baseStyle.lineWidth
			});
			if(!Ext.isDefined(this._baseStyle.fillStyle)) {
				if(Ext.isDefined(this._baseSpriteAttr.zIndex)) {
					this.sprites[0].setAttributes({
						zIndex: this._baseSpriteAttr.zIndex
					})
				} else {
					this.sprites[0].setAttributes({
						zIndex: null
					})
					delete this.sprites[0].attr.zIndex;
				}
			}
		}
	}
});

Ext.override(Ext.chart.legend.SpriteLegend, {
	updateSurface: function(surface, oldSurface) {
		this.callOverridden(arguments);
		if(!this._disableUpdateSurface) {
			if (oldSurface) {
				oldSurface.el.un('mouseenter', 'onMouseEnter', this);
				oldSurface.el.un('mouseleave', 'onMouseLeave', this);
				oldSurface.el.un('mousemove', 'onMouseMove', this);
			}
			if (surface) {
				surface.el.on('mouseenter', 'onMouseEnter', this);
				surface.el.on('mouseleave', 'onMouseLeave', this);
				surface.el.on('mousemove', 'onMouseMove', this);
			}
		}
	},
	onMouseEnter: function(event, surface) {
		this.onMouse('enter', event, surface);
	},
	onMouseLeave: function(event, surface) {
		this.onMouse('leave', event, surface);
		var chart = this.getChart();
		if(chart) {
			chart.setHighlightSeries(null);
		}
	},
	onMouseMove: function(event, surface) {
		this.onMouse('move', event, surface);
	},
	onMouse: function(typeEvent, event, surface) {
		var chart = this.getChart(),
		    surface = this.getSurface(),
		    result, point;
		if (chart && chart.hasFirstLayout && surface) {
			point = surface.getEventXY(event);
			result = surface.hitTest(point);
			if (result && result.sprite && result.sprite._series) {
				for(var i = 0; i < chart.series.length; i++) {
					if(chart.series[i].id == result.sprite._series) {
						var series = chart.series[i];
						var seriesIndex = i;
						chart.fireEvent('legend_mouse_event', typeEvent, chart, series, seriesIndex);
						chart.setHighlightSeries(series);
						break;
					}
				}
			}
		}
	}
});

Ext.override(Ext.draw.engine.Svg, {
    setElementAttributes: function(element, attributes) {
        var dom = element.dom,
            cache = element.cache,
            name, value;
        for (name in attributes) {
            value = attributes[name];
            if (cache[name] !== value) {
                cache[name] = value;
                // ADD - begin
                if(!value || !value.match || !value.match('NaN'))
                // ADD - end
                    dom.setAttribute(name, value);
            }
        }
    }
});

Ext.override(Ext.chart.series.sprite.Line, {
    renderAggregates: function(aggregates, start, end, surface, ctx, clip, rect) {
        var me = this,
            attr = me.attr,
            dataX = attr.dataX,
            dataY = attr.dataY,
            labels = attr.labels,
            xAxis = attr.xAxis,
            yCap = attr.yCap,
            isSmooth = attr.smooth && me.smoothX && me.smoothY,
            isDrawLabels = labels && me.getMarker('labels'),
            isDrawMarkers = me.getMarker('markers'),
            matrix = attr.matrix,
            pixel = surface.devicePixelRatio,
            xx = matrix.getXX(),
            yy = matrix.getYY(),
            dx = matrix.getDX(),
            dy = matrix.getDY(),
            list = me.list || (me.list = []),
            minXs = aggregates.minX,
            maxXs = aggregates.maxX,
            minYs = aggregates.minY,
            maxYs = aggregates.maxY,
            idx = aggregates.startIdx,
            isContinuousLine = true,
            isValidMinX, isValidMaxX, isValidMinY, isValidMaxY, xAxisOrigin, isVerticalX, x, y, i, index;
        me.rendererData = {
            store: me.getStore()
        };
        list.length = 0;
        // Say we have 7 y-items (attr.dataY): [20, 19, 17, 15, 11, 10, 14]
        //         and 7 x-items (attr.dataX): [0,   1,  2,  3,  4,  5,  6].
        // Then aggregates.startIdx is an aggregated index,
        // where every other item is skipped on each aggregation level:
        // [0, 1, 2, 3, 4, 5, 6,
        //  0, 2, 4, 6,
        //  0, 4,
        //  0]
        // aggregates.minY
        // [20, 19, 17, 15, 11, 10, 14,
        //  19, 15, 10, 14,
        //  15, 10,
        //  10]
        // aggregates.maxY
        // [20, 19, 17, 15, 11, 10, 14,
        //  20, 17, 11, 14,
        //  20, 14,
        //  20]
        // aggregates.minX is
        // [0, 1, 2, 3, 4, 5, 6,
        //  1, 3, 5, 6, // TODO: why this order for min?
        //  3, 5,       // TODO: why this inconsistency?
        //  5]
        // aggregates.maxX is
        // [0, 1, 2, 3, 4, 5, 6,
        //  0, 2, 4, 6,
        //  0, 6,
        //  0]
        // Create a list of the form [x0, y0, idx0, x1, y1, idx1, ...],
        // where each x,y pair is a coordinate representing original data point
        // at the idx position.
        for (i = start; i < end; i++) {
            var minX = minXs[i],
                maxX = maxXs[i],
                minY = minYs[i],
                maxY = maxYs[i];
            isValidMinX = Ext.isNumber(minX);
            isValidMinY = Ext.isNumber(minY);
            isValidMaxX = Ext.isNumber(maxX);
            isValidMaxY = Ext.isNumber(maxY);
            if (minX < maxX) {
                list.push(isValidMinX ? (minX * xx + dx) : null, isValidMinY ? (minY * yy + dy) : null, idx[i]);
                list.push(isValidMaxX ? (maxX * xx + dx) : null, isValidMaxY ? (maxY * yy + dy) : null, idx[i]);
            } else if (minX > maxX) {
                list.push(isValidMaxX ? (maxX * xx + dx) : null, isValidMaxY ? (maxY * yy + dy) : null, idx[i]);
                list.push(isValidMinX ? (minX * xx + dx) : null, isValidMinY ? (minY * yy + dy) : null, idx[i]);
            } else {
                list.push(isValidMaxX ? (maxX * xx + dx) : null, isValidMaxY ? (maxY * yy + dy) : null, idx[i]);
            }
        }
        if (list.length) {
            for (i = 0; i < list.length; i += 3) {
                x = list[i];
                y = list[i + 1];
                if (Ext.isNumber(x) && Ext.isNumber(y)) {
                    if (y > yCap) {
                        y = yCap;
                    } else if (y < -yCap) {
                        y = -yCap;
                    }
                    list[i + 1] = y;
                } else {
                    isContinuousLine = false;
                    
                    continue;
                }
                index = list[i + 2];
                if (isDrawMarkers) {
                    me.drawMarker(x, y, index);
                }
                if (isDrawLabels && labels[index]) {
                    me.drawLabel(labels[index], x, y, index, rect);
                }
            }
            me.isContinuousLine = isContinuousLine;
            // ADD - begin
            /*
            // ADD - end
            if (isSmooth && !isContinuousLine) {
                Ext.raise("Line smoothing in only supported for gapless data, " + "where all data points are finite numbers.");
            }
            // ADD - begin
            */
            // ADD - end
            if (xAxis) {
                isVerticalX = xAxis.getAlignment() === 'vertical';
                if (Ext.isNumber(xAxis.floatingAtCoord)) {
                    xAxisOrigin = (isVerticalX ? rect[2] : rect[3]) - xAxis.floatingAtCoord;
                } else {
                    xAxisOrigin = isVerticalX ? rect[0] : rect[1];
                }
            } else {
                xAxisOrigin = attr.flipXY ? rect[0] : rect[1];
            }
            if (attr.preciseStroke) {
                if (attr.fillArea) {
                    ctx.fill();
                }
                if (attr.transformFillStroke) {
                    attr.inverseMatrix.toContext(ctx);
                }
                me.drawStroke(surface, ctx, start, end, list, xAxisOrigin);
                if (attr.transformFillStroke) {
                    attr.matrix.toContext(ctx);
                }
                ctx.stroke();
            } else {
                me.drawStroke(surface, ctx, start, end, list, xAxisOrigin);
                if (isContinuousLine && isSmooth && attr.fillArea && !attr.renderer) {
                    var lastPointX = dataX[dataX.length - 1] * xx + dx + pixel,
                        lastPointY = dataY[dataY.length - 1] * yy + dy,
                        firstPointX = dataX[0] * xx + dx - pixel,
                        firstPointY = dataY[0] * yy + dy;
                    // Fill the area from the series to the xAxis in case there
                    // are no gaps and no renderer is used, in which case the
                    // area would be filled per uninterrupted segment or per
                    // step, instead of being filled a single pass.
                    ctx.lineTo(lastPointX, lastPointY);
                    ctx.lineTo(lastPointX, xAxisOrigin - attr.lineWidth);
                    ctx.lineTo(firstPointX, xAxisOrigin - attr.lineWidth);
                    ctx.lineTo(firstPointX, firstPointY);
                }
                if (attr.transformFillStroke) {
                    attr.matrix.toContext(ctx);
                }
                // Prevent the reverse transform to fix floating point error.
                if (attr.fillArea) {
                    ctx.fillStroke(attr, true);
                } else {
                    ctx.stroke(true);
                }
            }
        }
    }
});

Ext.chart.series.sprite.Line.def._updaters.smooth = function(attr) {
	var dataX = attr.dataX,
	    dataY = attr.dataY;
	if (attr.smooth && dataX && dataY && dataX.length > 2 && dataY.length > 2) {
		var smoothData = Ext.draw.Draw.smooth(dataX, dataY, 3);
		this.smoothX = smoothData.smoothX;
		this.smoothY = smoothData.smoothY;
	} else {
		delete this.smoothX;
		delete this.smoothY;
	}
}

Ext.override(Ext.chart.series.sprite.StackedCartesian, {
    getIndexNearPoint: function(x, y) {
        var sprite = this,
            mat = sprite.attr.matrix,
            dataX = sprite.attr.dataX,
            dataY = sprite.attr.dataY,
            dataStartY = sprite.attr.dataStartY,
            selectionTolerance = sprite.attr.selectionTolerance,
            // MODIFY - begin
            // - minX = 0.5,
            minX = this._series && this._series._chart && this._series._chart._getIndexNearPoint_toleranceX || 0.5,
            // MODIFY - end
            minY = Infinity,
            index = -1,
            imat = mat.clone().prependMatrix(this.surfaceMatrix).inverse(),
            center = imat.transformPoint([
                x,
                y
            ]),
            positionLB = imat.transformPoint([
                x - selectionTolerance,
                y - selectionTolerance
            ]),
            positionTR = imat.transformPoint([
                x + selectionTolerance,
                y + selectionTolerance
            ]),
            top = Math.min(positionLB[1], positionTR[1]),
            bottom = Math.max(positionLB[1], positionTR[1]),
            dx, dy;
        for (var i = 0; i < dataX.length; i++) {
            if (Math.min(dataStartY[i], dataY[i]) <= bottom && top <= Math.max(dataStartY[i], dataY[i])) {
                dx = Math.abs(dataX[i] - center[0]);
                dy = Math.max(-Math.min(dataY[i] - center[1], center[1] - dataStartY[i]), 0);
                if (dx < minX && dy <= minY) {
                    minX = dx;
                    minY = dy;
                    index = i;
                }
            }
        }
        return index;
    }
});
