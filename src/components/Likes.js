import React, {Component} from 'react';

import {Text,
        Image,
        TouchableOpacity,
        StyleSheet,
        View} from 'react-native';

export default class Likes extends Component {

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/like.jpg') :
                         require('../../resources/img/dislike.png');
    }

    exibeLikes(likers) {
        if(likers.length <= 0)
            return;

        return (
            <Text style={styles.nCurtidas}>
                    {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'} 
            </Text>
        );
    }

    render() {
        const { foto, likeCallback } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={() => {likeCallback(foto.id)}}>
                    <Image style={styles.likeButton} source={this.carregaIcone(foto.likeada)}/>
                </TouchableOpacity> 

                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    likeButton: {
        width: 70,
        height: 70
    },
      nCurtidas: {
        fontWeight: 'bold',
        marginLeft: 5
    }
})