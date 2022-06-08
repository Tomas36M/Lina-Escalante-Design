import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppContext } from '../../context/UseContext'
import { Menu, MenuItem } from '@mui/material';
import { Store } from 'react-notifications-component';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({
    id,
    product,
    title,
    img
}) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [expanded, setExpanded] = React.useState(false);

    const [isInside, setIsInside] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { addShoppingCart, user, deleteShoppingCart, deleteProduct, setCar, car } = useAppContext();

    const addCart = () => {
        const productToAdd = { ...product }
        setCar([...car, productToAdd])
        Store.addNotification({
            title: "Product Added Successfully",
            message: `${title} added to the car`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 700,
                onScreen: true,
                showIcon: true
            }
        });
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {user && user.rol === "ADMIN" ? <MenuItem onClick={() => deleteProduct(id)}>Eliminar Producto</MenuItem> : false}
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <CardMedia
                component="img"
                height="300"
                image={img}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                
                <IconButton aria-label="share" onClick={() => {
                    addCart();
                    addShoppingCart(user.id, product)
                }}>
                    <AddShoppingCartIcon color="success" />
                </IconButton>
                {/* <IconButton aria-label="shares" onClick={() => {
                    deleteShoppingCart(user.id, product)
                }}>
                    <RemoveShoppingCartIcon sx={{ color: red[500] }} />
                </IconButton> */}
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

                </CardContent>
            </Collapse>
        </Card>
    );
}
