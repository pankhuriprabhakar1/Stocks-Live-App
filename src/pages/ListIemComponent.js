import React from 'react';
class StockTickerListItem extends React.Component {
  constructor(props) {
    super(props);
    var allItemsArray = props.allItemsArray;
    this.state = {
      allItemsArray
    };
  }
  componentWillReceiveProps(props) {
    var self = this;
    var backgroundColorFirstUpdate = { backgroundColor: 'white', width: "162px" };// white when list item is loaded first time 
    var backgroundColorIncreasing = { backgroundColor: '#66ff33', width: "162px" };// green if item price is rising
    var backgroundColorDecreasing = { backgroundColor: 'red', width: "162px" };// red if price is decreasing

    this.setState(
      (prevState, props) => {
        if (prevState.props !== undefined) {
          props.allItemsArray.forEach(function (value, index) {
            var bgcol = {};
            if (prevState.props.allItemsArray[index]) {
              if (value.itemPrice > prevState.props.allItemsArray[index].itemPrice) {
                bgcol = backgroundColorIncreasing
                props.allItemsArray[index]["bgcol"] = bgcol;
              }
              else if (value.itemPrice < prevState.props.allItemsArray[index].itemPrice) {
                bgcol = backgroundColorDecreasing
                props.allItemsArray[index]["bgcol"] = bgcol;
              } else if (value.itemPrice == prevState.props.allItemsArray[index].itemPrice) {
                props.allItemsArray[index]["bgcol"] = prevState.props.allItemsArray[index].bgcol;
              }
            }
            else {
              bgcol = backgroundColorFirstUpdate;
              props.allItemsArray[index]["bgcol"] = bgcol;
            }
          })
        }

        var updatedState = { ...this.state, props };
        return updatedState;
      }
    );
  }
  render() {
    var bgcol = {};

    this.contentItems = this.props.allItemsArray.map(
      row => (
        <tr key={row.toString()}>{
          Object.values(row).map(cell => {
            if (row.itemPrice === cell || row.itemName === cell || row.elapsedime === cell) {
              if (row.itemPrice === cell) {
                bgcol = row.bgcol;
              }
              else { bgcol = { backgroundColor: "#00ffff", width: "162px" } }
              return (
                <>
                  <td style={bgcol} key={cell.toString()}>{cell}</td>
                </>
              )
            }
          })}</tr>));

    return (
      this.contentItems
    );
  }
}

export default StockTickerListItem;