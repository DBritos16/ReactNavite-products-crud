import { GET_PRODUCTS } from '../type/types';

const URL = 'http://192.168.216.125:3000';


export const getProducts = () => (async (dispatch) =>{

    const req = await fetch(URL+'/product');

    const res = await req.json();

    dispatch({
        type: GET_PRODUCTS,
        payload: res
    })
    


})