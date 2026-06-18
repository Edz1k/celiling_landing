<template>
  <footer class="legal-notice">
    <AppContainer>
      <div class="legal-notice__panel">
        <p class="legal-notice__label">
          Информационный характер сайта
        </p>

        <p>
          Сайт носит информационный характер. Материалы, описания, изображения, примеры работ и указанные цены помогают предварительно сориентироваться в услугах, но не являются окончательными условиями заказа.
        </p>

        <p>
          Вся представленная на сайте информация, касающаяся стоимости товаров и услуг, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации.
        </p>
      </div>
    </AppContainer>
  </footer>
</template>

<style scoped>
/* Юридическая памятка внизу сайта: заметная, но не спорит с основными CTA. */
.legal-notice {
  padding: 18px 0 36px;
  background: #fff;
}

.legal-notice__panel {
  max-width: 980px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 20px;
  background: rgba(255, 250, 243, 0.78);
  box-shadow: 0 14px 38px rgba(31, 31, 31, 0.05);
  margin: 0 auto;
  padding: 20px 24px;
  text-align: center;
}

.legal-notice__panel p {
  max-width: 900px;
  color: rgba(31, 31, 31, 0.58);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.65;
  margin: 0 auto;
}

.legal-notice__panel p + p {
  margin-top: 8px;
}

.legal-notice__label {
  color: var(--landing-gold-dark) !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em;
  line-height: 1.2 !important;
  margin-bottom: 10px !important;
  text-transform: uppercase;
}

@media (max-width: 620px) {
  .legal-notice {
    padding: 16px 0 30px;
  }

  .legal-notice__panel {
    border-radius: 18px;
    padding: 18px;
  }

  .legal-notice__panel p {
    font-size: 11px;
    line-height: 1.6;
  }
}
</style>
