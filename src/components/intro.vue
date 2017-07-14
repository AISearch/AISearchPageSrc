<template lang="pug">
.appDiv
  .container-fluid#intro.fullH
    .row.center.centerDiv
      .loading(v-if="loading")
        h1 Loading
      .col.backEffect(v-for="(a, index) in algorithms" v-bind:class="{active: randNum == index}")
        p
         router-link(:to="'/Algorithm/' + a._id.algorithmname") {{a._id.algorithmname}}
    .bigTitleDiv
      h1 AISearch
      h5 Metaheuristics are
        TextChanger(:arr="['Nature Wisdom', 'a Mith?', 'Fun to Watch', 'Complicated', 'Mysterius']")
  .page#PubPerYear
    h2 Publications Per year
    h5 Every year more and more scientific works make use of this algorithms
    br
    PubPerYear(algorithmname="")
  .page#HallOfFame(v-if="topDetail.length != 0")
    h2 Hall of Fame
    .row
      .col.s12(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: topDetail[0].title} })")
        img(v-if="topDetail[0].imgUrl" :src="topDetail[0].imgUrl", alt="alt" style="max-width:200px;").circle
        h3.metaName.bold {{algorithms[0]._id.algorithmname}}
        h5
          small by {{topDetail[0].author}}
            br
            small {{algorithms[0].count}} References scince {{algorithms[0].countYears[0].year}}
    .row
      .col.m6.s12(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: topDetail[1].title} })")
        img(v-if="topDetail[1].imgUrl" :src="topDetail[1].imgUrl", alt="alt"  style="max-width:200px;").circle
        h4.metaName.bold {{algorithms[1]._id.algorithmname}}
        h5
          small by {{topDetail[1].author}}
            br
            small {{algorithms[1].count}} References scince {{algorithms[1].countYears[0].year}}
      .col.m6.s12(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: topDetail[2].title} })")
        img(v-if="topDetail[2].imgUrl" :src="topDetail[2].imgUrl", alt="alt"  style="max-width:200px;").circle
        h4.metaName.bold {{algorithms[2]._id.algorithmname}}
        h5
          small by {{topDetail[2].author}}
            br
            small {{algorithms[2].count}} References scince {{algorithms[2].countYears[0].year}}
  .page#listAll.fullH
    h2 List 'em All
    .container
      input(type="text" id="filter" v-model="filter" placeholder="Algorithm Name").metaName.bold
    .row.centerDiv
      .col(v-for="a in algorithms" v-if="a._id.algorithmname.toLowerCase().includes(filter.toLowerCase())")
        .card(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: a._id.algorithmname} })")
          .card-content
            p.metaName.bold {{a._id.algorithmname}}
</template>

<script>
import PubPerYear from '@/components/PubPerYear'
import TextChanger from '@/components/TextChanger'
export default {

  data(){
    return {
      loading: true,
      algorithms: [],
      randNum : 0,
      topDetail: [],
      filter: ""
    }
  },
  components:{
    PubPerYear,
    TextChanger
  },
  mounted(){
    axios.get('https://metaheuristicsapi.herokuapp.com/papers/count')
      .then((response)=>{
        //console.log(response)
        response.data.forEach(v => {
          this.algorithms.push(v);
        });
        this.loading = false;
        axios.get('https://metaheuristicsapi.herokuapp.com/list?query={%22$or%22:[{%22title%22:%22' +
          this.algorithms[0]._id.algorithmname + '%22},{%22title%22:%22' + this.algorithms[1]._id.algorithmname + '%22},{%22title%22:%22' + this.algorithms[2]._id.algorithmname + '%22}]}')
          .then((response)=>{
            response.data.forEach( a => {
              this.topDetail.push(a);
            });
          }).catch(function (error) {
            console.log(error);
          });
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

#intro
  +gradientBackground(45deg,#EEFEF6,#FFF3F7)
  .backEffect
    width: 130px
    height: 100px

.centerDiv
  display: table
  width: 95%
  margin: 10px auto
.page
  min-height: 100vh
  padding-top: 20px
  h1
    font-family: 'Bad Script', cursive
#listAll
  +gradientBackground(90deg,#FFFADF,#ECF6F0)
  #filter
    font-size: 28px
    padding: 20px
#PubPerYear
  +gradientBackground(90deg,#FFFADF,#ECF6F0)

</style>
