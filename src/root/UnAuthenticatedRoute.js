import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom'
import UserContext from "../contexts/userContext";

const UnAuthenticatedRoute = (props) =>{

    const {userData} = useContext(UserContext);    
    if(!userData.token){
        return <Route {...props} component={props.component}/>
    }
    
    return <Redirect to={{ pathname: '/business-home'}}/>
}

export default UnAuthenticatedRoute;
