import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedInUser";


export default function GuideRoute({ component, ...options }) {
    const loggedInUser = useContext(LoggedUserConsumer);

    
    return loggedInUser.type === 'guide' ? (
        <Route {...options} component={component} />
    ) : (
        <Redirect to='/tour-guides/login' />
    )
}
