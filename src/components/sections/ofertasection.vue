<template>
  <footer class="legal-notice">
    <AppContainer>
      <p>
        Вся представленная на сайте информация, касающаяся стоимости товаров и услуг, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации.
      </p>
    </AppContainer>
  </footer>
</template>

<style scoped>
.legal-notice {
  padding: 24px 0 34px;
  background: #fff;
}

.legal-notice p {
  max-width: 920px;
  color: rgba(31, 31, 31, 0.46);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.65;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 620px) {
  .legal-notice {
    padding: 20px 0 28px;
  }

  .legal-notice p {
    font-size: 11px;
    line-height: 1.6;
  }
}
</style>
