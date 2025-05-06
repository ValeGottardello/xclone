'use client'
import React from "react";
import { CustomTabPanelProps, PostWithDetails, PostComponentProps } from "../types/posts";
import { Box, Card, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { PostLists } from "./post-lists";
import { User } from "@supabase/supabase-js";
import { ComposePost } from "./compose-post";

export default function UserPostsComponent({ currentUser, posts } : PostComponentProps) {
    const [ value, setValue ] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            // padding: '0 1rem',
            }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Posts" {...a11yProps(0)} />
                    {/* <Tab label="Replies" {...a11yProps(1)} /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {currentUser?.id === posts[0].public_user.id && (
                <ComposePost avatarURL={currentUser?.user_metadata?.avatar_url} />
                )}
                <PostLists 
                posts={posts}
                currentUser={currentUser} 
                />
            </CustomTabPanel>
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
  