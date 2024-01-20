import { configureStore } from "@reduxjs/toolkit";
import {eventSlice} from "./redux toolkit/eventSlice";
import {volunteerSlice} from "./redux toolkit/volunteerSlice";

export default configureStore({
    reducer:{
        events: eventSlice.reducer,
        volunteers: volunteerSlice.reducer
    }
})