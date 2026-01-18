import React, { useState } from 'react'

type Props = {
  onCreate: (subject: string, description: string, userId: number) => void
}

const TicketForm: React.FC<Props> = ({ onCreate }) => {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = subject.trim() && description.trim() && userId > 0

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    
    setIsSubmitting(true)
    try {
      await onCreate(subject.trim(), description.trim(), userId)
      setSubject('')
      setDescription('')
      setUserId(0)
    } finally {
      setIsSubmitting(false)
    }
  }

  const subjectLength = subject.length
  const descriptionLength = description.length

  return (
    <form onSubmit={submit} className="ticket-form">
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="subject">
            <span className="label-text">נושא הפנייה</span>
            <span className="label-required">*</span>
            {subjectLength > 0 && (
              <span className="char-count">{subjectLength}/100</span>
            )}
          </label>
          <input 
            id="subject"
            type="text" 
            value={subject} 
            onChange={e => setSubject(e.target.value.slice(0, 100))}
            placeholder="לדוגמה: בעיה בהתחברות למערכת"
            maxLength={100}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">
            <span className="label-text">מזהה משתמש</span>
            <span className="label-required">*</span>
          </label>
          <input 
            id="userId"
            type="number" 
            value={userId || ''} 
            onChange={e => setUserId(Number(e.target.value))}
            placeholder="הזן/י מספר מזהה"
            min="1"
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="description">
          <span className="label-text">תיאור מפורט</span>
          <span className="label-required">*</span>
          {descriptionLength > 0 && (
            <span className="char-count">{descriptionLength}/500</span>
          )}
        </label>
        <textarea 
          id="description"
          rows={5} 
          value={description} 
          onChange={e => setDescription(e.target.value.slice(0, 500))}
          placeholder="תאר/י בפרוט את הבעיה או השאלה שלך..."
          maxLength={500}
        />
        <small className="help-text">
          💡 ככל שתספק/י יותר פרטים, נוכל לעזור לך טוב יותר
        </small>
      </div>

      <div className="form-footer">
        <button 
          type="submit" 
          disabled={!canSubmit || isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              שולח...
            </>
          ) : (
            <>
              <span className="btn-icon">✉️</span>
              שלח פנייה
            </>
          )}
        </button>
        {!canSubmit && (
          <small className="validation-hint">
            ⚠️ נא למלא את כל השדות החובה
          </small>
        )}
      </div>
    </form>
  )
}

export default TicketForm
