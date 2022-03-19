import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom'
import UserContext from "../contexts/userContext";

const AuthenticatedRoute = (props) =>{
    const {userData} = useContext(UserContext);
    console.log('Authenticated -> ', userData);

    if(userData.token){
        return <Route {...props} component={props.component}/>
    }
    return <Redirect to={{ pathname: '/about-us'}} />
    
}

export default AuthenticatedRoute;
