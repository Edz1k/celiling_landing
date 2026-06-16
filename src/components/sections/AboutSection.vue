<template>
  <section id="about" class="about-section">
    <AppContainer>
      <!-- Блок о компании: слева текст, справа короткие факты доверия -->
      <div class="about-section__grid">
        <SectionTitle
          align="left"
          eyebrow="О компании"
          title="Аккуратный монтаж и понятный процесс без лишней суеты"
          subtitle="Этот блок позже наполним реальными фактами: опыт, бригады, производство, договор, гарантия и условия работы по Новосибирску."
        />

        <!-- Эти цифры позже можно заменить на реальные показатели компании -->
        <div class="about-section__facts">
          <div class="about-section__fact">
            <strong>15 лет</strong>
            <span>гарантия на материалы и монтаж</span>
          </div>
          <div class="about-section__fact">
            <strong>1 день</strong>
            <span>обычный срок установки в комнате</span>
          </div>
          <div class="about-section__fact">
            <strong>0 ₽</strong>
            <span>замер и консультация по городу</span>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Секция доверия: мягкая подложка отделяет ее от каталога и портфолио */
.about-section {
  padding: 82px 0;
  background: var(--landing-milk);
}

/* Desktop-сетка: текст и факты рядом */
.about-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1fr);
  align-items: center;
  gap: 44px;
}

/* Карточки с короткими фактами */
.about-section__facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.about-section__fact {
  display: grid;
  gap: 14px;
  min-height: 180px;
  align-content: end;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.7);
  padding: 22px;
}

.about-section__fact strong {
  color: var(--landing-gold-dark);
  font-size: clamp(30px, 4vw, 48px);
  font-weight: 950;
  line-height: 1;
}

.about-section__fact span {
  color: var(--landing-muted);
  font-size: 14px;
  font-weight: 750;
  line-height: 1.45;
}

/* Mobile: блоки идут друг под другом */
@media (max-width: 900px) {
  .about-section__grid {
    grid-template-columns: 1fr;
  }
}

/* Маленькие экраны: факты одной колонкой */
@media (max-width: 620px) {
  .about-section {
    padding: 64px 0;
  }

  .about-section__facts {
    grid-template-columns: 1fr;
  }

  .about-section__fact {
    min-height: 138px;
  }
}
</style>
