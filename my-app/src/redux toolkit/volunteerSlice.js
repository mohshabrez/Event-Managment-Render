import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const initialState = {
    volunteers: [],
    status: "idle",
    error: null
  };

export const fetchVolunteers = createAsyncThunk(
    "volunteers/fetchVolunteers", async () => {
        const response = await axios.get(`${BASE_URL}/volunteers`)
        return response.data.volunteers
    }
)

export const addVolunteerAsync = createAsyncThunk(
    "volunteers/addVolunteerAsync",
    async (newVolunteer) => {
      const response = await axios.post(`${BASE_URL}/volunteers`, newVolunteer);
      return response.data.volunteer;
    }
  );
  
  export const updateVolunteerAsync = createAsyncThunk(
    "volunteers/updateVolunteerAsync",
    async ({ id, updatedVolunteer }) => {
      const response = await axios.post(
        `${BASE_URL}/volunteers/${id}`,
        updatedVolunteer
      );
      return response.data.volunteer;
    }
  );
  
  export const deleteVolunteerAsync = createAsyncThunk(
    "volunteers/deleteVolunteerAsync",
    async (id) => {
      const response = await axios.delete(`${BASE_URL}/volunteers/${id}`);
      return response.data.volunteer;
    }
  );

  export const volunteerSlice = createSlice({
    name: "volunteers",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchVolunteers.pending,  (state) => {
            state.status = "loading"
        }).addCase(fetchVolunteers.fulfilled, (state, action) => {
            state.status = "success";
            state.volunteers = action.payload;
            state.error = ""
        }).addCase(fetchVolunteers.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(addVolunteerAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(addVolunteerAsync.fulfilled, (state, action) => {
            state.status = "success";
            state.volunteers.push(action.payload);
            state.error = "";
        }).addCase(addVolunteerAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }).addCase(updateVolunteerAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(updateVolunteerAsync.fulfilled, (state, action) => {
            state.status = "success";
            const updatedVolunteer = action.payload;
            const index = state?.volunteers?.findIndex((s) => s?._id === updatedVolunteer?._id)

            if(index !== -1){
                state.volunteers[index] = updatedVolunteer
            }
        }).addCase(updateVolunteerAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }).addCase(deleteVolunteerAsync.pending, (state) => {
            state.status = "loading";
          }).addCase(deleteVolunteerAsync.fulfilled, (state, action) => {
            state.status = "success";
            const deletedVolunteer = action.payload;
            state.volunteers = state?.volunteers?.filter(
              (volunteer) => volunteer?._id !== deletedVolunteer?._id
            );
          }).addCase(deleteVolunteerAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addDefaultCase((state, action) => {})
    }
  })

  export default volunteerSlice.reducer;