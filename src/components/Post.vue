<template>
   <div class="row">
       <div class="col-2 selectable" @click="goTo('Profile')" >
           <img :src="post.creator.picture" class="img-fluid" alt="">
            </div>
       <div class="col-10">{{post.creator.name}} </div>
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
          <i class="mdi mdi-thumb-up"></i> {{post.likes.length}} 
       </div>
   </div>
</template>


<script>
import { useRouter } from 'vue-router'
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
            goTo(page) {
                router.push({
                    name: page,
                    params: { id: props.post.creatorId}
                })
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>