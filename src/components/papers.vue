<template lang="pug">
.container-fluid(style="position:relative; padding:10px;")
  .row
    .col.m3.s12.left-align
      br
      br
      h1 Papers
      p(v-if="$route.query.algorithmname") Algorithm: {{this.$route.query.algorithmname}}
      p(v-if="$route.query.title") Filter Title: {{this.$route.query.title}}
      p(v-if="$route.query.sort") Sort by: {{$route.query.sort}}
      p(v-if="$route.query.author") Author: {{$route.query.author}}
      .strictSelector(v-if="query.algorithmname")
        input(type="checkbox" v-model="query.strict" id="strict")
        label(for="strict") Strict
      .sortBy
        p(v-for="a in [['year','Year'],['pubtitle', 'PubTitle']]")
          input.with-gap(name="sortBy" type="radio" :id="a[0]" :checked="query.sort==a[0]")
          label(:for="a[0]" v-on:click="query.sort=a[0]") {{a[1]}}
        .switch
          label
            input(type="checkbox" v-model="query.inverse")
            span.lever
            | Inverse
      br
      button.btn(type="submit" v-on:click="query.skip=0;pushRoute()") Update Search
    .col.m9.s12
      .container-fluid
        p
          small {{total}} Articles found. Page {{page}}/{{pages}}
        .paper(v-for="(p, index) in data").left-align
          .col.s12
            p
              b
                a(:href="p.link" target="blank") {{p.title}}
              br
              span(v-for="a in p.authors")
                a(v-on:click="findAuthor(a)") {{a}};
              br
              small {{p.pubtitle}}
              br
              small Year: {{p.year}}
              small(v-if="!query.algorithmname" v-on:click="query.algorithmname=p.algorithmname;query.skip=0;pushRoute()") , Reference to: {{ p.algorithmname }}
          hr(v-if="index < data.length-1")
        .col.s12
          ul.pagination
            li(v-bind:class="{disabled:page==1}")
              a(v-on:click="gotoPage(1)") <i class="material-icons">chevron_left</i>
            li(v-for="i in pagesList" v-bind:class="{active:(i==parseInt(page))}")
              a(v-on:click="gotoPage(i)") {{i}}
            li(v-bind:class="{disabled:page==pages}")
              a(v-on:click="gotoPage(pages)") <i class="material-icons">chevron_right</i>
</template>

<script>
export default {
  data(){
    return {
      data: [],
      total: 0,
      page: 0,
      pages: 0,
      inverse: false,
      webQuery:{
        title:"",
        authors:"",
        year:"",
        pubtitle:"",
      },
      query:{},
    }
  },
  computed:{
    pagesList:function(){
      var initial = Math.max(this.page-2, 1);
      var final = Math.min(this.pages, this.page + 5);
      var arr = [];
      for(var i =initial; i< final+1; i++){
        arr.push(i);
      }
      return arr;
    }
  },
  watch:{
    '$route'(to, from){
      this.updateInfo();
    }
  },
  methods:{
    gotoPage:function(i){
      this.query.skip = (i-1)*10;
      this.pushRoute();
    },
    findAuthor(author){
      this.query.skip = 0;
      this.query.author = author;
      this.pushRoute();
    },
    pushRoute(){
      this.$router.push({name:"Papers", query: this.query});
      this.updateInfo();
    },
    updateInfo:function(){
      var apiUrl = 'https://www.aeroreyna.com:8443/papers?';
      var params = [];
      var query = [];
      this.query = JSON.parse(JSON.stringify(this.$route.query));
      if(this.$route.query.algorithmname)
        query.push({algorithmname: this.$route.query.algorithmname});
      if(this.$route.query.title){
          query.push({title: {$regex: this.$route.query.title, $options:"i"}});
      }
      if(this.$route.query.strict){
        query.push({title: {$regex: this.$route.query.algorithmname, $options:"i"}});
      }
      if(this.$route.query.author){
        query.push({authors: { "$elemMatch" : {"$regex" : this.$route.query.author }}});
      }
      if(this.$route.query.year){
        query.push({year: this.$route.query.year });
      }
      if(query) params.push('query={"$and":' + JSON.stringify(query) + '}');
      if(this.$route.query.sort)
        params.push("sort={%22" + this.$route.query.sort + "%22:" + (this.$route.query.inverse ? -1 : 1) + "}");
      params.push("limit=" + 10);
      params.push("skip=" + (this.$route.query.skip || 0));
      apiUrl += params.join("&");
      console.log(apiUrl )
      axios.get(apiUrl )
        .then((response)=>{
          //console.log(response)
          this.data = response.data.docs;
          this.total = response.data.count;
          this.page = response.data.page + 1;
          this.pages = response.data.totalPages;
          window.scrollTo(0, 0);
        }).catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted(){
    this.updateInfo();
    //console.log(this.$router)
  },

}
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css?family=Bad+Script|Courgette|Poiret+One')
  h1
    font-family: 'Bad Script', cursive
  paper
    p
      margin: 0px
      line-height: 12px

    hr
    	height: 10px
    	border: 0
    	box-shadow: 0 10px 10px -10px #8c8b8b inset
</style>
