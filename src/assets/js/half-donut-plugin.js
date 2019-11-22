export const  halfDonutPlugin = {
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
            var uniqId = "halfDonut" + Math.floor((Math.random() * 1000) + 1);
			this.uniqueId = uniqId;
            return '<div class="d3-halfDonut" id="' + uniqId + '" style=""></div>';
        },
        getLabelName: function () {
            return "halfDonut D3";
        },
        getWidgetName: function () {
            return 'D3halfDonut';
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
        // setData: function (propObject, dataObj, id) {
        setData: function () {
			var  title = "Market Coverage";
			var jsonData = [
						{value: 0.5, Name: "pie1"},
						{value: 0.3, Name: "pie2"},
						{value: 0.1, Name: "pie3"},
						{value: 0.1, Name: "pie4"}
			];
			var margin = {
				top: 20,
				right: 30,
				bottom: 60,
				left: 60
};

var chartDimensions = {title:title,width: 300,height: 200,DOMElement: 'half-donut',legendPos: 'right'};

  var {title,width,height,DOMElement, legendPos} = chartDimensions;
  var anglesRange = 0.5 * 3.14;
//   var radis = Math.min(width/1.5, 2 * height) / 2;
var radis = 150;
  console.log(radis);
  var thickness = 50;
  var color = d3.scaleOrdinal(d3.schemeCategory20);
  var position ={xPos: radis-margin.right, yPos: height, direction:  legendPos };

  var pies = d3.pie()
	   .value( function(d){ return d["value"]; })
	   .sort(null)
	   .startAngle( anglesRange * -1)
	   .endAngle( anglesRange);

  var arc = d3.arc()
		.outerRadius(radis)
		.innerRadius(radis - thickness);

  var translation = (x, y) => `translate(${x}, ${y})`;

  var svg = d3.select("."+"half-donut").append("svg")
		   .attr("width", width)
		   .attr("height", height)
		   .attr("viewBox", "0 0 "+width+" "+ height)
		   .attr("class", "half-donut")
		   .append("g")
		   .attr("transform", translation(width / 2, height));
  var pie = svg.selectAll("path")
	  .data(pies(jsonData))
	  .enter()
	  .append("path")
	  .attr("fill", (d, i) => color(i))
	  .attr("d", arc)
	  .attr("class","node");

 // displayTooltip(pie);
  svg.append("text")
	  .text(title)
	  .attr("dy", "-.25rem")
	  .attr("class", "label")
	  .attr("font-size","1.2em")
	  .attr("text-anchor", "middle")
	  .attr("font-weight","bold");

			
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
		// drawChart: function (propObject, dataObj, ID = '.class') {
		drawChart: function () {
			var _this = this;
			this.getJsDependencies().forEach(function (src, index) {
				var script = document.createElement('script');
				script.setAttribute('src', src);
				script.async = false;
				script.onreadystatechange = script.onload = function () {
					if (_this.getJsDependencies().length - 1 == index) {
						var chartHTML = _this.getHTML();
						d3.select(".class").html(chartHTML);
						// var newProps = Object.assign(_this.getDefaultConfigs(), propOject);
						// _this.setData(newProps, dataObj, _this.uniqueId);
						_this.setData();
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