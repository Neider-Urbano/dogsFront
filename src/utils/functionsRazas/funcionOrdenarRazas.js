const functionOrdenarRazas=(razasRedux,opcion, setRazasRedux)=>{
    if(razasRedux[1]){
        switch(opcion){
          case "ordenAZ":
            var ordenAZ=[...razasRedux].sort((a, b) => {return  a.name.localeCompare(b.name)});
            setRazasRedux(ordenAZ)
          break;
          case "ordenZA":
            var ordenZA=[...razasRedux].sort((a, b) => {return  a.name.localeCompare(b.name)});
            ordenZA=[...ordenZA].reverse((a, b) => {return  a.name.localeCompare(b.name)});
            setRazasRedux(ordenZA)
          break; 
          case "ordenPesoMaxMinMetric":
            let ordenMaxMinMetric=[...razasRedux].sort((a,b)=>{
              return a.promedioWeiMetric.localeCompare(b.promedioWeiMetric)
            })
            ordenMaxMinMetric=[...ordenMaxMinMetric].reverse((a,b)=>{
              return a.promedioWeiMetric.localeCompare(b.promedioWeiMetric)
            })
            setRazasRedux(ordenMaxMinMetric)
          break;
          case "ordenPesoMinMaxMetric":
            var ordenMinMaxMetric=[...razasRedux].sort((a,b)=>{
              return a.promedioWeiMetric.localeCompare(b.promedioWeiMetric)
            })
            setRazasRedux(ordenMinMaxMetric)
          break;
          case "ordenPesoMaxMinImperial":
            var ordenMinMaxImperial=[...razasRedux].sort((a,b)=>{
              return a.promedioWeiImperial.localeCompare(b.promedioWeiImperial)
            })
            ordenMinMaxImperial=[...ordenMinMaxImperial].reverse((a,b)=>{
              return a.promedioWeiImperial.localeCompare(b.promedioWeiImperial)
            })
            setRazasRedux(ordenMinMaxImperial)
          break;
          case "ordenPesoMinMaxImperial":
            var ordenMinMaxImperial=[...razasRedux].sort((a,b)=>{
              return a.promedioWeiImperial.localeCompare(b.promedioWeiImperial)
            })
            setRazasRedux(ordenMinMaxImperial)
          break;
          default:
          break;
    }
  }
}

module.exports = {functionOrdenarRazas}