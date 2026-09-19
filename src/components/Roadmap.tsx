export function Roadmap() {
  return (
    <section className="section" aria-labelledby="roadmap-title">
      <div className="container">
        <p className="section-label section-label--green" aria-hidden="true">Дорожная карта</p>
        <h2 id="roadmap-title" className="section-title">Что уже есть и что будет</h2>
        <p className="section-sub">Честно — без обещаний на завтра</p>
        <div className="roadmap" style={{ marginTop: 24 }}>
          <div className="roadmap-col roadmap-col--done">
            <h3 className="roadmap-head"><i aria-hidden="true">✓</i> В MVP</h3>
            <ul>
              <li>Авторизация VK</li>
              <li>Профиль</li>
              <li>Гараж и умный учёт износа</li>
              <li>Справочник</li>
              <li>ИИ-помощник</li>
            </ul>
          </div>
          <div className="roadmap-col roadmap-col--soon">
            <h3 className="roadmap-head"><i aria-hidden="true">◷</i> Вне MVP <span className="soon-badge">Скоро</span></h3>
            <ul>
              <li>Поиск владельца по QR / номеру рамы / фото <span className="soon-badge">Скоро</span></li>
              <li>Сообщество (маршруты / обмен / инициативы) <span className="soon-badge">Скоро</span></li>
              <li>Уведомления о ТО <span className="soon-badge">Скоро</span> <span style={{ fontSize: 12, color: 'var(--color-moss)' }}>(сейчас — подсказки в гараже)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
