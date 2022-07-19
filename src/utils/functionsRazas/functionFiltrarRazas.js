const functionFiltrarRazas=(valueSelect, valueFiltro,razas,setRazasRedux,setClickBuscarNameRaza )=>{
if(valueFiltro==="filtrarTemperamentos"){
    var existeDogsTemp=razas.filter((raza)=>{
      if(raza.temperament){
        var b=raza.temperament.split(",")
        for (let i = 0; i < b.length; i++) {
          if(b[i].trim().includes(valueSelect)) return raza;           
    }}})
    
    if(existeDogsTemp[0]){
      setRazasRedux(existeDogsTemp)
      setClickBuscarNameRaza("filtrar")
  }}else if(valueFiltro==="filtrarRazas"){
    var existeDogsRaza=razas.filter((r)=>{
      if(r.name===valueSelect) return r
    })
    if(existeDogsRaza[0]){
      setRazasRedux(existeDogsRaza)
      setClickBuscarNameRaza("filtrar")
    }
  }else if(valueFiltro==="Ninguno"){
    setClickBuscarNameRaza(null)
  }
}

module.exports = {functionFiltrarRazas}