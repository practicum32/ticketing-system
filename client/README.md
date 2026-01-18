# Ticketing System - מערכת ניהול פניות

---

## 🇮🇱 Hebrew / עברית

### תיאור הפרויקט

מערכת בסיסית ומקצועית לניהול פניות שירות לקוחות. המערכת מאפשרת ללקוחות לפתוח פניות, לצפות ברשימת הפניות ולסגור אותן.

### תכונות עיקריות

- פתיחת פניות חדשות עם נושא, תיאור ומזהה משתמש
- צפייה ברשימת כל הפניות
- סגירת פניות
- סינון פניות לפי סטטוס: פתוחות, סגורות או הכל
- ממשק משתמש מודרני ומעוצב
- תמיכה מלאה בעברית עם כיוון ימין לשמאל

### טכנולוגיות

**צד שרת:**
- .NET 8 Minimal API
- C#
- אחסון בזיכרון

**צד לקוח:**
- React 18 עם TypeScript
- Vite
- CSS3 מודרני
- תמיכה מלאה ב-RTL

### הנחיות הפעלה

#### דרישות מקדימות
- Node.js גרסה 18 ומעלה
- .NET SDK 8.0

#### שלב 1: הפעלת השרת
```bash
cd server/Ticketing.Api
dotnet run --urls "http://localhost:5199"
```

השרת יהיה זמין בכתובת: http://localhost:5199

#### שלב 2: הפעלת הלקוח
בטרמינל נפרד:
```bash
cd client
npm install
npm run dev
```

האפליקציה תהיה זמינה בכתובת: http://localhost:5173

### מבנה הפרויקט

```
client/
├── src/
│   ├── api/              # קריאות לשרת
│   │   └── ticketsApi.ts
│   ├── components/       # קומפוננטים
│   │   ├── FilterBar.tsx
│   │   ├── TicketForm.tsx
│   │   └── TicketList.tsx
│   ├── models/           # טיפוסים
│   │   └── Ticket.ts
│   ├── App.tsx          # קומפוננט ראשי
│   ├── main.tsx         # נקודת כניסה
│   ├── styles.css       # עיצוב
│   └── vite-env.d.ts    # הגדרות TypeScript
├── index.html
├── package.json
├── vite.config.ts
└── .env
```

### ממשק API

**קבלת כל הפניות**
```
GET /tickets
```

**יצירת פנייה חדשה**
```
POST /tickets
Body: { "userId": number, "subject": string, "description": string }
```

**סגירת פנייה**
```
PUT /tickets/{id}/close
```

### החלטות עיצוב

- **ניווט פשוט:** מעבר בין מסך רשימה למסך יצירת פנייה למניעת בלבול
- **הבחנה ויזואלית:** פניות פתוחות בכחול, פניות סגורות באפור
- **הפרדת שכבות:** הפרדה ברורה בין רכיבים, שירותים ומודלים
- **אחסון בזיכרון:** ללא בסיס נתונים בהתאם לדרישות

### 🔐 הערה חשובה - מזהה משתמש (User ID)

**במערכת אמיתית:**  
במערכת ייצור, מזהה המשתמש היה מתקבל אוטומטית ממערכת ההתחברות (Authentication). המשתמש היה מתחבר עם שם משתמש וסיסמה, והמערכת הייתה יודעת את זהותו מה-session או ה-token.

**בתרגיל הזה:**  
בהתאם לדרישות התרגיל - "אין צורך לממש התחברות או הרשאות גישה" - השדה UserId בטופס הוא **פתרון זמני** שמאפשר לעמוד בדרישה של שדה UserId במודל, ללא מערכת אימות מלאה.

**שיפור אפשרי:**  
במימוש עתידי, ניתן להחליף את השדה הידני ב:
- מערכת התחברות (JWT Token / Session)
- שמירת המשתמש המחובר ב-LocalStorage
- שליחה אוטומטית של ה-UserId בכל בקשה

---

## 🇬🇧 English

### Project Description

A basic and professional customer support ticketing system. The system allows customers to open tickets, view ticket lists, and close them.

### Main Features

- Create new tickets with subject, description, and user ID
- View list of all tickets
- Close tickets
- Filter tickets by status: open, closed, or all
- Modern and styled user interface
- Full Hebrew support with RTL direction

### Technologies

**Backend:**
- .NET 8 Minimal API
- C#
- In-memory storage

**Frontend:**
- React 18 with TypeScript
- Vite
- Modern CSS3
- Full RTL support

### Installation & Running

#### Prerequisites
- Node.js version 18 or higher
- .NET SDK 8.0

#### Step 1: Run the Server
```bash
cd server/Ticketing.Api
dotnet run --urls "http://localhost:5199"
```

Server will be available at: http://localhost:5199

#### Step 2: Run the Client
In a separate terminal:
```bash
cd client
npm install
npm run dev
```

Application will be available at: http://localhost:5173

### Project Structure

```
client/
├── src/
│   ├── api/              # API calls
│   │   └── ticketsApi.ts
│   ├── components/       # Components
│   │   ├── FilterBar.tsx
│   │   ├── TicketForm.tsx
│   │   └── TicketList.tsx
│   ├── models/           # Types
│   │   └── Ticket.ts
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   ├── styles.css       # Styles
│   └── vite-env.d.ts    # TypeScript definitions
├── index.html
├── package.json
├── vite.config.ts
└── .env
```

### API Endpoints

**Get all tickets**
```
GET /tickets
```

**Create new ticket**
```
POST /tickets
Body: { "userId": number, "subject": string, "description": string }
```

**Close ticket**
```
PUT /tickets/{id}/close
```

### Design Decisions

- **Simple navigation:** Switch between list and create screens to avoid confusion
- **Visual distinction:** Open tickets in blue, closed tickets in gray
- **Layer separation:** Clear separation between components, services, and models
- **In-memory storage:** No database as per requirements

### 🔐 Important Note - User ID

**In a real system:**  
In a production system, the user ID would be obtained automatically from the authentication system. The user would log in with username and password, and the system would know their identity from the session or token.

**In this assignment:**  
According to the assignment requirements - "no need to implement authentication or authorization" - the UserId field in the form is a **temporary solution** that allows meeting the UserId field requirement in the model, without a full authentication system.

**Possible improvement:**  
In a future implementation, the manual field could be replaced with:
- Authentication system (JWT Token / Session)
- Saving the logged-in user in LocalStorage
- Automatic sending of UserId in every request

---

### 📝 Notes

- No authentication or authorization system (as per requirements)
- All data is stored in memory and will be lost on server restart
- The project is built with best practices and can be easily extended

### ⚠️ Known Limitations / הגבלות ידועות

**עברית:**
- **אחסון זמני:** כל הנתונים נשמרים בזיכרון ונמחקים כשהשרת נסגר
- **ללא אימות:** כל משתמש יכול לראות ולסגור את כל הפניות
- **ללא עריכה:** אין אפשרות לערוך פנייה קיימת, רק לסגור אותה
- **מזהה משתמש ידני:** המשתמש צריך להזין את ה-ID שלו בעצמו

**English:**
- **Temporary storage:** All data is stored in memory and deleted when server stops
- **No authentication:** Any user can view and close all tickets
- **No editing:** Cannot edit existing tickets, only close them
- **Manual user ID:** User must enter their own ID manually

### 🔧 Troubleshooting / פתרון בעיות

**עברית:**

**בעיה: "npm is not recognized"**
- **פתרון:** יש להתקין Node.js מ-https://nodejs.org או לרענן את משתני הסביבה:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

**בעיה: "Port 5199 already in use"**
- **פתרון:** יש תהליך אחר שמשתמש בפורט. למצוא ולסגור:
```powershell
netstat -ano | Select-String "5199"
Stop-Process -Id <process-id> -Force
```

**בעיה: CORS errors בדפדפן**
- **פתרון:** לוודא שהשרת רץ על פורט 5199 והלקוח על פורט 5173. קובץ Program.cs כבר מכיל הגדרות CORS מתאימות.

**בעיה: הנתונים נעלמים**
- **הסבר:** זה נורמלי - הנתונים בזיכרון ונמחקים כשהשרת נסגר. זו לא באג!



