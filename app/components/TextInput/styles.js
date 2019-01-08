import EStyleSheet from 'react-native-extended-stylesheet'

const INPUT_HEIGHT = 35;
const BORDER_RADIUS = 4;

export default EStyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 720,
        right: 90,
        width: '60%',
    },
    input: {
        flex: 1,
        height: 26,
        fontSize: 20,
        height: INPUT_HEIGHT,
        backgroundColor: '$white',
        borderTopRightRadius: BORDER_RADIUS,
        paddingHorizontal: 8,
        color: '$inputText',
    }
});
