import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const style = {
    Box: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        borderRadius: 5,
        borderWidth: 2,
    },
    BoxContent: {
        flexDirection: 'column',
        flex: 1,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconContainer: {
        flex: 1,
        flexDirection: 'column',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icon: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
    },
    Label: {
        flex: 0.5,
        textAlign: 'center',
        color: 'white',
    },
}

class IconToggleButton extends Component {

    state = {
        iconHeight: 0,
        enabled: false,
    }

    render () {
        const { accessibilityLabel, color, icon, label, onEnabled, onDisabled } = this.props;
        const { enabled, iconHeight } = this.state;

        return (
            <TouchableOpacity
                style={[style.Box, enabled ? { backgroundColor: color } : {}, { borderColor: color }, this.props.style]}
                acessibilityLabel={accessibilityLabel}
                onPress={() => {
                    this.setState({ enabled: enabled ? false : true }, () => enabled ? onDisabled() : onEnabled());
                }}>

                <View style={style.BoxContent}>
                
                    <Text style={style.IconContainer}
                        onLayout={(e) => this.setState({ iconHeight: e.nativeEvent.layout.height * 1.1 })}>
                        <Icon name={icon} style={[style.Icon, { fontSize: iconHeight }, enabled ? {} : { color }]} />
                    </Text>
                
                    <Text style={[style.Label, enabled ? {} : { color }]}>{label}</Text>
                
                </View>

            </TouchableOpacity>
        );
    }
}

IconToggleButton.propTypes = {
    icon: PropTypes.string.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    onEnabled: PropTypes.func,
    onDisabled: PropTypes.func,
}

IconToggleButton.defaultProps = {
    color: Theme.Orange,
    onEnabled: () => {},
    onDisabled: () => {},
}

export default IconToggleButton;