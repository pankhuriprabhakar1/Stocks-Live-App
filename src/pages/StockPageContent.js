import React from 'react';
import ReactDOM from 'react-dom';
import StockTickerListItem from './ListIemComponent';

class StockPageContent extends React.Component {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            stockContentArr: []
        };
        this.allItemsArray = [];

        let socket = new WebSocket("ws://stocks.mnet.website");
        socket.onopen = function (e) {
            console.log("Connection established");
        };
        socket.onmessage = function (event) {
            if (self.allItemsArray.length == 0) {
                self.updateStockContentArrayOnLoad(event);
            } else {
                self.addNewItems(event);
            }
        };
        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log(' Connection died');
            }
        };
        socket.onerror = function (error) {
            console.log(`[error] ${error.message}`);
        };
    }
    tick() {
        var currentTime = new Date().getTime();
        return currentTime;
    }

    addNewItems(e) {
        var self = this;
        JSON.parse(e.data).forEach(function (item) {
            var allItemsObj = {};
            allItemsObj["itemName"] = item[0];
            allItemsObj["itemPrice"] = item[1];
            allItemsObj["time"] = self.tick();

            //single entry in an object if multiple tickers exist in a message: take first value that exists in the response
            if (!self.allItemsArray.some(item => allItemsObj.itemName === item.itemName)) {
                self.allItemsArray.push(allItemsObj);
            }

            //update existing list item price and elapsed time from last update 
            self.allItemsArray.forEach(function (value) {
                if (allItemsObj["itemName"] == value.itemName) {
                    value.itemPrice = allItemsObj["itemPrice"];
                    value.time = self.tick();
                }
                var timeDifference = self.tick() - value.time;

                timeDifference = timeDifference / 1000;
                var seconds = Math.floor(timeDifference % 60);
                timeDifference = timeDifference / 60;
                var minutes = Math.floor(timeDifference % 60);
                timeDifference = timeDifference / 60;
                var hours = Math.floor(timeDifference % 24);
                var days = Math.floor(timeDifference / 24);

                // format elapsed time according to elapsed time from last update
                if (days == 0 && hours == 0 && minutes == 0) {
                    value.elapsedime = seconds + ' seconds ago';
                } else if (days == 0 && hours == 0 && minutes !== 0 && minutes < 10) {
                    value.elapsedime = minutes + ' minutes ago';
                } else if (minutes >= 10) {
                    value.elapsedime = new Date(value.time).toLocaleTimeString();
                } else {
                    value.elapsedime = (days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds');
                }
            }
            )
        });
        this.setState({ stockContentArr: JSON.parse(JSON.stringify(self.allItemsArray)) });
    }

    updateStockContentArrayOnLoad(e) {
        //save data in an object
        var self = this;
        self.addNewItems(e);
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        var self = this;
        return (<>
            <table style={{ borderCollapse: "collapse", margin: "auto" }}>
                <tbody><StockTickerListItem ref="listItem" allItemsArray={self.state.stockContentArr}>
                </StockTickerListItem>
                </tbody>
            </table>
        </>
        )
    }
}
export default StockPageContent;