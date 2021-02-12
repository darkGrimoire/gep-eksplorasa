<template>
  <div class="page-container">
    <div class="main-container">
      <div class="title">
        <img src="/img/emo-joy-min.png" class="smiley-left">
        <img src="/img/bubble-1-min.png" class="image-title">
        <img src="/img/emo-joy-min.png" class="smiley-right">
      </div>
      <div class="form-name">
        <img src="/img/emo-fear-min.png" class="image">
       
        <div class="field">
          <div class="label">
            uhm... your name?
          </div>
          <input type="text" class="input">
        </div>
      </div>
      <div class="form-from">
        <img src="/img/emo-anger-min.png" class="image">
        <div class="field">
          <div class="label">
            Where are you from !?
          </div>
          <input type="text" class="input">
        </div>
      </div>
      <div class="form-submit">
        <img src="/img/emo-sad-min.png" class="image">
        <div class="field">
          <div class="label">
            submit please
          </div>
          <div class="btn">
            submit
          </div>
        </div>
      </div>
    </div>
    <div class="image-container">
      <img src="/img/things-1-min.png" class="image-1">
      <img src="/img/things-2-min.png" class="image-2">
      <img src="/img/things-3-min.png" class="image-3">
      <img src="/img/things-4-min.png" class="image-4">
      <img src="/img/things-5-min.png" class="image-5">
    </div>
  </div>
</template>

<script>

export default {
  name: 'GuestBook',
  
}
</script>

<style lang="scss" scoped>
  div {
    font-family: 'Mechanical Pencil';
    font-size: 40px;
  }
  .page-container {
    position: relative;
    background-image: url("/img/BEIGE-min.png");
    background-size: 100% auto;
    background-repeat: repeat-y;
    background-position: center top;
    height: 100vh;
    width: 100vw;

    .main-container {
      display: flex;
      flex-direction: column;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background:url("/img/paper-min.png") no-repeat center center; 
      background-size: 38%;

      .title {
        margin-bottom: 20px;
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-bottom: 5vh;
        
        .smiley-left {
          width: 10%;
          margin-right: 20px;
          transform: rotate(-17deg);
        }

        .image-title {
          width: 70%;
        }

        .smiley-right {
          width: 10%;
          margin-left: 20px;
          transform: rotate(3deg);
        }
      }

      .form-name {
        margin-bottom: 5vh;
        display: flex;
        justify-content: center;
        width: 35%;
        align-items: flex-end;
        align-self: center;
        
       .image{
          width: 4vw;
          margin-right: 25px;
          transform: rotate(30deg);
        }

        .field{
          width: 70%;
          .label {
            font-size: 2.2rem;
            color: #009562;
            margin-bottom: 15px;
            font-weight: 500;
          }

          .input {
            background:url("/img/bubble-2-min.png") no-repeat center center; 
            background-size: 100%;
            border: none;
            width: 100%;
            font-size: 2rem;
            color: white;
            font-family: 'Mechanical Pencil';
            padding: 20px 30px 20px 30px;
            margin:  -20px -30px -10px -20px;

            &:focus{
              outline: none;
            }
          }
        }
      }

      .form-from {
        margin-bottom: 10vh;
        display: flex;
        justify-content: center;
        width: 35%;
        align-items: flex-end;
        align-self: center;
        
       .image{
          width: 4vw;
          margin-right: 25px;
          transform: rotate(-7deg);
        }

        .field{
          width: 70%;
          .label {
            font-size: 2.2rem;
            color: #E14423;
            margin-bottom: 15px;
            font-weight: 500;
          }

          .input {
            background:url("/img/bubble-3-min.png") no-repeat center center; 
            background-size: 100%;
            border: none;
            width: 100%;
            font-size: 2rem;
            color: white;
            font-family: 'Mechanical Pencil';
            padding: 20px 30px 20px 30px;
            margin:  -20px -30px -10px -20px;

            &:focus{
              outline: none;
            }
          }
        }
      }

      .form-submit {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        width: 15%;
        align-items: flex-end;
        align-self: center;
        
       .image{
          width: 4vw;
          transform: rotate(2deg);
          margin-right: -15px;
        }

        .field{
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: center;

          .label {
            font-size: 2.2rem;
            color: #305fe9;
            margin-bottom: 15px;
            font-weight: 500;
          }

          .btn {
            background:url("/img/bubble-5-min.png") no-repeat center center;
            background-size: 80%;
            text-align: center;
            color: #305fe9;
            width: 100%;
            padding-top: 25px;
            padding-bottom: 20px;
            margin-top: -10px;
            margin-bottom: -10px;
            font-size: 2.5rem;

            &:hover{
              cursor: pointer;
              background:url("/img/bubble-4-min.png") no-repeat center center;
              color: white;
            }
          }
        }
      }
    }

    .image-container {
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .image-1 {
        top: 15%;
        left: -1%;
        position: absolute;
        width: 27%;
      }
      .image-2 {
        top: 38%;
        left: 20%;
        position: absolute;
        width: 5%;
      }

      .image-3 {
        top: 14%;
        right: 17%;
        position: absolute;
        width: 8%;
      }

      .image-4 {
        top: 60%;
        left: 7%;
        position: absolute;
        width: 14%;
      }

      .image-5 {
        top: 21%;
        right: -0.5%;
        position: absolute;
        width: 23%;
      }
    }
  }
   @media (max-width: 1280px) and (min-width: 1025px) {
    .page-container{
      .main-container {
        .title {         
          width: 30%;
        }

      .form-name {
        .field{
          .label {
            font-size: 1.7rem;
            margin-bottom: 5px;
          }

          .input {
            font-size: 1.8rem;
            padding: 5px 30px 5px 30px;
          }
        }
      }

      .form-from {
       .field{
          .label {
            font-size: 1.7rem;
            margin-bottom: 5px;
          }

          .input {
            font-size: 1.8rem;
            padding: 5px 30px 5px 30px;
          }
        }
      }

      .form-submit {    
        .image{        
          margin-right: -10px;
        }

        .field{       
          .label {
            font-size: 1.6rem;        
            margin-bottom: 5px;          
          }

          .btn {         
            font-size: 1.7rem;       
          }
        }
      }
    }
    }
  }
  @media (max-width: 1024px) {
    .page-container{
      .main-container {
        background-size: 90%;
        .title {         
          width: 80%;
        }

        .form-name {
          width: 80%;
          .image{
            width: 10%;
          }
          .field{
            .label {
              font-size: 3rem;
              margin-bottom: 20px;
            }

            .input {
              font-size: 3rem;
              padding: 5px 30px 5px 30px;
            }
          }
        }

        .form-from {
          width: 80%;
          .image{
            width: 10%;
          }
          .field{
            .label {
              font-size: 3rem;
              margin-bottom: 20px;
            }

            .input {
              font-size: 3rem;
              padding: 5px 30px 5px 30px;
            }
          }
        }

        .form-submit {    
          width: 40%;
          .image{     
            width: 23%;   
            margin-right: -15px;
          }

          .field{       
            .label {
              font-size: 3rem;        
              margin-bottom: 15px;          
            }

            .btn {         
              font-size: 3rem;       
            }
          }
        }
      }
      .image-container{
        display: none;
      }
    }
  }
  @media (max-width: 460px) {
    .page-container{
      .main-container {
        background-size: 90%;
        .title {         
          width: 80%;
          margin-bottom: 20px;
          .smiley-left {          
            margin-right: 10px;          
          }
          .smiley-right {           
            margin-left: 10px;           
          }
        }

        .form-name {
          width: 80%;
          margin-bottom: 20px;
          .image{
            width: 10%;
          }
          .field{
            .label {
              font-size: 1.2rem;
              margin-bottom: 0;
            }

            .input {
              font-size: 1.2rem;
              padding: 5px 30px 5px 30px;
            }
          }
        }

        .form-from {
          width: 80%;
          margin-bottom: 20px;
          .image{
            width: 10%;
          }
          .field{
            .label {
              font-size: 1.2rem;
              margin-bottom: 0;
            }

            .input {
              font-size: 1.2rem;
              padding: 5px 30px 5px 30px;
            }
          }
        }

        .form-submit {    
          width: 40%;
          .image{     
            width: 23%;  
            margin-right: -5px; 
          }

          .field{       
            .label {
              font-size: 1.2rem;            
            }

            .btn {         
              font-size: 1.2rem;   
              padding: 10px 30px 10px 30px;    
            }
          }
        }
      }
      .image-container{
        display: none;
      }
    }
  }
</style>
