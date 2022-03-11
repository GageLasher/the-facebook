<template>
     <form class="col-6" @submit.prevent="search">
    <div class="input-group m-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search Posts.."
        aria-label="Search Posts.."
        v-model="query"
      />
      <button class="btn btn-success" type="submit">
        <i class="mdi mdi-magnify"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
export default {
    setup(){
        const query = ref('')
        return {
            query,
            search() {
                logger.log(query.value)
                postsService.search(query.value)
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>