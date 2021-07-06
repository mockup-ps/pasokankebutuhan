import {React} from 'react'
import { useHistory } from 'react-router'
import Beras from '../../../assets/packages.svg'

const Beranda = () =>{
    const history = useHistory()
    return(                             
    <div className="d-flex flex-row">
        <div style={{borderRadius:'18px', width:'322px', minHeight:'200px', boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}  role="button" onClick={()=>history.push('/pasokankebutuhan')} className="card px-3 pt-5 pb-3 clickable">
            <div className="d-flex flex-row pt-2 pb-2">
                <div className="d-flex flex-column col-9">
                    <div><h4 style={{color:'#02275d'}}>Data Kebutuhan dan Pasokan</h4></div>
                    <p style={{color:'grey'}}>Pengisian Data Kebutuhan dan Pasokan</p>
                </div>
                <div className="d-flex align-items-end mb-3">
                    <img
                    width="70px"
                    style={{float:'right'}}
                    src={Beras}
                    />                 
                </div>          
            </div>
        </div>
    </div>              
    )
}

export default Beranda