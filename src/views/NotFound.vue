<template>
  <main>
    <div class="main__wrapper">
      <img src="../assets/Team-Rocket.png" />
      <p class="not__found__text"><span> The rocket team </span> has won this time.</p>
      <button @click="$router.push('/')">Return</button>
    </div>
    <h1>404</h1>
  </main>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
main {
  background-color: #D93E30;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  color: #00000080;
  font-size: 700px;
  font-weight: 700;
  position: relative;
}

img {
  width: 90%;
  height: 90%;
}

.not__found__text {
  color: #000;
  font-size: 48px;
  font-weight: 700;
}

.not__found__text>span {
  color: #fff;
}

.main__wrapper {
  position: absolute;
  z-index: 1;
  text-align: center;
}

button {
  background-color: #F2CB07;
  font-size: 23px;
  box-shadow: 0px -9px 0px 0px #0000002E inset;
  border: none;
  border-radius: 11px;
  padding: 20px 40px;
}
</style>