import {setResponseHeaders} from './utils.js';

export const GetMethodOnlyAndNoPayload = (request, response, next) => {
    const contentType = request.headers['content-type'];
    if (request.method !== 'GET') {
        setResponseHeaders(response); 
        return response.status(405).send();
    } 
    if (contentType === 'application/json') {
        try {
            request.body = JSON.parse(request.body);
        } catch (error) {
          setResponseHeaders(response);
          return response.status(400).send();
        }
      } else if(contentType && contentType!=='application/json') {
        setResponseHeaders(response);
        return response.status(400).send();
      }
    if(Object.keys(request.body).length > 0 || Object.keys(request.query).length > 0){
        setResponseHeaders(response);
        return response.status(400).send();
    }
    next();
};
