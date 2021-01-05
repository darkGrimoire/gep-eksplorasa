<template>
  <div class="outer-container">
    <!-- placeholder image -->
    <h2>let's get to know you!</h2>


    <div class="form">
      <div class="container">
        <div class="media border">
          <img src="/maskot/emo-fear.png" class="fear">
          <div class="media-body">
            <h4 class="name">uhm.. your name?</h4>
            <label for="name" />
            <input id="Name" class="input-box" type="text" placeholder="Name" name="name" required> <br> <br> 
          </div>
        </div>
      </div>

      <div class="container">
        <div class="media border">
          <img src="/maskot/emo-anger.png" class="anger">
          <div class="media-body">
            <h4 class="from">Where are you from!!</h4>
            <label for="ins" />
            <input id="Ins" type="text" placeholder="Institution" name="ins" required><br> <br>
          </div>
        </div>
      </div>
    </div>

      <div class="submitcls">
        <div class="media border">
          <img src="/maskot/emo-sad.png" class="sad">
          <div class="sbmtxt">
            <h4 class="sbmt">submit please</h4>
              <button class="btn">
                Submit
              </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Landing'
}
</script>

<style lang="scss">
  .outer-container { 
    background-image: url("/bg_home.jpg");
    background-size: cover;
    height: 100vh;
    font-family: Mechanical Pencil;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .form {
    display: flex;
    align-content: left;
    flex-direction: column;
  }

  .media {
    display: flex;
    flex-direction: row;
  }

  button {
    font-family: Mechanical Pencil;
    font-size: 35px;
    align-content: center;
    vertical-align: middle;
    background-color: transparent;
    border: none;
    transition: 0.5s;
    padding: 10px;
  }

  button:hover {
    background-color: black;
    color: white;
  }

  input[type=text] {
    width: 500px;
    padding: 6px 10px;
    margin: 5px 0;
    border: none;
    outline: none;
    box-shadow: none;
    background-color: transparent;
    font-size: 35px;
    color: black;
    font-family: "Mechanical Pencil", "Mechanical Pencil", monospace;
  }

  h2 {
    font-size: 50px;
    padding: 20px;
  }

  h4 {
    padding-bottom: 5px;
  }
  
  h4.name {
    color: #009562;
    font-size: 50px;
    font-weight: normal;
  }

  .fear {
    width: 120px;
    height: 120px;
    transform: rotate(45deg);
    margin-right: 15px;
  }

  h4.from {
    color: #e14423;
    font-size: 50px;
    font-weight: normal;
  }

  .anger {
    width: 120px;
    height: 120px;
    transform: rotate(-15deg);
    margin-right: 15px;
  }

  h4.sbmt {
    color: #305fe9;
    font-size: 50px;
    font-weight: normal;
  }

  .sad {
    width: 120px;
    height: 120px;
  }

  .sbmtxt {
    align-content: center;
    justify-content: center;
    text-align: center;
  }

  .submitcls {
    margin-top: 75px;
    display: flex;
    align-content: stretch;
  }

</style>
