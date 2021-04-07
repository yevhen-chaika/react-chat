import './App.css';
import React from 'react';
import HomePage from './components/HomePage';
import ChatRoom from "./components/ChatRoom";
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import withToastProvider from "./components/Toast/withToastProvider";


function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <ProtectedRoute exact path="/chat-room/:roomId" component={ ChatRoom } />
            </Switch>
        </div>
    );
}

const ProtectedRoute = ({component: Comp, path, ...rest}) => {
    const hasUserData = useSelector(state => {
        return state.userData.userName
    });

    return (
        <Route path={path} {...rest}
           render={(props) => {
                return !!hasUserData ? <Comp {...props}/> : <Redirect to="/"/>
            }}
        />
    )
};

const AppWithToastProvider = withToastProvider(App);

export default AppWithToastProvider;
