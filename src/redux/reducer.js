const initialState={
    razas:[],
    raza:[],
    temperaments:[],
    exitoAndError:[]
}

const rootReducer=(state=initialState, action)=>{
    switch(action.type){
        case "GET_RAZAS":
            return{
                ...state,
                razas: action.payload,
                exitoAndError:[{exito: "Lista de razas obtenidas"}]
            }
        case "GET_RAZA":
            return{
                ...state,
                raza: action.payload,
                exitoAndError:[{exito: "Raza encontrada"}]
            }
        case "GET_TEMPERAMENTOS":
            return{
                ...state,
                temperaments: action.payload,
                exitoAndError:[{exito: "Lista de temperamentos obtenida"}]
            }
        case "POST_RAZA":
            state.razas.push(action.payload);
            return {
                ...state,
                razas: state.razas,
                exitoAndError:[{exito: "Se creo con éxito una nueva raza"}]
            }
        case "ADD_ERROR":
            return {
                ...state,
                exitoAndError: action.payload
            }
        default:
            return state
    }
}

export default rootReducer