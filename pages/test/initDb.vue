<template>
  <div>
    <h1>Photos:</h1>
    <div v-for="(id, idx) in ids " :key="id" class="content">
      <div class="id">
        id: {{ id }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InitDB',
    data() {
      return {
        ids: [
          ";",
          "anesthesia",
          "bakarteros",
          "bergandengan",
          "bertemukembali",
          "bodyform",
          "closefriend",
          "dibungkam",
          "drained",
          "duniaterusberputar",
          "fearofnothingfearofanything",
          "fishwings",
          "flyaway",
          "getup",
          "hangat",
          "hisownhappiness",
          "homecamewithtwofaces",
          "insicura",
          "inthemiddleofnowherealone",
          "itsabouttime",
          "jangan",
          "kemanalarinya",
          "later",
          "liburan",
          "life",
          "lobster",
          "lookup",
          "merahbukanberartiamarah",
          "oldfigure",
          "peaceminusone",
          "praytonone",
          "renyuksesenggukan",
          "room",
          "semuakucingtidaksamasaja",
          "shebesmilin",
          "siapa",
          "spiritualism",
          "sringah",
          "sweetvictory",
          "tertuju",
          "theburningsea",
          "thefeelingoffeelingnothing",
          "thelook",
          "thepurejoyofchildhood",
          "theremovalofexistences",
          "theviewfromthebalcony",
          "unknown",
          "untitledabaw",
          "untitledabet",
          "untitledaqdam",
          "untitledbarkah",
          "untitlednadhif",
          "whosleft",
          "wishingthevoid"
          ],
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>