import React, { Component } from 'react';
import {
    Animated,
    Linking,
    Platform,
    StatusBar,
    Text,
    View,
} from 'react-native';
import {
    Card,
    IconButton,
    IconTextButton,
} from './';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
    ScrollView: {
        marginBottom: (StatusBar.currentHeight) ? (30 + StatusBar.currentHeight) : 30,
    },
    cardTitleTag: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '50%',
        padding: 5,
    },
    cardTitleTagText: {
        fontWeight: 'bold',
        // fontSize: Theme.fontSize * 0.9,
        color: Theme.IconColorHighlight,
    },
    titleCardContainer: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    titleCardChild: {
        flex: 1,
        height: '100%',
    },
    ratingText: {
        fontWeight: 'bold',
        fontSize: Theme.FontSize * 0.6,
    },
    ratingStarContainer: {
        flexDirection: 'row',
    },
    ratingStarViewContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
        aspectRatio: 1,
    },
    ratingStar: {
        flex: 1,
        fontSize: Theme.FontSize * 1.2,
        textAlign: 'center',
    },
    entranceContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    entranceContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
}

class MapCardScroll extends Component {
    state = {
        cardTitleImageUri: 'placeholder.jpg',
        cardTitleTitle: 'location',
        cardTitleNumEntrances: 1,
        cardTitleDesc: 'location description',
        cardEntrances: [],

        location: {},

        userRating: [0,0,0,0,0], // TODO set the initial user rating here or in the MapComponent handleMarkerPress function
    }

    /*
    ** Keeps track of which card is on display.
    */
    cardIndex = 0;

    /*
    ** Resets the scroll position back to the start.
    */
    resetScroll = () => {
        this.scrollView.getNode().scrollTo({ x: 0, animated: true });
    }

    /*
    ** Sets the state of each card within
    ** the MapCardScroll based on an inputed state.
    */
    setupLocation = (newState) => {

        // set state
        this.setState(newState, () => {
        
            // title card
            this.cardTitle.setProps({
                title: this.state.cardTitleTitle,
                imageUri: this.state.cardTitleImageUri,
            })    
        })
    }

    handleScroll = (e) => {
        let index = Math.floor(e.nativeEvent.contentOffset.x / this.props.cardWidth);
        if (index != this.cardIndex) {
            this.cardIndex = index;
            this.props.thisRef.MapComponent.MapEntrances.setActiveEntrance(this.cardIndex);
        }
    }

    convertNumToRating = (num) => {
        let userRating = [...Array(5)];
        let count = num;
        
        for (let i in userRating) {
            if (count > 0) {
                userRating[i] = 1;
                count--;
            }
        }

        this.setState({ userRating }, () => {
            // TODO set the user's rating for this location here
            // the location id is               this.state.location.id
            // and the rating is                userRating
        });
    }

    render() {
        return (
            <Animated.ScrollView horizontal scrollEventThrottle={100}
                showsHorizontalScrollIndicator={false}
                snapToInterval={this.props.snapToInterval}
                snapToAlignment='center'
                decelerationRate={0.75}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                onScroll={this.handleScroll}
                style={[this.props.style, styles.ScrollView]}
                ref={ref => { this.scrollView = ref }}>

                {/* TITLE CARD */}

                <Card
                    height={this.props.cardHeight}
                    width={this.props.cardWidth}
                    margin={this.props.cardMargin}
                    imageUri={this.state.cardTitleImageUri}
                    title={this.state.cardTitleTitle}
                    ref={ref => { this.cardTitle = ref }}>
                    
                    <View style={styles.titleCardContainer}>
           
                        <View style={styles.titleCardChild}>
                           
                            {/* number of accessible entrances */}
                            <Text style={{ fontWeight: 'bold' }}>{this.state.cardTitleNumEntrances} accessible entrances</Text>
                           
                            {/* location description */}
                            <Text>{this.state.cardTitleDesc}</Text>
                        
                        </View>
           
                        <View style={styles.titleCardChild}>
                            
                            {/* avg rating */}                            
                            <View>
                                <Text style={styles.ratingText}>Avg Rating:</Text>

                                <View style={styles.ratingStarContainer}>
                                    {(this.state.location.rating ?
                                        this.state.location.rating :
                                        [0,0,0,0,0]).map((star, index) => {
           
                                        let icon = 'star-border';
                                        if (star == 1) {
                                            icon = 'star';
                                        } else if (star == 0.5) {
                                            icon = 'star-half';
                                        }

                                        return <View key={index} style={styles.ratingStarViewContainer}><Icon
                                            style={styles.ratingStar}
                                            name={icon}
                                            color={Theme.DarkBlue}
                                            /></View>;
                                    })}
                                </View>

                            </View>
                            
                            {/* your rating */}
                            <View>
                                <Text style={styles.ratingText}>Your Rating:</Text>
                        
                                <View style={styles.ratingStarContainer}>
                                    {this.state.userRating.map((star, index) => {
           
                                        let icon = 'star-border';
                                        if (star == 1) {
                                            icon = 'star';
                                        }

                                        return <IconButton key={index}
                                            style={styles.ratingStarViewContainer}
                                            iconStyle={styles.ratingStar}
                                            icon={icon}
                                            color={Theme.Orange}
                                            onPress={() => this.convertNumToRating(index + 1)}
                                            accessibilityLabel={'rate this location ' + (index + 1) + ' stars'}
                                            />;
                                    })}
                                </View>
                        
                            </View>
                            
                        </View>
           
                    </View>

                    <View style={styles.cardTitleTag}>
                        <Text style={styles.cardTitleTagText}>
                        Swipe right to view entrances</Text>
                    </View>
                </Card>

                {/* ENTRANCE CARD(S) */}

                {this.state.cardEntrances.map(entrance => { return (
                    <Card key={entrance.id}
                        height={this.props.cardHeight}
                        width={this.props.cardWidth}
                        margin={this.props.cardMargin}
                        imageUri={entrance.imageUri}
                        title={entrance.direction.toUpperCase() + ' entrance'}>

                        <Text>Accessibility types: {entrance.accessibilityType.join(', ')}</Text>

                    <View style={styles.entranceContainer}>
                    <View style={styles.entranceContent}>

                    <IconTextButton icon='map'
                    fill={true}
                    color={Theme.IconColorBackground}
                    accessibilityLabel='get directions'
                    onPress={() => {
                        alert('get directions to ' + JSON.stringify(
                        entrance.coordinates
                        ));
                    }}>Get directions</IconTextButton>

                    <IconTextButton icon='directions'
                    color={Theme.IconColorHighlight}
                    accessibilityLabel='open in Google Maps'
                    onPress={() => {
                        const scheme = Platform.select({
                        ios: 'maps:0,0?q=',
                        android: 'geo:0,0?q='
                        });

                        let lat = entrance.coordinates._latitude;
                        let lng = entrance.coordinates._longitude;
                        const latLng = `${lat},${lng}`;

                        const label = this.state.cardTitleTitle + ' '
                        + entrance.direction.toUpperCase() + ' entrance';

                        const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`
                        });

                        Linking.openURL(url);
                    }} />

                    <IconTextButton icon='info'
                    fill={true}
                    color={Theme.BackgroundColor}
                    backgroundColor={Theme.Color}
                    accessibilityLabel='more info'
                    onPress={() => {
                        this.props.navigation.navigate('MoreInfo');
                    }}>More info</IconTextButton>

                    </View>
                </View>
                </Card>
                )})}
            </Animated.ScrollView>
        )
    }
}

export default MapCardScroll;
