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

export default function About() {
  const [expanded, setExpanded] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={`center`}>
      <Card sx={{ maxWidth: 700, m: 7 }} className={``}>
        <CardHeader
          avatar={<Avatar src={logo}>U</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Green City"
          subheader="Septembre 2022"
        />
        <CardMedia
          component="img"
          height="194"
          image={ville_example}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            GREEN-CITY est une application qui mets à disposition des chercheurs
            en matéologie un outil pour simuler l’apport des arbres dans le
            rafraîchissement des températures des villes.
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
            <Typography paragraph>
              L’idée de cette application est née du fait qu’un tel outils
              n’existe pas. Elle n’a pas pour vocation de trouver le modèle
              mathématique faisant la corrélation arbres-température, mais
              plutôt permettre aux météorologues d’appliquer leurs propres
              modèles sur des données d’arbres et de températures.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
