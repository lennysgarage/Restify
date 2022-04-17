import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link as RouterLink } from 'react-router-dom'

export default function SearchResultCard(props) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={RouterLink} to={"/restaurant/" + props.info.id}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ width: 64, height: 64 }} >
                            {props.info.name}
                        </Avatar>
                    }
                    title={props.info.name}
                    subheader={`
                        Address: ${props.info.address}
                        Phone Number: ${props.info.phone_number.slice(0,3)+"-"+props.info.phone_number.slice(3,6)+"-"+props.info.phone_number.slice(6)}`}
                />
                {props.info.logo &&
                    <CardMedia
                        component="img"
                        alt="Restaurant Logo"
                        height="256"
                        image={props.info.logo}
                    />}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.info.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}