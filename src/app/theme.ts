import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: { main: '#165b46' },
    background: { default: '#f8faf7', paper: '#ffffff' },
    text: { primary: '#182a25', secondary: '#485b52' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    button: { fontWeight: 650, textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { overflowWrap: 'anywhere' } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44 } },
    },
  },
})
