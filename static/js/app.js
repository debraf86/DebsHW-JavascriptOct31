// from data.js
const tableData = data;

console.log(tableData);

let tbody=d3.select("tbody");

tableData.forEach(UFOsighting => {
    const trow = tbody.append("tr");
    const columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
    columns.forEach(key=>{
        console.log(key, UFOsighting[key]);
        trow.append("td").text(UFOsighting[key]);
    })
})

// select the filter button
const submit = d3.select("#filter-btn");

submit.on("click", function() {

    // prevent the page from refreshing
    d3.event.preventDefault();

    // select the value of the input fields for filtering the sightings table
    const inputDate = d3.select("#datetime.form-control").property("value")
    const inputCity= d3.select("#city.form-control").property("value")
    const inputState= d3.select("#state.form-control").property("value")
    const inputCountry= d3.select("#country.form-control").property("value")
    const inputShape= d3.select("#shape.form-control").property("value")

    console.log(tableData);
    
    // filter the table data based on the input
    let filteredData = tableData ;
    if (inputDate) {
        filteredData = filteredData.filter(sighting => sighting.datetime === inputDate);
    }
    
    // toLowerCase doesn't work on strings with a space. 
    if (inputCity){
        filteredData = filteredData.filter(sighting => sighting.city === inputCity);
    }

    if (inputState){
        filteredData = filteredData.filter(sighting => sighting.state === inputState.toLowerCase());
    }

    if (inputCountry){
        filteredData = filteredData.filter(sighting => sighting.country === inputCountry.toLowerCase());
    }

    if (inputShape){
        filteredData = filteredData.filter(sighting => sighting.shape === inputShape.toLowerCase());
    }
    
    // clear the table
    d3.selectAll("td").remove();

    // rebuild the table with filtered data
    filteredData.forEach(UFOsighting => {
        const trow = tbody.append("tr");
        const columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
        columns.forEach(key=>{
            // console.log(key, UFOsighting[key]);
            trow.append("td").text(UFOsighting[key]);
        })
    })

})