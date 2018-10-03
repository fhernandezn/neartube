<template>
  <div id="app">
      <nav>
        <router-link to="/">
          <img src="https://s3-us-west-1.amazonaws.com/nearsoft-com-media/uploads/2018/06/nearsoft-aic.svg" alt="">
        </router-link>
      </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  width: 100%;
  height: 50px;
  margin: 20px 0;
}

nav img {
  height: 100%;
  float: left;
}

body {
  margin: 20px 10%;
}
</style>
