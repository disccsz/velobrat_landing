import { IconCloud, IconGauge, IconHome, IconWrench } from './icons'

const FACTORS = [
  { icon: <IconCloud size={16} aria-hidden="true" />, title: 'Погода', text: 'Дождь и грязь ускоряют износ цепи сильнее всего — вода и абразив вымывают смазку, повышая трение и ускоряя растяжение звеньев.' },
  { icon: <IconGauge size={16} aria-hidden="true" />, title: 'Стиль', text: 'Резкие ускорения и перегрузки рвут трансмиссию — растянутая цепь начинает «съедать» кассету и звёзды системы.' },
  { icon: <IconHome size={16} aria-hidden="true" />, title: 'Хранение', text: 'Уличное хранение — конденсат и перепады температур, гараж — сухо и стабильно. Коррозия от хранения не сбрасывается на ТО.' },
  { icon: <IconWrench size={16} aria-hidden="true" />, title: 'Деталь', text: 'У каждого узла свой ресурс. Пропущенная смазка или перетяжка сокращают его в разы — и ускоряют износ соседних деталей.' },
]

export function Wear() {
  return (
    <section id="wear" className="section wear" aria-labelledby="wear-title">
      <div className="container wear-inner">
        <p className="section-label section-label--violet" aria-hidden="true">
          Почему предикт
        </p>
        <h2 id="wear-title" className="section-title wear-title">
          Дешевле предупредить, чем чинить
        </h2>
        <p className="section-sub wear-sub">
          Внезапная поломка — не только результат аварии, но и неизбежное следствие неправильного ухода и механического износа. Своевременное обслуживание бережёт деньги, время и нервы.
        </p>

        <div className="wear-grid">
          <div className="wear-compare">
            <div className="glass wear-card wear-card--bad">
              <div className="mono wear-card-title wear-card-title--bad">
                После поломки
              </div>
              <div className="wear-card-list">
                <span>заметно дороже — детали + работа</span>
                <span>простой без велосипеда</span>
                <span>риск травмы в дороге</span>
              </div>
            </div>
            <div className="glass wear-card wear-card--good">
              <div className="mono wear-card-title wear-card-title--good">
                Предикт
              </div>
              <div className="wear-card-list">
                <span>выгоднее — меняешь вовремя</span>
                <span>проще — подсказка приходит сама</span>
                <span>приятнее и надёжнее — едешь спокойно</span>
              </div>
            </div>
          </div>

          <div
            className="glass wear-chain"
            role="group"
            aria-label="Цепочка деградации"
          >
            <span className="wear-pill wear-pill--start">
              коррозия
            </span>
            <span aria-hidden="true">→</span>
            <span className="wear-pill wear-pill--mid">
              деградация
            </span>
            <span aria-hidden="true">→</span>
            <span className="wear-pill wear-pill--end">
              отказ узла
            </span>
          </div>

          <p className="wear-note">
            Даже простаивая, компоненты деградируют — смазка высыхает, элементы разрушаются от ультрафиолета, влаги и перепадов температур, металл ржавеет.
          </p>
        </div>

        <div
          className="wear-factors-grid"
          role="list"
          aria-label="Что влияет и как"
        >
          {FACTORS.map((f) => (
            <div className="glass wear-factor-card" role="listitem" key={f.title}>
              <div className="wear-factor-head">
                {f.icon} {f.title}
              </div>
              <p className="wear-factor-text">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
