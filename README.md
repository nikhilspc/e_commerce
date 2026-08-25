🛒 E-Commerce Web Application

A full-stack e-commerce platform with role-based access control, built with Django REST Framework (backend) and React (frontend). Supports secure JWT authentication, admin/user product management, and CORS/CSRF-compliant API architecture — fully tested via Postman.

📌 Features
🔐 User Authentication — Register & Login using JWT (JSON Web Tokens)
👤 Role-Based Access Control — Admins can Add/Edit/Delete products; regular users have read-only access
🛍️ Product Management (CRUD) — Create, Read, Update, Delete products via REST API
🌐 CORS Configured — Secure cross-origin communication between frontend and backend
🛡️ CSRF Protection — Django's built-in CSRF handling for session-based admin panel
⚡ RESTful API — Clean, resource-based endpoints tested thoroughly with Postman
💻 React Frontend — Dynamic UI with protected actions based on user role
🏗️ Tech Stack
Layer	Technology
Frontend	React (Vite), Axios, React Router DOM
Backend	Django, Django REST Framework
Authentication	djangorestframework-simplejwt (JWT)
Database	SQLite (development)
API Testing	Postman
CORS Handling	django-cors-headers
📂 Project Structure
ecommerce/
├── backend/
│   ├── ecom_backend/
│   │   ├── settings.py       # CORS, JWT, installed apps config
│   │   └── urls.py           # Project-level routing
│   ├── store/
│   │   ├── models.py         # Product & UserProfile models
│   │   ├── serializers.py    # JSON <-> Model conversion
│   │   ├── views.py          # API logic & permissions
│   │   └── urls.py           # App-level routing
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── api.js             # Axios instance with token interceptor
    │   ├── App.jsx             # Route definitions
    │   ├── App.css             # Styling
    │   └── pages/
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       └── Products.jsx
    └── package.json
🔑 Authentication & Authorization
Users register and log in via JWT-based authentication.
On login, an access token (short-lived) and refresh token are issued.
Every protected request carries the token via the Authorization: Bearer <token> header.
A custom UserProfile model with an is_admin flag controls permissions:
Admin → Full CRUD access on products
Regular user → Read-only (GET) access
Custom Permission Logic
python
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.userprofile.is_admin
🌐 CORS & 🛡️ CSRF
CORS: Enabled via django-cors-headers to allow the React dev server (localhost:5173) to communicate with the Django API (localhost:8000).
CSRF: The JWT-authenticated API is stateless and does not require CSRF tokens. Django's session-based /admin/ panel retains its built-in CSRF protection for form submissions.
📡 API Endpoints
Method	Endpoint	Description	Access
POST	/api/register/	Register a new user	Public
POST	/api/token/	Login (obtain JWT access + refresh token)	Public
POST	/api/token/refresh/	Refresh an expired access token	Public
GET	/api/products/	List all products	Public
POST	/api/products/	Add a new product	Admin only
PUT	/api/products/<id>/	Update a product	Admin only
DELETE	/api/products/<id>/	Delete a product	Admin only

All endpoints were tested and verified using Postman, including negative test cases (e.g., non-admin users receiving 403 Forbidden on write operations).

⚙️ Setup Instructions
Backend (Django)
bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Frontend (React)
bash
cd frontend
npm install
npm run dev


🧪 Testing

A complete Postman collection covers:

✅ User registration & login
✅ Token-based authenticated requests
✅ Full CRUD lifecycle on products
✅ Permission enforcement (admin vs. non-admin — 403 verification)
🚀 Future Improvements
Add refresh-token auto-renewal in frontend (silent re-authentication)
Add protected routing in React (redirect unauthenticated users)
Add product categories, search, and pagination
Deploy backend (Render/Railway) and frontend (Vercel/Netlify)
👤 Author

Nikhil Soni B.Tech CSE, PIEMR Indore
