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
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="removePost(post)">Remover</b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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

  methods: {
    ...mapActions(['deletePost']),

    removePost (post) {
      this.deletePost(post)
    }
  }
}
</script>

<style>
.btn-card {
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}

.media {
  text-align: left;
}

.post-list{
  display: grid;
}

.single-post {
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

