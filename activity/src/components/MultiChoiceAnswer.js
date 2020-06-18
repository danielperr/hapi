import React from 'react';
import { RichLabel } from './RichLabel';


export class MultiChoiceAnswer extends React.Component {
    render() {
        const radioId = this.props.name + '-radio';
        return (<div key={this.props.name + "-inner-div"}>
                    <input type="radio"
                           name={this.props.inputName}
                           value={this.props.name}
                           id={radioId}
                           key={radioId} />
                    <RichLabel htmlFor={radioId}
                               key={this.props.name + "-label"}>
                                   {this.props.text}
                    </RichLabel>
                </div>);
    }
}
