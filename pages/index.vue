<template>
  <div class="container">
    <form v-show="!storage">
      <label for="nama">Nama</label>
      <input type="text" id="nama" placeholder="Masukkan nama" v-model="form.nama" autocomplete="off">

      <label for="institusi">Institusi</label>
      <input type="text" id="institusi" placeholder="Dari institusi mana?" v-model="form.institusi" autocomplete="off">

      <input type="submit" value="Submit" @click.prevent="submit">
      <br>
    </form>
    <br><div>Ada di storage = {{ storage?"ada":"belum" }}<br><span v-show="form.visited">Nama = {{ form.nama }}</span><br><input type="button" @click.prevent="hapusstorage" value="Hapus" v-show="storage"></div>
  </div>
</template>

<script>

export default {
  name: 'Bukutamu',
  data() {
    return {
      storage: false,
      form:{
        nama: "",
        institusi: ""
      }
  }},
  mounted() {
    this.tulishasilcekstorage()
  },
  methods:{
    hapusstorage(){
      if(this.cekstorage()){
        localStorage.removeItem("nama")
        localStorage.removeItem("visited")
        window.location.reload()
      }
    },
    cekstorage(){
      return (localStorage.getItem("nama") && localStorage.getItem("nama")!="" && localStorage.getItem("visited"))
    },
    tulishasilcekstorage(){
      this.storage = this.cekstorage()
      this.form.nama = localStorage.getItem("nama")
      this.form.visited = localStorage.getItem("visited")
    },
    submit(){
      const data = {
          nama: this.form.nama,
          institusi: this.form.institusi
        }
        if (data.nama==""||data.institusi==""){
          alert('ada data kosong')
          return false
        }
        return this.$fire.firestore.collection('bukutamu').add({
          ...data
        }).then(() => 
        {
          if(process.client){
            localStorage.setItem("nama", this.form.nama)
            localStorage.setItem("visited", true)
            return window.location.reload()
          }
        }).catch(() => {
          console.log("gk")
          return false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/* dari w3school hehe */
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit],[type=button] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit],[type=button]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
