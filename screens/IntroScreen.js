import {Animated, View, ImageBackground, Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const SCREEN_WIDTH = Dimensions.get("window").width;

const getUsername = gql`
    query($id: ID!){
        User(id: $id){
            id
            username
        }
    }
`

let queryUserId;

class IntroScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            springVal: new Animated.Value(0.8),
            fadeVal: new Animated.Value(1),
        };
    }
    componentDidMount(){
        setTimeout( () => this.spring(), 1500);
    }
    spring(){
        Animated.sequence([
            Animated.spring(this.state.springVal, {
                toValue: 0.5,
                friction: 15,
                tension: 60
            }),
            Animated.parallel([
                Animated.spring(this.state.springVal, {
                    toValue: 17.5,
                    friction: 22,
                    tension: 5
                }),
                Animated.timing(this.state.fadeVal, {
                    toValue: 0,
                    duration: 500
                })
            ])
        ]).start( () => this.props.navigation.navigate('Home'));
    }
    render(){

        return(
            <TouchableOpacity
                style={{backgroundColor: "#000000"}}
                onPress={() => this.props.navigation.navigate('Home')}
            >
                <View style={{height:"100%", width: '100%',
                    alignItems: "center", justifyContent:"center", backgroundColor: "#000000"}}>

                    <Animated.View
                        style={{
                            opacity: this.state.fadeVal,
                            transform: [{scale: this.state.springVal }]
                        }}>

                        <ImageBackground
                            source={require('../assets/images/MiamiFitness.png')}
                            style={{
                                flex:1, backgroundColor: 'transparent',
                                width: SCREEN_WIDTH,
                                height: "100%",
                                justifyContent: 'center'
                            }}
                            resizeMode='contain'
                            alt={'Miami Fitness Logo'}
                        />
                    </Animated.View>
                </View>
            </TouchableOpacity>
        );
    }
}
IntroScreen.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        User: PropTypes.object,
    }),
};

const IntroWithHello = graphql(getUsername,{
    options: ({navigation}) => {
        return{
            variables: {id: navigation.state.params.itemId},
        }
    }
})(IntroScreen);

class IntroView extends React.Component{
    render(){
        return(
            <IntroScreen navigation = {this.props.navigation}/>
        );
    }
}

export default withNavigation(IntroView);