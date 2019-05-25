import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {
    Menu,
    SideMenuButton
} from './';
import { Theme } from '../global';
import { Auth } from '../api/Auth';

const styles = {
    sideMenu: {
        position: 'absolute',
        top: 0, bottom: 0,
        right: 0, left: 0,
        backgroundColor: Theme.IconColorBackground
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    userInfos: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        fontWeight: 'bold',
        fontSize: Theme.FontSize + 5,
    },
}
class SideMenu extends Component {
    state = {}

    open = () => this.Menu.open();

    render() {
        const { navigation } = this.props;

        return (
            <Menu
            height={this.props.height}
            width={this.props.width}
            size={this.props.size}
            from='left'
            ref={ref => { this.Menu = ref }}>
                <View style={[styles.sideMenu, this.props.style]}>
                    <View style={{ padding: 10 }}>
            
                        <View style={styles.header}>
                            <View style={styles.userInfosHolder}>
                                <Image style={styles.avatar}
                                    source={require("../assets/images/logo.jpeg")} />
                                <View style={styles.userInfos}>
                                    <Text style={styles.username}>Username</Text>
                                </View>
                            </View>
                        </View>
                        
                        <SideMenuButton icon='map'
                        active={true}
                        onPress={() => navigation.navigate('Map')}
                        >Map</SideMenuButton>

                        <SideMenuButton icon='person'
                        onPress={() => navigation.navigate('ProfileScreen')}
                        >Profile</SideMenuButton>

                        <SideMenuButton icon='message'
                        onPress={() => navigation.navigate('CommentsScreen')}
                        >My Comments</SideMenuButton>

                        <SideMenuButton icon='turned-in'
                        onPress={() => navigation.navigate('AddedItemsScreen')}
                        >My Added Items</SideMenuButton>

                        <SideMenuButton icon='info-outline'
                        onPress={() => navigation.navigate('MoreInfo')}
                        >More Info</SideMenuButton>

                        <SideMenuButton icon='close'
                        onPress={() => {
                            // 1. set Map screen user info to null
                            this.props._ref.setState({ userInfo: null }, () => {
                                // 2. close side menu
                                this.Menu.close();
                                // 3. sign out of backend
                                Auth.SignOut()
                                    .then(() => {                                
                                        // 4. navigate back to login screen
                                        navigation.navigate('LoginScreen');
                                    })
                                    .catch((e) => { throw e });
                            });    
                        }}
                        >Sign Out</SideMenuButton>

                    </View>
                </View>
            </Menu>
        )
    }
}



export default SideMenu;
