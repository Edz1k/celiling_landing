<script setup lang="ts">
// Преимущества слева: коротко объясняют, почему клиенту удобно работать с компанией.
const benefits = [
  'Бесплатный замер и консультация',
  'Смета до начала работ',
  'Монтаж без пыли и мусора',
  'Гарантия на материалы и установку',
]

// Карточки доверия справа: цифры должны быстро считываться и усиливать оффер.
const stats = [
  {
    value: '15 лет',
    label: 'гарантия на материалы и монтаж',
  },
  {
    value: '1 день',
    label: 'обычный срок установки в комнате',
  },
  {
    value: '0 ₽',
    label: 'замер и консультация по городу',
  },
  {
    value: '1000+',
    label: 'выполненных заказов',
  },
]

// Процесс работы: показывает клиенту понятный путь от заявки до готового результата.
const workSteps = [
  'Заявка',
  'Замер',
  'Смета',
  'Монтаж',
  'Готовый потолок',
]
</script>

<template>
  <section id="about" class="about-section">
    <AppContainer>
      <div class="about-section__content">
        <!-- Верх блока: слева смысл и преимущества, справа спокойные карточки доверия. -->
        <div class="about-section__grid">
          <div class="about-section__text">
            <p class="about-section__label">
              О компании
            </p>

            <h2>Работаем так, чтобы вам не пришлось контролировать каждый этап</h2>

            <p class="about-section__description">
              Берем на себя весь процесс: от замера и подбора материалов до монтажа и уборки после работ.
              Вы заранее понимаете стоимость, сроки и итоговый результат.
            </p>

            <ul class="about-section__benefits" aria-label="Преимущества работы с компанией">
              <li v-for="benefit in benefits" :key="benefit">
                <span aria-hidden="true">✓</span>
                {{ benefit }}
              </li>
            </ul>
          </div>

          <div class="about-section__facts" aria-label="Ключевые показатели компании">
            <div v-for="stat in stats" :key="stat.value" class="about-section__fact">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Нижний блок: короткая цепочка процесса, чтобы снять тревогу перед заказом. -->
        <div class="about-section__process">
          <div class="about-section__process-head">
            <p>Как проходит работа</p>
            <span>От первого сообщения до аккуратно смонтированного потолка.</span>
          </div>

          <ol class="about-section__steps">
            <li v-for="(step, index) in workSteps" :key="step" class="about-section__step">
              <span class="about-section__step-number">{{ index + 1 }}</span>
              <strong>{{ step }}</strong>
            </li>
          </ol>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Общая подложка секции: отделяет блок о компании от соседних секций мягким молочным фоном. */
.about-section {
  padding: 86px 0;
  background: var(--landing-milk);
}

.about-section__content {
  display: grid;
  gap: 38px;
}

/* Desktop-сетка: смысловой текст слева, статистика доверия справа. */
.about-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1fr);
  align-items: center;
  gap: 48px;
}

.about-section__text {
  max-width: 620px;
}

.about-section__label {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0 0 16px;
  text-transform: uppercase;
}

.about-section__text h2 {
  color: var(--landing-text);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.08;
  margin: 0;
}

.about-section__description {
  max-width: 580px;
  color: var(--landing-muted);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.72;
  margin: 22px 0 0;
}

/* Список выгод: галочки помогают быстро просканировать практическую пользу. */
.about-section__benefits {
  display: grid;
  gap: 12px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.about-section__benefits li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--landing-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
}

.about-section__benefits span {
  display: grid;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  background: rgba(201, 154, 75, 0.12);
  color: var(--landing-gold-dark);
  font-size: 14px;
  font-weight: 600;
}

/* Статистика в сетке 2x2: компактно и без ощущения тяжелого блока. */
.about-section__facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.about-section__fact {
  display: grid;
  gap: 12px;
  min-height: 164px;
  align-content: end;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 18px 42px rgba(31, 31, 31, 0.06);
  padding: 24px;
}

.about-section__fact strong {
  color: var(--landing-gold-dark);
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 700;
  line-height: 1;
}

.about-section__fact span {
  max-width: 220px;
  color: var(--landing-muted);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

/* Процесс работы: отдельная спокойная карточка с понятной последовательностью действий. */
.about-section__process {
  display: grid;
  gap: 24px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 46px rgba(31, 31, 31, 0.05);
  padding: 28px;
}

.about-section__process-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
}

.about-section__process-head p {
  color: var(--landing-text);
  font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 700;
  line-height: 1.15;
  margin: 0;
}

.about-section__process-head span {
  max-width: 380px;
  color: var(--landing-muted);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  text-align: right;
}

.about-section__steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.about-section__step {
  position: relative;
  display: grid;
  gap: 12px;
  min-height: 118px;
  align-content: center;
  border: 1px solid rgba(201, 154, 75, 0.14);
  border-radius: 20px;
  background: rgba(247, 242, 235, 0.72);
  padding: 18px;
}

.about-section__step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -11px;
  z-index: 1;
  width: 18px;
  height: 1px;
  background: rgba(201, 154, 75, 0.38);
}

.about-section__step-number {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: var(--landing-gold);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
}

.about-section__step strong {
  color: var(--landing-text);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

/* Tablet: секция перестраивается в одну колонку, чтобы не сжимать текст и карточки. */
@media (max-width: 980px) {
  .about-section__grid {
    grid-template-columns: 1fr;
  }

  .about-section__text {
    max-width: none;
  }

  .about-section__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .about-section__step:not(:last-child)::after {
    display: none;
  }
}

/* Mobile: все блоки идут одной колонкой, карточки становятся компактнее. */
@media (max-width: 680px) {
  .about-section {
    padding: 66px 0;
  }

  .about-section__grid {
    gap: 34px;
  }

  .about-section__description {
    font-size: 15px;
    line-height: 1.68;
  }

  .about-section__facts,
  .about-section__steps {
    grid-template-columns: 1fr;
  }

  .about-section__fact {
    min-height: 132px;
    padding: 22px;
  }

  .about-section__process {
    border-radius: 24px;
    padding: 22px;
  }

  .about-section__process-head {
    display: grid;
    gap: 10px;
  }

  .about-section__process-head span {
    max-width: none;
    text-align: left;
  }

  .about-section__step {
    min-height: auto;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
}
</style>
