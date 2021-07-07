const deleteStatus = async(element) => {
    try {
        const statusId = element.getAttribute('data-status_id')
        const pId = element.getAttribute('data-patient_id')
        const pName = element.getAttribute('data-patient_name')
        const response = await fetch(
            `http://localhost:3000/delete-status/?statusId=${statusId}`, {
                method: 'delete'
            }
        )
        if (response.status === 200) {
            alert('Đã xóa thành công')
            window.location.href = `http://localhost:3000/all-patient-status/?id=${pId}&name=${pName}`
        }

    } catch (error) {
        alert(error)
    }
}