import {React, useState} from 'react'
import {CDataTable, CButton, CInput} from '@coreui/react'
import ModalKomoditas from './modalKomoditas'
import { useHistory } from 'react-router-dom'

const Viavalen = () =>{
    const history = useHistory()
    const [modal, setModal] = useState(false)
    return(
        <>
        <ModalKomoditas modal={modal} callback={()=>setModal(false)}/>
        <div className="card px-3 py-3" style={{width:'100%', borderRadius:'18px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{height:'100px'}}>
                <h4>Riwayat Data Kebutuhan dan Pasokan</h4>
            </div>
            <div className="d-flex flex-row justify-content-end mr-1 mb-2">
                <div className="mr-auto">
                    <CButton style={{borderRadius:'12px', backgroundColor:'#606365', color:'white'}} onClick={()=>history.push('/')} className="btn"><i class="fa fa-chevron-left"></i> Kembali</CButton>                    
                </div>
                <div className="mr-3">
                    <CInput style={{borderRadius:'12px', width:'20vw', backgroundColor:'#fafafc'}} placeholder="Search"/>
                </div>
                <div>
                    <CButton style={{borderRadius:'12px', backgroundColor:'#20c997', color:'white'}} onClick={()=>setModal(true)} className="btn"><i class="fas fa-plus-square"></i> Tambah</CButton>                    
                </div>
            </div>
            <div>
                <CDataTable
                addTableClasses="josss"
                fields={[
                    {key:'nomor', label:'Nomor'},
                    {key:'noaju', label:'Nomor AJU'},
                    {key:'komoditas', label:'Komoditas'},
                    {key:'status', label:'Status'},
                    {key:'action', label:'Action'},
                ]}
                />
            </div>
        </div>
        </>
    )
}

export default Viavalen