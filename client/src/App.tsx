import React, { useEffect, useMemo, useState } from 'react'
import { Ticket } from './models/Ticket'
import { getTickets, createTicket, closeTicket } from './api/ticketsApi'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import FilterBar, { Filter } from './components/FilterBar'

type View = 'list' | 'new'

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [currentView, setCurrentView] = useState<View>('list')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTickets()
      setTickets(data)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load tickets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onCreate = async (subject: string, description: string, userId: number) => {
    try {
      const created = await createTicket({ subject, description, userId })
      setTickets(prev => [created, ...prev])
      setCurrentView('list')
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 4000)
    } catch (e: any) {
      alert('❌ שגיאה ביצירת הפנייה: ' + (e?.message ?? 'Failed to create ticket'))
    }
  }

  const onClose = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך לסגור פנייה זו?')) return
    
    try {
      await closeTicket(id)
      setTickets(prev => prev.map(t => t.ticketId === id ? { ...t, isClosed: true } : t))
    } catch (e: any) {
      alert('❌ שגיאה בסגירת הפנייה: ' + (e?.message ?? 'Failed to close ticket'))
    }
  }

  const filtered = useMemo(() => {
    switch (filter) {
      case 'open':
        return tickets.filter(t => !t.isClosed)
      case 'closed':
        return tickets.filter(t => t.isClosed)
      default:
        return tickets
    }
  }, [tickets, filter])

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => !t.isClosed).length,
    closed: tickets.filter(t => t.isClosed).length
  }), [tickets])

  return (
    <div className="container">
      <header className="app-header">
        <h1>🎫 מערכת ניהול פניות</h1>
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">סה"כ</span>
          </div>
          <div className="stat-item open">
            <span className="stat-value">{stats.open}</span>
            <span className="stat-label">פתוחות</span>
          </div>
          <div className="stat-item closed">
            <span className="stat-value">{stats.closed}</span>
            <span className="stat-label">סגורות</span>
          </div>
        </div>
      </header>

      {showSuccessMessage && (
        <div className="success-banner">
          <span className="success-icon">✅</span>
          הפנייה נוצרה בהצלחה!
        </div>
      )}

      {currentView === 'list' ? (
        <section className="card">
          <div className="list-header">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <FilterBar value={filter} onChange={setFilter} />
              <button 
                onClick={() => setCurrentView('new')} 
                className="primary-button new-ticket-btn"
              >
                <span className="btn-icon">+</span>
                פנייה חדשה
              </button>
            </div>
          </div>
          {loading && (
            <div className="loading-state">
              <div className="spinner large"></div>
              <p>טוען פניות...</p>
            </div>
          )}
          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <div>
                <strong>שגיאה בטעינת הפניות</strong>
                <p>{error}</p>
              </div>
              <button onClick={load} className="retry-btn">נסה שוב</button>
            </div>
          )}
          {!loading && !error && (
            <TicketList tickets={filtered} onClose={onClose} />
          )}
        </section>
      ) : (
        <section className="card">
          <div style={{ marginBottom: '24px' }}>
            <button onClick={() => setCurrentView('list')} className="back-button">
              <span>←</span>
              חזרה לרשימה
            </button>
          </div>
          <h2>📝 פתיחת פנייה חדשה</h2>
          <TicketForm onCreate={onCreate} />
        </section>
      )}
    </div>
  )
}

export default App
