import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedInUser";


export default function AgencyRoute({ component, ...options}) {
    
    const loggedInUser = useContext(LoggedUserConsumer);

    return loggedInUser.type='agency' ? (
        <Route {...options} component={component} />
    ) : (
        <Redirect to='/agencies/login' />
    )
}
