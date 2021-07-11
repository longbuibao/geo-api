console.log('hello')
const getLichTrinh = async(element) => {
    const name = element.getAttribute('data-patient-name')
    const response = await fetch(
        `http://localhost:3000/api/lich-trinh-di-chuyen/?name=${name}`
    )
    const data = await response.text()
        //lamf gif do voi data....
    alert(data)
}