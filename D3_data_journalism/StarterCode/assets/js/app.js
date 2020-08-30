// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
const svgWidth = 700;
const svgHeight = 500;

// Define chart's margins 
const chartMargin = {
    top: 70,
    right: 50,
    bottom: 70,
    left: 50
};

// Define dimensions of the chart area
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Append an svg wrapper to the page and set a variable equal to a reference to the section
const svg = d3.select('#scatter')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

// Append a group to the SVG area and shift over by the margins object
const chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

// Read/load 'csv' data file
d3.csv('assets/data/data.csv').then (
    csvData => {
        console.log(csvData);
        
        csvData.forEach(function(data) {
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
        });

// Create a linear scale for the x (poverty) axis 
const xScale = d3.scaleLinear()
                .domain(d3.extent(csvData, row => row.poverty))
                .range([0, chartWidth]);
                

// Create a linear scale for the y (healthcare) axis
const yScale = d3.scaleLinear()
                .domain([0, d3.max(csvData, d => d.healthcare)])
                .range([chartHeight, 0]);

// Create axis
const yAxis = d3.axisLeft(yScale);
const xAxis = d3.axisBottom(xScale);

// Append the x axis to the bottom of the chart
chartGroup.append("g")
    .call(xAxis)
    .attr('transform', `translate(0, ${chartHeight})`);

// Append the y axis to the left of the chart 
chartGroup.append("g").call(yAxis);

// Scatter plot - append circles for the data
const scatterPlot = chartGroup.selectAll('circle')
                        .data(csvData)
                        .enter()
                        .append('circle')
                        .attr("cx", (d,i) => xScale(d.poverty))
                        .attr("cy", (d,i) => yScale(d.healthcare))
                        .attr('r', 12)
                        .attr('fill', '#89bdd3')
                        .attr('stroke', '#e3e3e3');

// adding state abbreviations
                    chartGroup.selectAll('text')
                        .data(csvData)
                        .enter()
                        .append('text')
                        .text((d) => d.abbr)
                        .attr("x", (d,i) => xScale(d.poverty))
                        .attr("y", d => (yScale(d.healthcare-.30)))
                        .classed('stateText', true);       


//  X and Y axes labels
                // x label
                    chartGroup.append('text')
                        .text('In Poverty (%)')
                        .attr('text-align', 'center')
                        .classed('aText', true)
                        .attr('transform', `translate(${chartWidth/2}, ${chartHeight+40})`);
                // y label
                    // chartGroup.append('text')
                    //     .text('Lacks Healthcare (%)')
                    //     .attr('text-align', 'center')
                    //     .classed('aText', true)
                    //     .attr('transform', `translate(${svgWidth - 30}, ${svgHeight/2})`)
                    //     .attr('transform', 'rotate(-90)');



 // event listener for mouseover event
    scatterPlot.on('mouseover', function () {
        d3.select(this).attr('fill', 'red');
    })
    .on('mouseout', function (){
        d3.select(this).attr('fill', '#89bdd3');
    })

}).catch(function(error) {
    console.log(error);
});















