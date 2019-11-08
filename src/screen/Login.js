import React, {Component} from 'react';

import {TextInput,
        Button,
        Dimensions,
        StyleSheet,
        AsyncStorage,
        View} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            usuario: '',
            senha: '',
            message: ''
        }
    }
    efetuaLogin() {
        const uri = "http://localhost.8080......."
        const requestInfo = {
            method: 'POST',
            body: ({
                login: this.state.usuario,
                senha: this.state.senha,
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok)
                    return response.text();
                
                throw new Error("Não foi possivel efetuar login.");
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario);
            })
            .catch(e => this.setState({mensagem: e.message}))
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Usuário"
                        onChangeText={texto => this.setState({usuario: texto})}
                        autoCapitalize="none"/>
                    <TextInput style={styles.input} placeholder="Senha"
                        onChangeText={texto => this.setState({senha: texto})}
                        secureTextEntry={true}/>
                    <Button title="login" onPress={() => {this.efetuaLogin.bind(this)}}/>
                </View>
                <Text style={style.mensagem}>
                    {this.state.message}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 26
    },
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
})