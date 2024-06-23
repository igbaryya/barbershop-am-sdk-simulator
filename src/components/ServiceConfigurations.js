import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';

export default class ServiceConfigurations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseURL: 'https://AboMen3m.firebaseio.com'
        };
        this.componentDidUpdate();
    }

    updateServiceConfiguration() {
        this.setState({
            baseURL: this.baseURL.value
        });
    }

    firebaseLogin = () => {
      const fbAuth = this.props.sdkInstances['firebaseApi'].getAuthRef();
      const {initializeLogin} = this.props.sdkInstances['loginApi'];
      const provider = new GoogleAuthProvider(); 
      signInWithPopup(fbAuth, provider).then((res) => {
        initializeLogin(res);
      }).catch((err) => {
        console.error(err);
      })
    }

    componentDidUpdate() {
        // ServiceClass.refreshConfiguration(this.state);
    }

    render() {
        return (
            <div className="contentDiv">
                <div className="inerDivContent">
                  <label htmlFor="basic-url">Backend Base URL:</label>
                  <input type="text" className="form-control"
                    onChange={() => {
                        this.updateServiceConfiguration();
                    }}
                    defaultValue={this.state.baseURL} 
                    ref={(c) => {
                        this.baseURL = c;
                    }}/>
                </div>
                <div className="inerDivContent">
                  <label htmlFor="basic-url">Firebase Authentiation:</label>
                  <p>
                    <button 
                      className="btn btn-success"
                      onClick={this.firebaseLogin}> 
                        Login
                    </button>
                  </p>
                </div>
            </div>
        );
    }
}
   