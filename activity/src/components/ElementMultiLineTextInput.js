import React from 'react';


export class ElementMultiLineTextInput extends React.Component {
    render() {
        return (<div className="text-input-element"
                     tag={this.props.name + "-innder-div"}>
                         <label key={this.props.name + "-label"}>{this.props.text}</label>
                         <br />
                         <input type="text"
                                name={this.props.name}
                                tag={this.props.name + "-input"} />
                </div>);
    }
}
