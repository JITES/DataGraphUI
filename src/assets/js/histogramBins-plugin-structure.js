export const  histogramBinsD3 = {
    /**
	 * unique name of chart to identify
	*/
    name: "D3 PieChart",
	/**
	 * unique id to identify among multiple charts
	*/
	uniqueId: '',
    actions: {
	    /**
		 * we will define basic html structure of the chart
		*/
        getHTML: function () {
            var uniqId = "histogrambins" + Math.floor((Math.random() * 1000) + 1);
			this.uniqueId = uniqId;
            return '<div class="d3-histogrambins" id="' + uniqId + '" style=""></div>';
        },
        getLabelName: function () {
            return "HistogramBins D3";
        },
        getWidgetName: function () {
            return 'D3HistogramBins';
        },
        getWidgetCategory: function () {
            return 'chart';
        },
		/**
		 * use this function to define icon to th chart, which will be called during the loading time of chart if it is taking more time to load
		*/
        getLoadingIcon: function () {

        },
		/**
		 * common class name to the chart, if we have multiple charts of same type and if we want to apply same styles to all charts then it will help us.
		*/
        getUniqueClass: function () {
            return 'd3-piechart';
        },
		/**
		 * In this function we will describe about configs i.e type of property, possible values to that property etc.
		 */
        getConfs: function () {
            return {
				zoom: { type: boolean, values: [true, false], require: false },
				margin: { type: 'object', data: { top: number, bottom: number, left: number, right: number }, required: false },
				listGroup: { type: 'array', axis: '', data: ['a', 'b'], required: false },
				xField: { type: 'string', require: true },
				yField: { type: 'string', require: true },
				tooltip: { type: boolean, values: [true, false], require: false }
			};
        },
		/**
		 * Register all the selected events which are defined in 'getEvents' function. 
		*/
        registerEvents: function (id, events) {
			// event registration logic;
		},
		/**
		 * Deifne all possible events on widget like click event, mouse over event etc.
		*/
		getAllEvents: function () {
			return [
				{
					pluginselector: '',
					eventName: 'cick',
					eventType: 'mouse'
				}
			];
		},
		/**
		 * It will return plugin data whatever we passed to 'drawChart' function based on uniq ID.
		*/
        getData: function (ID, globalOBJ, gridData, currentevent) {
            return {};
        },
		/**
		 * This function will be called by 'drawChart' function by passing properties, widget data and unique id of dom element
		*/
        setData: function (propObject, dataObj, id) {
			const margin = {top: 20, right: 40, bottom: 60, left: 40};
			const width = 435 ; //parseInt(d3.select('#'+id).style('width'), 10);
			const height = 200 ; //parseInt(d3.select('#'+id).style('height'), 10);
			console.log(width + " " + height);
			var parseDate = d3.timeFormat("%b-%Y");
			var mainDivName = "charts";
			var layers = d3.stack()
            .keys(propObject.groups)
            .offset(d3.stackOffsetDiverging)
            (dataObj);
			dataObj.forEach(function(d) {
				d = type(d);
			});
			// append the svg object to the div called 'd3-histogrambins'
			var svg = d3.select("#"+this.uniqueId).html("")
			  .append("svg")
				.attr("width", width)
				.attr("height", height);
			//creating x axis
			var x = d3.scaleBand()
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1);

			x.domain(dataObj.map(function(d) {
				return d[propObject.xField];
			}))
			var y = d3.scaleLinear()
            .rangeRound([height - margin.bottom, margin.top]);

			y.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
			function stackMin(layers) {
				return d3.min(layers, function(d) {
					return d[0];
					});
			}

			function stackMax(layers) {
				return d3.max(layers, function(d) {
					return d[1];
				});
			}
			var z = d3.scaleOrdinal(d3.schemeCategory20);
			var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
			var g = maing.enter().append("g")
				.attr("fill", function(d) {
					return z(d.key);
				});
				
			var rect = g.selectAll("rect")
            .data(function(d) {
                d.forEach(function(d1) {
                    d1.key = d.key;
                    return d1;
                });
                return d;
            })
            .enter().append("rect")
            .attr("data", function(d) {
                var data = {};
                data["key"] = d.key;
                data["value"] = d.data[d.key];
                var total = 0;
                propObject.groups.map(function(d1) {
                    total = total + d.data[d1]
                });
                data["total"] = total;
                return JSON.stringify(data);
            })
            .attr("width", x.bandwidth)
            .attr("x", function(d) {
                return x(d.data.date);
            })
            .attr("y", function(d) {
                return y(d[1]);
            })
            .attr("height", function(d) {
                return y(d[0]) - y(d[1]);
            });
			
			rect.on("mouseover", function() {
				var currentEl = d3.select(this);
				var fadeInSpeed = 120;
				d3.select("#recttooltip_" + mainDivName)
					.transition()
					.duration(fadeInSpeed)
					.style("opacity", function() {
						return 1;
					});
				d3.select("#recttooltip_" + mainDivName).attr("transform", function(d) {
					var mouseCoords = d3.mouse(this.parentNode);
					var xCo = 0;
					if (mouseCoords[0] + 10 >= width * 0.80) {
						xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
							.attr("width"));
					} else {
						xCo = mouseCoords[0] + 10;
					}
					var x = xCo;
					var yCo = 0;
					if (mouseCoords[0] + 10 >= width * 0.80) {
						yCo = mouseCoords[1] + 10;
					} else {
						yCo = mouseCoords[1];
					}
					var x = xCo;
					var y = yCo;
					return "translate(" + x + "," + y + ")";
				});
				//CBT:calculate tooltips text
				var tooltipData = JSON.parse(currentEl.attr("data"));
				var tooltipsText = "";
				d3.selectAll("#recttooltipText_" + mainDivName).text("");
				var yPos = 0;
				d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text(tooltipData.key + ":  " + tooltipData.value);
				yPos = yPos + 1;
				d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("Total" + ":  " + tooltipData.total);
				//CBT:calculate width of the text based on characters
				var dims = helpers.getDimensions("recttooltipText_" + mainDivName);
				d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
					.attr("x", dims.w + 4);

				d3.selectAll("#recttooltipRect_" + mainDivName)
					.attr("width", dims.w + 10)
					.attr("height", dims.h + 20);

			});
			rect.on("mouseout", function() {
				var currentEl = d3.select(this);
				d3.select("#recttooltip_" + mainDivName)
					.style("opacity", function() {
						return 0;
					})
					.attr("transform", function(d, i) {
						// klutzy, but it accounts for tooltip padding which could push it onscreen
						var x = -500;
						var y = -500;
						return "translate(" + x + "," + y + ")";
					});
			});
			rect.on("mouseout", function() {
				var currentEl = d3.select(this);
				d3.select("#recttooltip_" + mainDivName)
					.style("opacity", function() {
						return 0;
					})
					.attr("transform", function(d, i) {
						// klutzy, but it accounts for tooltip padding which could push it onscreen
						var x = -500;
						var y = -500;
						return "translate(" + x + "," + y + ")";
					});
			});

			svg.append("g")
				.attr("transform", "translate(0," + y(0) + ")")
				.call(d3.axisBottom(x))
				.append("text")
				.attr("x", width / 2)
				.attr("y", margin.bottom * 0.6)
				.attr("dx", "0.32em")
				.attr("fill", "#000")
				.attr("font-weight", "bold")
				.attr("text-anchor", "start")
				.text(propObject.xLabel);

			svg.append("g")
				.attr("transform", "translate(" + margin.left + ",0)")
				.call(d3.axisLeft(y))
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", 0 - (height / 2))
				.attr("y", 5 - (margin.left))
				.attr("dy", "0.32em")
				.attr("fill", "#000")
				.attr("font-weight", "bold")
				.attr("text-anchor", "middle")
				.text(propObject.yLabel);

			var rectTooltipg = svg.append("g")
				.attr("font-family", "sans-serif")
				.attr("font-size", 10)
				.attr("text-anchor", "end")
				.attr("id", "recttooltip_" + mainDivName)
				.attr("style", "opacity:0")
				.attr("transform", "translate(-500,-500)");

			rectTooltipg.append("rect")
				.attr("id", "recttooltipRect_" + mainDivName)
				.attr("x", 0)
				.attr("width", 120)
				.attr("height", 80)
				.attr("opacity", 0.71)
				.style("fill", "#000000");

			rectTooltipg
				.append("text")
				.attr("id", "recttooltipText_" + mainDivName)
				.attr("x", 30)
				.attr("y", 15)
				.attr("fill", function() {
					return "#fff"
				})
				.style("font-size", function(d) {
					return 10;
				})
				.style("font-family", function(d) {
					return "arial";
				})
				.text(function(d, i) {
					return "";
				});


			function type(d) {
				d.date = parseDate(new Date(d.date));
				propObject.groups.forEach(function(c) {
					d[c] = +d[c];
				});
				return d;
			}

			var helpers = {
				getDimensions: function(id) {
					var el = document.getElementById(id);
					var w = 0,
						h = 0;
					if (el) {
						var dimensions = el.getBBox();
						w = dimensions.width;
						h = dimensions.height;
					} else {
						console.log("error: getDimensions() " + id + " not found.");
					}
					return {
						w: w,
						h: h
					};
				}
			};
		},
		/**
		 * This is the first function will be called by user to render the widget. we will load all dependencies(css,js) of widget
           synchonously which we defined all js dependencies in 'getPluginJsImports' function and all css dependencies in 'getCSSFile' function. After loading all dependencies we will call 'setData' function
		   
		 * Params: 
		 * propObject - pass all required configs(properties) to the widget which will replace the default configs, defined in
		                'getDefaultConfigs' function
		 * dataObj    - Actual data to be rendered into widget, here we also can pass remote server path to read data from. if user pass 
		                server path then we have to read data from url and need to prepare json object(uniq structure) to send to 'setData' function.
		 * ID         - Unique ID of DOM element where to render widget. In this DOM element we will render unique html DOM structure of
		                widget defined in 'getHTML' function. getHTML function maintains unique html structure for respective widget.
		 */
		drawChart: function (propObject, dataObj, ID = '.class') {
			var _this = this;
			this.getJsDependencies().forEach(function (src, index) {
				var script = document.createElement('script');
				script.setAttribute('src', src);
				script.async = false;
				script.onreadystatechange = script.onload = function () {
					if (_this.getJsDependencies().length - 1 == index) {
						var chartHTML = _this.getHTML();
						d3.select(ID).html(chartHTML);
						var newProps = Object.assign(_this.getDefaultConfigs(), propObject);
						_this.setData(newProps, dataObj, _this.uniqueId);
					}
				};

				document.getElementsByTagName('head')[0].appendChild(script);
			})
		},
		/**
		 * This function will be used for loading the dependencies. currently we are writing that logic in 'drawChart' function.
		*/
		loadScript: function () {

		},
		/**
		 * we will define default plugin configs
		*/
        getDefaultConfigs: function () {
            return { 
				zoom: false, 
				margin: 40, 
				tooltip: false,
				axisInfo: [{
						title: 'X Axis',
						color: 'red',
					}],
					yAxis:  [{
						title: 'Y Axis',
						color: 'red',
					}]
				}
        },
		/**
		 * refresh the chart
		*/
        refreshWdget: function () {
            return '';
        },
		/**
		 * maintain multiple versions of chart with latest updates
		*/
        widgetVersions: function () {
            return "[1.0.0,1.0.1]";
        },
		/**
		 * define tooltip dom structure
		*/
        getTooltip: function () {
            return "";
        },
		/**
		 * define all js imports of plugin.
		*/
        getJsDependencies: function () {
            var jsArray = ["https://d3js.org/d3.v4.min.js"];
            return jsArray;
        },
		/**
		 * define all css imports of plugin
		*/
        getCSSDependencies: function () {
            var cssArray = [];
            return cssArray;
        },
		/**
		* we can define themes(styles)
		*/
		applyThemes: function (OBJ) {
			return [];
		}

    }
}