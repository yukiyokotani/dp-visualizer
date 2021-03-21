import themeSlice from '../themeSlice';

const theme = themeSlice.reducer;
const { toggleTheme } = themeSlice.actions;

describe('counter reducer', () => {
  it('Should handle initial state', () => {
    const dummyAction = { type: 'dummy_action' };
    expect(theme(undefined, dummyAction)).toEqual({ isDarkTheme: false });
  });

  it('Should handle toggle Theme dark', () => {
    expect(theme({ isDarkTheme: false }, toggleTheme)).toEqual({
      isDarkTheme: true,
    });
  });

  it('Should handle toggle Theme light', () => {
    expect(theme({ isDarkTheme: true }, toggleTheme)).toEqual({
      isDarkTheme: false,
    });
  });
});
