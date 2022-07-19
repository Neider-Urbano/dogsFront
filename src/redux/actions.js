const utils =require("../utils/utils")

function getRazas(){
    return function(dispatch){
        utils.getOperacionRazas()
        .then(rtaRazas=>{
            return dispatch({
                type: "GET_RAZAS",
                payload: rtaRazas
            })
        })
        .catch(error=>{
            return dispatch({
                type: "ADD_ERROR",
                payload: [{error: error.message}]
            })
        }) 
    }
}

function getRaza(idRaza){
    return function(dispatch){
        utils.getOperacionRaza(idRaza)
        .then(respuestaRaza=>{
            return dispatch({
                type: "GET_RAZA",
                payload: respuestaRaza
            })
        })
        .catch(function (error) {
            return dispatch({
                type: "ADD_ERROR",
                payload: [{error: error.message}]
            })
        });
    }
}

function getRazasName(nameRaza){
        return function(dispatch){
            utils.getOperacionRazasName(nameRaza)
            .then((rtaRazasName)=>{ 
                return dispatch({
                    type: "GET_RAZAS",
                    payload: rtaRazasName
                })
            }).catch(error=>{
                return dispatch({
                    type: "ADD_ERROR",
                    payload: [{error: error.message}]
                })
            }) 
        } 
}

function getTemperamentos(){
    return function(dispatch){
        utils.getOperacionTemperamentos()
        .then(rtaTemps=>{
            return dispatch({
                type: "GET_TEMPERAMENTOS",
                payload: rtaTemps
            })
        })
        .catch(error=>{
            return dispatch({
                type: "ADD_ERROR",
                payload: [{error: error.message}]
            })
        }) 
    }
}

function postRaza(objetoNewRaza){
    return function(dispatch){
        utils.postOperacionRaza(objetoNewRaza)
        .then(rtaObjetoRaza=>{
            return dispatch({
                type: "POST_RAZA",
                payload: rtaObjetoRaza
            })
        })
        .catch(error=>{
            return dispatch({
                type: "ADD_ERROR",
                payload: [{error: error.message}]
            })
        }) 
    }
}

module.exports={
    getRazas:getRazas,
    getRaza:getRaza,
    getRazasName:getRazasName,
    getTemperamentos: getTemperamentos,
    postRaza: postRaza
}
