import {React} from 'react'
import {CRow, CCol, CFormGroup, CLabel, CInput} from '@coreui/react'

const Ikan = () =>{
    return(
        <CRow>
            <CCol md="12">
                <CFormGroup>
                    <CLabel>Sub Komoditas</CLabel>
                    <CInput/>
                </CFormGroup>
            </CCol>
        </CRow>        
    )
}

export default Ikan