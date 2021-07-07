const input = document.getElementById('test');
const log = document.getElementById('values');

const platform = new H.service.Platform({
    'apikey': 'c0-Sq--dxACjXJ8dsPp1O6fTGlLIx6TCA4CIqGlCuHc'
});

const service = platform.getSearchService();

input.addEventListener('input', getDetailLocation);

function getDetailLocation(e) {

    console.log(e)

    service.geocode({
        q: e.target.value
    }, (result) => {
        const items = result.items[0]
        console.log(items)
        document.getElementById('latEvent').value = items.position.lat
        document.getElementById('longEvent').value = items.position.lng
        document.getElementById('districtEvent').value = items.address.city

    }, alert);

}