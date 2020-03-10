import React from 'react';
import ReactDOM from 'react-dom';

class StockPageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        var columnWidth = { width: "162px" }
        return (
            <table style={{ borderCollapse: "collapse", margin: "auto" }}>
                <thead><tr style={{ backgroundColor: '#6699ff' }}>
                    <th style={columnWidth}>Ticker</th>
                    <th style={columnWidth}>Price</th>
                    <th style={columnWidth}>Last Update</th>
                </tr>
                </thead>
            </table>
        )
    }
}
export default StockPageHeader;