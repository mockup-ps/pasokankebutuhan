import {React, useState} from 'react'
import {CModal, CModalHeader, CModalBody, CButton} from '@coreui/react'
import Beras from '../../../../assets/rice.svg'
import Garam from '../../../../assets/salt-shaker.svg'
import Ikan from '../../../../assets/fish.svg'
import Lembu from '../../../../assets/cow.svg'
import Gula from '../../../../assets/sugar.svg'
import Pasokan from '../../../../assets/forklift.svg'
import Kebutuhan from '../../../../assets/demand.svg'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ModalKomoditas = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const komoditas = useSelector((state)=>state.komoditas)
    const arrKomoditas = [
        {
            nama:'Beras',
            svg:Beras,
            kode:'01',
            disabled:false
        },
        {
            nama:'Garam',
            svg:Garam,
            kode:'02',
            disabled:false
        },
        {
            nama:'Ikan',
            svg:Ikan,
            kode:'03',
            disabled:true
        },
        {
            nama:'Daging Lembu',
            svg:Lembu,
            kode:'04',
            disabled:false
        }, 
        {
            nama:'Gula',
            svg:Gula,
            kode:'05',
            disabled:false
        }                             
    ]
    const arrPilihan = [
        {
            nama:'Data Pasokan',
            svg:Pasokan,
            kode:'01'
        },
        {
            nama:'Data Kebutuhan',
            svg:Kebutuhan,
            kode:'02'
        }
    ]
    const [halaman, setHalaman] = useState(1)
    return(
        <CModal
        style={{borderRadius:'20px', backgroundColor:'#FFF8D9',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}
        show={props.modal}
        onClose={()=>props.callback()}
        >
            <CModalHeader closeButton>
                <h4>{halaman === 1? "Pilih Komoditas" : "Pilih Jenis Data ("+komoditas.nama+")"}</h4>
            </CModalHeader>
            <CModalBody>
                <div className="d-flex flex-row flex-wrap justify-content-center">
                    {
                        halaman === 1 ?
                        <>
                           {
                                arrKomoditas.map((x)=>{
                                    return(
                                        <div className={
                                            x.disabled ?
                                            "d-flex flex-column mr-3 ml-3 mt-2"
                                            :
                                            "d-flex flex-column clickable mr-3 ml-3 mt-2"
                                        } role="button" onClick={()=>{
                                            if(!x.disabled){
                                                dispatch({type: 'set', komoditas: x })
                                                setHalaman(2)                                                
                                            }
                                            }}>
                                            <div style={{backgroundColor:'#A0937D', borderRadius:'20px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}} className={
                                                x.disabled ?
                                                "px-3 py-3 disabled"
                                                :
                                                "px-3 py-3"
                                            }>
                                                <img
                                                src={x.svg}
                                                width="80vw"
                                                />
                                            </div> 
                                            <div className="d-flex justify-content-center">
                                            <p><b>{x.nama}</b></p>
                                            </div>                       
                                        </div>                                
                                    )
                                })
                            }                        
                        </>
                        :
                        halaman === 2 ?
                        <>
                            {
                                arrPilihan.map((x)=>{
                                    return(
                                        <div className="d-flex flex-column clickable mr-3 ml-3 mt-2" role="button" onClick={()=>{
                                            dispatch({type: 'set', jnsdata: x })
                                            history.push('/pasokankebutuhan/new')
                                            }}>
                                            <div style={{backgroundColor:'#FF616D', borderRadius:'12px',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}} className="px-3 py-3">
                                                <img
                                                src={x.svg}
                                                width="80vw"
                                                />
                                            </div> 
                                            <div className="d-flex justify-content-center">
                                            <p><b>{x.nama}</b></p>
                                            </div>                       
                                        </div>                                     
                                    )
                                })
                            }
                        </>
                        :
                        <>
                        </>                       
                    }
                </div>
                {
                    halaman === 2 ?
                    <>
                        <div className="d-flex flex-row justify-content-start ml-2">
                            <CButton onClick={()=>setHalaman(1)} className="btn btn-warning"><i class="fas fa-arrow-circle-left"></i></CButton>
                        </div>                        
                    </>
                    :
                    <>
                    </>
                }                
            </CModalBody>
        </CModal>
    )
}

export default ModalKomoditas