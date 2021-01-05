<template>
<div class="container">
    <div class="content">
        <div class="atas">
            <div class="fear">
                <img src="/maskot/emo-fear.png" style="width:100%">
            </div>

            <div class="sad">
                <img src="/maskot/emo-sad.png" style="width:100%">
            </div>
        </div>

        <div class="slideshow">
            <!-- placeholder -->
            <div class="logo"> 
                <img src="/logo/EKSPLO2_kuning.png" style="width:100%">
            </div>
        </div>

        <div class="start">
            <button type="button">
                start explore!
            </button>
        </div>

        <div class="bawah">
            <div class="joy">
                <img src="/maskot/emo-joy.png" style="width:100%">
            </div>

            <div class="anger">
                <img src="/maskot/emo-anger.png" style="width:100%">
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }

    .container {
        background-image: url("/bg_home.jpg");
        background-size: cover;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
    }
    
    img {
        vertical-align: middle;
    }

    .fear {
        max-width: 150px;
        position: relative;
        margin-right: 175px;
        transform: rotate(45deg);
        transition: transform 1s;
    }

    .fear:hover {
        transform: rotate(20deg);
    }

    .sad {
        max-width: 150px;
        position: relative;
        margin-left: 175px;
        transition: transform 1s;
    }

    .sad:hover {
        transform: rotate(25deg);
    }

    .joy {
        max-width: 150px;
        position: relative;
        margin-right: 300px;
        transform: rotate(20deg);
        transition: transform 1s;
    }

    .joy:hover {
        transform: rotate(-20deg);
    }

    .anger {
        max-width: 150px;
        position: relative;
        margin-left: 300px;
        transform: rotate(-20deg);
        transition: transform 1s;
    }

    .anger:hover {
        transform: rotate(20deg);
    }

    .atas {
        display: flex;
        justify-content: center;
        padding: 50px;
    }

    .bawah {
        display: flex;
        justify-content: center;
        padding: 25px;
    }

    /* Slideshow container */
    .slideshow {
    max-width: 1000px;
    position: relative;
    margin: auto;
    }

    .start {
        align-content: center;
        vertical-align: middle;
        padding: 20px;
    }

    button {
        font-family: Mechanical Pencil;
        font-size: 50px;
        align-content: center;
        vertical-align: middle;
    }
</style>