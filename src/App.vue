<template lang="pug">
  <div id="app">
    .nav
      router-link(:to="'/'") AISearch
      router-link(v-if="$route.query.algorithmname" :to="'/Algorithm/' + $route.query.algorithmname")  > {{$route.query.algorithmname}}
      span  > {{$route.name}}

    <router-view></router-view>
    .page#Makers
      h2 AISearch is brougth to you by:
      br
      .row
        .col.m6.s12
          img.profile.circle.responsive-img(src="./assets/Adolfo.png", alt="alt")
          h3.metaName.bold Adolfo Reyna Orta
          p PhD Student of UABC, Mexicalli, Mexico.
          p aeroreyna@gmail.com
        .col.m6.s12
          img.profile.circle.responsive-img(src="./assets/Abraham.png", alt="alt")
          h3.metaName.bold Fernando A. Fausto
          p PhD Student of UDG, Guadalajara, Mexico.
          p neosbreak@hotmail.com
      br
      h5 We
        TextChanger(:arr="['Code Algorithms', 'do Crazy Science', 'fight in Super Smash', 'Write Papers']")
        | for food or
        a(href="#")  donations
  </div>
</template>

<script>
import TextChanger from '@/components/TextChanger'

export default {
  name: 'app',
  components:{
    TextChanger
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Bad+Script|Courgette|Poiret+One')
@import "./assets/_style.sass"

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-bottom: -20px

.fade-enter-active, .fade-leave-active
  transition-property: opacity
  transition-duration: .25s


.fade-enter-active
  transition-delay: .25s


.fade-enter, .fade-leave-active
  opacity: 0

#Makers
  +gradientBackground(45deg,#EEFEF6,#FFF3F7)
  .profile
    width: 100%
    max-width: 200px
    max-height: 200px
    z-index: 100

.nav
  position: fixed
  left: 15px
  top: 15px
  background-color: rgba(255,255,255,0.5)
  padding: 5px
  z-index: 10000

</style>
