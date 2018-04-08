const rp = require ('request-promise');
const request = require('request'); // "Request" library
const querystring = require('querystring');
const oauthConfig = require('./../config/oauth-config');

const client_id = oauthConfig.client_id; 
const client_secret =oauthConfig.client_secret; 
const redirect_uri = oauthConfig.redirect_uri; 
const stateKey = oauthConfig.stateKey; 
const scope = 'user-read-private user-read-email user-library-read user-read-playback-state user-modify-playback-state user-read-recently-played';

module.exports = (args) => {
    let app = args.app;


    generateRandomString = (length) => {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    app.get('/login', (req, res) => {
      const state = generateRandomString(16);
      res.cookie(stateKey, state);


      
      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        })
      );
    });

    app.get('/callback', (req, res) => {
      let code = req.query.code || null; 
      let state = req.query.state || null; 
      let storedState =  req.cookies ? req.cookies[stateKey]  : null;  

      if (state === null || state !== storedState) {
        res.redirect('/#' +
          querystring.stringify({
          error: 'state_mismatch'
        }));
      } 
      else {
        res.clearCookie(stateKey);
        let options = {
          'method' : 'POST',
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };
   
        rp(options)
          .then((body) => {
            const access_token = body.access_token; 
            const refresh_token = body.refresh_token;
            const options = {
              url: 'https://api.spotify.com/v1/me',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            }

            rp(options)
              .then((body) => {
                console.log(body); 
              })
              .catch((err) => {
                console.log(err); 
              });



            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
            }));
          })
          .error((err) => {
            res.redirect('/#' +
              querystring.stringify({
                error: 'invalid_token'
              }));
          });
      }
    });

    app.get('/refresh_token', (req, res) => {
       
      let refresh_token = req.query.refresh_token;
      let options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
      };

      rp(options)
        .then((body) => {
          let access_token = body.access_token; 
          res.send({'access_token' : access_token});
        })
        .catch(err => {
          console.log(err)
      }); 
    });
}