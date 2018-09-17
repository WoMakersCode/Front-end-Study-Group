# Curso hands-on Vue.js

Este curso foi preparado para o Front-end study group realizado pelo [WoMakersCode](http://womakerscode.org/).

Para rodar o projeto:

```sh
$ npm install
$ npm start
```

## Introdução

Neste curso vamos explorar o [Vue.js](https://vuejs.org/) e os principais componentes desse framework para que você possa desenvolver seus próprios projetos usando Vue.

### O que veremos nesse curso?

* Introdução a arquitetura de projeto
* Introdução a Vue.js
    * webpack
    * templates e sintaxe
    * diretivas
    * eventos
    * binding
    * componentes
* Introdução a APIRestful
    * CRUD
    * Como criar servidor com Node.js
* Integrando o servidor node a uma aplicação Vue.js

### 1. Pensando em projeto

Antes de sair codando por ai, é importante pensar no sistema como um todo. Uma aplicação completa pode ser divida em partes, que vão além de backend e frontend. Dentro de um projeto, temos as definições das subpartes dessa divisão, e como ligalá-las entre si.

Na primeira parte do workshop, vamos discutir um pouco como será o processo de criação da aplicação e seu funcionamento.

### 1.1. Definição e levantamento de requisitos:

Nesta etapa, vamos entender o que é a aplicação, o que ela deve fazer e quais os itens essenciais que devem ter prioridade no desenvolvimento. A etapa de definição de requisitos é essencial em qualquer projeto de software, uma vez que é nela que o cliente expõe todos os componentes e funcionamento da aplicação.

Após o levantamento de requisitos, há uma outra etapa que é a definição de escopo do projeto. Nessa etapa são delimitados quais componentes definidos durante o levantamento de requisitos serão de fato implementados durante a fase de desenvolvimento do projeto.

Dependendo da empresa/equipe a metodologia utilizada durante o desenvolvimento pode variar (Scrum, XP, Cascata). Em equipes que utilizam metodologias ágeis por exemplo, o escopo inicial pode ser um MVP - Minimum Viable Product para validar a ideia.

### Descrição da aplicação:
> Nossa aplicação será um site que permite postar mensagens, que são exibidas em um feed para qualquer usuário que tenha acesso à página.

No caso da nossa aplicação (que é semelhante ao Twitter), para simplificar a implementação da primeira versão, não vamos centralizar as postagens nos usuários. No entanto, você pode ver abaixo os requisitos completos da aplicação:

### Arquitetura
<p align="center">
  <img src="https://i.imgur.com/9o8uFv5.jpg" width="350" title="arquitetura do sistema">
</p>

### Site - Front-end

1. Home
    * Feed de postagens, baseado nas pessoas que você segue;
    * Caso não siga ninguém, exibir todas as postagens do sistema como sugestão;

2. Perfil de usuário
    * Foto do usuário
    * Nome de usuário
    * Listagem de informações pessoais
    * Feed de postagens da pessoa.
        * Se não for o próprio perfil, exibir botão para seguir o usuário
    * Listagem de usuários:
        * Seguidores
        * Pessoas que a seguem.
3. Sistema de Autenticação
    * Cadastro
    * Login
4. Componente de Feed de Postagens
    * Campo para criar nova postagem
    * Caso não exista postagem:
        * Não exibir nada.
        * Talvez um texto com ninguém publicou ainda, gostaria de ser o primeiro?
    * Deve ser possível acessar o perfil de uma pessoa através de sua publicação.


### API - Versão 1
1. Api Rest com rota para postagens:
    * Disponibilizar rota para obter as postagens
    * Disponibilizar rota para criar postagens
    * Disponibilizar rota para alterar postagens
    * Disponibilizar rota para deletar postagens
2. Postagens
    * nome do usuário que publicou a postagem → vem na requisição
    * conteúdo da postagem → só texto por enquanto, expandir para outros formatos (imagens, gifs, etc)

### Escopo de projeto

Para este curso, faremos os itens 1 e 4 dos requisitos do Site. A API - Versão 1 está disponível no [github](https://github.com/ksetoue/vue-fullstackapp-api) e no [link](https://vue-api-curso.herokuapp.com/posts) usando [Heroku](https://dashboard.heroku.com/).

# Parte 2 - Oi Front-end seu lindo <3

O Vue.js é baseado no conceito de Virtual DOM, que consiste em uma representação da árvore do DOM em forma de objeto. Dentro de um framework de Javascript, isso facilita a manipulação de estruturas e alteração de dados dentro das estruturas estáticas. Para saber mais sobre o cliclo de vida das aplicações em Vue acesse esse [link](https://br.vuejs.org/v2/guide/instance.html).

## Criando o projeto

1. Crie um repositório na sua conta do Github. [Siga os passos nesse link caso esteja fazendo isso pela primeira vez](https://help.github.com/articles/create-a-repo/)

2. [Clone o repositório localmente](https://help.github.com/articles/cloning-a-repository/)

3. Instale:
    * [node.js](https://nodejs.org/en/download/)
    * [vue e vue-cli3](https://cli.vuejs.org/guide/installation.html)
    * [instale o plugin para navegador do vuedevtools](https://github.com/vuejs/vue-devtools#installation)

4. Dentro da pasta que você clonou do Github, crie o projeto usando o webpack template:

```sh
$ vue init webpack .
```

Após executar esse comando, selecione as opções como na imagem abaixo:

[Configuração do projeto](https://user-images.githubusercontent.com/13456109/45606147-05db3180-ba19-11e8-85d6-a551e233352e.PNG)

Para testar se está tudo funcionando, rode os comandos abaixo e acesse http://localhost:8080 em seu navegador.

```sh
$ npm install
$ npm run dev
# ou
$ npm install
$ npm start
```

5. Dentro da pasta do projeto, rode os seguintes comandos para instalar as dependencias:

```sh
$ npm install vuex --save
$ npm install axios --save
$ npm install bootstrap-vue --save
$ npm install element-ui --save
```

### Estrutura do projeto

Para separar os arquivos, vamos criar uma estrutura que separe por funcionalidade as nossas pastas. Dentro da pasta `src`, vamos criar uma pasta `api` e outra chamada `store`. Dentro da pasta api, teremos um arquivo chamado `api.js` onde colocaremos as chamadas do [axios](https://github.com/axios/axios). Dentro de store ficarão nossos arquivos referentes às implementações de [Vuex](https://vuex.vuejs.org/). Dentro da pasta store, vamos criar um arquivo chamado `store.js`.

Dentro do arquivo `store.js`, vamos incluir o seguinte código:
```js
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api/Api'

Vue.use(Vuex)

const store = new Vuex.Store({

})

export default store
```

Dentro da variável store, vamos adicionar nossas actions, mutations, getters e states:

```js
const store = new Vuex.Store({
  state: { // guarda todos os estados que iremos gerenciar no vuex
    posts: []
  },

  actions: { // acoes que serão disparadas pelo vue, para alterar o estado
    loadPostsList: function ({ // carrega todos os posts da nossa API
      commit
    }) {
      Api().get('/posts')
        .then((response) => {
          commit('SET_POSTS_LIST', {
            list: response.data
          }, (err) => {
            console.log(err)
          })
        })
    },

    async createPost({ // Cria um novo post passando as informacoes dentro de um objeto chamado newPostInfo
      state,
      dispatch,
      commit
    }, newPostInfo) {
      await Api().post('posts', {
        user: newPostInfo.user,
        title: 'title',
        content: newPostInfo.content
      })
      return dispatch('loadPostsList', {
        commit
      })
    },

    async deletePost({ // remove um post da API, passando o id do post que deve ser removido
      state,
      dispatch,
      commit
    }, post) {
      await Api().delete(`posts/${post._id}`)
      return dispatch('loadPostsList', {
        commit
      })
    }

  },

  mutations: { // mutations sao disparadas por actions e sao responsaveis por efetivamente mudar o estado das variaveis no vuex
    SET_POSTS_LIST: (state, {
      list
    }) => {
      state.posts = list.data
    }
  },

  getters: { // getters sao responsaveis por pegar as informacoes do state
    getPostsList: state => state.posts
  }
})
```

O código acima declara o uso do Vuex dentro do da instancia do Vue. Note que temos quatro objetos diferentes:

- **state**: utilizado para guardar os estados
- **actions**: utilizados para disparar ações que vão mutar os estados contidos em state
- **mutations**: responsáveis por mutar os estados dentro de state
- **getters**: retornam os estados

No arquivo acima temos dentro de `state` a váriavel ``post`` que vai guardar o vetor com todos os posts retornados na API.
Vamos usar a action  `loadPostsList` para disparar a função que chama a Api.js que criamos anteriormente, para chamar nossa API e guardar os posts dentro da variável no Vuex. Repare que a action dispara a mutation `SET_POSTS_LIST`, que é responsável por acessar `state.posts` e alterar o seu valor.

Dentro de `api.js`, teremos:

```js
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://vue-api-curso.herokuapp.com/` // url da API
  })
}

```

Registre o store em `main.js`, incluindo o Vuex ao projeto e também o Element e o Bootstrap para Vue:

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

import store from './store/store'

Vue.use(ElementUI)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```

E, para que uma primeira chamada na API seja feita, altere o conteúdo do ``App.vue``:
```js
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: mapState([
    'posts'
  ]),

  async beforeMount () {
    const dispatch = this.$store.dispatch
    dispatch('loadPostsList')
    console.log(this.$store.state.posts)
  }

}
</script>


```


## Criando componentes
Vamos criar nosso primeiro componente, no qual vamos mostrar a lista de posts. Dentro da pasta `components`, vamos criar um arquivo `Posts.vue`. Dentro do desse arquivo teremos a seguinte estrutura:

```js
<template>
  <div>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

```

Dentro de template, vamos adicionar dois elementos, uma div que vai encapsular a lista de posts. Dentro dessa div teremos outra div com o elemento card do vue-bootstrap, que contém a formatação do post:

```js
<template>
  <div>
    <div
      v-for="post in postList"
      :key="post._id"
    >
      <b-card>
        <b-media>
          <img class="align-self-start" width="64" height="64" src="../assets/trash-dove.png" slot="aside" blank  alt="placeholder" />
          <h5 class="mt-0" v-text="post.user"></h5>
          <p v-text="post.content"></p>
        </b-media>
      </b-card>
    </div>
  </div>
</template>
```

Dentro desse componente vamos adicionar também um botão para remover os posts, que utilizaremos posteriormente. Adicione na pasta `assets` uma imagem de sua preferencia e edite o caminho na tag de `img` em `src="../assets/trash-dove.png"`.

```js
<template>
  <div>
    <div
      v-for="post in postList"
      :key="post._id"
    >
      <b-card>
        <b-media>
          <img class="align-self-start" width="64" height="64" src="../assets/trash-dove.png" slot="aside" blank  alt="placeholder" />
          <h5 class="mt-0" v-text="post.user"></h5>
          <p v-text="post.content"></p>
        </b-media>
        <div class="btn-card">
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Remover</b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>
```

Agora que temos o template pronto, vamos adicionar os métodos necessários para mostrar todos os posts e ligá-lo ao template. Lembre-se de adicionar o campo `name: Posts` ao seu componente.
Lembrando que vamos utilizar o getter que criamos dentro de store. Dentro de script, vamos importar `mapGetters` do vuex, além da lib do vue-bootstrap:

```js
<script>
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {

    name:'Posts'

```

Em seguida, vamos adicionar o método para carregar os posts do vuex:

```js
export default {
  name: 'Posts',

  computed: {
    ...mapGetters([ 'getPostsList' ]),

    postList () { // metodo que pega os posts do vuex
      let list = this.getPostsList
      return list.reverse()
    }
  },

}
```

Vamos testar nossa aplicação, alterando a rota carregada. Vá até a pasta `router` e modifique o caminho da rota, adicionando `Posts` como rota principal:

```js
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Posts from '@/components/Posts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    }
  ]
})

```

Execute o comandos ``npm run dev` no terminal e vá até http://localhost:8080 para testar. Você deve ter todos os posts listados na tela :)

### Melhorando a divisão dos componentes

Agora, vamos incluir um componente para inserir o texto dos novos posts e submeter o post para a API.
Antes, note que os posts listados podem ser separados em um único componente! Para isso, vamos criar um arquivo `SinglePost.vue` e dentro dele adicionar o código do card:

```js
<template>
  <div>
    <div
      v-for="post in postList"
      :key="post._id"
    >
      <b-card>
        <b-media>
          <img class="align-self-start" width="64" height="64" src="../assets/trash-dove.png" slot="aside" blank  alt="placeholder" />
          <h5 class="mt-0" v-text="post.user"></h5>
          <p v-text="post.content"></p>
        </b-media>
        <div class="btn-card">
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Remover</b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'SinglePost',

  computed: {
    ...mapGetters([ 'getPostsList' ]),

    postList () { // metodo que pega os posts do vuex
      let list = this.getPostsList
      return list.reverse()
    }
  },
}
</script>

```

Vamos importar o novo componente dentro de Posts, removendo o conteúdo anterior, que agora está no novo `componente`:
```js
<template>
  <div>
    <single-post></single-post>
  </div>
</template>

<script>
import SinglePost from './SinglePost'

export default {
  name: 'Posts',

  components: {
    SinglePost
  }

}
</script>

<style>
.align-self-start {

}
</style>

```

Agora, vamos criar um componente chamado NewPost, criando um arquivo ``NewPost.vue``. Note que, para criar o post estamos usando o Element, que é outra lib com componentes prontos para vue. Aqui, a chamada do @click do botão no componente chama a action que criamos no store, a `createPost`, passando as informações de `data()`. Para alterar o usuário que irá aparecer na API, altere o campo `user`, dentro de `data ()`:

```js
<template>
  <div class="post-wrapper">
    <el-input
      class="el-textarea"
      type="textarea"
      resize="none"
      :autosize="{ minRows: 2, maxRows: 2 }"
      :rows="1"
      :placeholder="formatPlaceholder"
      v-model="content"
    ></el-input>
    <div class="wrapper__button">
      <b-button
        @click="addPost()"
      >
        Enviar
      </b-button>
    </div>
  </div>

</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewPost',

  computed: {
    formatPlaceholder () {
      return `${this.user}, diga o que está pensando`
    }
  },

  data () {
    return {
      user: 'karol',
      title: '',
      content: ''
    }
  },

  methods: {
    ...mapActions(['createPost']),

    addPost () {
      let newPost = {
        user: this.user,
        title: this.title,
        content: this.content
      }
      this.createPost(newPost)
    }
  }
}
</script>
<style>
.btn-secondary {
    color: #fff;
    background-color: #8032e6;
    border-color: #8032e6;
}
.btn-secondary:hover {
    color: #fff;
    background-color: #5e00d8;
    border-color: #5e00d8;
}

.post-wrapper {
  display: flex;
  padding: 5px;
  justify-content: center;
  margin-top: 20px;
}

.el-textarea {
  padding: 5px;
}
.el-textarea__inner {
    width: 660px;
    border-radius: 6px;
    padding: 8px 15px;
    overflow: hidden;
  }

.el-textarea__inner:focus {
  border-color: #8215c5;
}

.wrapper__button {
  padding: 5px;
  align-self: center;
}

.wrapper__button-send {
  border-radius: 6px;
  border-style: solid;
  background-color: #8215c5;
  border-color:#8215c5;
  color: #ffffff;
}

</style>

```

E adicionar o componente a Posts:
```js
<template>
  <div>
    <new-post></new-post>
    <single-post></single-post>
  </div>
</template>

<script>
import SinglePost from './SinglePost'
import NewPost from './NewPost'

export default {
  name: 'Posts',

  components: {
    SinglePost,
    NewPost
  }

}
</script>

<style>
.align-self-start {

}
</style>

```

### Adicionando a NavBar

Primeiro, vamos criar o componente `NavBar`, dentro da pasta components, em um arquivo chamado `NavBar.vue`:

```js
<template>
  <b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#"
    class="logo"
  >
      <img
        src="../assets/trash-dove.png"
        width="55"
        height="55"
        alt="BV">
  </b-navbar-brand>

  <b-navbar-brand class="app-name" href="#">
    Tuíto
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
  </b-navbar>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'navbar',

  props: [
    'icon'
  ]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins|Roboto');

.app-name {
  font-family: 'Poppins';
  font-size: 28;
}

.logo {
  background: white;
  border-radius: 12px;
}
.bg-info {
    background-color: #8135b1 !important;
}
</style>


```

Dentro de `App.vue`, vamos adicionar o componente navbar, pois esse componente estará presente em todas as páginas!

```js
<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from './components/NavBar'

export default {
  name: 'App',

  components: {
    NavBar
  },

  computed: mapState([
    'posts'
  ]),

  async beforeMount () {
    const dispatch = this.$store.dispatch
    dispatch('loadPostsList')
    console.log(this.$store.state.posts)
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

### Removendo um post

No arquivo `SinglePost.vue`, precisamos criar um método que chame a action do store para remover um post.
Na div abaixo, dentro deste arquivo, vamos adicionar a o `@click="removePost(post)"`

```html
  <div class="btn-card">
    <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="removePost(post)">Remover</b-button>
  </div>
```

Dentro da tag `<script>` vamos adicionar `mapActions` do vuex e o método:

```js
import { mapGetters, mapActions } from 'vuex'

export default {
// codigo até a computed property

  methods: {
    ...mapActions(['deletePost']),

    removePost (post) {
      this.deletePost(post)
    }
  }

```

### Melhorando o front-end

1. Margem do componente app:
  * remover `  margin-top: 60px;` do `App.vue`

2. Ajustando a posição dos itens dentro do card, no arquivo ``SinglePost.vue``:
  * adicionar css para media, dentro da tag ``<style>``:
      ```css
        .media {
          text-align: left;
        }
      ```
  * adicionar css para botão:
    ````css
      .btn-card {
        margin: 10px;
        display: flex;
        justify-content: flex-end;
      }
    ```

3. Formatando a lista de posts:

* No arquivo `SinglePost.vue` adicionar classe ``class="post-list"`` a div que encapsula a lista de posts, com ``display: grid``:
  ```js
      <template>
        <div class="post-list">
          <div
            v-for="post in postList"
            :key="post._id"
          >
            <b-card class="single-post">
              <b-media>
                <img class="align-self-start" width="64" height="64" src="../assets/trash-dove.png" slot="aside" blank  alt="placeholder" />
                <h5 class="mt-0" v-text="post.user"></h5>
                <p v-text="post.content"></p>
              </b-media>
              <div class="btn-card">
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Remover</b-button>
              </div>
            </b-card>
          </div>
        </div>
      </template>

  ```

  ```css
    .post-list{
      display: grid;
    }

    .single-post {
      margin-left: 60px;
      margin-right: 60px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  ```

# Próximos passos:
- Criar rota para página do usuário
  Aqui, você precisa criar uma página para que o usuário possa acessar seu próprio perfil. Em seguida, ligar com a API existente para pegar os dados dos usuários.
  Dica: A princípio, utilize informações estáticas para criar o componente.

- Tornar o app completamente responsivo

## Outros links interessantes:
Abaixo você encontra alguns links interessantes sobre Vue e alguns recursos adicionais.

### Comparações

* [Comparação entre Vue e outros frameworks](https://vuejs.org/v2/guide/comparison.html)

* [Um artigo bem interessante sobre o processo de escolha entre usar Vue e React](https://medium.com/reverdev/why-we-moved-from-angular-2-to-vue-js-and-why-we-didnt-choose-react-ef807d9f4163)

### Bibliotecas e Ferramentas

* [Uma lib bem legal com vários componentes que podem facilitar a sua vida](https://element.eleme.io/#/en-US/component/installation)

* [Vuex - para guardar e alterar estados em aplicações complexas](https://vuex.vuejs.org/)

* [Para debugar aplicações de um jeito mais simples](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=pt-BR)

* [vue-cli](https://cli.vuejs.org/guide/installation.html)

### Cursos

* [Curso completo sobre Vue.js](https://www.udemy.com/vuejs-2-the-complete-guide/)

* [Bootstrap para Vue]()
### Outros links

* [CSS Tricks](https://css-tricks.com/)
* [httpstatuses](https://httpstatuses.com/)
* [gitignore.io](gitignore.io)
