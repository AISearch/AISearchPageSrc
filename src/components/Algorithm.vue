<template lang="pug">
.container-fluid
  .AlgorithmPage
    .row.centerDiv
      .col.backEffect(v-for="(w, index) in words" v-bind:class="{active: randNum == w[1]}" v-on:click="$router.push({ name: 'Papers', query:{algorithmname: algorithmname, title: w[0]} })")
        p(v-bind:style="{fontSize: (24 - w[1]/16) + 'px'}") {{w[0]}}
      .bigTitleDiv
        h1 {{algorithmname}}
        h5 by {{details.author}}, {{details.year}}
  .page
    h1 Details
    .container.left-align
      h2 {{ algorithmname }}
      br
      img(v-if="details.imgUrl" :src="details.imgUrl", alt="alt" style="width:150px; float: right").circle
      h5 Author: {{details.author}}
      h5 Year of Publication: {{details.year}}
      h5 Original Paper Abstract:
      .abs {{details.abstract || 'No abstract available'}}
      p.link.center
        a(v-if="details.urlPaper" :href="details.urlPaper") Read More
      h5 Most used words on titles works:
      .row
        .col(v-for="w in firstWords")
          .card(v-on:click="$router.push({ name: 'Papers', query:{algorithmname: algorithmname, title: w[0]} })")
            .card-content
              p {{w[0]}}
              p {{w[1]}}
  .page#PubPerYear
    h1 References per year
    br
    PubPerYear(:algorithmname="algorithmname")
</template>

<script>
import PubPerYear from '@/components/PubPerYear';

export default {
  data(){
    return {
      algorithmname:"",
      words: [],
      firstWords: [],
      randNum : 0,
      details: {}
    }
  },
  components:{
    PubPerYear
  },
  mounted(){
    this.algorithmname = this.$route.params.AlgName;
    axios.get('https://metaheuristicsapi.herokuapp.com/papers/countWords/' + this.algorithmname + '?limit=200')
      .then((response)=>{
        response.data.forEach( (w,i) =>{
          this.words.push([w[0], i]);
          if(i<20){
            this.firstWords.push(w);
          }
        })
        this.words = this.words.sort(()=>{
          return 0.5 - Math.random();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.get('http://metaheuristicsapi.herokuapp.com/list?query={%22title%22:%22' + this.algorithmname + '%22}')
        .then((response)=>{
          this.details = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
      setInterval(()=>{
        this.randNum = Math.floor(Math.random()*100);
      }, 300);
  }
}
</script>

<style lang="sass" scoped="">
.AlgorithmPage
  background: linear-gradient(45deg,#EEFEF6,#FFF3F7)
  background-attachment: fixed
  height: 100vh
  overflow-y: hidden
  .backEffect
    position: relative
    //display: block
    //width: 130px
    height: 50px
    opacity: 0.07
    transition: all 0.7s
    transition-delay: 1s
  .backEffect:hover, .backEffect.active
    opacity: 1
    transform: scale(1.2)
    transition: all 0.7s
    transition-delay: 0s

.bigTitleDiv
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  font-family: 'Poiret One', cursive
.centerDiv
  display: table
  width: 95%
  margin: 10px auto
.page
  min-height: 100vh
  padding-top: 20px
  h1
    font-family: 'Bad Script', cursive
#PubPerYear
  background: linear-gradient(90deg,#FFFADF,#ECF6F0)
  background-attachment: fixed
</style>
