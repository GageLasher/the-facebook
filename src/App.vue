<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">

<div class="row justify-content-center">
       
 <div class="col-12 m-2" v-for="b in banners" :key="b.title">
      
      <Banner :banner="b" />
    </div>
  </div>

 
    
   
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Gage Lasher
    </div>
  </footer>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from './AppState'
import { logger } from './utils/Logger'
import Pop from './utils/Pop'
import {bannersService} from '../src/services/bannersService'
import { postsService } from './services/PostsService'
export default {
  name: 'App',
  setup() {
    onMounted(async () => {
      try {
        await bannersService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    
    return {
      appState: computed(() => AppState),
      banners: computed(() => AppState.banners),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
