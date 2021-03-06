import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

describe( '/api', () => {

    let agent = request.agent( app );

    before( function ( done ) {
        login( agent, () => {
            done();
        } );
    } );

    describe( '/me', () => {

        describe( 'Updating', () => {

            it( 'should update a profile', done => {
                agent
                    .post( '/api/me/' )
                    .send( {
                        name: 'testing-name',
                        about: 'test description 1 2 3 4 5',
                        attack: 'lols'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err ) {
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should add a recipe to favourites', done => {
                agent
                    .put( '/api/me/favourite/recipes/5' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'done' );
                        res.body.done.should.be.true;

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should remove a recipe from favourites', done => {
                agent
                    .delete( '/api/me/favourite/recipes/5' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'done' );
                        res.body.done.should.be.true;

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should update a notification', done => {
                agent
                    .put( '/api/me/notifications/2' )
                    .send( {
                        read: 1
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'id' );

                        res.body.id.should.equal( 2 );
                        res.body.read.should.equal( 1 );

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should delete a notification', done => {
                agent
                    .del( '/api/me/notifications/2' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err ) {
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should add a friend', done => {
                agent
                    .post( '/api/me/friends/3' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err ) {
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should remove a friend', done => {
                agent
                    .del( '/api/me/friends/3' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        console.log('body', res.body );
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should create a status update', done => {
                agent
                    .post( '/api/me/status-updates' )
                    .send( {
                        update: 'this is a status <script>123</script> update;.'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        console.log('body', res.body );
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should update a status update', done => {
                agent
                    .put( '/api/me/status-updates/1' )
                    .send( {
                        update: 'this is a status <script>123</script> updatezz;....'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        console.log('body', res.body );
                        err ? done( err ) : done();
                    } );
            } );

        } );

        describe( 'Getting', () => {

            it( 'should return my recipes', done => {
                agent
                    .get( '/api/me/recipes' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my favourite recipes', done => {
                agent
                    .get( '/api/me/favourite/recipes' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my comments', done => {
                agent
                    .get( '/api/me/comments' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my friends', done => {
                agent
                    .get( '/api/me/friends' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my pending incoming friend requests', done => {
                agent
                    .get( '/api/me/friends/incoming' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my pending outgoing friend requests', done => {
                agent
                    .get( '/api/me/friends/outgoing' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my notifications', done => {
                agent
                    .get( '/api/me/notifications' )
                    .query( {
                        filters: {
                            read: 0
                        }
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my friends recipes', done => {
                agent
                    .get( '/api/me/friends/recipes' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my status updates', done => {
                agent
                    .get( '/api/me/status-updates' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();
                        err ? done( err ) : done();
                    } );
            } );

        } );


    } );
} );

