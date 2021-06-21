import React from 'react'
import {Grid, Typography} from '@material-ui/core'

export default function NotFoundPage() {
    return (
        <div>
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item xs={12}>
                    <Typography variant="h1">
                        404! :-(
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        This page or resource was not found!
                    </Typography>
                </Grid>
                
            </Grid>
        </div>
    )
}
