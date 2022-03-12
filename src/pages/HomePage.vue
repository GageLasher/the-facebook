<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <SearchForm />
    </div>
    <button
          @click="changePage(older)"
          class="btn btn-outline-danger me-2"
          :class="{disabled: !older}"
          :disabled="!older"
        >
          Older Posts
        </button>
        <button
          v-if="newer"
          @click="changePage(newer)"
          class="btn btn-outline-danger"

        >
          Newer Posts
        </button>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-6 m-3" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState';
export default {
  name: 'Home',
  setup(){
    onMounted(async () => {
      try {
        AppState.posts = {}
          await postsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      posts: computed(()=> AppState.posts),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      async changePage(page) {
        try {
          await postsService.changePage(page)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
