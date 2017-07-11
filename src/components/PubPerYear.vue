<template lang="pug">
.someDiv(:id="'graph' + algorithmname")
</template>

<script>
const Plotly = require('plotly.js/dist/plotly.js');
var plotlyData=[];
export default {
  props:["algorithmname"],
  mounted(){
    plotlyData=[];
    axios.get('https://metaheuristicsapi.herokuapp.com/papers/papersPerYear')
      .then((response)=>{
        //console.log(response)
        var x=[], y=[], sizes=[], bestAl=[];
        response.data.forEach(v => {
          if(this.algorithmname == ""){
            x.push(v._id.year);
            y.push(v.papers);
            sizes.push(6+Math.log2(parseInt(v.papers)));
            bestAl.push(v.algorithms[0].algorithmname + " " + Math.floor(v.algorithms[0].countReferences/parseInt(v.papers)*100) + "%");
          }else{
            v.algorithms.forEach( a => {
              if(a.algorithmname == this.algorithmname){
                x.push(v._id.year);
                y.push(a.countReferences);
                sizes.push(6+Math.log2(parseInt(a.countReferences)));
                bestAl.push(a.algorithmname + " " + Math.floor(a.countReferences/parseInt(v.papers)*100) + "%");
              }
            });
          }
        });
        plotlyData.push({
          x,y, type: 'scatter',
          mode: 'markers',
          hoverinfo: 'text',
          text: bestAl,
          marker: {
            color: 'rgba(129,207,224,1)',
            size: sizes
          },
          hoverlabel:{
            bgcolor: 'rgba(255,255,255,1)',
            bordercolor: 'rgba(150,150,150,0.2)',
            font:{
              color: 'rgb(0,0,0)'
            }
          }
        });
        Plotly.newPlot('graph' + this.algorithmname, plotlyData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style lang="sass" scoped>
#graph
  background-color: rgba(0,0,0,0)
</style>
