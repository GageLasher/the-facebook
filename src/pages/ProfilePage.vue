<template>
<div class="container-fluid">
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-8" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { profilesService} from '../services/ProfilesService'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          AppState.profile = {}
          AppState.posts = {}
          await profilesService.getProfile(route.params.id)
          await postsService.getAll({creatorId: route.params.id})
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
