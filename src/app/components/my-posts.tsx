'use client'
import React from "react";
import { CustomTabPanelProps, Post } from "../types/posts";
import { Box, Card, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { PostLists } from "./post-lists";
import { User } from "@supabase/supabase-js";

export default function UserPostsComponent({ user, posts }: {  user: User | undefined, posts: Post[]}) {
    const [ value, setValue ] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const myPosts = posts.filter((post : Post) => post.user_id === user?.id);

    return (
        <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Posts" {...a11yProps(0)} />
                    {/* <Tab label="Replies" {...a11yProps(1)} /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <PostLists 
                posts={myPosts}
                user={user} 
                />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
                <Card
                sx={{
                backgroundColor: 'transparent', 
                border: 'transparent',
                boxShadow: 'none',
                display: 'flex',
                '&:hover': {
                    backgroundColor: '#919fb61b', 
                },
                transition: 'all 0.2s ease-in-out', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px', 
                cursor: 'pointer',
                width: '100%', 
                }}
                >
                    <h1>tets</h1>
                </Card>
            </CustomTabPanel> */}
        </Box>
    )
}

function CustomTabPanel(props: CustomTabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        style={{ padding: '0' }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  