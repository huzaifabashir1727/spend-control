import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let Slice = createSlice({
    name: "spend",
    initialState,
    reducers:{
        addMoney:(state,action) =>
        {
            state.push(action.payload);
            localStorage.setItem("spendDetail",JSON.stringify(state));
        },
        deductMoney:(state,action) =>
        {
            state.push(action.payload);
            localStorage.setItem("spendDetail",JSON.stringify(state));
        },
        clear: state => {state.splice(0,state.length);}
    }
})

export let {addMoney,deductMoney,clear} = Slice.actions;
export default Slice.reducer;