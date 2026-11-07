import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// const fetchJoke= (category) => {
//             axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
//                 .then((result) => {
//                     console.log(result.data.value)
//                     setJoke(result.data.value)
//                 })
//         }

const fetchjoke = createAsyncThunk("jokes/jokescategory", async (category) => {
    return axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((result) => {
            console.log(result.data.value)
            return result.data.value
        })
})

const initialState = {
    joke: "No Joke"
}

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {
        clearJoke: (state) => {
            state.joke = ""
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchjoke.pending, (state) => {
            state.joke=""
            console.log("Loading...")
        }).addCase(fetchjoke.fulfilled, (state, action) => {
            state.joke = action.payload
        }).addCase(fetchjoke.rejected,(state)=>{
            state.joke=""
        })
    }
})
export default jokeSlice
export const { clearJoke } = jokeSlice.actions

export { fetchjoke }