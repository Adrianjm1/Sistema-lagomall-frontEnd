import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';

export const AdminRoutes = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (

        <Route 
            {...rest}
            component={(props) => (

                (isAuthenticated) ? 
                    (<Component {...props} />) :
                    (<Redirect to="/" />)

            )}

        />

    )
}

AdminRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}