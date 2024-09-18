import axios from "axios";


const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/"
})

export const fetchPost = async () => {
    const response = await api.get('/posts')
    return response.data
}

export const addPost = async (item: any) => {
    const response = await api.post('/posts', item)
    return response.data
}

export const updatePost = async (id: number, item: any) => {
    const response = await api.put(`/posts/${id}`, item)
    return response.data
}

export const deletePost = async (id: number) => {
    await api.delete(`/posts/${id}`)
}
