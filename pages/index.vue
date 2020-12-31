<template>
  <div class="container">
    <form action="/action_page.php">
      <label for="nama">Nama</label>
      <input type="text" id="nama" placeholder="Masukkan nama" v-model="form.nama">

      <label for="institusi">Institusi</label>
      <input type="text" id="institusi" placeholder="Dari institusi mana?" v-model="form.institusi">

      <input type="submit" value="Submit" @click.prevent="submit">
    </form>
  </div>
</template>

<script>

export default {
  name: 'Bukutamu',
  data() {
    return {form:{
      nama: "",
      institusi: ""
    }
  }},
  methods:{
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
        }).then(() => {
          console.log("ok")
          return true
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

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
