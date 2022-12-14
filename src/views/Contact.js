import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import u_parisLogo from 'assets/images/u_paris.png'
import ville_example from 'assets/images/ville_example.jpg'
import logo from 'assets/images/logo.jpg'
import React from 'react'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Contact() {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={`center`}>
      <Card sx={{ maxWidth: 700, m: 7 }} className={``}>
        <CardHeader
          avatar={<Avatar src={u_parisLogo}>U</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Universit√© de Paris"
          subheader="Master GENIAL"
        />
        {/* <CardMedia
          component="img"
          height="194"
          image={ville_example}
          alt="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Liste des participants :
            <br />‚ÄĘ Alexandre SABRI
            <br />‚ÄĘ Anes BOUZOUAOUI
            <br />‚ÄĘ Djedjiga AISSAT
            <br />‚ÄĘ Lounis BOULDJA
            <br />‚ÄĘ Madjid BOUDIS Master GENIAL ‚Äď 2022/2023
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Master GENIAL ‚Äď 2022/2023</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
