import axios from "axios";

async function getUserAuth(url, TOKEN){
    try{
        return await axios.get(url, {headers: {"x-access-token" : TOKEN}});
    } catch(error) {
        return error
    }
    // const response = await (await fetch(url)).json();
    // return response;
}

async function getData(url){
    try{
        return await axios.get(url);
    } catch(error) {
        throw new Error(error)
    }
    // const response = await (await fetch(url)).json();
    // return response;
}

async function postData(url){
    try{
        return await axios.post(url);
    } catch(error) {
        throw new Error(error)
    }
    // const response = await (await fetch(url)).json();
    // return response;
}

async function register(data) {
    try {
        return await axios.post("/user/register", data);
    } catch (error) {
        throw new Error(error);
    }
}

async function login(data) {
    try {
        return await axios.post("/user/login", data);
    } catch (error) {
        throw new Error(error);
    }
}

export {getUserAuth, getData, postData, register, login};