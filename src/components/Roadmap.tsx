export function Roadmap() {
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="container">
        <p className="section-label section-label--green" aria-hidden="true">Дорожная карта</p>
        <h2 id="roadmap-title" className="section-title">Что уже есть и что будет</h2>
        <p className="section-sub">Что уже работает, а что — в планах</p>
        <div className="roadmap">
          <div className="roadmap-col roadmap-col--done">
            <h3 className="roadmap-head"><span aria-hidden="true">✓</span> В MVP</h3>
            <ul>
              <li>Авторизация VK</li>
              <li>Профиль</li>
              <li>Гараж и умный учёт износа</li>
              <li>Рекомендации по ТО — подсказки в гараже</li>
              <li>Справочник</li>
              <li>ИИ-помощник</li>
            </ul>
          </div>
          <div className="roadmap-col roadmap-col--soon">
            <h3 className="roadmap-head"><span aria-hidden="true">◷</span> Вне MVP <span className="soon-badge">Скоро</span></h3>
            <ul>
              <li>Поиск владельца по QR / номеру рамы / фото <span className="soon-badge">Скоро</span></li>
              <li>Сообщество (маршруты / обмен / инициативы) <span className="soon-badge">Скоро</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
