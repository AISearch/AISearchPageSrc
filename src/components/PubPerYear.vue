<template lang="pug">
.someDiv(:id="'graph'")
</template>

<script>
const Plotly = require('plotly.js/dist/plotly.js');
var plotlyData=[];
export default {
  props:["algorithmname"],
  data(){
    return {
      prevX: 0
    }
  },
  mounted(){
    plotlyData=[];
    axios.get('https://www.aeroreyna.com:8443/papers/papersPerYear')
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
        Plotly.newPlot('graph', plotlyData);
        var myPlot = document.getElementById('graph');
        myPlot.on('plotly_click', (data) => {
          if(this.prevX != data.points[0].x){
            this.prevX = data.points[0].x;
            Materialize.toast(data.points[0].y + ' articles, Click again to search them.', 4000)
            return
          }
          if(!this.algorithmname){
            this.$router.push({name:"Papers", query:{year:data.points[0].x + ""}})
          }else{
            this.$router.push({name:"Papers", query:{year:data.points[0].x + "", algorithmname:this.algorithmname}})
          }
        });
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
