<template>
  <section class="oferta-section">
    <AppContainer>
      <div class="oferta-section__panel">
        <div>
          <p class="oferta-section__eyebrow">
            Документы
          </p>
          <h2>Публичная оферта</h2>
          <p>
            Перед оформлением заявки можно ознакомиться с условиями работы и основными правилами оказания услуг.
          </p>
        </div>

        <RouterLink class="oferta-section__link" to="/oferta">
          Читать оферту
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.oferta-section {
  padding: 42px 0;
  background: #fff;
}

.oferta-section__panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 24px;
  background: rgba(255, 250, 243, 0.86);
  box-shadow: 0 16px 42px rgba(31, 31, 31, 0.06);
  padding: 24px;
}

.oferta-section__eyebrow {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0 0 10px;
  text-transform: uppercase;
}

.oferta-section h2 {
  color: var(--landing-text);
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  line-height: 1.12;
  margin: 0;
}

.oferta-section p {
  max-width: 620px;
  color: var(--landing-muted);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  margin: 12px 0 0;
}

.oferta-section__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  gap: 10px;
  min-height: 46px;
  border-radius: 999px;
  background: var(--landing-gold);
  box-shadow: 0 14px 28px rgba(201, 154, 75, 0.22);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.15;
  padding: 0 20px;
  text-decoration: none;
  transition:
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.oferta-section__link:hover {
  background: var(--landing-gold-dark);
  box-shadow: 0 18px 34px rgba(201, 154, 75, 0.32);
  transform: translateY(-1px);
}

@media (max-width: 680px) {
  .oferta-section__panel {
    display: grid;
    padding: 22px;
  }

  .oferta-section__link {
    width: 100%;
  }
}
</style>
