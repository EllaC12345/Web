// Fetch and process data
console.log(CAGR_data);
console.log(description);
console.log(CAGR_Volume);
console.log(sector);
console.log(CPI_data);

// Constructing the pie chart
let data = [{
    labels: Object.keys(sector),
    values: Object.keys(sector).map(function (key) {
        return sector[key]['Y'].reduce((a, b) => a + b, 0);
    }),
    type: "pie"
}];
let layout = {
    height: 600,
    width: 800
};
Plotly.newPlot("pie", data, layout);

// initialize the dashboard and Populate the dropdown menu
function init (){
    let dropdownMenu = d3.select("#selDataset");
        // Define the event handler for the dropdown menu
    dropdownMenu.on("change", function() {
        let selectedSector = dropdownMenu.property("value");
        // Update the charts based on the selected sector
        updatethelinechart(selectedSector);
        updatethescatterplot(selectedSector);
        });
        
    // Initialize the charts and description with the first sector
    let initialSector = dropdownMenu.property("value");
    updatethelinechart(initialSector);
    updatethescatterplot(initialSector);
      
    }

// Updates the charts based on the selected sector
function updatethelinechart(selectedSector) {
    let lineData = CAGR_data[selectedSector];
    let cpi = CPI_data;
    let trace1 = {
        x: lineData.X,
        y: lineData.Y,
        mode: 'lines',
        name: 'Sector Growth'
            
    };
    let trace2 = {
        x: cpi.X,
        y: cpi.Y,
        mode: 'lines',
        name: 'CPI Growth'
    };
    let layout = {
        title: "Sector Growth vs CPI",
        width: 800,
        height: 600
    };
    Plotly.newPlot('line', [trace1, trace2], layout);
    }
function updatethescatterplot(selectedSector) {
    let scatterdata = CAGR_Volume[selectedSector];
    let cpi = CPI_data;
    let trace3 = {
        x: scatterdata.X,
        y: scatterdata.Y,
        mode: 'markers',
        type: 'scatter',
        name: 'Sector Volume Growth'
        };
    let trace4 = {
        x: cpi.X,
        y: cpi.Y,
        mode: 'markers',
        type: 'scatter',
        name: ' Change in CPI',
    }


    let layout2 = {
        title: "Sector Volume Growth vs CPI",
        width: 800,
        height: 600
        };
    Plotly.newPlot('scatter', [trace3, trace4], layout2);
    }


// Initialize the dashboard
init();





