
import React, {Component} from 'react';
import {FlatList,
        StyleSheet,
        Dimensions,
        Platform,
        AppRegistry
       } from 'react-native';

import Post from './src/components/Post';
import Login from './src/screen/Login';

const width = Dimensions.get('screen').width;

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    // axios.get('https://instalura-api.herokuapp.com/api/public/login')
    //   .then(resposta => resposta.json())
    //   .then(json =>  {
    //     debugger;
    //     this.setState({fotos: json})
    //   });
    this.setState({fotos: [{
      "nome": "Rio de Janeiro",
      "id": 1,
      "url": "https://magazine.zarpo.com.br/wp-content/uploads/2018/09/25-pontos-turisticos-do-brasil-para-conhecer-agora-mesmo-2.jpg",
      "likeada": false,
      "likers": [],
      "comentario": "comentario da foto",
      "comentarios": [{
        "id": 1,
        "login": "Jose",
        "texto": "Silvio Santos Ipsum Um, dois três"
      }, {
        "id": 2,
        "login": "Maria",
        "texto": "Valendo um milhão de reaisammm."
      }, {
        "id": 3,
        "login": "Joao",
        "texto": "O prêmio é em barras de ouro, que vale mais que dinheiroam."
      }],
      "usuario": "Otávio"
      }, {
      "nome": "Paris",
      "id": 2,
      "url": "https://go.hurb.com/wp-content/uploads/2014/11/10-pontos-tur%C3%ADsticos-mais-visitados-do-mundo-torre-eiffel.jpg",
      "likeada": false,
      "likers": [],
      "comentario": "comentario da foto",
      "comentarios": [{
        "id": 1,
        "login": "Jose",
        "texto": "Silvio Santos Ipsum Um, dois três"
      }, {
        "id": 2,
        "login": "Maria",
        "texto": "Valendo um milhão de reaisammm."
      }, {
        "id": 3,
        "login": "João",
        "texto": "O prêmio é em barras de ouro, que vale mais que dinheiroam."
      }],
      "usuario": "Luiz"
      }, {
      "nome": "Pisa",
      "id": 3,
      "url": "https://i0.wp.com/turismo.eurodicas.com.br/wp-content/uploads/2017/11/pontos-turisticos-da-italia-1.jpg?zoom=2.625&resize=372%2C241",
      "likeada": false,
      "likers": [],
      "comentario": "comentario da foto",
      "comentarios": [{
        "id": 1,
        "login": "Jose",
        "texto": "Silvio Santos Ipsum Um, dois três"
      }, {
        "id": 2,
        "login": "Maria",
        "texto": "Valendo um milhão de reaisammm."
      }, {
        "id": 3,
        "login": "Joao",
        "texto": "O prêmio é em barras de ouro, que vale mais que dinheiroam."
      }],
      "usuario": "Otávio"
      }]})
  }

  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    let novaLista = []
    if(!foto.likeada) {
        novaLista = [
            ...foto.likers,
            {login: 'meuUsuario'}
        ]
    } else {
        novaLista = foto.likers.filter(liker => {
            return liker.login !== 'meuUsuario'
        })
    }

    const fotoAtualizada = {
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
    }
    
    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({fotos})
}

adicionaComentario(idFoto, valorComentario, inputComentario) {
  if(valorComentario === '')
      return;
    
  const foto = this.state.fotos.find(foto => foto.id === idFoto)

  const novaLista = [...foto.comentarios, {
      id: foto.comentarios.length + 1,
      login: 'meuUsuario',
      texto: valorComentario
  }];

  const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
  }

  const fotos = this.state.fotos
    .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
  this.setState({fotos});
  inputComentario.clear();
}

  render() {

    return (
      <FlatList style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={ ({item}) =>
          <Post foto={item} 
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)}/>
        }
      />
    );
  }
}

const margen = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: margen
  },
});
