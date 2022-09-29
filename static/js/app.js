const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){
    d3.json(url).then((data) => {
    let selector = d3.select('#selDataset');
    selector.html("")
 
    for (let i=0; i<data.names.length; i++){
        let selOptions = selector.append("option")
        selOptions.property("value", data.names[i]);
        selOptions.text(`OTU ${data.names[i]}`);
    }

    // generate plots
    Scatter('940')
    Bar('940')
    OverallInfo('940')
})}

function optionChanged(newID){
    Scatter(newID)
    Bar(newID)
    OverallInfo(newID)  
}

function Scatter(id){
    d3.json(url).then((data) => {
        // code for scatter plot goes here
        let myData = data.samples.filter(i => i.id == id)[0]

        let trace1 = {
            x: myData.otu_ids,
            y: myData.sample_values,
            mode: "markers",
            marker: {
                color: myData.otu_ids,
                size: myData.sample_values
            }

        };
        let scatterData = [trace1];

        let layout = {
            title: "",
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Values"
            }
        };

        Plotly.newPlot('bubble', scatterData, layout);
    });
}

function Bar(id){
    d3.json(url).then((data) => {
        let myData = data.samples.filter(i => i.id == id)
        
        let trace2 = {
            y: myData[0].otu_ids.slice(0, 10).map(i => `OTU ${i}`).reverse(),
            x: myData[0].sample_values.slice(0, 10).reverse(),
            text: myData[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let barData = [trace2];

        let barLayout = {
            title: "Top 10 OTU's",
            xaxis: {
                title: "Sample Values"
            }
        };

        Plotly.newPlot('bar', barData, barLayout);
    });
}

function OverallInfo(id){
    d3.json(url).then((data) => {
        let myData = data.metadata.filter(i => i.id == id)[0]
        console.log(myData)
        let summaryData = d3.select('#sample-metadata');
        summaryData.html("")
        Object.entries(myData).forEach(([k, v]) => {
        summaryData.append("p").text(`${k}:${v}`)    
        })
    })
}

init() 