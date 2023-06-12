import { GET_PRODUCTS } from '../type/types';


const INITIAL_STATE = {

    loading: false,
    products: []

};

export default function(state = INITIAL_STATE, action){

    const {type, payload} = action;

    switch(type){

        case GET_PRODUCTS:
            return {
                loading: false,
                products: payload
            }
        default:
            return state;
    }

};