import React from 'react';
import { ElementLabel } from './ElementLabel';
import { ElementImage } from "./ElementImage";
import { ElementYoutube } from "./ElementYoutube";
import { ElementSingleLineTextInput } from "./ElementSingleLineTextInput";
import { ElementMultiLineTextInput } from "./ElementMultiLineTextInput";
import { ElementMultiChoice } from "./ElementMultiChoice";
import { SectionHeader } from "./SectionHeader";


export class Section extends React.Component {
    render() {
        const elements = [];
        this.props.elements.forEach((element, index) => {
            let obj;
            const name = this.props.name + '-element' + index;
            switch (element.type) {
                case 'label':
                    obj = <ElementLabel text={element.text}
                                        name={name}
                                        key={name} />;
                    break;
                case 'image':
                    obj = <ElementImage src={element.src}
                                        name={name}
                                        key={name} />;
                    break;
                case 'youtube':
                    obj = <ElementYoutube youtubeId={element.youtubeId}
                                          name={name}
                                          key={name} />;
                    break;
                case 'single-line-text-input':
                    obj = <ElementSingleLineTextInput text={element.text}
                                                      name={name}
                                                      key={name} />;
                    break;
                case 'multi-line-text-input':
                        obj = <ElementMultiLineTextInput text={element.text}
                                                         name={name}
                                                         key={name} />;
                        break;
                case 'multi-choice':
                    obj = <ElementMultiChoice text={element.text}
                                              correct={element.correct}
                                              incorrect={element.incorrect}
                                              name={name}
                                              key={name} />;
                    break;
                default:
                    obj = <label key={name}>{"אלמנט לא מזוהה"}</label>;
            }
            elements.push(<div className="element"
                               key={name + "-div"}>
                                   {obj}
                                   <br />
                          </div>);
        });
        return (<div className="section">
                    <SectionHeader text={this.props.header}
                                   name={this.props.name + "-header"} />
                    <div className="section-elements"
                         key={this.props.name + "-div"}>
                             {elements}
                    </div>
               </div>);
    }
}
