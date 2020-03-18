
class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('center', null,
            React.createElement('div', {className: 'main-container'}, this.props.children)
        );
    }
}
