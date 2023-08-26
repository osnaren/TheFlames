import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "chatapp",
  initialState: {
    user: null,
    roomId: null,
    userName: null,
    currentPage: null,
    showLoading: false,
    loadingText: "",
    showExitPopup: false,
    calibrationData: {},
    dashboardView: "minimalist",
    isDbInitialized: false,
    dbInitError: undefined,
    appVersion: "",
    appReleaseDate: "",
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setAppVersion: (state, action) => {
      state.appVersion = action.payload;
    },
    setAppReleaseDate: (state, action) => {
      state.appReleaseDate = action.payload;
    },
    setLoadingStatus: (state, action) => {
      state.showLoading = action.payload.showLoading;
    },
    setLoadingText: (state, action) => {
      state.loadingText = action.payload.loadingText;
    },
    setExitPopupStatus: (state, action) => {
      state.showExitPopup = action.payload.showPopup;
    },
    updateDashboardView: (state, action) => {
      const viewsArray = ["minimalist", "detailed", "compare"];
      const view = action.payload.view;
      if (viewsArray.indexOf(view) !== -1) state.dashboardView = view;
    },
    setDefaultDashboardView: (state) => {
      if (state.dashboardView !== "minimalist")
        state.dashboardView = "minimalist";
    },
  },
});

export const {
  setRoomId,
  setCurrentPage,
  setUserName,
  setAppVersion,
  setAppReleaseDate,
  setLoadingStatus,
  setLoadingText,
  setExitPopupStatus,
  updateDashboardView,
  setDefaultDashboardView,
} = appSlice.actions;

export const selectUserName = (state) => state.chatapp.userName;
export const selectRoomId = (state) => state.chatapp.roomId;
export const selectCurrentPage = (state) => state.chatapp.currentPage;
export const selectUser = (state) => state.chatapp.user;
export const selectAppVersion = (state) => state.app.appVersion;
export const selectAppReleaseDate = (state) => state.app.appReleaseDate;
export const selectLoadingStatus = (state) => state.app.showLoading;
export const selectLoadingText = (state) => state.app.loadingText;
export const selectExitPopupStatus = (state) => state.app.showExitPopup;
export const selectCalibrationData = (state) => state.app.calibrationData;
export const selectConfigureView = (state) => state.app.configureView;
export const selectDashboardView = (state) => state.app.dashboardView;
export const selectDbStatus = (state) => state.app.isDbInitialized;
export const selectDbInitError = (state) => state.app.dbInitError;
export const selectDeviceConstants = (state) => state.app.deviceConstants;

export default appSlice.reducer;
