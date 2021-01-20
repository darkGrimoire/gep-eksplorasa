<template>
  <div class="cont" v-bind:style="{height: cont}">
      <div class="cont-door">
        <button class="door" v-on:click="open = true"></button>
      </div>
      <div v-if="open" class="choose">
        <div class="wall2"></div>
        <div class="floor2"></div>
      </div>
      <div class="window1"></div>
      <div class="sign"></div>
      <div class="window2"></div>
      <div class="cat"></div>
      <div class="kursi"></div>
      <div class="wall" v-bind:style="{height: wall}"></div>
      <div class="floor" v-bind:style="{height: floor}"></div>
  </div>
</template>

<script>

export default {
  name: 'Teras',
  data () {
    return{
      open: false,
      result: 0,
      tinggi:0,
      cont:"",
      wall: "",
      floor: ""
    }
  },

  methods: {
    myFunction: function() {	
      this.result =  window.outerHeight
    },

    myCont: function() {	
      this.cont =  this.result+"px"
    },    

    myWall: function(){
      this.wall = 0.8 * this.result+"px"
    },

    myFloor: function(){
      this.floor = 0.2 * this.result+"px"
    }
  },

  beforeMount(){
    this.myFunction(), this.myWall(), this.myFloor()
  },

  computed:{

  }
}

</script>

<style scoped>

.choose{
  width : 100vw;
  height : 100vh;
  z-index : 4;
  position : fixed;
  background-color : #ffffff;
}

.emotion{
  width : 100vw;
  height : 80vh;
  display : flex;
  flex-flow:row;
  align-items:center;
  justify-items:center;
  align-content:center;
  justify-content:center;
  position : fixed;
  z-index:6;
}
.happy{
  background-image : url("/happy.png");
	--scale: 1;
	min-width: calc(261px * var(--scale));
	min-height: calc(333px * var(--scale));
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 6;
}

.fear{
  background-image : url("/fear.png");
	--scale: 1;
	min-width: calc(263px * var(--scale));
	min-height: calc(335px * var(--scale));
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 6;
}

.door{
  background-image : url("/door.png");
	--scale: 0.8;
	min-width: calc(332px * var(--scale));
	min-height: calc(573px * var(--scale));
  position : absolute;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 2;
  margin-left : 40vw;
  margin-top : 11vh;
}

.door:hover{
  background-image : url("/open.png");
	--scale: 0.8;
	min-width: calc(332px * var(--scale));
	min-height: calc(573px * var(--scale));
  position : fixed;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 2;
  margin-left : 40vw;
  margin-top : 11vh;
}

.door:active{
  outline : none;
  border : none;
}

.door:focus {outline:0;}

.window1{
  background-image : url("/windows1.png");
	--scale: 0.5;
	min-width: calc(40vw * var(--scale));
	min-height: calc(84vh * var(--scale));
  position : fixed;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 2;
  margin-left : 5vw;
  margin-top : 20vh;
}

.sign{
  background-image : url("/sign.png");
	--scale: 0.5;
	min-width: calc(30vw * var(--scale));
	min-height: calc(50vh * var(--scale));
  position : fixed;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 2;
  margin-left : 8vw;
  margin-top : 28vh;
}

.window2{
  background-image : url("/windows1.png");
	--scale: 0.5;
	min-width: calc(82vw * var(--scale));
	min-height: calc(84vh * var(--scale));
  position : fixed;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 2;
  margin-left : 74vw;
  margin-top : 20vh;
}

.cat{
  background-image : url("/cat.png");
	--scale: 0.4;
	min-width: calc(100vw * var(--scale));
	min-height: calc(50.667vh * var(--scale));
  position : fixed;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 2;
  margin-left : 5vw;
  margin-top : 70vh;
}

.kursi{
  background-image : url("/kursi.png");
	--scale: 0.55;
	min-width: calc(60vw * var(--scale));
	min-height: calc(89.4vh * var(--scale));
  position : fixed;
	background-size: contain;
	background-repeat: no-repeat;
  z-index : 3;
  margin-left : 75vw;
  margin-top : 50vh;
}

.cont{
  width : 100vw;
  z-index : 0;
  position:relative;
  overflow:hidden;
}


.wall{
  background-image : url("/wall4.png");
  background-repeat : repeat;
  position:relative;

}

.wall2{
  background-image : url("/wall4.png");
  background-repeat : repeat;
  height : 80vh;
  z-index:5;
}

.floor{
  background-image : url("/floor.png");
  background-repeat : repeat;
  background-size: cover;
  position:relative;
}

.floor2{
  background-image : url("/floor.png");
  background-repeat : repeat;
  background-size: cover;
  height : 20vh ;
  z-index : 5;
}

</style>
