// 'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { AuthButtonServer } from './auth-button-server';

export default function LateralMenu() {
  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef<HTMLButtonElement>(null);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event: Event | React.SyntheticEvent) => {
  //   if (
  //     anchorRef.current &&
  //     anchorRef.current.contains(event.target as HTMLElement)
  //   ) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event: React.KeyboardEvent) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === 'Escape') {
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current!.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  return (
    <Container>
       <Stack direction="row" spacing={2} sx={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          backgroundColor: 'transparent',
          '& .MuiMenuList-root': {
              backgroundColor: '#000',
              width: '300px', 
          },
          '& .MuiMenuItem-root': {
            color: '#fff'
          },
        }}>
        <Paper
          sx={{
              backgroundColor: 'transparent',
              width: '300px',
              '& .MuiMenuItem-root': {
              color: '#fff'
              },
          }}
          >
              <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                  <AuthButtonServer />

              </MenuList>
          </Paper>
      </Stack>
    </Container>
   
  );
}
