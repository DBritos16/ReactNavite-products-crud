//crear la store de nuestro proyec 

import { createStore, applyMiddleware } from 'redux' 

//La herramienta redux devtools nos permite poder ver los estados en el navegador

//asi que lo agregamos como extesion en nuestro navegador y descargamos el paquete
//y lo mandamos a llamar 
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

const initialState = {  }

import Reducers from '../reducers';

const store = createStore(
    Reducers,
    initialState, 
    
    //Redux Thunk ha sido instalado e incluido en el proyecto
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;