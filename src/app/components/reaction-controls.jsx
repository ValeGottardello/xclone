import React from "react";
import { CardContent, Container, Link, Typography } from "@mui/joy";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { IconRepeat } from "@tabler/icons-react";


export default function ReactionControls({ likes, comments }) {
    return (
        <>
        <CardContent 
          orientation="horizontal" sx={{ gap: 1, flex: 1, justifyContent: 'flex-end' }}>
          <Container
            disableGutters
            maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0 }}>
            <Link sx={{ width: '1.2rem', color: '#fff' }}>
              <IconRepeat stroke={2}/>
            </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              11
            </Typography>
          </Container>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0 }}>
            <Link sx={{ width: '1.2rem', color: '#fff' }}>
              <IconHeart stroke={2}/>
            </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              {likes.length}
            </Typography>
          </Container>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0}}>
            <Link sx={{ width: '1.2rem', color: '#fff' }}>
              <IconMessageCircle stroke={2}/>
            </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              {comments.length}
            </Typography>
          </Container>

          <Link sx={{ width: '1.2rem', color: '#fff', display: 'none' }}>
            <IconHeartFilled stroke={2}/>
          </Link>

        </CardContent>
        </>
    )
}