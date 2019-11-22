export const  pieChartD3 = {
    name: "D3 PieChart",
	uniqueId: '',
    actions: {
        getHTML: function () {
            var uniqId = "piechart" + Math.floor((Math.random() * 1000) + 1);
			this.uniqId = uniqId;
            return '<style>div.tooltip {padding:10px;min-width:50px;position: absolute;text-align: center;width: auto;height: auto;padding: 2px;font: 12px sans-serif;background: lightsteelblue;border: 0px;border-radius: 8px;pointer-events: none;}</style><div class="d3-piechart" id="' + uniqId + '" ></div>';
        },
        getLabelName: function () {
            return "PieChart D3";
        },
        getName: function () {
            return 'D3PieChart';
        },
        getCategory: function () {
            return 'chart';
        },
        getIcon: function () {

        },
        getUniqueClass: function () {
            return 'd3-piechart';
        },
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
        registerEvents: function (id, events) {
			// event registration logic;
		},
		getEvents: function () {
			return [
				{
					pluginselector: '',
					eventName: 'cick',
					eventType: 'mouse'
				}
			];
		},
        getData: function (ID, globalOBJ, gridData, currentevent) {
            return {};
        },
        setData: function (propObject, dataObj, id) {
			var margin = 0;
			var width = parseInt(d3.select('#'+id).style('width'), 10);
			width = width - 2*margin;
			var height = 188;
			// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
			var radius = Math.min(width, height) / 2 - margin
			// append the svg object to the div called 'my_dataviz'
			var svg = d3.select("#"+this.uniqId).html("")
			  .append("svg")
				.attr("width", width)
				.attr("height", height)
			  .append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			
			var domainData = [];
			Object.keys(dataObj).forEach(function(key){
				domainData.push(key);
			})
			// set the color scale
			var color = d3.scaleOrdinal()
			  .domain(domainData)
			  .range(propObject.colors);
			  //setting default colors
			  //d3.schemeDark2
			  
			 // console.log(d3.schemeDark2);

			// Compute the position of each group on the pie:
			var pie = d3.pie()
				.value(function(d) {return d.value; })
				.sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
			var data_ready = pie(d3.entries(dataObj))
			
					// map to data
		  var u = svg.selectAll("path")
			.data(data_ready)

		  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
		  u
			.enter()
			.append('path')
			.merge(u)
			.transition()
			.duration(1000)
			.attr('d', d3.arc()
			  .innerRadius(0)
			  .outerRadius(radius)
			)
			.attr('fill', function(d){ return(color(d.data.key)) })
			.attr("stroke", "white")
			.style("stroke-width", "2px")
			.style("opacity", 1)

		  // remove the group that is not present anymore
		  u
			.exit()
			.remove()

			// Initializing a tooltip
			var div = d3.select("body").append("div")
						.attr("class", "tooltip")
						.style("opacity", 0);
			d3.selectAll("path").on("mouseover", function(d){
				console.log('pagex  ', d);
				div.transition()
						 .duration(200)
						 .style("opacity", .9);
					   div.html(d.data['key'] + ' : ' + d.data['value'])
						 .style("left", (d3.event.pageX) + "px")
						 .style("top", (d3.event.pageY - 28) + "px");
			}).on("mouseout", function() {
				div.transition()
						 .duration(500)
						 .style("opacity", 0);
			});
		},
		drawChart: function (propObject, dataObj, ID = '.class') {
			var _this = this;
			this.getPluginJsImports().forEach(function (src, index) {
				var script = document.createElement('script');
				script.setAttribute('src', src);
				script.async = false;
				script.onreadystatechange = script.onload = function () {
					if (_this.getPluginJsImports().length - 1 == index) {
						var chartHTML = _this.getHTML();
						d3.select(ID).html(chartHTML);
						var newProps = Object.assign(_this.getDefaultConfigs(), propObject);
						_this.setData(newProps, dataObj, _this.uniqId);
					}
				};

				document.getElementsByTagName('head')[0].appendChild(script);
			})
		},
		loadScript: function () {

		},
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
        refresh: function () {
            return '';
        },
        getVersion: function () {
            return "[1.0.0,1.0.1]";
        },
        tooltip: function () {
            return "";
        },
        getPluginJsImports: function () {
            var jsArray = ["https://d3js.org/d3.v4.js", "https://d3js.org/d3-scale-chromatic.v1.min.js"];
            return jsArray;
        },
        getCSSFile: function () {
            var cssArray = [];
            return cssArray;
        },
		updateThemeClasses: function (OBJ) {
			return [];
		}

    }
}