import "./index.css";
import React, { useState } from "react";
import Modal from 'react-modal';
import { Button, Dropdown, Divider } from 'rsuite';
import axios from "axios";

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

Modal.setAppElement('#root')

const NavBar = ({ setData }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [filters, setFilters] = useState([""])
    const [suggestedOption, setSuggestedOption] = useState([])
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
    const handleSelect = async(eventKey) => {
        console.log(eventKey);
        let option = eventKey;
        if(option === 'Category'){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/categories/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: option
            })
            console.log(res);
            let formated = res.data.map((item) => item.category);
            setSuggestedOption(formated)
            console.log(formated,'formated');
        }
        else if(option === 'Sentiment'){
            setSuggestedOption(['Positive', 'Negative', 'Neutral'])
        }
        else if(option === 'Sources'){
            let res = await axios({
                method: 'get',
                url: 'https://get.scrapehero.com/news-api/sources/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE',
                params: option
            })
            console.log(res);
            let formated = res.data.sources.map((item) => item.name);
            setSuggestedOption(formated)
            console.log(formated, 'formated');
        }
    }
    const handleCloseModal = () => {
        setFilters(["SearchFilter"]);
        setModalIsOpen(false);
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
                                    <div key={key}>
                                        <Dropdown className="select-btn" title="Search Filter" appearance="ghost" onSelect={(eventKey) => handleSelect(eventKey)}>
                                            <Dropdown.Item eventKey="Category">Category</Dropdown.Item>
                                            <Dropdown.Item eventKey="Sentiment">Sentiment</Dropdown.Item>
                                            <Dropdown.Item eventKey="Sources">Sources</Dropdown.Item>
                                        </Dropdown>
                                        <span className="text-three">
                                            Is
                                        </span>
                                        <input type="select" placeholder="Sentiment" className="sentiment-box" value ={suggestedOption}/>
                                    </div>
                                )
                            })
                        }
                        <Divider />
                        <div className="modal-footer">
                            <button onClick={() => handleCloseModal()} className="cancel-button">Cancel</button>
                            <button className="show-button">Show Results</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </header>
    )
}
export default NavBar;