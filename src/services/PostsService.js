import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
    async getAll(query = {}) {
        const res = await api.get('api/posts', {params: query})
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
    }
    async changePage(page){
        const res = await api.get(page)
        logger.log(res.data)
        AppState.newer = res.data.newer
        AppState.older = res.data.older
    }
    async search(query = {}) {
        const res = await api.get('api/posts?query='+query)
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
    }
    async create(postData){
        const res = await api.post('api/posts', postData)
        logger.log('post Data', res.data)
        AppState.posts.unshift(res.data)
    }
    async remove(id){
        const res = await api.delete('api/posts/'+id)
        logger.log('Delete post', res.data)
        AppState.posts = AppState.posts.filter(p => p.id != id)
    }
    async like(id){
        const res = await api.post(`api/posts/${id}/like`)
        logger.log(res.data)
        AppState.posts = AppState.posts
    }
}


export const postsService = new PostsService()