<template lang="pug">
.appDiv
  .container-fluid#intro
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
    h1 Publications Per year
    h5 Every year more and more scientific works make use of this algorithms
    br
    PubPerYear(algorithmname="")
  .page#HallOfFame
    h1 Hall of Fame
    .row
      .col.s12(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: topDetail[0].title} })")
        img(:src="topDetail[0].imgUrl", alt="alt" style="max-width:200px;").circle
        h2 {{algorithms[0]._id.algorithmname}}
        h5 by {{topDetail[0].author}}
          br
          small {{algorithms[0].count}} References scince {{algorithms[0].countYears[0].year}}
    .row
      .col.m6(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: topDetail[1].title} })")
        img(:src="topDetail[1].imgUrl", alt="alt"  style="max-width:200px;").circle
        h3 {{algorithms[1]._id.algorithmname}}
        h5 by {{topDetail[1].author}}
          br
          small {{algorithms[1].count}} References scince {{algorithms[1].countYears[0].year}}
      .col.m6(v-on:click="$router.push({ name: 'Algorithm', params:{AlgName: topDetail[2].title} })")
        img(:src="topDetail[2].imgUrl", alt="alt"  style="max-width:200px;").circle
        h3 {{algorithms[2]._id.algorithmname}}
        h5 by {{topDetail[2].author}}
          br
          small {{algorithms[2].count}} References scince {{algorithms[2].countYears[0].year}}
  .page#Makers
    h5 This website is brougth to you by:
    br
    .row
      .col.m6.s12
        img.profile.circle.responsive-img(src="../assets/Adolfo.png", alt="alt")
        h3 Adolfo Reyna
        p PhD Student of UABC, Mexicalli, Mexico.
        p aeroreyna@gmail.com
      .col.m6.s12
        img.profile.circle.responsive-img(src="../assets/Abraham.png", alt="alt")
        h3 Fernando A. Fausto
        p PhD Student of UDG, Guadalajara, Mexico.
        p neosbreak@hotmail.com
    br
    h5 We
      TextChanger(:arr="['Code Algorithms', 'do Crazy Science', 'fight in Super Smash', 'Write Papers']")
      | for food or
      a(href="#")  donations
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
      topDetail: []
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
        axios.get('http://metaheuristicsapi.herokuapp.com/list?query={%22$or%22:[{%22title%22:%22' +
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
.bigTitleDiv
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
#intro
  background: linear-gradient(45deg,#EEFEF6,#FFF3F7)
  background-attachment: fixed
  height: 100vh
  overflow-y: hidden
  .backEffect
    display: block
    width: 130px
    height: 100px
    opacity: 0.07
    transition: all 0.7s
    transition-delay: 1s
  .backEffect:hover, .backEffect.active
    opacity: 1
    transform: scale(1.2)
    transition: all 0.7s
    transition-delay: 0s

.centerDiv
  display: table
  width: 95%
  margin: 10px auto
.page
  min-height: 100vh
  padding-top: 20px
#PubPerYear
  background: linear-gradient(90deg,#FFFADF,#ECF6F0)
  background-attachment: fixed
#Makers
  background: linear-gradient(45deg,#EEFEF6,#FFF3F7)
  background-attachment: fixed
.profile
  width: 100%
  max-width: 400px
  max-height: 400px
</style>
