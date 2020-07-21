var homeCountry;
$.getJSON('https://ipapi.co/json/', function(ipData) {
    $.getJSON('https://api.covid19api.com/countries', function(countryData) {
        countryData.forEach(country => {
            if (country.ISO2 === ipData.country_code) {
                homeCountry = country;
                setDataForCountry(country);
            }
        });
    });
});

function setDataForCountry(country) {
    var url = 'https://api.covid19api.com/country/' + country.Slug;
    $.getJSON(url, function(coronaData) {
        coronaData = coronaData.reverse();
        const { Confirmed, Active, Recovered, Deaths } = coronaData[0];
        updateUI(country.Country, Confirmed, Active, Recovered, Deaths)
    });
    showContent();
}

function updateUI(label, confirmed, active, recovered, deaths) {
    $('#country').html(label);
    $('#confirmedCases').html(confirmed);
    $('#ActiveCases').html(active);
    $('#recovery').html(recovered);
    $('#deaths').html(deaths);
}

function worldUpdate() {
    $.getJSON('https://api.covid19api.com/world/total', function(coronaData) {
        $('#confirmedCases').html(coronaData.TotalConfirmed);
        $('#ActiveCases').html(coronaData.TotalConfirmed - coronaData.TotalDeaths - coronaData.TotalRecovered);
        $('#recovery').html(coronaData.TotalRecovered);
        $('#deaths').html(coronaData.TotalDeaths);
        $('#country').html('World');
        showContent();
    })
}