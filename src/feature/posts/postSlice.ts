import { addPost, deletePost, fetchPost, updatePost } from "../../server/api";
import { Items } from "@/types/items";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PostState {
    items: Items[]
    status: "idle" | "loading" | "success" | "failed"
}

const initialState: PostState = {
    items: [],
    status: "idle"
}

export const getItems = createAsyncThunk('/posts/fetchPost', async () => {
    const response = await fetchPost()
    return response
})

export const createItems = createAsyncThunk('/posts/addIPost', async (item: Items) => {
    const response = await addPost(item)
    return response
})

export const modifyItems = createAsyncThunk('/posts/updatePost', async (data: { id: number, item: Items }) => {
    const response = await updatePost(data.id, data.item)
    return response
})

export const removeItems = createAsyncThunk('/posts/deletePost', async (id: number) => {
    await deletePost(id)
    return id
})

const itemSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                state.items = action.payload
            })
            .addCase(createItems.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(modifyItems.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items[index] = action.payload
            })
            .addCase(removeItems.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload)
            })
    }
})

export default itemSlice.reducer