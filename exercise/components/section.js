
class Section extends React.Component {
    render() {
        return React.createElement("div");
    }
}



/*
class Section extends React.Component {
    
    
    function fsdfsdfs(obj) {
        if (obj.text == theAnswer) {
            Light the HTMLButtonElement
            Reward!
        } else {
            Ligth the button with red color
        }
                    
    }
        
    function answer2ques1() {
        theAnswer = "Israel"
        fsdfsdfs(this, theAnswer)
            
    }
    
    function answer2ques2() {
            
        theAnswer = "PetachTikva"
        fsdfsdfs(this, theAnswer)
    }
    
    
    
    
    render() {
        return React.createElement("div", {
            className: "closed-answer",
            onChange: this.props.onSelect
          }, React.createElement("input", {
            type: "radio",
            id: this.props.id,
            name: this.props.name,
            value: this.props.index
          }), React.createElement("label", {
            className: "clickable",
            htmlFor: this.props.id
          }, this.props.children));
    }
}
*/
// <ClosedAnswer id="" name="" index="" onSelect=""> answer </ClosedAnswer>