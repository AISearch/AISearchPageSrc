<template lang="pug">
.appDiv
  .container-fluid#intro
    .row.center.centerDiv
      .loading(v-if="loading")
        h1 Loading
      .col.backEffect(v-for="a in algorithms")
        p {{a._id.algorithmname}}
    .bigTitleDiv
      h1 AISearch
      h5 Metaheuristics are
        span#Words  Nature
  .page#PubPerYear
    h1 Publications Per year
    h5 Every year more and more scientific works make use of this algorithms
    br
    PubPerYear
  .page#HallOfFame
    h1 Hall of Fame
    .row
      .col.s12
        h2 {{algorithms[0]._id.algorithmname}}
        h5 {{algorithms[0].count}} References scince {{algorithms[0].countYears[0].year}}
    .row
      .col.s6
        h3 {{algorithms[1]._id.algorithmname}}
        h5 {{algorithms[1].count}} References scince {{algorithms[1].countYears[0].year}}
      .col.s6
        h3 {{algorithms[2]._id.algorithmname}}
        h5 {{algorithms[2].count}} References scince {{algorithms[2].countYears[0].year}}
  .page#Makers
    h5 This website is brougth to by:
    br
    .row
      .col.s6
        img.profile.circle(src="../assets/Adolfo.png", alt="alt")
        h3 Adolfo Reyna
        p PhD Student of UABC, Mexicalli, Mexico.
        p aeroreyna@gmail.com
      .col.s6
        img.profile.circle(src="../assets/Abraham.png", alt="alt")
        h3 Fernando A. Fausto
        p PhD Student of UDG, Guadalajara, Mexico.
        p neosbreak@hotmail.com
    br
    h5 We code algorithms for food or
      a(href="#")  donations
</template>

<script>
import PubPerYear from '@/components/PubPerYear'
export default {

  data(){
    return {
      loading: true,
      algorithms: [],
    }
  },
  components:{
    PubPerYear
  },
  mounted(){
    axios.get('https://metaheuristicsapi.herokuapp.com/papers/count')
      .then((response)=>{
        console.log(response)
        response.data.forEach(v => {
          this.algorithms.push(v);
        });
        this.loading = false;
      })
      .catch(function (error) {
        console.log(error);
      });
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
  .backEffect:hover
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
  width: 400px
  height: 400px
</style>
