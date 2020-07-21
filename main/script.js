$('#menu-btn').click(function() {
    if ($('#menu-icon').hasClass('fa-bars')) {
        hideContent();
    } else {
        showContent();
    }
});

$('#worldBtn').click(function() {
    document.getElementById('search-result').innerHTML = '';
    worldUpdate();
});

$('#homeBtn').click(function() {
    document.getElementById('search-result').innerHTML = '';
    setDataForCountry(homeCountry);
});

$('#search-btn').click(function() {
    search();
});

function hideContent() {
    //  icons
    $('#menu-icon').removeClass('fa-bars');
    $('#menu-icon').addClass('fa-times');
    // hide and show for menu box
    $('.menu ul').removeClass('hidden');
    $('.menu ul').addClass('shown');
    // hide and show for content box
    $('.content').addClass('hidden');
    $('.content').removeClass('shown');
    //show search division
    $('.search-division').css('display', 'block');
}

function showContent() {
    // hide and show icons
    $('#menu-icon').addClass('fa-bars');
    $('#menu-icon').removeClass('fa-times');
    // hide and show menu box
    $('.menu ul').addClass('hidden');
    $('.menu ul').removeClass('shown');
    // hide and show content box
    $('.content').removeClass('hidden');
    $('.content').addClass('shown');
    $('.search-division').css('display', 'none');
}

function search() {
    var results = document.getElementById('search-result');
    results.innerHTML = '';
    const input = $('#search').val();
    document.getElementById('search').value = '';
    // console.log(input);
    // console.log(country_arr);
    $.getJSON(`https://api.covid19api.com/countries`, function(countries_json) {
        countries_json.forEach(country => {
            if (country.Country.toLowerCase().includes(input.toLowerCase())) {
                const newSpan = document.createElement('span');
                const imgTag = document.createElement('img');
                imgTag.src = "https://www.countryflags.io/" + country.ISO2 + "/flat/64.png";
                imgTag.setAttribute('class', 'countryImg');
                newSpan.setAttribute('class', 'filtered-country');
                newSpan.innerHTML = imgTag.outerHTML + "    " + country.Country;
                newSpan.onclick = () => {
                    results.innerHTML = '';
                    setDataForCountry(country);
                }
                results.appendChild(newSpan);
            }
        });
    })
}