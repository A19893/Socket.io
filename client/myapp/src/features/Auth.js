import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth:false,
    userId: null,
    email:""
}

const AuthSlice = createSlice({
    name:"authentication",
    initialState,
    reducers:{
        addAuthentication:(state,action)=>{
            console.log(action)
            state.isAuth = true;
            state.userId = action.payload.id;
            state.email = action.payload.email
        }
    }
})

export const {addAuthentication} = AuthSlice.actions;

export default AuthSlice.reducer;