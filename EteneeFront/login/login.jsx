import React, { Component } from 'react'
import {IndexLink} from 'react-router'

class Login extends Component {
    render() {
        return(
            <div className="loginPage">
                <img className="mainLogo" src="http://ubicomp.oulu.fi/wp-content/uploads/2016/03/oulunyliopisto_logo_eng_rgb10.png" />
                <br />
                <img className="smallLogo" src="https://laturi.oulu.fi/style/logo-multi.png" />
                <IndexLink className="toHomePage" to='/home'>Kirjaudu yliopiston tunnuksilla</IndexLink>
                <p>HAKA LOGOA EI LÖYVY:D</p>
            </div>
        )
    }
}

export default Login;
