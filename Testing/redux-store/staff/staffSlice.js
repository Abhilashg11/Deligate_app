import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStaffAPI } from "../../services/apiServices/staff-service";

export const createStaff = createAsyncThunk(
    'staff/createStaff',
    async (payload, thunkAPI) => {
        try {
            const data = await createStaffAPI(payload);
              console.log('🔥 THUNK DATA:', data); 
            return data;
        } catch (err) {
             console.log('❌ THUNK ERROR:', err);
            return thunkAPI.rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
)

const initialState = {
    staffList: [],
    loading: false,
    error: null,
};

const staffSlice = createSlice({
    name: "staff",
    initialState,

    reducers: {
     resetStaffState: (state) => {
        state.loading = false;
        state.error = null;
     }
    },

    extraReducers: (builder) => {
        builder
        .addCase(createStaff.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(createStaff.fulfilled, (state, action) => {
            console.log('✅ REDUCER HIT:', action.payload);
            state.loading = false;
            state.staffList.push(action.payload);
        })

        .addCase(createStaff.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to create staff';
        })
    }
})

export const { resetStaffState } = staffSlice.actions;

export default staffSlice.reducer;