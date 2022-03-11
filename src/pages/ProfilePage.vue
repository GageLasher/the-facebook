<template>
<div class="container-fluid p-0">
  <div class="bg-primary">
  <div class="row">
    <div class="col-12">
      <img :src="profile.coverImg" class="img-fluid" alt="">
    </div>
  </div>
    <div class="row text-center justify-content-center">
      <div class="col-3">
        <img class="rounded img-fluid" :src="profile.picture" alt="" />
      </div>
      <div class="col-9">
        <h1>{{ profile.name }}</h1>
      
        <i class="mdi mdi-github"></i>
        <i class="mdi mdi-linkedin"></i>
        <i class="mdi mdi-certificate"></i>
        
      </div>
    </div>
    

   <div class="p-3">
    <p>{{ profile.email }}</p>
    <p>{{profile.bio}} </p>
    <p>{{profile.github || profile.linkedin }} </p>
    </div>

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
.img {
  max-width: 100px;
}
</style>
