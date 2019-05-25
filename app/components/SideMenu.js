import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    IconTextButton,
    Menu,
} from './';
import { Theme } from '../global';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Auth } from '../api/Auth';

const styles = {
    ViewContainer: {
        flex: 1,
        backgroundColor: Theme.BackgroundColorContent,
        padding: 10,
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: Theme.IconColorBackground
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10
    },
    menuText: {
        marginLeft: 20,
        fontSize: 20,
        textAlign: 'center'
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
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userInfos: {
        height: 50,
        justifyContent: 'center',
    },
    username: {
        fontWeight: '700',
        fontSize: 25
    },
}
class SideMenu extends Component {
    state = {}

    open = () => this.Menu.open();

    render() {
        return (
            <Menu
            height={this.props.height}
            width={this.props.width}
            size={this.props.size}
            from='left'
            ref={ref => { this.Menu = ref }}>
                <View style={[styles.sideMenu, this.props.style || {}]}>
                    <View style={{ paddingHorizontal: 20, top: 20 }}>
            
                        <View style={styles.header}>
                            <View style={styles.userInfosHolder}>
                                <Image style={styles.avatar}
                                    source={require("../assets/images/logo.jpeg")} />
                                <View style={styles.userInfos}>
                                    <Text type='h1White' style={styles.username}>Username</Text>
                                </View>
                            </View>
                        </View>
            
                        <TouchableOpacity style={[styles.menu, { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 }]} >
                        <Icon style={styles.icon} name='map' color='#ffffff' size={30} />
                        <Text style={styles.menuText} type='h5White'>Map</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate("ProfileScreen")}>
                        <Icon style={styles.icon} name='user-o' color={'#ffffff'} size={30} />
                        <Text style={styles.menuText} type='h5White'>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate("CommentsScreen")}>
                        <Icon style={styles.icon} name='comment-o' color={'#ffffff'} size={30} />
                        <Text style={styles.menuText} type='h5White'>My Comments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate("AddedItemsScreen")}>
                        <Icon style={styles.icon} name='plus' color={'#ffffff'} size={30} />
                        <Text style={styles.menuText} type='h5White'>My Added Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate("HelpScreen")}>
                        <Icon style={styles.icon} name='exclamation' color={'#ffffff'} size={30} />
                        <Text style={styles.menuText} type='h5White'>Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate("SettingsScreen")}>
                        <Icon style={styles.icon} name='cog' color={'#ffffff'} size={30} />
                        <Text style={styles.menuText} type='h5White'>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                        onPress={() => {
                            // set user info to null
                            this.props._ref.setState({ userInfo: null }, () => {
                                // close menu
                                this.Menu.close();
                                // sign out of backend
                                Auth.SignOut()
                                    .then(() => {                                
                                        // navigate to login screen
                                        this.props.navigation.navigate('LoginScreen');
                                    })
                                    .catch((e) => { throw e });
                            });
                        }}>
                        <Icon style={styles.icon} name='close' color={'#ffffff'} size={30} />
                        <Text style={styles.menuText} type='h5White'>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Menu>
        )
    }
}



export default SideMenu;
