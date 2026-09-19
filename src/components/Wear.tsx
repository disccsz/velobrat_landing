import { IconCloud, IconGauge, IconHome, IconWrench } from './icons'

export function Wear() {
  return (
    <section className="section" aria-labelledby="wear-title" style={{ padding: 0 }}>
      <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <p className="section-label section-label--violet" aria-hidden="true">
          Почему предикт
        </p>
        <h2 id="wear-title" className="section-title" style={{ textWrap: 'balance' }}>
          Дешевле предупредить, чем чинить
        </h2>
        <p className="section-sub" style={{ textWrap: 'pretty' }}>
          Поломка — это не только удар по механике, но и плата за отсутствие ухода. Предиктивное
          обслуживание бережёт деньги, время и нервы.
        </p>

        <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            <div className="glass" style={{ padding: 18, borderColor: 'rgba(248,113,113,0.22)' }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fca5a5', marginBottom: 10 }}>
                После поломки
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)' }}>
                <span>дороже ×3 — детали + работа</span>
                <span>простой без велосипеда</span>
                <span>риск травмы в дороге</span>
              </div>
            </div>
            <div className="glass" style={{ padding: 18, borderColor: 'rgba(0,119,255,0.22)' }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-sky)', marginBottom: 10 }}>
                Предикт
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)' }}>
                <span>выгоднее — меняешь вовремя</span>
                <span>проще — подсказка приходит сама</span>
                <span>приятнее и надёжнее — едешь спокойно</span>
              </div>
            </div>
          </div>

          <div
            className="glass"
            style={{
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-moss)',
            }}
            aria-label="Цепочка деградации"
          >
            <span style={{ color: 'var(--color-sky)', background: 'rgba(0,119,255,0.08)', border: '1px solid rgba(0,119,255,0.15)', padding: '4px 10px', borderRadius: 9999 }}>
              коррозия
            </span>
            <span aria-hidden="true">→</span>
            <span style={{ color: 'var(--color-pearl)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--glass-border)', padding: '4px 10px', borderRadius: 9999 }}>
              деградация
            </span>
            <span aria-hidden="true">→</span>
            <span style={{ color: '#fca5a5', background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.22)', padding: '4px 10px', borderRadius: 9999 }}>
              смерть узла
            </span>
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)', textAlign: 'center', margin: '4px 0 0', textWrap: 'pretty' }}>
            Даже без пробега металл стареет. Влага без смазки даёт абразив — микротрещины — люфт. Наш вес для «хранения» никогда не обнуляется.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 12,
            marginTop: 20,
          }}
          role="list"
          aria-label="Что влияет и как"
        >
          <div className="glass" style={{ padding: 16 }} role="listitem">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--color-snow)', marginBottom: 8 }}>
              <IconCloud size={16} aria-hidden="true" /> Погода
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)', margin: 0 }}>
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Как бьёт:</strong> дождь и грязь — главный ускоритель для цепи.<br />
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Без ухода:</strong> плёнка масла смывается → трение растёт.
            </p>
          </div>
          <div className="glass" style={{ padding: 16 }} role="listitem">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--color-snow)', marginBottom: 8 }}>
              <IconGauge size={16} aria-hidden="true" /> Стиль
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)', margin: 0 }}>
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Как бьёт:</strong> резкие старты рвут трансмиссию.<br />
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Без ухода:</strong> растянутая цепь съедает кассету.
            </p>
          </div>
          <div className="glass" style={{ padding: 16 }} role="listitem">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--color-snow)', marginBottom: 8 }}>
              <IconHome size={16} aria-hidden="true" /> Хранение
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)', margin: 0 }}>
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Как бьёт:</strong> улица — конденсат, гараж — сухо.<br />
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Без ухода:</strong> коррозия не сбрасывается при ТО.
            </p>
          </div>
          <div className="glass" style={{ padding: 16 }} role="listitem">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--color-snow)', marginBottom: 8 }}>
              <IconWrench size={16} aria-hidden="true" /> Деталь
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-pearl)', margin: 0 }}>
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Как бьёт:</strong> у каждой свой ресурс.<br />
              <strong style={{ color: 'var(--color-snow)', fontWeight: 600 }}>Без ухода:</strong> пропустил смазку — ресурс сгорает быстрее.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
