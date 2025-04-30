// 'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Link from 'next/link';
import { HomeIcon, ProfileIcon, XIcon } from './icons';
import { AuthButtonProps } from '../types/posts';

export default function LateralLeftMenu({ currentUser }: AuthButtonProps) {

  return (
    <Container
    sx={{
      maxWidth: '300px', 
      width: '300px',   
      '& .MuiMenuList-root': {
        width: '100%',   
      },
    }}
  >
    <Stack
      direction="row"
      spacing={2}
      sx={{
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        width: '100%', 
        backgroundColor: 'transparent',
        '& .MuiMenuList-root': {
          backgroundColor: '#000',
        },
        '& .MuiMenuItem-root': {
          color: '#fff',
        },
      }}
    >
      <Paper
        sx={{
          backgroundColor: 'transparent',
          width: '100%', 
          '& .MuiMenuItem-root': {
            color: '#fff',
            gap: '15px',
            padding: '10px',
          },
        }}
      >
        <MenuList>
          <Link href="/">
            <MenuItem>
              <HomeIcon />
              Home
            </MenuItem>
          </Link>
          <Link  href={`/profile?user_id=${currentUser?.id}`}>
            <MenuItem>
              <ProfileIcon />
              Profile
            </MenuItem>
          </Link>
        </MenuList>
      </Paper>
    </Stack>
  </Container>
  );
}
