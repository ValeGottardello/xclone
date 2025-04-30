'use client';
import React from "react";
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';



  
export default function LateralRightMenu() {

  return (
    <>
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
                    <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: '#fff', fontSize: '1.2rem' , fontWeight: 'bold', alignSelf: 'start'}}
                            >
                            What’s happening
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '0.8rem 0'}}>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.84rem',
                                }}
                            >
                                Trending in Australia
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold', 
                                }}
                            >
                                #DuaLipa
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.79rem', 
                                }}
                            >
                                70.6K posts
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '0.8rem 0'}}>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.84rem',
                                }}
                            >
                                Trending in Football
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold', 
                                }}
                            >
                                De Ligt
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.79rem', 
                                }}
                            >
                                12K posts
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '0.8rem 0'}}>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.84rem',
                                }}
                            >
                                Sports · Trending
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold', 
                                }}
                            >
                                Messi GOAT
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.79rem', 
                                }}
                            >
                                100K posts
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '0.8rem 0'}}>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.84rem',
                                }}
                            >
                                Trending in Fashion & Beauty
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold', 
                                }}
                            >
                                #BeckyArmstrong
                            </Typography>
                            <Typography 
                                sx={{
                                    color: '#495057',
                                    fontSize: '0.79rem', 
                                }}
                            >
                                20.5K posts
                            </Typography>
                        </Box>
                        {/* <Typography
                            onClick={handleReadMore} 
                            className="read-more-btn"
                            sx={{ fontSize: '0.8rem', color: '#0ea5e9', justifyContent: 'flex-end' }}
                            >
                            {isExpanded ? 'Read less' : 'Read more'}
                        </Typography> */}
                    </MenuItem>
                </MenuList>
            </Paper>
        </Stack>
    </>
  );
}
