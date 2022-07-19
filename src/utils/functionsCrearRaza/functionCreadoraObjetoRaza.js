const functionCreadoraObjetoRaza=(datosRaza, temperaments)=>{
    var life_span_Rango=datosRaza.life_spanMin;
    if(datosRaza.life_spanMax!==""){
        life_span_Rango+=" - "+datosRaza.life_spanMax;
    }
    const objetoNewRaza={
        name: datosRaza.name,
        weight: {        
            imperial: `${datosRaza.weightImperialMin} - ${datosRaza.weightImperialMax}`,
            metric: `${datosRaza.weightMetricMin} - ${datosRaza.weightMetricMax}`
        }, 
        height: {
            imperial: `${datosRaza.heightImperialMin} - ${datosRaza.heightImperialMax}`,
            metric: `${datosRaza.heightMetricMin} - ${datosRaza.heightMetricMax}`,
        },
        life_span: datosRaza.life_spanMin==="" && datosRaza.life_spanMax==="" ? "" :
                   `${life_span_Rango} years`,
        temperament: temperaments,
        image:{
            url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
        }
    }
    return objetoNewRaza;
}

module.exports = {functionCreadoraObjetoRaza}