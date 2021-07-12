const createTable = (data, id) => {
    //tao bang, table header
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    table.id = 'patients2'

    table.appendChild(thead)
    table.appendChild(tbody)

    let row_1 = document.createElement('tr')
    let heading_1 = document.createElement('th')
    heading_1.innerHTML = "Địa chỉ"
    let heading_2 = document.createElement('th')
    heading_2.innerHTML = "Thời gian"
        // let heading_3 = document.createElement('th')
        // heading_3.innerHTML = "TOA DO"

    row_1.appendChild(heading_1)
    row_1.appendChild(heading_2)
        // row_1.appendChild(heading_3)
    thead.appendChild(row_1)

    //them data cho moi features

    const { features } = data

    features.forEach(ftr => {
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td')
        row_2_data_1.innerHTML = ftr.properties.detailAdd
        let row_2_data_2 = document.createElement('td')
        row_2_data_2.innerHTML = ftr.properties.happendAt
            // let row_2_data_3 = document.createElement('td')
            // row_2_data_3.innerHTML = `toa do long: ${ftr.geometry.coordinates[0]}, toa do lat: ${ftr.geometry.coordinates[1]}`

        // add layer .... ???


        row_2.appendChild(row_2_data_1)
        row_2.appendChild(row_2_data_2)
            // row_2.appendChild(row_2_data_3)
        tbody.appendChild(row_2)
    })

    const modal = document.getElementById('myModal')
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    document.getElementById('modal-content').innerHTML = ''
    document.getElementById('modal-content').appendChild(table)

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

const showModal = (id, data) => {
    const dataObject = JSON.parse(data)
    createTable(dataObject, id)
}

const getLichTrinh = async(element) => {
    const name = element.getAttribute('data-patient-name')
    const response = await fetch(
        `http://localhost:3000/api/lich-trinh-di-chuyen/?name=${name}`
    )

    const data = await response.text()
    showModal(name, data)
}