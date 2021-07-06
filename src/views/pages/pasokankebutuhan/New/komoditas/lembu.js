import {React, useState, useEffect} from 'react'
import {CRow, CCol, CFormGroup, CLabel, CSelect, CTextarea, CInput, CButton} from '@coreui/react'
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import axios from 'axios'
import supabase from '../../../../../supabase'
import { useSelector } from 'react-redux';

const Lembu = (props) =>{
    const [data, setData] = useState({})
    const [option, setOption] = useState({})
    const komoditas = useSelector((state)=>state.komoditas)
    const jnsdata = useSelector((state)=>state.jnsdata)
    const arrBulan = ["Select..", "Januari","Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    const [disabledBulan, setDisabledBulan] = useState(false)
    const [disabledProv, setDisabledProv] = useState(false)
    const handleSearchProvinsi = async(namaPropinsi) =>{ 
        return axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi').then((x)=>{
            let filtered = x.data.provinsi.map((x)=>{
                return(
                    {['label']:x.nama, ['value']:x.id}
                )
            }).filter((x)=>x.label.toLowerCase().includes(namaPropinsi.toLowerCase()))
            console.log(filtered)
            return filtered
        })
    }
    useEffect(async() => {
        if(props.modal){
            let { data: tr_subkomoditas, error } = await supabase
            .from('tr_subkomoditas')
            .select("*")
            let filtered = tr_subkomoditas.map((x)=>{
                return(
                    {['value']:x.kd_subkomoditas, ['label']:x.ur_subkomoditas}
                )
            }).filter((x)=>x.value.slice(0,2) == komoditas.kode)
            setOption({...option,['subkomoditas']:filtered})            
        }      
    },[props.modal]);
    useEffect(async() => {
        if(!props.modal){
            console.log("Tutup")
            setData({
                'subkomoditas':'',
                'jnsguna':'',
                'jnsbarang':'',
                'ktgrbarang':'',
                'varians':'',
                'stdmutu':'',
                'hscode':'',
                'satuan':''
            })
            console.log(data)
            setOption({})
        } else {
            console.log(data)
        }
    },[props.modal]);    
    const handleChange = async (e,index) =>{
        if (index.name == 'propinsi'){
            setData({...data, [index.name]:e, ['kota']:''})
            axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi='+e.value).then((x)=>{
                let kotakab = x.data.kota_kabupaten.map((x)=>{
                    return(
                        {['value']:x.id, ['label']:x.nama}                     
                    )
                })
                console.log(kotakab)
                setOption({...option, ['kota']:kotakab})
            })       
        } else if (index.name == 'kota'){
            setData({...data, [index.name]:e}) 
        } else if (index.name == 'subkomoditas'){
            setData({...data, [index.name]:e,['jnsbarang']:'',['ktgrbarang']:'',['varians']:'',['hscode']:''})
            let { data: tr_jnsbarang, error } = await supabase
            .from('tr_jnsbarang')
            .select("*")
            let filtered = tr_jnsbarang.map((x)=>{
                return(
                    {['value']:x.kd_jnsbarang, ['label']:x.ur_jnsbarang}
                )
            }).filter((x)=>x.value.slice(0,4) == e.value)
            console.log(filtered)
            setOption({...option,['jnsbarang']:filtered,['ktgrbarang']:[],['varians']:[],['hscode']:[]})             
        } else if (index.name == 'jnsbarang'){
            setData({...data, [index.name]:e,['ktgrbarang']:'',['varians']:'',['hscode']:''})
            let { data: tr_ktgrbarang, error } = await supabase
            .from('tr_ktgrbarang')
            .select("*")
            let filtered = tr_ktgrbarang.map((x)=>{
                return(
                    {['value']:x.kd_ktgrbarang, ['label']:x.ur_ktgrbarang}
            )
            }).filter((x)=>x.value.slice(0,6) == e.value)
            setOption({...option,['ktgrbarang']:filtered,['varians']:[], ['hscode']:[]})             
        } else if (index.name == 'ktgrbarang'){
            setData({...data, [index.name]:e, ['varians']:'',['hscode']:''})
            let varians = await supabase
            .from('tr_varians')
            .select("*")
            let filteredvarians = varians.data.map((x)=>{
                return(
                    {['value']:x.kd_varians, ['label']:x.ur_varians}
            )
            }).filter((x)=>x.value.slice(0,8) == e.value)
            console.log(filteredvarians)
            let hscode = await supabase
            .from('tr_hscode')
            .select("*")
            let filteredhscode = hscode.data.map((x)=>{
                return(
                    {['value']:x.kd_hscode, ['label']:x.ur_hscode}
            )
            }).filter((x)=>x.value.slice(0,8) == e.value) 
            console.log(filteredhscode)           
            setOption({...option,['hscode']:filteredhscode, ['varians']:filteredvarians})             
        } else {
            setData({...data, [index.name]:e})
        }
    } 
    const handleSearchSatuan = (keyword) =>{
        return axios.get('https://api.insw.go.id/api/ref/satuan').then((x)=>{
            let filtered = x.data.data.map((x)=>{
                return(
                    {['label']:x.urSatuan, ['value']:x.kodeSatuan}
                )
            }).filter((x)=>x.label.toLowerCase().includes(keyword.toLowerCase()))   
            return filtered       
        })
    }       
    return(
        <>
        <CRow>
            <CCol md="2">
                <CFormGroup>
                    <CLabel>Periode</CLabel>
                    <CSelect>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>                        
                    </CSelect>
                </CFormGroup>
            </CCol>
            <CCol md="2">
                <CFormGroup>
                    <CLabel>Bulan [ <div style={{display:'inline-block'}}><input type="checkbox" onChange={(x)=>setDisabledBulan(x.target.checked)}/> All</div> ]</CLabel>
                    <CSelect disabled={disabledBulan}>
                      {
                          arrBulan.map((x, index)=>{
                              return(
                                    <option value={index+1}>{x}</option>                                  
                              )
                          })
                      }
                    </CSelect>
                </CFormGroup>
            </CCol>
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Provinsi [ <div style={{display:'inline-block'}}><input type="checkbox" onChange={(x)=>setDisabledProv(x.target.checked)}/> All</div> ]</CLabel>
                    <AsyncSelect isDisabled={disabledProv} name="propinsi" value={data.propinsi} onChange={(e,index)=>handleChange(e,index)} loadOptions={(x)=>handleSearchProvinsi(x)} />                    
                </CFormGroup>
            </CCol> 
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Kota</CLabel>
                    <Select isDisabled={disabledProv} value={data.kota} onChange={(e,index)=>handleChange(e,index)} name="kota" options={option.kota} />                    
                </CFormGroup>
            </CCol>                                    
        </CRow>
        <CRow>
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Sub Komoditas</CLabel>
                    <Select name="subkomoditas" value={data.subkomoditas} onChange={(e,index)=>handleChange(e,index)} options={option.subkomoditas} />
                </CFormGroup>
            </CCol> 
            <CCol md="4">
            <CFormGroup>
                    <CLabel>Jenis Barang</CLabel>
                    <Select isOptionDisabled={(option) => option.disabled === 'yes'} name="jnsbarang" value={data.jnsbarang} onChange={(e,index)=>handleChange(e,index)} options={option.jnsbarang}/>
                </CFormGroup>
            </CCol>   
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Kategori Barang</CLabel>
                    <Select isOptionDisabled={(option) => option.disabled === 'yes'} name="ktgrbarang" value={data.ktgrbarang} onChange={(e,index)=>handleChange(e,index)} options={option.ktgrbarang}/>
                </CFormGroup>
            </CCol>                              
        </CRow>  
        <CRow>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Varians</CLabel> 
                    <Select isOptionDisabled={(option) => option.disabled === 'yes'} name="varians" value={data.varians} onChange={(e,index)=>handleChange(e,index)} options={option.varians}/>                   
                </CFormGroup>
            </CCol>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Kode HS</CLabel>
                    <Select name="hscode" value={data.hscode} onChange={(e,index)=>handleChange(e,index)} options={option.hscode}/>                    
                </CFormGroup>
            </CCol>            
        </CRow> 
        <CRow>
            <CCol md="12">
                <CFormGroup>
                    <CLabel>Uraian Barang</CLabel>
                    <CTextarea/>                   
                </CFormGroup>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Jumlah Barang</CLabel>
                    <CInput type="number"/>                   
                </CFormGroup>
            </CCol>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Satuan Barang</CLabel>
                    <AsyncSelect name="satuan" value={data.satuan} onChange={(e,index)=>handleChange(e,index)} loadOptions={(x)=>handleSearchSatuan(x)} />                
                </CFormGroup>
            </CCol>            
        </CRow>        
        </>   
    )
}

export default Lembu