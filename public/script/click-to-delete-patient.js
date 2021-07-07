const deletePatient = async(element) => {
    try {
        const patientId = element.getAttribute('data-patient_id')
        const response = await fetch(
            `http://localhost:3000/delete-patient/?patientId=${patientId}`, {
                method: 'delete'
            }
        )
        if (response.status === 200) {
            alert('Đã xóa thành công')
            window.location.href = 'http://localhost:3000/patient-list-update'
        }

    } catch (error) {
        alert(error)
    }
}