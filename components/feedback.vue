<template>
  <div class="feedback-container">
    <img src="/feedback/_bg.png" alt="bg" class="bg-feedback">
    <div class="form-container">
      <div class="judul">
        <img src="/feedback/tulisan goyang.gif" alt="Feedback dan Saran">
      </div>
      <div class="stars-container">
        <div v-for="star in 5" :key="star" :class="{ 'active': star <= stars }" class="star" @click="rate(star)" />
      </div>
      <div class="input-container">
        <textarea id="pesan" v-model="pesan" class="input-pesan" name="pesan" cols="30" rows="3" placeholder="Ketikkan pesan..." @keyup.enter="submitFeedback" />
        <img src="/feedback/_garisx.png" alt="garis" class="garis">
      </div>
      <div class="emo-container">
        <img src="/feedback/emo goyang.gif" alt="emosi">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Feedback',
    data() {
      return {
        pesan: '',
        stars: 0
      }
    },
    methods: {
      rate(star) {
        if (
          typeof star === 'number' &&
          star <= 5 &&
          star >= 0
        )
          this.stars = this.stars === star ? star - 1 : star
      },
      submitFeedback(){
        let now = new Date()
        const data = {
          pesan: this.pesan,
          rating: this.stars,
          time: now
        }
        return this.$fire.firestore.collection('feedback').add({
          ...data
        }).then(() => 
        {
          this.$emit('submitted')
        }).catch(() => {
          alert('Ada kesalahan server. Mohon refresh dan mencoba kembali')
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.feedback-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bg-feedback {
  width: 700px;
  object-fit: contain;
  @media only screen and (max-width: 800px) {
    width: 500px;
  }
  @media only screen and (max-width: 450px) {
    width: 300px;
  }
}

.form-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.judul {
  margin-top: 6%;
  height: 70px;
  @media only screen and (max-width: 800px) {
    margin-top: 8%;
    height: 40px;
  }
  @media only screen and (max-width: 450px) {
    margin-top: 7%;
    height: 30px;
  }
}
.stars-container {
  margin-top: 4%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  &:hover {
    .star {
      background-image: url('/feedback/_bintang 1.png');
    }
  }
}
.star {
  background-image: url('/feedback/_bintang 1x.png');
  background-size: contain;
  width: 70px;
  height: 70px;
  cursor: pointer;
  &:hover {
    &~.star {
      &:not(.active) {
        background-image: url('/feedback/_bintang 1x.png');
      }
    }
  }
  @media only screen and (max-width: 800px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 450px) {
    width: 30px;
    height: 30px;
  }
}
.active {
  background-image: url('/feedback/_bintang 1.png');
}
.input-container {
  margin-top: 5%;
  width: 60%;
  textarea {
    resize: none;
    background-color: transparent;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 10px;
    padding-bottom: 2px;
    font-family: 'Mechanical Pencil';
    font-size: 24px;
    color: #ede5d1;
    width: 100%;
    scrollbar-color: rgba($color: #d1bb10, $alpha: 0.9) rgba($color: #d1bb10, $alpha: 0.4); 
    scroll-behavior: smooth;
    scrollbar-width: thin;
    @media only screen and (max-width: 450px) {
      font-size: 14px;
      height: 50px;
    }
  }
}
.garis {
  position: relative;
  justify-self: flex-start;
  top: -10px;
}
.emo-container {
  justify-self: flex-start;
  margin-top: 5%;
  margin-bottom: 3%;
  height: 100px;
  @media only screen and (max-width: 800px) {
    margin-top: 0;
    margin-bottom: 2%;
    height: 70px;
  }
  @media only screen and (max-width: 450px) {
    height: 40px;
  }
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba($color: #d1bb10, $alpha: 0.4); 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba($color: #d1bb10, $alpha: 0.7); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba($color: #d1bb10, $alpha: 0.9); 
}
</style>