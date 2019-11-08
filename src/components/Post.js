import React, {Component} from 'react';

import {Text,
        Image,
        Dimensions,
        StyleSheet,
        View} from 'react-native';

import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
          valorComentario: ''
        }
      }

    exibeComentarios(foto) {
        if(foto.comentario === '')
            return;
   
            return (
            foto.comentarios.map(comentario =>
                <View style={styles.containerComentario} key={comentario.id}>
                    <Text style={styles.donoComentario}>{comentario.login}</Text>
                    <Text style={styles.comentario}>{comentario.texto}</Text>
                </View>    
            )
        );
    }

    render() {
        const { foto, likeCallback, comentarioCallback } = this.props;

        return (
            <View>
                <View style={styles.containerUsuario}>
                    <Image style={styles.imagePerfil} source={{uri: foto.url}}/>
                    <Text>{foto.nome}</Text>
                </View>
                <Image style={styles.image} source={{uri: foto.url}}/>
                <Likes foto={foto} likeCallback={likeCallback}/>
                {this.exibeComentarios(foto)}

                <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerUsuario: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    containerComentario: {
        flexDirection: 'row',
      alignItems: 'center'
    },
    image: {
      width: width,
      height: width
    },
    imagePerfil: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 5
    },
    containerUsuario: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    donoComentario: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    comentario: {
        marginLeft: 5
    },
  });
  