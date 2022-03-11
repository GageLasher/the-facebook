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
        <h2>{{profile.class}} </h2>
        <h1>{{ profile.name }}</h1>
      
        <a v-if="profile.github != ''" :href="profile.github"><i class="mdi mdi-github"></i></a>
        <a  v-if="profile.linkedin != ''" :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a>
        <i v-if="profile.graduated" class="mdi mdi-certificate"></i>
        
      </div>
    </div>
    

   <div class="p-3">
    <p>{{profile.bio}} </p>
    </div>

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
      account: computed(() => AppState.account),
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

<style scoped>
.img {
  max-width: 100px;
}
a {
  color: black;
  text-decoration: none;
}
</style>
