import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

  

export default function SearchResultCard(props) {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar  sx={{ width: 32, height: 32 }} >
                        {props.info.name}
                    </Avatar>
                }
                title={props.info.name}
                subheader={props.info.address}
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
        </Card>

    )
}