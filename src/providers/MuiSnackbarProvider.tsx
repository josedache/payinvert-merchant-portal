import { SnackbarProvider } from 'notistack';
import { Icon, IconButton } from '@mui/material';
import { notistackRef } from 'constants/refs';

function MuiSnackbarProvider({ children }: MuiSnackbarProviderProps) {
  return (
    <SnackbarProvider
      ref={notistackRef}
      preventDuplicate
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      action={(key) => (
        <IconButton
          onClick={() => {
            notistackRef.current.closeSnackbar(key);
          }}
          color="inherit"
          size="small"
        >
          <Icon>close</Icon>
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}

export default MuiSnackbarProvider;

export type MuiSnackbarProviderProps = { children: any };
