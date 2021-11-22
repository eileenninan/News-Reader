import "./index.css";
import React, { useState } from "react";
import Modal from 'react-modal';
import { Button, Divider } from 'rsuite';
import axios from "axios";
import { Dropdown } from 'semantic-ui-react'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const options = [
    { key: 'Category', text: 'Category', value: 'Category' },
    { key: 'Sentiment', text: 'Sentiment', value: 'Sentiment' },
    { key: 'Sources', text: 'Sources', value: 'Sources' },
]

Modal.setAppElement('#root')

const NavBar = ({ setData }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [filters, setFilters] = useState([""])
    const [suggestedOption, setSuggestedOption] = useState([])
    const [value, setValue] = useState("")
    const [selectedValue,setSelectedValues]=useState([])
    const addFilter = () => {
        setFilters([...filters, ""])
    }
    const handleSearch = async(e) => {
        console.log(e.target.value);
        let val=e.target.value;
        let res = await axios({
            method: 'get',
            url: 'https://get.scrapehero.com/news-api/news/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE&q=Iphone',
            params: val
        })
        console.log(res);
        console.log(val);
        setData(res.data.result.data)
    }
    const handleSelect = async(key) => {
        console.log(key, 'key');
        let option = key.target.innerText;
        setValue(option)
        if(option === 'Category'){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/categories/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: option
            })
            console.log(res);
            let formated = res.data.map((item) => ({key:item.category ,text:item.category, value:item.iptc_code, type:"Category",iptc_code:item.iptc_code}));
            setSuggestedOption(formated)
            console.log(formated,'formated');
        }
        else if(option === 'Sentiment'){
            setSuggestedOption([
                {key:'Positive', value: 'Positive', text: 'Positive', type:"Sentiment"},
                {key:'Negative', value: 'Negative', text: 'Negative', type:"Sentiment"},
                {key:'Neutral', value: 'Neutral', text: 'Neutral', type:"Sentiment"}
            ])
        }
        else if(option === 'Sources'){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/sources/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: option
            })
            console.log(res);
            let formated = res.data.sources.map((item) => ({key:item.name ,text:item.name, value:item.name, type:"Sources",id:item.id}));
            setSuggestedOption(formated)
            console.log(formated, 'formated');
        }
    }
    const handleCloseModal = () => {
        setFilters(["SearchFilter"]);
        setModalIsOpen(false);
    }
    const handleSubmit = async() => {
        console.log("val",value);
        console.log("sel",selectedValue);
        if(value==="Category"){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/news/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: {category_id:selectedValue}
            })
            console.log("response",res);
            handleCloseModal()
        }else if(value ==="Sentiment"){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/news/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: {sentiment:selectedValue}
            })
            console.log("ress",res)
            setData(res.data.result.data)
            handleCloseModal()
            console.log("response",res);
        } else if (value==="Sources"){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/news/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: {source_id:selectedValue}
            })
            console.log("response",res);
            handleCloseModal()
        }
    }
    return (
        <header className="nav-bar">
            <div>
                <span className="text-one">
                    News
                </span>
                <span className="text-two">
                    Reader
                </span>
            </div>
            <div className="heading">
                <div className="search">
                    <div className="icon"><i className="fas fa-search"></i></div>
                    <input type="text" placeholder="Search here ..." className="search-box" onChange={(e) => handleSearch(e)} />
                    <Button className="btn" appearance="ghost" onClick={() => setModalIsOpen(true)}>Advanced Search</Button>
                    <Modal style={customStyles} isOpen = {modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <span className="modal-heading">
                            Advanced Search
                            <span onClick={() => setModalIsOpen(false)} className="close-button">&times;</span>
                        </span>
                        <Divider />
                        <Button className="btn" appearance="ghost" onClick={() => addFilter()}>Add New Filter</Button>
                        {
                            filters.map((filter, key) => {
                                return (
                                    <div key={key} style={{display:"flex",width:"700px"}}>
                                        <Dropdown className="select-btn" placeholder='Search Filter' fluid selection options={options} onChange={(key) => handleSelect(key)} name="Search" value={value} style={{marginTop:"24px"}}/>
                                        <span className="text-three" style={{marginTop:"22px"}}>
                                            Is
                                        </span>
                                        <Dropdown className="sentiment-box" placeholder="Sentiment" fluid selection options={suggestedOption} onChange={(key) => setSelectedValues(key.target.innerText)} value={selectedValue } style={{height:"30px", marginTop:"23px"}} />
                                    </div>
                                )
                            })
                        }
                        <Divider />
                        <div className="modal-footer">
                            <button onClick={() => handleCloseModal()} className="cancel-button">Cancel</button>
                            <button className="show-button" onClick={handleSubmit}>Show Results</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </header>
    )
}
export default NavBar;