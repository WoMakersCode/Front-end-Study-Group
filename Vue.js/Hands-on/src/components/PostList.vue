<template>
  <div class="post-list">
    <div
      v-for="post in postList"
      :key="post._id"
    >
      <b-card>
        <b-media>
          <img class="mr-3" src="../assets/trash-dove.png" slot="aside" blank blank-color="#ccc" width="64" height="64" alt="placeholder" />
          <h5 class="mt-0" v-text="post.user"></h5>
          <p v-text="post.content"></p>
        </b-media>
        <div class="btn-card">
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Remover</b-button>
        </div>
      </b-card>
    </div>

    <!-- <div
      class="post-box"
      v-for="post in postList"
      :key="post._id"
    >
      <p class="post-box-content" v-text="post.content"></p>

      <div class="post-session">
        <div class="post-box-user">
          <span v-text="post.user"></span>
        </div>
        <el-button
            class="remove-post"
            type="primary"
            @click="removePost(post)"
        >Remover</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'PostList',

  // computed: {
  //   ...mapGetters([] 'getPostsList' ])
  // },
  computed: {
    ...mapGetters([ 'getPostsList' ]),

    postList () {
      let list = this.getPostsList
      return list.reverse()
    }
  },

  methods: {
    ...mapActions(['deletePost']),

    removePost (post) {
      console.log(post)
      this.deletePost(post)
    }
  }
}
</script>
<style>
.card {
  margin-left: 400px;
  margin-right: 400px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.media {
  text-align: left;
}

.btn-card {
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}
/* .post-list {
  /* display: flex;
  flex-direction: column; */
/* } */

/* .post-box {
  flex: flex-grow;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 17px;
  margin-right: 109px;
  margin-left: 109px;
  color: #414141;
  background: #f5e4ff85;
  padding: 9px;
}

.remove-post {
  border-radius: 6px;
  border-style: solid;
  background-color: #8215c5;
  border-color:#8215c5;
  color: #ffffff;
}

.post-session {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.post-box-content {
  word-wrap: break-word;
  text-align: left;
  background-color: #f3dfff;
  border-radius: 6px;
  height: 100px;
  padding: 14px;
}

.post-box-user {
  align-content: flex-start;
} */

</style>
