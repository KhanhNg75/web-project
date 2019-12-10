$(document).ready(function() {

    $.get("crime.json", function(data) {
        var dataviolationpercent = [];
        var wardname = [];

        for (var i in data) {
            wardname.push(data[i].fields.ward_name)
            dataviolationpercent.push(data[i].fields.violent_sexual_offences_rate_per_1000_ward_population)
        }

        var ctx = document.getElementById('chartViolationPercent').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: wardname,
                datasets: [{
                    label: "Violent Sexual Offences",
                    backgroundColor: "rgb(135,184,212)",
                    data: dataviolationpercent
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Violent Sexual Offences Rate Per 1000 Ward Population'
                }
            }
        });
    })
})