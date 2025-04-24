'use client'
import React from "react";
import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '168px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        display: 'flex',
        alignItems: 'center',
        height: '2.9rem',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));
        
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: '#fff',
        width: '100%',
        '& .MuiInputBase-input': {
            color: '#fff',
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
            },
        },
    }));
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}