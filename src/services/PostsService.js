import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
    async getAll(query = {}) {
        const res = await api.get('posts', {params: query})
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
        const res = await api.get('posts?query='+query)
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
    }
}


export const postsService = new PostsService()