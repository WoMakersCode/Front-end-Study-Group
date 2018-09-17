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
