<template lang="pug">
  #plotlyDiv
</template>

<script>

var x=[], y=[];
v.countYears.forEach( year =>{
  x.push(year.year);
  y.push(Math.log2(year.count));
  //v.plotData.push(year.count);
})
plotlyData.push({
  x,y, type: 'scatter',
  name: v._id.algorithmname,
  mode: 'markers',
  hoverinfo: 'name+x+y',
  marker: {
    color: 'rgba('
    + Math.floor(Math.random()*255) + ','
    + Math.floor(Math.random()*255) + ','
    + Math.floor(Math.random()*255) + ','
    + '.7)',
    size: 8
  }
});

Plotly.newPlot('plotlyDiv', plotlyData);
export default {
}
</script>

<style lang="css">
</style>
