import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
// import './global.css'
import MyCard from './MyCard'
import {Pagination} from 'react-bootstrap';


@inject("EventListStore") //store passed in as prop
@observer //forces to watch store and re-render on store change
class EventGrid extends Component {
    constructor() {
        super();
        // console.log('eg constructor ' +  this.props)
        this.state = {
            currentPage: 1,
            eventsPerPage: 16
        };
    }

    handleClick = (event) => {
        console.log('pagination handleclick')
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const {  currentPage, eventsPerPage } = this.state;

        let events = toJS(this.props.data);


        // Logic for displaying current events
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
        // debugger;

        const renderEvents = currentEvents.map((todo, index) => {
             return <li key={index}>{todo.event}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
            pageNumbers.push(i);

        }


        const renderPageNumbers = pageNumbers.map(number => {
            let thisPageStyle = currentPage===number? null:{color:'blue', cursor:'pointer !important'};
            return (

                <span
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={thisPageStyle}
                >
                    {number}{' '}{' '}{' '}
                </span>
            );
        });

        return (
            <div>
                <ul id="page-numbers" style={{ display: 'inline', fontSize:'40px', listStyle:'none',  cursor:'pointer'}}>
                    {renderPageNumbers}
                </ul>
                {/*Search: <input onChange={this.props.EventListStore.searchEvents(this)} />*/}

                <ul>
                    <MyCard data={currentEvents}/>
                    {/*{renderEvents}*/}
                </ul>
                <MyCard/>
            </div>
        );
    }
}

export default EventGrid;
