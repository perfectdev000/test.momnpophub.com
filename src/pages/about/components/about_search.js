import React from "react";
import Autocomplete from './autocomplete';
import axios from "axios";

import "./about_search.css";

class AboutSearch extends React.Component {
    constructor(props){
        super(props);
    }
    state= {
        value: '',
        selectedId: false,
        selectedBname: false,
        busList: [],
        display: 'none'
        };

    componentWillMount(){
        this.props.setSelectedDealId(false);
        this.props.setSelectedProfileId(false);
        this.setState({value: '', selectedId: false, busList: []});
    }
    getBusiness = () => {
        return this.state.busList;
    }

    getBusList = (value) => {
        this.setState({ value });
        this.setState({selectedId: false});
        if(value!=" " && value!=''){ console.log(process.env.REACT_APP_BASEURL + "/search");
            axios
            .post(process.env.REACT_APP_BASEURL + "/search", {keyword:value})
            .then((response) => {
                this.setState({busList: response.data});
                for( var i = 0; i < response.data.length; i++ ){
                    if(response.data[i].bname == value){
                        this.setState({selectedId: response.data[i]._id});
                    }
                }
                if(response.data.length){
                    document.getElementById('error').style.display = 'none';
                    this.setState({display: 'none'});
                } else {
                    this.setState({display: 'block'});
                }
            })
            .catch((err) => { 
                console.log('ERROR : ' + err);
                alert('ERROR : ' + err);
             });
        } else {
            this.setState({display: 'none'});
            this.setState({busList: []});
        }
    }
    
    matchBusiness = (state, value) => {
        if( state.bname )
            return (
                state.bname.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
    }

    searchBusiness = () => {
        if(this.state.selectedId){
            this.props.setSelectedProfileId(this.state.selectedId);
            //this.props.history.push('/profile');
            this.navToProfilePage();
        } else {
            this.setState({display: 'block'});
        }
    }

    selectOne = (value, item) => {
        this.setState({value: value, selectedId: item._id, selelctedBname: item.bname}, function(){
            this.props.setSelectedProfileId(this.state.selectedId);
            //this.props.history.push('/profile'); 
            this.navToProfilePage(); 
        });
    }

    navToProfilePage = () => {
        var bname = this.state.selelctedBname.split(' ');
        var newName = '';
        for( var i = 0; i < bname.length; i++){
            newName = newName + '-' +bname[i];
        }
        window.location.href = 'http://127.0.0.1:4000/businessinfo/profile/' + this.state.selectedId+ newName;
    }

    render(){
        return (
            <>
                <div className="part_block">
                    <div className="row custom_container">
                        <div className='about_search_title'>
                        Search for a small business around you
                        </div>
                        <div className='about_search_form'>
                            <div className='searchIconBox'>
                                <div class='searchIcon'>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.7796 16.7216L13.4522 12.3943C14.5249 11.0865 15.1714 9.41143 15.1714 
                                        7.58571C15.1714 3.39796 11.7735 0 7.58571 0C3.39429 0 0 3.39796 0 7.58571C0 11.7735 
                                        3.39429 15.1714 7.58571 15.1714C9.41143 15.1714 11.0829 14.5286 12.3906 13.4559L16.718 
                                        17.7796C17.0118 18.0735 17.4857 18.0735 17.7796 17.7796C18.0735 17.4894 18.0735 17.0118 
                                        17.7796 16.7216ZM7.58571 13.6616C4.23184 13.6616 1.50612 10.9359 1.50612 7.58571C1.50612 
                                        4.23551 4.23184 1.50612 7.58571 1.50612C10.9359 1.50612 13.6653 4.23551 13.6653 7.58571C13.6653 
                                        10.9359 10.9359 13.6616 7.58571 13.6616Z" fill="#787878"/>
                                    </svg> 
                                </div>
                            </div>
                            <div className='searchInput'>
                                <Autocomplete
                                    value={ this.state.value }
                                    inputProps={{ id: 'states-autocomplete' }}
                                    wrapperStyle={{ 'width': '100%',
                                                    'height':  '100%',
                                                    'top': '0px',
                                                    'left': '0px'
                                                }}
                                    inputProps={{ className: 'searchInputContent' }}
                                    items={ this.getBusiness() }
                                    getItemValue={ item => item.bname }
                                    shouldItemRender={ this.matchBusiness }
                                    onChange={(event, value) => { this.getBusList(value)} }
                                    onSelect={ (value, item) => this.selectOne(value, item) }
                                    renderMenu={ children => (
                                        <div className = "autocomplete-menu" style={{zIndex: '1000', position:'absolute',
                                        backgroundColor: 'white', marginTop: '5px', boxShadow: '3px 3px 3px rgba(100,100,100,0.4)'}}>
                                        { children }
                                        </div>
                                    )}
                                    renderItem={ (item, isHighlighted) => (
                                        <div
                                        className={`item ${isHighlighted ? 'item-highlighted' : 'item-normal'}`}
                                        key={ item._id }>
                                        <div className='businessLogo'>
                                            <img src={'./logos/' + (item.btype=="online" ? 'online_logo.png' : 'store_logo.png')} width="24px" height="24px"/>
                                        </div>
                                            {item.bname}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="searchBtn" onClick={this.searchBusiness}>Search</div> 
                            <div id='error' style={{width: '100%', padding: '0px 10px', marginTop: '65px', textIndent: '10px', height: 'auto', wordWrap: 'break-word', color:'red', display: this.state.display }}>Sorry the business you have requested is not listed with us currently. Please share our website with the business and ask them to get listed with us for FREE.</div>                                  
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default AboutSearch;
