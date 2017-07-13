<template lang="pug">
.container-fluid
  h1 Papers
  .row
    .container
      p(v-if="this.$route.query.algorithmname" v-on:click="$router.go(-1)") Algorithm: {{this.$route.query.algorithmname}}
      p(v-if="this.$route.query.title" v-on:click="$router.go(-1)") Filter Title: {{this.$route.query.title}}
      p(v-if="this.$route.query.sort") Sort by: {{this.$route.query.sort}}
      table.highlight
        thead
          th
            .input-field
              input(type="text" name="title" v-model="webQuery.title")
              label(for="title") Title
          th
            .input-field
              input(type="text" name="pubtitle" v-model="webQuery.pubtitle")
              label(for="pubtitle") PubTitle
          th
            .input-field
              input(type="text" name="authors" v-model="webQuery.authors")
              label(for="authors") Authors
          th
            .input-field
              input(type="text" name="year" v-model="webQuery.year")
              label(for="year") Year
          th DOI
        tbody
          tr(v-for="p in data")
            td {{p.title}}
            td {{p.pubtitle}}
            td {{p.authors.join("; ")}}
            td {{p.year}}
            td {{p.doi}}
</template>

<script>
export default {
  data(){
    return {
      data: [],
      webQuery:{
        title:"",
        authors:"",
        year:"",
        pubtitle:"",
      }
    }
  },
  mounted(){
    var apiUrl = 'https://metaheuristicsapi.herokuapp.com/papers?';
    var params = [];
    var query = {};
    if(this.$route.query.algorithmname)
      query.algorithmname = this.$route.query.algorithmname;
    if(this.$route.query.title){
      //if(!this.$route.query.strict){
        query.title = {$regex: this.$route.query.title, $options:"i"}
        //this.webQuery.title = this.$route.query.title;
      //}else{
        //query.title = {$regex: this.$route.query.title + "&" + this.$route.query.algorithmname, $options:"i"}
      //}
    }
    if(query) params.push("query=" + JSON.stringify(query));
    if(this.$route.query.sort)
      params.push("sort={%22" + this.$route.query.sort + "%22: 1}");
    params.push("limit=" + 10);
    params.push("skip=" + (this.$route.query.skip || 0));
    apiUrl += params.join("&");
    console.log(apiUrl )
    axios.get(apiUrl )
      .then((response)=>{
        console.log(response)
        this.data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
  },

}
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css?family=Bad+Script|Courgette|Poiret+One')
  h1
    font-family: 'Bad Script', cursive
</style>
