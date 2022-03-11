<template>
    <form
    @submit.prevent="editProfile"
    class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Bio</label>
      <input
        v-model="editable.bio"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Cover Image</label>
      <input
        v-model="editable.coverImg"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Github</label>
      <input
        v-model="editable.github"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">LinkedIn</label>
      <input
        v-model="editable.linkedin"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Profile Photo</label>
      <input
        v-model="editable.picture"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Name</label>
      <input
        v-model="editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>


    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">sumbit</button>
    </div>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
    setup(){
        const editable = ref({})
        watchEffect(() => {
            editable.value = AppState.account
        })
        return {
            editable,
            async editProfile() {
                try {
                    await accountService.update(editable.value)
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