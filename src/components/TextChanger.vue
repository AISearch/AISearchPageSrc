<template lang="pug">
span  {{arr[i] + " "}}
</template>

<script>
export default {
  props:["arr"],
  data(){
    return{
      i:0
    }
  },
  mounted(){
    var nextText = () => {
      this.i = this.i < this.arr.length-1 ? this.i+1 : 0;
    }
    setInterval(nextText, 3000);
  }
}
</script>

<style lang="css">
</style>
