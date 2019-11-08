import React, {Component} from 'react';

import {Image,
        TouchableOpacity,
        TextInput,
        StyleSheet,
        View} from 'react-native';

export default class InputComentario extends Component {     

    constructor() {
        super();
        this.state = {
            valorComentario: ''
        }
    }

    render() {
        return (
            <View style={styles.containerSend}>
                <TextInput style={styles.input}
                    placeholder="Adicione um comentário..."
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto})}/>
                <TouchableOpacity onPress={() => {
                    this.props.comentarioCallback(this.props.idFoto, this.state.valorComentario, this.inputComentario);
                    this.setState({valorComentario: ''})
                }}>
                    <Image style={styles.iconeSend} source={require('../../resources/img/send.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    iconeSend: {
        width: 30,
        height: 30
    },
    containerSend: {
        flexDirection: 'row' 
    }
});