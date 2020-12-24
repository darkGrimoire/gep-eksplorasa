<template>
  <div class="outer-container">
    <h2>let's get to know you!</h2>

    <div class="container">
      <div class="media border">
        <img src="/maskot/emo-fear.png" alt="emo-fear" width="80" height="80">
        <div class="media-body">
          <h4>uhm.. your name?</h4>
          <label for="name" />
          <input id="Name" class="input-box" type="text" placeholder="Name" name="name" required> <br> <br> 
        </div>
      </div>
    </div>

    <div class="container">
      <div class="media border">
        <img src="/maskot/emo-anger.png" alt="emo-anger" width="80" height="80">
        <div class="media-body">
          <h4>Where are you from!!</h4>
          <label for="ins" />
          <input id="Ins" type="text" placeholder="Institution" name="ins" required><br> <br>
        </div>
      </div>
    </div>


    <button class="btn">
      Submit
    </button>
  </div>
</template>

<script>

export default {
  name: 'Landing'
}
</script>

<style lang="scss">
  .outer-container { 
  background-image: url("/bg_home.png");
  background-size: cover;
  height: 100%;
  // object-fit: cover;
  font-family: Mechanical Pencil;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  }

  .media {
    display: flex;
    margin-left: 35%;
  }

  .btn {
    background-color: #f4511e;
    border: none;
    outline : none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    font-size: 12px;
    margin: 4px 2px;
    opacity: 0.6;
    transition: 0.3s;
    font-family: "Mechanical Pencil", "Mechanical Pencil", monospace;
  }
  .btn:hover {opacity: 1}

  input[type=text]{
  width: 350px;
  padding: 6px 10px;
  margin: 2px 0;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 24px;
  font-family: "Mechanical Pencil", "Mechanical Pencil", monospace;
  }

  h2 {
    font-size: 50px;
  }
  
  h4{
    color: #009562;
    font-size: 30px;
  }

  img{
    transform: rotate(43.51deg);
  }
</style>
