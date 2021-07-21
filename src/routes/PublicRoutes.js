import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';

export const PublicRoutes = ({
    isAuthenticated,
    master,
    component: Component,
    ...rest
}) => {
    return (

        master ?

            <Route
                {...rest}
                component={(props) => (

                    (!isAuthenticated) ?
                        (<Component {...props} />) :
                        (<Redirect to="/master" />)
                )}

            />

            :

            <Route
                {...rest}
                component={(props) => (

                    (!isAuthenticated) ?
                        (<Component {...props} />) :
                        (<Redirect to="/admin" />)
                )}

            />

    )
}

PublicRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    master: PropTypes.bool.isRequired
}
