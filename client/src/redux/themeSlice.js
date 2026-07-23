import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem('frosting-theme') || 'frosting';
document.body.setAttribute('data-theme', storedTheme);

const initialState = {
 theme: storedTheme
}

const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setTheme(state, action) {
      const newTheme = action.payload;
      localStorage.setItem('frosting-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
      // 3️⃣  Update the slice state
      state.theme = newTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;