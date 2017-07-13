<template lang="pug">
.container-fluid
  .AlgorithmPage.fullH
    .row.centerDiv
      .col.backEffect(v-for="(w, index) in words" v-bind:class="{active: randNum == w[1]}" v-on:click="$router.push({ name: 'Papers', query:{algorithmname: algorithmname, title: w[0]} })")
        p(v-bind:style="{fontSize: (24 - w[1]/16) + 'px'}") {{w[0]}}
      .bigTitleDiv
        h1 {{algorithmname}}
        h5 by {{details.author}}, {{details.year}}
  .page
    h2 Details
    .container.left-align
      img(v-if="details.imgUrl" :src="details.imgUrl", alt="alt" style="width:150px; float: right").circle
      h3.metaName {{ algorithmname }}
      h5
        small Author: {{details.author}}
      h5
        small Year of Publication: {{details.year}}
      h5
       small Original Paper Abstract:
      .abs {{details.abstract || 'No abstract available'}}
      p.link.center
        a(v-if="details.urlPaper" :href="details.urlPaper") Read More
      h5 Most used words on titles works:
      .row
        .col(v-for="w in firstWords")
          .card(v-on:click="$router.push({ name: 'Papers', query:{algorithmname: algorithmname, title: w[0]} })")
            .card-content
              p {{w[0]}}
                small  {{Math.floor(w[1]/firstWords[0][1]*100) + "%"}}
  .page#PubPerYear
    h2 References per year
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
      axios.get('https://metaheuristicsapi.herokuapp.com/list?query={%22title%22:%22' + this.algorithmname + '%22}')
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

<style lang="sass" scoped>
@import "./../assets/_style.sass"
.AlgorithmPage
  +gradientBackground(45deg,#EEFEF6,#FFF3F7)
#PubPerYear
  +gradientBackground(90deg,#FFFADF,#ECF6F0)
</style>
