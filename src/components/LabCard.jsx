import './LabCard.css'

export default function LabCard({ title, fact, badge }) {
  return (
    <div className="lab-card observe-fade">
      <p className="lab-card__title">{title}</p>
      <p className="lab-card__fact">{fact}</p>
      <span className="lab-card__badge">{badge}</span>
    </div>
  )
}
