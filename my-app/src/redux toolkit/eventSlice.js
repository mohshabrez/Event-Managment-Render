import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/Constants"

const initialState = {
    events: [],
    status: "idle",
    error: null
}

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => { 
  const response = await axios.get(`${BASE_URL}/events`)
    return response.data.events
})

export const addEventAsync = createAsyncThunk(
    "events/addEventAsync",
    async (newEvent) => {
      
      const response = await axios.post(`${BASE_URL}/events`, newEvent);
      return response.data.event;
    }
  );
  
  export const updateEventAsync = createAsyncThunk(
    "events/updateEventAsync",
    async ({ id, updatedEvent }) => {
      const response = await axios.post(`${BASE_URL}/events/${id}`, updatedEvent);
      return response.data.event;
    }
  );
  
  export const deleteEventAsync = createAsyncThunk(
    "events/deleteEventAsync",
    async (id) => {
      const response = await axios.delete(`${BASE_URL}/events/${id}`);
      return response.data.event;
    }
  );

  export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending,  (state) => {
            state.status = "loading"
        }).addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = "success";
            state.events = action.payload;
            state.error = ""
        }).addCase(fetchEvents.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(addEventAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(addEventAsync.fulfilled, (state, action) => {
            state.status = "success";
            state.events.push(action.payload);
            state.error = "";
        }).addCase(addEventAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }).addCase(updateEventAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(updateEventAsync.fulfilled, (state, action) => {
            state.status = "success";
            const updatedEvent = action.payload;
            const index = state?.events?.findIndex((s) => s?._id === updatedEvent?._id)

            if(index !== -1){
                state.events[index] = updatedEvent
            }
        }).addCase(updateEventAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }).addCase(deleteEventAsync.pending, (state) => {
            state.status = "loading";
          }).addCase(deleteEventAsync.fulfilled, (state, action) => {
            state.status = "success";
            const deletedEvent = action.payload;
            state.events = state?.events?.filter(
              (event) => event?._id !== deletedEvent?._id
            );
          }).addCase(deleteEventAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addDefaultCase((state, action) => {})
    }
  })

  export default eventSlice.reducer;