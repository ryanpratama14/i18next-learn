import { createSlice } from "@reduxjs/toolkit";

type LanguageState = {
  lang: string;
};

const initialState: LanguageState = {
  lang: "en",
};

export const languageSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload.value;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
