import React from 'react';
import {Text, View, StatusBar, ScrollView, ActivityIndicator } from 'react-native';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import Event from "../components/Event";

const GET_EVENTS = gql`    
    query{
        allEvents(orderBy: publishDate_ASC, filter:{isPublished:true}){
            id
            name
            imageUrl
            registerUrl
            location{facilityName, buildingName}
            fees
            time
            description
            date
            days{name}
        }
    }
`


const EventsList = graphql(GET_EVENTS)(({ data }) => {
    const {loading, allEvents} = data;
    if (loading) return <ActivityIndicator />;

    return (
        <ScrollView>
            {allEvents.map(( obj, id ) => (
                    <Event
                        key={id}
                        id={obj.id}
                        name={obj.name}
                        date={obj.date}
                        fees={obj.fees}
                        time={obj.time}
                        days={obj.days.map(({name}) => name).join(', ')}
                        description={obj.description}
                        location={obj.location.facilityName + ' - ' + obj.location.buildingName}
                        image={obj.imageUrl}
                        registerUrl={obj.registerUrl}
                    />
                )
            )}
        </ScrollView>
    );
});

class EventsScreen extends React.Component {
    render() {
        return (
            <View >
                <StatusBar barStyle = "default"/>
                <EventsList/>
            </View>
        );
    }
}

export default EventsScreen;