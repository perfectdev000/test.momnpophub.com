import React from 'react';
import moment from 'moment';
import './Checkbox-container.css';


const CheckboxContainer = ({status,redeemdate,checkboxid,labetText, change}) => {
if(status == 0){
    return (
        <label className="checkbox-label d-flex">
            <div className="position-relative">
                <input id={checkboxid} type="checkbox" className="position-absolute" onChange={() => change()}/>
                <span className="d-flex align-items-center justify-content-center custom-checkbox">
                            </span>
            </div> {labetText} </label>
    )
}else{
    return (
        <label className="checkbox-label d-flex">
            <div className="position-relative">
                <input id={checkboxid} type="checkbox" checked disabled="1" className="position-absolute" />
                <span className="d-flex align-items-center justify-content-center custom-checkbox">
                            </span>
            </div>{labetText} {moment(redeemdate).format('MM/DD/YYYY hh:mm')}</label>
    )

}
};

export default CheckboxContainer;
