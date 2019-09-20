import { observable, action, computed } from "mobx";
import Fuse from 'fuse.js';

class EventListStore {
    @observable events = [];
    @observable searchedEvents = [];

    @observable searchOptions={
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "title",
            "author.firstName"
        ]
    }

    @action addEvent = event => {
        this.events.push(event);
        this.searchedEvents.push(event);
    };



    @action searchEvents = searchVal => {
        // debugger;
        let f = new Fuse(this.events, this.searchOptions)
        this.searchedEvents = f.search(searchVal);
    }

    @computed get eventCount() {
        return this.events.length;
    }

    @computed get getAllEvents(){
        return this.events;
    }


}

//export one instance (singleton) for single store across app
const store = new EventListStore();
export default store;
