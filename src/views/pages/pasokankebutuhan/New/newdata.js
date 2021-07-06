import {React, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {CCard, CCardBody, CDataTable, CButton, CModal, CModalHeader, CModalBody, CModalFooter} from '@coreui/react'
import Beras from './komoditas/beras'
import Garam from './komoditas/garam'
import Ikan from './komoditas/ikan'
import Lembu from './komoditas/lembu'
import Gula from './komoditas/gula'
import Barang from '../../../../assets/groceries.svg'
import Check from '../../../../assets/point.svg'
import supabase from '../../../../supabase'

const NewData = () =>{
    const komoditas = useSelector((state)=>state.komoditas)
    const jnsdata = useSelector((state)=>state.jnsdata)
    const [modal, setModal] = useState(false)
    const [fieldKomoditas, setFieldKomoditas] = useState([])
    const [itemKomoditas, setItemKomoditas] = useState({})
    const [halaman, setHalaman] = useState(1)
    const arrEldat = [
        {
            kode:'01',
            element:<Beras modal={modal} />
        },
        {
            kode:'02',
            element:<Garam modal={modal}/>
        },
        {
            kode:'03',
            element:<Ikan modal={modal}/>
        },
        {
            kode:'04',
            element:<Lembu modal={modal}/>
        },
        {
            kode:'05',
            element:<Gula modal={modal}/>
        },                                
    ]
    useEffect(async() => {
            let { data: tr_table, error } = await supabase
            .from('tr_table')
            .select("table")
            .eq('kd_komoditas', komoditas.kode)
            setFieldKomoditas(tr_table[0].table)
            console.log(tr_table)             
    },[]);    
    const data = arrEldat.filter((x)=>x.kode === komoditas.kode)[0].element
    return(
        <>
        <CModal
        show={modal}
        size="xl"
        onClose={()=>setModal(false)}
        style={{borderRadius:'12px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}
        >
            <CModalHeader>
                <h5>Masukkan {jnsdata.nama} {komoditas.nama}</h5>
            </CModalHeader>
            <CModalBody>
                {data}
            </CModalBody>
            <CModalFooter>
                <div className="mr-3">
                    <CButton className="btn btn-success">Simpan</CButton>
                </div>
                <div>
                    <CButton className="btn btn-danger">Batal</CButton>
                </div>                
            </CModalFooter>
        </CModal>
        <CCard style={{borderRadius:'15px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}>
            <CCardBody>
                <div className="d-flex flex-row">
                    <div>
                        <h3>Pengisian :</h3>
                    </div>
                    <div className="ml-2">
                        <div className="px-3 py-1" style={{color:'white', backgroundColor:'#02275d', borderRadius:'9px'}}><h5>{jnsdata.nama} {komoditas.nama}</h5></div>
                    </div>                
                </div>                
            </CCardBody>
        </CCard>
        <CCard style={{borderRadius:'15px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}>
            <CCardBody>
                <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                    <div style={{backgroundColor:'#ffffff', borderRadius:'12px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}} className={
                            halaman == 1 ?
                            "px-2 py-3 mr-3 clickable-on"
                            :
                            "px-2 py-3 mr-3 clickable-off"
                        } role="button" onClick={()=>setHalaman(1)}>
                        <img
                        src={Barang}
                        width="60vw"
                        />                
                    </div>
                    <div style={{backgroundColor:'#ffffff', borderRadius:'12px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}} className={
                        halaman == 2 ?
                        "px-2 py-3 clickable-on"
                        :
                        "px-2 py-3 clickable-off"
                    } role="button" onClick={()=>setHalaman(2)}>
                        <img
                        src={Check}
                        width="60vw"
                        />                
                    </div>                    
                </div>      
                {
                    halaman == 1 ?
                    <>
                        <div className="d-flex flex-row mt-5 mb-4">
                            <div>
                                <h3>Data Komoditas</h3>
                            </div>
                        </div>          
                        <div className="card px-4 py-3" style={{borderRadius:'12px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}>
                            <div className="d-flex flex-row justify-content-end mb-2 mr-2">
                                <CButton style={{borderRadius:'12px'}} onClick={()=>setModal(true)} className="btn btn-success"><i class="fas fa-plus-square"></i> Tambah</CButton>
                            </div>
                            <CDataTable
                            addTableClasses="josss"
                            fields={fieldKomoditas}
                            // items={itemKomoditas}
                            />                             
                        </div>                    
                    </>
                    :
                    <div className="d-flex flex-row mt-5">
                        <div>
                            <h3>Konfirmasi</h3>
                        </div>
                    </div>                     
                    
                }               
            </CCardBody>
        </CCard>
        </>
    )
}

export default NewData