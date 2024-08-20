import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categeoryList: [],
  loading: "loading",
  error: null,
};

export const getCategeoryInfoById = async (categeoryId) => {
  try {
    const getCategeoryData = await axios.get(
      `http://localhost:4100/categeory/${categeoryId}`
    );
    if (getCategeoryData.status == 200) return getCategeoryData.data;
  } catch (error) {
    return new Error(error.message);
  }
};

export const fetchInitialData = createAsyncThunk(
  "cnapp_dashboard/fetchInitialData",
  async () => {
    const response = await axios.get("http://localhost:4100/categeory");
    return response.data;
  }
);

export const addNewCatageory = createAsyncThunk(
  "cnapp_dashboard/addNewCatageory",
  async (categeoryInfo) => {
    const response = await axios.post("http://localhost:4100/categeory", {
      created_date: new Date(),
      ...categeoryInfo,
      subCategeory: [],
    });
    return response.data;
  }
);

export const addNewWidget = createAsyncThunk(
  "cnapp_dashboard/addNewWidget",
  async (requestInfo) => {
    let { categeoryId, widgetInfo } = requestInfo;
    let newWidget = {
      id: Math.floor(Math.random() * 1000000),
      created_data: new Date(),
      ...widgetInfo,
    };
    try {
      const getCategeoryData = await axios.get(
        `http://localhost:4100/categeory/${categeoryId}`
      );

      if (!getCategeoryData.status == 200)
        return isRejectedWithValue("Unbale to Fetch Data");

      let subCategeory = [...getCategeoryData.data.subCategeory];

      subCategeory.push(newWidget);
      console.log(subCategeory);
      const response = await axios.patch(
        `http://localhost:4100/categeory/${categeoryId}`,
        { subCategeory }
      );
      return {
        categeoryId,
        widgetInfo: newWidget,
      };
    } catch (error) {
      console.log(error);
      return isRejectedWithValue(error.message || "something went wrong");
    }
  }
);

export const removeWidget = createAsyncThunk(
  "cnapp_dashboard/removeWidget",
  async (requestInfo) => {
    const { categeoryId, widgetList } = requestInfo;
    console.log(requestInfo);
    try {
      const categeory = await getCategeoryInfoById(categeoryId);
      console.log(categeory);
      let subCategeory = [...categeory.subCategeory];
      let updateSubCategeory = subCategeory.filter(
        (widget) => !widgetList.includes(widget.id)
      );
      console.log(updateSubCategeory);
      await axios.patch(`http://localhost:4100/categeory/${categeoryId}`, {
        subCategeory: updateSubCategeory,
      });
      return {
        categeoryId,
        widgetList,
      };
    } catch (error) {
      console.log(error);
      return isRejectedWithValue(error.message || "something went wrong");
    }
  }
);

export const removeCategeoryAction = createAsyncThunk(
  "cnapp_dashboard/removeCategeoryAction",
  async (categeoryId) => {
    axios.delete(`http://localhost:4100/categeory/${categeoryId}`);
  }
);

const dashboardSlice = createSlice({
  name: "cnapp_dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewCatageory.pending, (state) => {
        state.categeoryList.push({
          queryState: "pending",
        });
        console.log("pending");
      })
      .addCase(addNewCatageory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.categeoryList[state.categeoryList.length - 1] = {
          ...action.payload,
          queryState: "ok",
        };
      })
      .addCase(addNewCatageory.rejected, (state) => {
        state.categeoryList.pop();
        console.log("rejected");
      })
      //loading data to component
      .addCase(fetchInitialData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.categeoryList = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      //creating a new widget
      .addCase(addNewWidget.pending, (state, action) => {
        let categeoryId = action?.meta.arg.categeoryId;
        let categeoryIndex = state.categeoryList.findIndex(
          (value) => value.id == categeoryId
        );
        state.categeoryList[categeoryIndex]?.subCategeory.push({
          queryState: "pending",
        });
      })
      .addCase(addNewWidget.fulfilled, (state, action) => {
        let categeoryId = action?.meta.arg.categeoryId;
        let categeoryIndex = state.categeoryList.findIndex(
          (value) => value.id == categeoryId
        );
        let length = state.categeoryList[categeoryIndex]?.subCategeory.length;
        state.categeoryList[categeoryIndex].subCategeory[length - 1] = {
          queryState: "ok",
          ...action.payload.widgetInfo,
        };
      })
      .addCase(addNewWidget.rejected, (state, action) => {
        let categeoryId = action?.meta.arg.categeoryId;
        let categeoryIndex = state.categeoryList.findIndex(
          (value) => value.id == categeoryId
        );
        state.categeoryList[categeoryIndex]?.subCategeory.pop();
      }) //remove widget form categeory
      .addCase(removeWidget.fulfilled, (state, action) => {
        let categeoryId = action.payload.categeoryId;
        let widgetList = action.payload.widgetList;
        let categeoryIndex = state.categeoryList.findIndex(
          (value) => value.id == categeoryId
        );
        state.categeoryList[categeoryIndex].subCategeory = state.categeoryList[
          categeoryIndex
        ].subCategeory.filter((widget) => !widgetList.includes(widget.id));
      }) //remove categeory from categeoryList
      .addCase(removeCategeoryAction.fulfilled, (state, action) => {
        const categeoryId = action?.meta.arg;
        console.log(action);

        state.categeoryList = state.categeoryList.filter(
          (categeory) => !(categeory.id == categeoryId)
        );
      });
  },
});

export default dashboardSlice.reducer;
