import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import EventGrid from "./Components/EventGrid";
// import {EventGrid} from './Components/EventGrid.jsx';
// import './global.css'

@inject("EventListStore") //store passed in as prop
@observer //forces to watch store and re-render on store change
class App extends Component {
    constructor() {
        super();
        this.baseApiUrl = "http://api.my-events.site/api/v1";
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        //
        let limit = 100;
        fetch(this.baseApiUrl + "/events/?limit=" + limit)
          .then(resp => resp.json())
          .then(data => {
              let arr = [];
              for(let d of data.results) {
                  
                  let obj = {
                      eventId: d.id,
                      event: d.name,
                      category: d.category === null? 'N/A':  d.category.name  ,
                      organizer: d.organizer ===null? 'N/A': d.organizer.name  ,
                      minTicketPrice: d.min_ticket_price,
                      maxTicketPrice: d.max_ticket_price,
                      startTime: Date(d.start_time).toString(),
                      endTime: d.finish_time,
                      logo: d.logo_uri===null? 'https://via.placeholder.com/150': d.logo_uri,
                      uri: d.uri

                  };
                  this.props.EventListStore.addEvent(obj)

              }
                this.setState({loading:false})

          })
          .catch(e => {
            console.log(e);
          });
    }

    render() {
        const { EventListStore } = this.props;
        return (
            <div>
                {this.state.loading?
                    (
                        <p>loading...</p>
                    )
                    :
                    (
                        <EventGrid data={EventListStore.events}/>
                    )

                }

            </div>
        );
    }
}

export default App;
