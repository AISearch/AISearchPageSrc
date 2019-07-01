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
      .row
        .col.m6.s12
          h5.center
            small Most used words on titles works:
          center(v-if="firstWords.length > 0")
            p
              .chip(v-for="w in firstWords" v-on:click="$router.push({ name: 'Papers', query:{algorithmname: algorithmname, title: w[0]} })")
                | {{w[0]}}
                small  {{Math.floor(w[1]/firstWords[0][1]*100) + "%"}}
        .col.m6.s12
          h5.center
            small Authors refering this algorihtm:
          center
            p
              .chip(v-for="(a, i) in authors" v-if="a._id.authors && i<20" v-on:click="$router.push({ name: 'Papers', query:{algorithmname: algorithmname, author: a._id.authors} })")
                | {{a._id.authors}}
                small  {{a.count}}
  .page#PubPerYear
    h2 References per year
    br
    PubPerYear(:algorithmname="algorithmname")

    br
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
      details: {},
      authors: []
    }
  },
  components:{
    PubPerYear
  },
  mounted(){
    this.algorithmname = this.$route.params.AlgName;
    axios.get('http://aeroreyna.com:8080/papers/countWords/' + this.algorithmname + '?limit=200')
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
      axios.get('http://aeroreyna.com:8080/list?query={%22title%22:%22' + this.algorithmname + '%22}')
        .then((response)=>{
          this.details = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
      setInterval(()=>{
        this.randNum = Math.floor(Math.random()*100);
      }, 300);
      axios.get('http://aeroreyna.com:8080/papers/algorithmAuthors/' + this.algorithmname)
        .then((response)=>{
          response.data.forEach(a => {
            this.authors.push(a);
          })
        })
        .catch(function (error) {
          console.log(error);
        });
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
