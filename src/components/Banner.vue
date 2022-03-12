<template>
        <div class="col-12">
             <img :src="banner.banner" alt="" class="">
        </div>
       
    
</template>


<script>
export default {
    props: {
        banner: {
            type: Object,
            required: true
        }
    },
    setup(){
        return {

        }
    }
}
</script>


<style lang="scss" scoped>

</style>