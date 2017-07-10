<template lang="pug">
.AlgorithmPage.container-fluid
  h1 {{algorithmname}}
  canvas#cloud
</template>

<script>
var WordCloud = require('@/assets/wordcloud2.min.js');
export default {
  data(){
    return {
      algorithmname:""
    }
  },
  mounted(){
    this.algorithmname = this.$route.params.AlgName;
    axios.get('https://metaheuristicsapi.herokuapp.com/papers/countWords/' + this.algorithmname)
      .then((response)=>{
        var tempFun = function(x){
          return Math.log(x) + 12;
        }
        WordCloud(document.getElementById('cloud'),
         {
            list: response.data.slice(100,150),
            gridSize: Math.round(16 * $('#canvas').width() / 1024),
            weightFactor: 0.1,
            fontFamily: 'Times, serif',
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#ffe0e0',
            minSize: 10
          }
       );
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style lang="sass" scoped="">
#cloud
  width: 100%
</style>
