import React from 'react';
import ReactJSON from 'react-json-view';
import SelectItem from './SelectItem';
import ServiceConfigurations from './ServiceConfigurations';

export default class Simulator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: [],
        textAreaInput: '[]',
        tabName: 'Input',
        outputTabName: 'Output',
        selectedMethod: undefined,
        selectedSDKInstance: undefined,
        selectedSliceName: '',
        selectedMethodName: ''
      };
    }
    componentWillMount() {
      const {sdkInstanceNames} = this.props;
      if(sdkInstanceNames[0]) {
        this.selectInstance(sdkInstanceNames[0]);
      }
    }
  
    selectInstance(instanceName) {
      const sdkInstance = this.props.sdkInstances[instanceName];
      this.instanceName = instanceName;
      this.setState({
        selectedSDKInstance: this.props.sdkInstances[instanceName]
      });
      const methodNames = this.getSelectedInstanceMethods(sdkInstance);
      if(methodNames && methodNames[0]) {
        this.selectMethod(methodNames[0], sdkInstance);
      }
    }
  
    isFunction(selectedMethod) {
      return typeof selectedMethod === 'function';
    }
  
    getSelectedInstanceMethods(sdkInstance) {
      const blackList = ['name',
      'dispatchStoreAction',
      'getServiceRequestType',
      'getServiceSuccessType',
      'getServiceFailureType',
      'serviceRequest',
      'store',
      'instanceKey',
      'sliceName',
      'selectors',
      'getShareableState',
      'setAdditionalData',
      'getAdditionalData',
      'init'
      ];
      const instance = sdkInstance || this.state.selectedSDKInstance || this.props.sdkInstances[0];
      return Object.keys(instance).filter(methodName => !(blackList.includes(methodName) || 
        !this.isFunction(instance[methodName]) ||
        methodName.startsWith('_')));
    }
  
    selectMethod(methodName, sdkInstance) {
      const selectedInstance = sdkInstance || this.state.selectedSDKInstance;
      let jsonInputs = localStorage.getItem('jsonInputs');
      if (jsonInputs) {
        jsonInputs = JSON.parse(jsonInputs); 
      }
      let input = jsonInputs ? jsonInputs[`${methodName}_${selectedInstance.name}`] : [];
      input = input || [];
      this.setState({
        selectedMethod: selectedInstance[methodName],
        input,
        selectedSliceName: selectedInstance.name,
        selectedMethodName: methodName
      });
    }
  
    setResult(result) {
      this.setState({
        result
      });
    }
  
    setInput(stringInput, isFree) {
      let input = stringInput;
      try {
        if (isFree) {
          input = JSON.parse(stringInput)
        } 
      } catch (err) {
        console.warn('failed to parse: ', input)
      }
      let jsonInput = localStorage.getItem('jsonInputs');
      if (jsonInput) {
        jsonInput = JSON.parse(jsonInput);
      } else {
        jsonInput = {}
      }
      jsonInput[`${this.state.selectedMethodName}_${this.state.selectedSliceName}`] = input;
      localStorage.setItem('jsonInputs', JSON.stringify(jsonInput));
      this.setState({
        input
      });
    }
    setRawJsonInput(event){
        var jsonInput = [];
        this.setState({
            input:jsonInput
        });
    }
    setErrorResult(error) {
      console.error(error);
      this.setState({
        result: {status: 'Failure', stack: error.toString()}
      });
    }
  
    openTab(evt, tabName) {
      const {tabName: currentTab, input} = this.state; 
      if (tabName === 'JSONInput') {
        this.setState({tabName, textAreaInput: currentTab === 'Input' ? JSON.stringify(input) : input})
      } else {
        this.setState({tabName})
      }
      
    }
  
    openOutputTab(evt, outputTabName) {
      this.setState({outputTabName})
    }
  
    call() {
      const selectedInstance = this.state.selectedSDKInstance;
      const selectedMethod = this.state.selectedMethod;
      Promise.resolve(
        selectedMethod.apply(selectedInstance,this.state.input)).then(
          result => this.setResult(result), error => this.setErrorResult(error));
    }
  
    render() {
      const {sdkInstanceNames} = this.props;
      const {tabName, outputTabName} = this.state;
      const methods = this.getSelectedInstanceMethods();
      return (
        <div className="mainDiv">
          <div className="title">
            <h1>Redux Actions Simulator</h1>
          </div>
          <ServiceConfigurations sdkInstances={this.props.sdkInstances} />            
          <div className="contentDiv">
            <div className="inerDivContent">
              Modules 
              <span>
                <SelectItem changeHandler={instanceName=>this.selectInstance(instanceName)} list={sdkInstanceNames} placeholder={"Select Module"}/>
              </span>
              Actions
              <span>
                <SelectItem changeHandler={methodName=>this.selectMethod(methodName)} list={methods} placeholder={"Select Action"}/>
              </span>
              <br/>
              <div className="InputOutput">
                <div className="requestDiv">
                  Request:
                  <div className="tab">
                    <button className={'btn btn-primary'} onClick={event => this.openTab(event, 'Input')}>Input</button>
                    <button className={'btn btn-warning'} onClick={event => this.openTab(event, 'JSONInput')}>JSON Input</button>
                  </div>
                  {
                    (tabName === 'Input') && 
                    <div id="Input" className="requesttabcontent">
                      <ReactJSON src={this.state.input} collapsed={true} onEdit={({updated_src})=>this.setInput(updated_src)} onAdd={({updated_src})=>this.setInput(updated_src)} onDelete={({updated_src})=>this.setInput(updated_src)}>
                      </ReactJSON>
                    </div>
                  }
                  {
                    (tabName === 'JSONInput') &&
                    <div id="JSONInput" className="requesttabcontent">
                      <textarea id="rawJSONInput" onBlur={(e)=>{this.setInput(e.target.value, true)}}>{this.state.textAreaInput}</textarea>
                    </div>
                  }
                </div>
              </div>
              <button className={'btn btn-default'} onClick={event => this.call()}>Call</button>
              <br/>
              <br/>
            </div>
            <div className="inerDivContentRight">
              <div className="InputOutput">
                <div className="requestDiv">
                  Result:
                  <div className="tab">
                    <button className={'btn btn-primary'} onClick={event => this.openOutputTab(event, 'Output')}>Output</button>
                    <button className={'btn btn-warning'} onClick={event => this.openOutputTab(event, 'JSONOutput')}>JSON Output</button>
                  </div>
                  {
                    (outputTabName === 'Output') && 
                    <div id="Output" className="resulttabcontent">
                      <ReactJSON src={this.state.result} collapsed={true}>
                      </ReactJSON>
                    </div>
                  }
                  {
                    (outputTabName === 'JSONOutput') &&
                    <div id="JSONOutput<" className="resulttabcontent">
                      <textarea contentEditable={true}>{JSON.stringify(this.state.result)}</textarea>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
       </div>
      );
    }
  }