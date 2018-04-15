/*
 *  The request for this project.
 *  
 *  The style guide: 
 *    https://powerformer.github.io/#/style-guide/javascript/javascript
 */

// query-string for parse and stringify url query strings
import queryString from 'query-string';

// create a object for export all the request method
const request = {};


// handle all the fetch method Header options
const header = ( METHOD, token, multiform ) => {
  // The object for whether add Authorization key 
  let auth = {};
  // The object for whether add Content-Type & Accept key
  let contentType = {};

  // judge whether add Authorization key 
  if ( token !== undefined ) {
    auth = {
      'Authorization': 'Token ' + token,
    };
  }

  // judge whether add Content-Type & Accept key
  if ( multiform === undefined ) {
    contentType = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // return all the options the fetch header needed
  return ({
    method: METHOD,
    headers: {
      ...auth,
      ...contentType,
    },
  });
};

// add HTTP GET method for this object
request.get = ( url, params, token ) => {

  // !! transform params's type to boolean for condition judge
  if ( !!params ) {
    url += '?' + queryString.stringify( params );
  }

  // compute all need options for fetch method
  const options = header( 'GET', token );


  // return GET Http request result
  return (
    fetch( url, options )
    .then( response => {
      // judge whether this reponse is good or bad.
      if ( response.status >= 400 || !response.ok )  {
        throw response.json();
      }

      return response.json();
    })
  )
};

// add HTTP post for this request
request.post = (url, body) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  };


  return fetch(url, options)
  .then(res => {
    if (res.status !== 200 || !res.ok) {
      throw res.json();
    }

    return res.json();
  });
};


// export the default request object
export default request;
