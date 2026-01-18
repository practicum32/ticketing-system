import React, { useState } from 'react'
import { Ticket } from '../models/Ticket'

type Props = {
  tickets: Ticket[]
  onClose: (id: number) => void
}

const TicketList: React.FC<Props> = ({ tickets, onClose }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p>אין פניות לתצוגה</p>
        <small>כשתיצור פניות חדשות, הן יופיעו כאן</small>
      </div>
    )
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="tickets-container">
      {tickets.map(t => {
        const isExpanded = expandedId === t.ticketId
        return (
          <div 
            key={t.ticketId} 
            className={`ticket ${t.isClosed ? 'ticket-closed' : 'ticket-open'} ${isExpanded ? 'expanded' : 'collapsed'}`}
          >
            <div className="ticket-header" onClick={() => toggleExpand(t.ticketId)}>
              <div className="ticket-main-info">
                <div className="ticket-title-row">
                  <h3>{t.subject}</h3>
                  <div className={`status ${t.isClosed ? 'closed' : 'open'}`}>
                    <span className="status-icon">{t.isClosed ? '✓' : '●'}</span>
                    {t.isClosed ? 'סגורה' : 'פתוחה'}
                  </div>
                </div>
                <div className="ticket-meta">
                  <span className="ticket-id">#{t.ticketId}</span>
                  <span className="ticket-separator">•</span>
                  <span className="ticket-user">משתמש {t.userId}</span>
                </div>
              </div>
              <div className="expand-icon">
                {isExpanded ? '▼' : '◀'}
              </div>
            </div>

            {isExpanded && (
              <div className="ticket-details">
                <div className="ticket-description">
                  <strong>תיאור הפנייה:</strong>
                  <p>{t.description}</p>
                </div>
                <div className="ticket-actions">
                  {!t.isClosed ? (
                    <button 
                      className="close-ticket-btn" 
                      onClick={(e) => {
                        e.stopPropagation()
                        onClose(t.ticketId)
                      }}
                    >
                      <span className="btn-icon">✓</span>
                      סגור פנייה
                    </button>
                  ) : (
                    <div className="ticket-closed-badge">
                      <span className="closed-icon">🔒</span>
                      הפנייה נסגרה
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TicketList
