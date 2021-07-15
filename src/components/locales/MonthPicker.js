import React, { Component } from 'react';
// import './Demo.css';

import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css';

class MonthBox extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: this.props.value || 'N/A',
        }
        this._handleClick = this._handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    render() {
        return (
            <div className="box" onClick={this._handleClick}>
                <label>{this.state.value}</label>
            </div>
        );
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e);
    }
}


class List extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            mvalue: { year: 2021, month: 7 },
            mvalue2: { year: 2016, month: 7 },
            mrange: { from: { year: 2014, month: 8 }, to: { year: 2015, month: 5 } },
            mrange2: { from: { year: 2013, month: 11 }, to: { year: 2016, month: 3 } },
        }

        this.handleClickMonthBox = this.handleClickMonthBox.bind(this)
        this.handleAMonthChange = this.handleAMonthChange.bind(this)
        this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this)

        this.handleClickMonthBox2 = this.handleClickMonthBox2.bind(this)
        this.handleAMonthChange2 = this.handleAMonthChange2.bind(this)
        this.handleAMonthDissmis2 = this.handleAMonthDissmis2.bind(this)

        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this)
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this)

        this._handleClickRangeBox2 = this._handleClickRangeBox2.bind(this)
        this.handleRangeChange2 = this.handleRangeChange2.bind(this)
        this.handleRangeDissmis2 = this.handleRangeDissmis2.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    render() {

        const pickerLang = {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Jul', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            from: 'From', to: 'To',
        }
        const mvalue = this.state.mvalue
            , mvalue2 = this.state.mvalue2
            , mrange = this.state.mrange
            , mrange2 = this.state.mrange2

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
            return '?'
        }

        return (
            <ul>
                <li>
                    <label><b>Selecciona un mes</b><span></span></label>
                    <div className="edit">
                        <Picker
                            ref="pickAMonth"
                            years={[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031]}
                            value={mvalue}
                            lang={pickerLang.months}
                            theme= "dark"
                            onChange={this.handleAMonthChange}
                            onDismiss={this.handleAMonthDissmis}
                        >
                            <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox} />
                        </Picker>
                    </div>
                </li>

            </ul>
        )
    }

    handleClickMonthBox(e) {
        this.refs.pickAMonth.show()
    }
    handleAMonthChange(value, text) {
        //
    }
    handleAMonthDissmis(value) {
        this.setState({ mvalue: value })
    }

    handleClickMonthBox2(e) {
        this.refs.pickAMonth2.show()
    }
    handleAMonthChange2(value, text) {
        //
    }
    handleAMonthDissmis2(value) {
        this.setState({ mvalue2: value })
    }

    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }
    handleRangeChange(value, text, listIndex) {
        //
    }
    handleRangeDissmis(value) {
        this.setState({ mrange: value })
    }

    _handleClickRangeBox2(e) {
        this.refs.pickRange2.show()
    }
    handleRangeChange2(value, text, listIndex) {
        //
    }
    handleRangeDissmis2(value) {
        this.setState({ mrange2: value })
    }
}

class Main extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    render() {

        return (
            <div className="list-area">
                <List />
            </div>
        )
    }
}



export default () => {

    return (<Main />);

}
