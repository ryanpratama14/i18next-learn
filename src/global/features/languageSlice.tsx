import { createSlice } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

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
