<template>
   <div class="row">
       <div class="col-2 selectable" @click="goTo('Profile')" >
           <img :src="post.creator.picture" class="img-fluid" alt="">
            </div>
       <div class="col-10"> <h2> {{post.creator.name}} 
           
       </h2>
        <p>{{new Date(post.createdAt).toLocaleString().split(',')[0]}} </p>
         
        
        
          <i class="mdi mdi-delete selectable" title="delete post"   v-if="account.id == post.creatorId"
          @click="remove"></i>
        
        </div>
   </div>
   <div class="row">
       <div class="col-12">
           <img :src="post.imgUrl" class="img-fluid" alt="">
       </div>
   </div>
   <div class="row">
       <div class="col-12">
           {{post.body}}
       </div>
   </div>
   <div class="row justify-content-end">
       <div class="col-12">
          <i           :class="{disabled: !account.id}"
          :disabled="!account.id"
 class="mdi mdi-thumb-up selectable" title="like/unlike post" @click="like"></i> {{post.likes.length}} 
       </div>
   </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    setup(props){
        const router = useRouter()
        return {
            account: computed(() => AppState.account),
            async like(){
                try {
                    await postsService.like(props.post.id)
                } catch (error) {
                     logger.log(error)
                   Pop.toast(error.message, "error")
                }
            },
            goTo(page) {
                router.push({
                    name: page,
                    params: { id: props.post.creatorId}
                })
            },
           async remove(){
               try {
                   if(await Pop.confirm('Do you want to delete this post?')){
                       await postsService.remove(props.post.id)
                       Pop.toast("deleted post", "success")
                   }
                   
               } catch (error) {
                   logger.log(error)
                   Pop.toast(error.message, "error")
               }
           }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>