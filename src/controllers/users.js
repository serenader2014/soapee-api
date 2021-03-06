import UserFriends from 'services/data/userFriends';
import UserStatusUpdates from 'services/data/userStatusUpdates';
import UserProfile from 'services/data/userProfile';
import UserPublicRecipes from 'services/data/userPublicRecipes';

import serviceResponder from 'utils/serviceResponder';


export function get( req, res, next ) {
    serviceResponder( res, next, UserProfile, {
        userId: req.params.id
    } );
}

export function getUserRecipes( req, res, next ) {
    serviceResponder( res, next, UserPublicRecipes, {
        userId: req.params.id
    } );
}

export function getUserFriends( req, res, next ) {
    serviceResponder( res, next, UserFriends, {
        userId: req.params.id
    } );
}

export function getUserStatusUpdates( req, res, next ) {
    serviceResponder( res, next, UserStatusUpdates, {
        userId: req.params.id
    } );
}