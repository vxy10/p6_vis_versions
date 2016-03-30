
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.
  var width = 625;
  var height = 545;
  var margin = {top:0, left:20, bottom:40, right:10};

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // Sizing for the grid visualization
  var squareSize = 6;
  var squarePad = 2;
  var numPerRow = width / (squareSize + squarePad);

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  // We will set the domain when the
  // data is processed.
  


  var xBarScale = d3.scale.linear()
    .range([75, width]);

  var xAxisBar = d3.svg.axis()
    .scale(xBarScale)
    .orient("bottom")
    .tickFormat(d3.format(".2s")); 

  
  
  // The bar chart display is horizontal
  // so we can use an ordinal scale
  // to get width and y locations.
  var yBarScale = d3.scale.ordinal()
    .domain([0,1,2])
    .rangeBands([0, height - 100], 0.1, 0.1);

  var yAxisBar = d3.svg.axis()
    .scale(yBarScale)
    .orient("left")    
 
  // Color is determined just by the index of the bars
  var barColors = {0: "#ff4d4d", 1: "#399785", 2: "#98abc5"};
  // stacked bar display
  // stacked bar axis
   var xStackScale = d3.scale.ordinal()
    .domain([0,1,2,3,4,5])
    .rangeBands([75, width], 0.4, 0.2);
      
  var yStackScale = d3.scale.linear()
    .range([height-100,6]);

  var colorStackedBar = d3.scale.ordinal()
    .range(["#ff4d4d", "#399785", "#98abc5"]);
  
  var xAxisStack = d3.svg.axis()
    .scale(xStackScale)
    .orient("bottom");
  
  var yAxisStack = d3.svg.axis()
    .scale(yStackScale)
    .orient("left")
    .tickFormat(d3.format(".2s"));  
  
  
  var yStackScaleN = d3.scale.linear()
    .range([height-100,6]);
  
  var yAxisStackN = d3.svg.axis()
    .scale(yStackScaleN)
    .orient("left")
  
  // Reason: 

  var xReasonScale = d3.scale.linear()
    .range([75, width]);

  var xAxisReason = d3.svg.axis()
    .scale(xReasonScale)
    .orient("bottom")
    .tickFormat(d3.format(".2s")); 

  
  
  // The bar chart display is horizontal
  // so we can use an ordinal scale
  // to get width and y locations.
  var yReasonScale = d3.scale.ordinal()
    .rangeBands([0, height - 100], 0.1, 0.1);

  var yAxisReason = d3.svg.axis()
    .scale(yReasonScale)
    .orient("left")    
 
  // Color is determined just by the index of the bars
  var barReasonColors = ["#c9d3e1","#98abc5", "#8a89a6", 
                         "#7b6888", "#6b486b", "#a05d56", 
                         "#d0743c","#ffa333","#ff8c00"];

 

  // The color translation uses this
  // scale to convert the progress
  // through the section into a
  // color value.
  var coughColorScale = d3.scale.linear()
    .domain([0,1.0])
    .range(["#008080", "red"]);

  
  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function(selection) {
    selection.each(function(rawData) {
      // perform some preprocessing on raw data
      var overall_sentiment = groupByCount_sentiment(rawData);
      var countMax = d3.max(overall_sentiment, function(d) { return d.values;});
      xBarScale.domain([0,10000]);

      var overall_sentimentairline = groupByCount_sentimentairline(rawData);

      var overall_reason = groupByReason_negative(rawData);

      // create svg and give it a width and height
      svg = d3.select(this).selectAll("svg").data([overall_sentiment]);
      svg.enter().append("svg").append("g");

      svg.attr("width", width + margin.left + margin.right);
      svg.attr("height", height + margin.top + margin.bottom);


      // this group element will be used to contain all
      // other elements.
      g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // set the bar scale's domain
      

      setupVis(overall_sentiment,overall_sentimentairline,overall_reason);
      overall_sentimentairline=[];
      overall_sentiment = [];
      setupSections();

    });
  };


  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param wordData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  setupVis = function(overall_sentiment,overall_sentimentairline,overall_reason) {
    // Setting up overall visualization
    var height2 = height-100;
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height-100)+ ")")
      .call(xAxisBar);
    g.select(".x.axis").style("opacity", 0);

    g.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(75,0)")
      .call(yAxisBar);
    g.select(".y.axis").style("opacity", 0);

    // title page: Slide1
    openvis_title();
    
    // Data description: Slide 2
    data_introduction();
    
   // figure 1: barchart_overall
   draw_BarOverall(overall_sentiment);    
   // figure 2: barchart_by_airline
   draw_BarAirline(overall_sentimentairline);
    // figure 3: barchart_by_airline
   draw_BarAirlineNorm(overall_sentimentairline);
   // figure 4: barchart_by_airline
   debugger;
   draw_BarReason(overall_reason);
                  

  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  setupSections = function() {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showTitle;
    activateFunctions[1] = showFillerTitle;
    activateFunctions[2] = showBar_overall;
    activateFunctions[3] = showBar_airline;
    activateFunctions[4] = showBar_airlineNorm;
    activateFunctions[5] = showBar_Reason;




    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 9; i++) {
      updateFunctions[i] = function() {};
    }
    updateFunctions[7] = updateCough;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  /**
   * showTitle - initial title
   *
   * hides: count title
   * (no previous step to hide)
   * shows: intro title
   *
   */
  function showTitle() {
    hideAxis();
    g.selectAll(".count-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".fig1")
      .transition()
      .duration(600)
      .attr("opacity", 0);  
      

    g.selectAll(".openvis-title")
      .transition()
      .duration(1200)
      .attr("opacity", 1.0);
    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig3")
      .transition()
      .duration(1200)
      .attr("opacity", 0); 
  }

  function openvis_title(){
    // openvis title
    g.append("text")
      .attr("class", "title openvis-title")
      .attr("x", width / 2)
      .attr("y", height / 3)
      .text("US Airline");

    g.append("text")
      .attr("class", "sub-title openvis-title")
      .attr("x", width / 2)
      .attr("y", (height / 3) + (height / 6) )
      .text("sentiment analysis");

    g.append("text")
      .attr("class", "sub-sub-title openvis-title")
      .attr("x", width / 2)
      .attr("y", (height / 3) + (height / 6) + (height / 8) )
      .text("using twitter data.");

    g.selectAll(".openvis-title")
      .attr("opacity", 0);
  }

  /**
   * showFillerTitle - filler counts
   *
   * hides: intro title
   * hides: square grid
   * shows: filler count title
   *
   */
  function showFillerTitle() {
    hideAxis();
    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".fig1")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 0);  

    g.selectAll(".count-title")
      .transition()
      .duration(1200)
      .attr("opacity", 1.0);   
    g.selectAll(".fig3")
      .transition()
      .duration(1200)
      .attr("opacity", 0);   
    g.selectAll(".fig3")
      .transition()
      .duration(600)
      .attr("opacity", 0);   
    g.selectAll(".fig4")
      .transition()
      .duration(600)
      .attr("opacity", 0);
  }

function  data_introduction(){
    g.append("text")
      .attr("class", "title count-title highlight")
      .attr("x", width / 2)
      .attr("y", height / 3)
      .text("14640");

    g.append("text")
      .attr("class", "sub-title count-title")
      .attr("x", width / 2)
      .attr("y", (height / 3) + (height / 5) )
      .text("Tweets");
    g.selectAll(".count-title")
      .attr("opacity", 0);   
    g.selectAll(".fig3")
      .transition()
      .duration(600)
      .attr("opacity", 0);   
    g.selectAll(".fig4")
      .transition()
      .duration(600)
      .attr("opacity", 0);
};
  /**
   * showGrid - square grid
   *
   * hides: filler count title
   * hides: filler highlight in grid
   * shows: square grid
   *
   */

  function showBar_overall() {

    hideAxis();
    showAxisX(xAxisBar);
    showAxisY(yAxisBar);

    g.selectAll(".count-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);
    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 0);   
    g.selectAll(".fig1")
      .transition()
      .delay(function(d,i) { return 50 * (i + 1);})
      .duration(400)
      .attr("opacity", 1);   
    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 0);   
    g.selectAll(".fig3")
      .transition()
      .duration(1200)
      .attr("opacity", 0);

    g.selectAll(".y.axis").selectAll(".tick")
      .attr("visibility","hidden");  

    g.selectAll(".fig4")
      .transition()
      .duration(600)
      .attr("opacity", 0);
  }

    function showBar_airline() {

    hideAxis();
    showAxisX(xAxisStack);
    showAxisY(yAxisStack);

    g.selectAll(".count-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".fig1")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 1);   
    g.selectAll(".fig3")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig4")
      .transition()
      .duration(600)
      .attr("opacity", 0);



  }


   function showBar_airlineNorm() {

    hideAxis();
    showAxisX(xAxisStack);
    showAxisY(yAxisStackN);

    g.selectAll(".count-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".fig1")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig3")
      .transition()
      .duration(600)
      .attr("opacity", 1);    
    g.selectAll(".fig4")
      .transition()
      .duration(600)
      .attr("opacity", 0);
         
  }



   function showBar_Reason() {

    hideAxis();
    showAxisX(xAxisReason);
    showAxisY(yAxisReason);

    g.selectAll(".count-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".fig1")
      .transition()
      .duration(600)
      .attr("opacity", 0);

    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig2")
      .transition()
      .duration(600)
      .attr("opacity", 0);    
    g.selectAll(".fig3")
      .transition()
      .duration(600)
      .attr("opacity", 0);
    g.selectAll(".fig4")
      .transition()
      .duration(600)
      .attr("opacity", 1);
    g.selectAll(".y.axis").selectAll(".tick")
      .attr("visibility","hidden");    
         
  }


function draw_BarOverall(overall_sentiment){

    var bars = g.selectAll(".bar").data(overall_sentiment);
      bars.enter()
      .append("rect")
      .attr("class", "bar fig1")
      .attr("x", xBarScale(0))
      .attr("y", function(d,i) {return yBarScale(i);})
      .attr("fill", function(d,i) { return barColors[i]; })
      .attr("width", function(d) { return xBarScale(d.values);} )
      .attr("height", .8*yBarScale.rangeBand())
    g.append("text")
      .attr('class','ylabel fig1')
      .attr("transform", "translate("+ (40) +","+(height/2-30)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("Sentiment expressed in tweets");  
    g.append("text")
      .attr('class','xlabel fig1')
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (width/2+50) +","+(height-60)+")")  // centre below axis
      .text("Number of tweets");  
    var barText = g.selectAll(".bar-text").data(overall_sentiment);
    barText.enter()
      .append("text")
      .attr("class", "bar-text fig1")
      .text(function(d) { return d.key; })
      .attr("x", 90)
      .attr("dx",0)
      .attr("y", function(d,i) { return -45+yBarScale(i);})
      .attr("dy", yBarScale.rangeBand() / 1.2)
      .style("font-size", "30")
      .attr("fill", "white")
      .attr("opacity", 0);
    var barText2 = g.selectAll(".bar-text2").data(overall_sentiment);
    barText2.enter()
      .append("text")
      .attr("class", "bar-text2 fig1")
      .text(function(d) { return d.values; })
      .attr("x", function(d,i) {return xBarScale(d.values)})
      .attr("dx",function(d,i) {return (i == 0) ? -10 : 20})
      .attr("y", function(d,i) { return yBarScale(i)-80;})
      .attr("dy", yBarScale.rangeBand() / 1.2)
      .style("font-size", "25")
      .attr("fill", "black")
      .attr("opacity", 0);  


}





function   draw_BarAirline(overall_sentimentairline){    
   var d_names = {"positive": "#Positive",
          "negative": "#Negative",
          "neutral": "#Neutral",
      }; 
    colorStackedBar.domain(["negative","neutral","positive"]);
    xStackScale.domain(overall_sentimentairline.map(function(d) { return d.airline; }));
    yStackScale.domain([0, d3.max(overall_sentimentairline, function(d) { return d.total; })]);  
    yStackScale.domain([0, 4000]);  

  var airline_plot = g.selectAll('.bar_airline')
          .data(overall_sentimentairline).enter()
          .append("g")
          .attr("class", "fig2 g")
          .attr("transform", function(d) { return "translate(" + xStackScale(d.airline) + ",0)"; });
  airline_plot.selectAll("rect")
      .data(function(d) { return d.sentiments; })
      .enter().append("rect")
      .attr("width", xStackScale.rangeBand())
      .attr("y", function(d) { return yStackScale(d.y1); })
      .attr("height", function(d) { return yStackScale(d.y0) - yStackScale(d.y1); })
      .style("fill", function(d) { return colorStackedBar(d.name); });            
  g.append("text")
      .attr('class','ylabel fig2')
      .attr("transform", "translate("+ (35) +","+(height/2-30)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("Number of tweets");  
  g.append("text")
      .attr('class','xlabel fig2')
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (width/2+40) +","+(height-60)+")")  // centre below axis
      .text("Airline");
  var legendF2 = g.selectAll(".legend2")
      .data(colorStackedBar.domain().slice())
    .enter().append("g")
      .attr("class", "legend2 fig2 legend")
      .attr("transform", function(d, i) { return "translate(" + (180+i*200) + "," + 500 + ")"; });

  legendF2.append("rect")
      .attr("x", 0)
      .attr("width", 16)
      .attr("height", 16)
      .style("fill", colorStackedBar);

  legendF2.append("text")
      .attr("text-anchor","left")
      .attr("transform", function(d, i) { return "translate(" + (-5) + "," + 0 + ")"; })
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return  d_names[d]; });    
            
}   


  function draw_BarAirlineNorm(overall_sentimentairline) {
    
    colorStackedBar.domain(["ng_ratio","nt_ratio","ps_ratio"]);
    overall_sentimentairline.forEach(function(d) {
      var y0 = 0;
      d.sentimentsNorm = colorStackedBar.domain().map(function(name) {return {name: name, y0: y0, y1: y0 += +d[name]}; });
      //d.total = d.sentiments[d.sentiments.length - 1].y1;
      });

    xStackScale.domain(overall_sentimentairline.map(function(d) { return d.airline; }));
    yStackScaleN.domain([0, 1]);  
  var airline_plot2 = g.selectAll('.bar_airline')
          .data(overall_sentimentairline).enter()
          .append("g")
          .attr("class", "bar_airline fig3 g")
          .attr("transform", function(d) { return "translate(" + xStackScale(d.airline) + ",0)"; });
  airline_plot2.selectAll("rect")
      .data(function(d) { return d.sentimentsNorm; })
      .enter().append("rect")
      .attr("width", xStackScale.rangeBand())
      .attr("y", function(d) { return yStackScaleN(d.y1); })
      .attr("height", function(d) { return yStackScaleN(d.y0) - yStackScaleN(d.y1); })
      .style("fill", function(d) { return colorStackedBar(d.name); });
  g.append("text")
      .attr('class','ylabel fig3')
      .attr("transform", "translate("+ (40) +","+(height/2-30)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("Fraction of tweets");  
  g.append("text")
      .attr('class','xlabel fig3')
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (width/2+40) +","+(height-60)+")")  // centre below axis
      .text("Airline"); 

  var legendF3 = g.selectAll(".legend3")
      .data(colorStackedBar.domain().slice())
    .enter().append("g")
      .attr("class", "legend3 fig3 legend")
      .attr("transform", function(d, i) { return "translate(" + (180+i*200) + "," + 500 + ")"; });

  legendF3.append("rect")
      .attr("x", 0)
      .attr("width", 16)
      .attr("height", 16)
      .style("fill", colorStackedBar);

  var d_names = {"ps_ratio": "#Positive / #Total",
          "ng_ratio": "#Negative / #Total",
          "nt_ratio": "#Neutral / #Total",
      };    
  legendF3.append("text")
      .attr("text-anchor","left")
      .attr("transform", function(d, i) { return "translate(" + (-5) + "," + 0 + ")"; })
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d_names[d]; });   
  
}


function draw_BarReason(overall_reason) {
    
    d3.range(overall_reason.length)
    yReasonScale.domain(d3.range(overall_reason.length))
    xReasonScale.domain([0,3000]);

    var barsReason = g.selectAll(".barReason").data(overall_reason);
    barsReason.enter()
      .append("rect")
      .attr("class", "barReason fig4")
      .attr("x", xReasonScale(0))
      .attr("y", function(d,i) {return yReasonScale(i);})
      .attr("fill", function(d,i) { return barReasonColors[i]; })
      .attr("width", function(d) { return xReasonScale(d.values);} )
      .attr("height", .8*yReasonScale.rangeBand())
    g.append("text")
      .attr('class','ylabel fig4')
      .attr("transform", "translate("+ (50) +","+(height/2-30)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("Sentiment expressed in tweets");  
    g.append("text")
      .attr('class','xlabel fig4')
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (width/2+50) +","+(height-60)+")")  // centre below axis
      .text("Number of tweets");  
    debugger  
    var bartextReason = g.selectAll(".bar-textReason").data(overall_reason);
    bartextReason.enter()
      .append("text")
      .attr("class", "bar-textReason fig4")
      .text(function(d) { return (d.key=='longlines') ? 'Long Lines' : d.key} )
      .attr("x", 76)
      .attr("dx",0)
      .attr("y", function(d,i) { return -15+yReasonScale(i);})
      .attr("dy", yReasonScale.rangeBand() / 1.8)
      .style("font-size", "10.25")
      .attr("fill", "white")
      .attr("opacity", 0);
    var bartextReason2 = g.selectAll(".bar-bartextReason2").data(overall_reason);
    bartextReason2.enter()
      .append("text")
      .attr("class", "bar-bartextReason2 fig4")
      .attr('text-anchor','right')
      .text(function(d) { return d.values; })
      .attr("x", 75)
      .attr("dx",function(d,i) { console.log(d.values);return (xReasonScale(d.values)-75)})
      .attr("y", function(d,i) { return yReasonScale(i)+20;})
      .style("font-size", "11")
      .attr("fill", "black")
      .attr("opacity", 0);  

  
}
  
/**
  /**
   * showAxis - helper function to
   * display particular xAxis
   *
   * @param axis - the axis to show
   *  (xAxisHist or xAxisBar)
   */
  function showAxisX(axis) {
    g.select(".x.axis")
      .call(axis)
      .transition().duration(600)
      .style("opacity", 1);
  }
  function showAxisY(axis) {
    g.select(".y.axis")
      .call(axis)
      .transition().duration(600)
      .style("opacity", 1);
  }

  /**
   * hideAxis - helper function
   * to hide the axis
   *
   */
  function hideAxis() {
    g.select(".x.axis")
      .transition().duration(600)
      .style("opacity",0);
    g.select(".y.axis")
      .transition().duration(600)
      .style("opacity",0);
    
  }

  /**
   * UPDATE FUNCTIONS
   *
   * These will be called within a section
   * as the user scrolls through it.
   *
   * We use an immediate transition to
   * update visual elements based on
   * how far the user has scrolled
   *
   */

  /**
   * updateCough - increase/decrease
   * cough text and color
   *
   * @param progress - 0.0 - 1.0 -
   *  how far user has scrolled in section
   */
  function updateCough(progress) {
    g.selectAll(".cough")
      .transition()
      .duration(0)
      .attr("opacity", progress);

    g.selectAll(".hist")
      .transition("cough")
      .duration(0)
      .style("fill", function(d,i) {
        return (d.x >= 14) ? coughColorScale(progress) : "#008080";
      });
  }

  /**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */

  /**
   * getWords - maps raw data to
   * array of data objects. There is
   * one data object for each word in the speach
   * data.
   *
   * This function converts some attributes into
   * numbers and adds attributes used in the visualization
   *
   * @param rawData - data read in from file
   */
  function getWords(rawData) {
    return rawData.map(function(d,i) {
      // is this word a filler word?
      d.filler = (d.filler === "1") ? true : false;
      // time in seconds word was spoken
      d.time = +d.time;
      // time in minutes word was spoken
      d.min = Math.floor(d.time / 60);

      // positioning for square visual
      // stored here to make it easier
      // to keep track of.
      d.col = i % numPerRow;
      d.x = d.col * (squareSize + squarePad);
      d.row = Math.floor(i / numPerRow);
      d.y = d.row * (squareSize + squarePad);
      return d;
    });
  }


  /**
   * getFillerWords - returns array of
   * only filler words
   *
   * @param data - word data from getWords
   */

  /**
   * getHistogram - use d3's histogram layout
   * to generate histogram bins for our word data
   *
   * @param data - word data. we use filler words
   *  from getFillerWords
   */
  function getHistogram(data) {
    // only get words from the first 30 minutes
    var thirtyMins = data.filter(function(d) { return d.min < 30; });
    // bin data into 2 minutes chuncks
    // from 0 - 31 minutes
    return d3.layout.histogram()
      .value(function(d) { return d.min; })
      .bins(d3.range(0,31,2))
      (thirtyMins);
  }

  /**
   * groupByCount - group words together
   * using nest. Used to get counts for
   * barcharts.
   *
   * @param words
   */
  

  function groupByCount_sentiment(data) {
    return d3.nest()
      .key(function(d) { return d.sentiment; })
      .rollup(function(v) { return v.length; })
      .entries(data)
      .sort(function(a,b) {return b.values - a.values;});
  }


  function groupByReason_negative(data) {
    data = data.filter(function(d) { return d.sentiment == 'negative'; })
               .filter(function(d) { return d.reason != "Can't Tell"; });
    return d3.nest()
        .key(function(d) { return d.reason; })
        .rollup(function(v) { return v.length; })
        .entries(data)
        .sort(function(a,b) {return b.values - a.values;});

  }

  // function to group by sentiment and airline.
  function groupByCount_sentimentairline(data) {
   
    sentiment_order = ["negative","neutral","positive"];
    var sentiment_airline = d3.nest()
      .key(function(d) { return d.airline; })
      .key(function(d) { return d.sentiment; }).sortKeys(function(a,b) { return sentiment_order.indexOf(a) - sentiment_order.indexOf(b); })
      .rollup(function(v) { return v.length; })
      .entries(data)
      .map(function(d) {
        var data_ret = {"airline":d.key,"negative":d.values[0].values,"neutral":d.values[1].values,"positive":d.values[2].values,
                        "total":d.values[0].values+d.values[1].values+d.values[2].values,
                      };
        data_ret['ps_ratio'] = data_ret['positive']/data_ret['total'];
        data_ret['ng_ratio'] = data_ret['negative']/data_ret['total'];
        data_ret['nt_ratio'] = data_ret['neutral']/data_ret['total'];              
        return data_ret;
      });         


     colorStackedBar.domain(["negative","neutral","positive"]);
     sentiment_airline.forEach(function(d) {
      var y0 = 0;
      d.sentiments = colorStackedBar.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      //d.total = d.sentiments[d.sentiments.length - 1].y1;
      });
      sentiment_airline.sort(function(a, b) { return b.total - a.total; });
      
      colorStackedBar.domain(["ng_ratio","nt_ratio","ps_ratio"]);
      sentiment_airline.forEach(function(d) {
      var y0 = 0;
      d.sentimentsNorm = colorStackedBar.domain().map(function(name) {return {name: name, y0: y0, y1: y0 += +d[name]}; });
      //d.total = d.sentiments[d.sentiments.length - 1].y1;
      });
      sentiment_airline.sort(function(a, b) { return b.total - a.total; });

     return sentiment_airline;
  };
  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select("#vis")
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(index, progress){
    plot.update(index, progress);
  });
}

// load data and display
d3.csv("data/data_submission_twitter.csv", function(d) {
  return {
    sentiment: d.airline_sentiment, // convert "Year" column to Date
    airline: d.airline,
    reason: d.negativereason,
    lat: +d.latitude,
    lon: +d.longitude // convert "Length" column to number
  };
},display);
//d3.tsv("data/words.tsv", display);

