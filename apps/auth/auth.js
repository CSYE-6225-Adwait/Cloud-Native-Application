import {User} from "../models/user-model.js";
import bcryptjs from 'bcryptjs';
import { setResponseHeaders } from "../utils.js";
export const auth = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        setResponseHeaders(response); 
        return response.status(401).send(); 
    }
    if(!authHeader.split(' ')[0] === 'Basic'){
        setResponseHeaders(response); 
        return response.status(401).send();
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    const userFound = await User.findOne({ 
        where: { username: username } 
    });

    if(!userFound){
        setResponseHeaders(response); 
        return response.status(401).send({message : 'Invalid username or password'});
    }
    const checkPassword = bcryptjs.compareSync(password, userFound.password);
    if(!checkPassword){
        setResponseHeaders(response); 
        return response.status(401).send({message : 'Invalid username or password'});
    }
    next();
}

//"xyz abc" xyz:abc  Basic lrnwerewr;kewrkwerw
