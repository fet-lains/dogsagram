<template>
  <section class="not-found">
    <h1>Dogs are not found!</h1>
    <p>
      You can find some
      <router-link to="/">here</router-link>
    </p>
  </section>
</template>

<style lang="less" scoped>
  .not-found {
    text-align: center;
    padding-top: 100px;
    h1 {
      font-size: 2.2rem;
      text-transform: uppercase;
    }
    p {
      margin-top: 30px;
    }
    a {
      font-weight: 700;
      color: var(--loader);
    }
  }
  @media @md {
    .not-found {
      h1 {
        font-size: 2.6rem;
      }
      p {
        font-size: 1.8rem;
      }
    }
  }
</style>
