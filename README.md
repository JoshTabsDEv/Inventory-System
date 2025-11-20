# Inventory System

A simple inventory management system built with Next.js, TypeScript, and MySQL. Features user authentication and full CRUD operations for inventory items.

## Features

- 🔐 User authentication with JWT
- 📦 Inventory item management (Create, Read, Update, Delete)
- 🎨 Modern and responsive UI
- 🔒 Secure API routes with authentication middleware
- 💾 MySQL database integration

## Prerequisites

- Node.js 18+ installed
- MySQL 8.0+ installed and running
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

**For DigitalOcean MySQL:**
1. Connect to your DigitalOcean MySQL database using a MySQL client (like MySQL Workbench, DBeaver, or command line)
2. Execute the SQL commands from `database/schema.sql` to create the tables
3. Make sure to use SSL connection when connecting to DigitalOcean MySQL

**For Local MySQL:**
1. Make sure MySQL is running on your system
2. Create the database and tables by running the SQL script:

```bash
mysql -u root -p < database/schema.sql
```

Or manually execute the SQL commands in `database/schema.sql` using your MySQL client.

**Note:** The schema includes a default admin user that will be created automatically.

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** 
- Change the default password after first login!
- Passwords are stored in plain text (no hashing)

### 3. Environment Variables

1. Create a `.env` file in the root directory (you can use `env.example.txt` as a template):
```bash
# On Windows (PowerShell)
Copy-Item env.example.txt .env

# On Linux/Mac
cp env.example.txt .env
```

2. Edit `.env` and update the following variables:

**For DigitalOcean MySQL (or other cloud providers with SSL):**
```env
DB_HOST=db-mysql-nyc3-63157-do-user-29370123-0.j.db.ondigitalocean.com
DB_USER=doadmin
DB_PASSWORD=your_database_password
DB_NAME=inventorydb
DB_PORT=25060
DB_SSL_MODE=REQUIRED

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**For Local MySQL:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** 
- Replace `your_database_password` with your actual database password
- Change `JWT_SECRET` to a random secure string (you can generate one using: `openssl rand -base64 32`)
- For DigitalOcean MySQL, make sure `DB_SSL_MODE=REQUIRED` is set

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
inventory-system/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   └── inventory/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── InventoryList.tsx
│   │   └── InventoryForm.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── middleware.ts
├── database/
│   └── schema.sql
├── scripts/
│   └── create-admin.js
├── env.example.txt
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Inventory
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Create new inventory item
- `GET /api/inventory/[id]` - Get single inventory item
- `PUT /api/inventory/[id]` - Update inventory item
- `DELETE /api/inventory/[id]` - Delete inventory item

All inventory endpoints require authentication (except login).

## Usage

1. **Login**: Use the default credentials or create a new user
2. **View Inventory**: See all items in a table format
3. **Add Item**: Click "Add New Item" button to create a new inventory item
4. **Edit Item**: Click "Edit" button on any item to modify it
5. **Delete Item**: Click "Delete" button to remove an item (with confirmation)

## Building for Production

```bash
npm run build
npm start
```

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens are stored in httpOnly cookies
- All API routes (except login) require authentication
- Change the default admin password immediately
- Use a strong JWT_SECRET in production
- Enable HTTPS in production

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `mysql -u root -p`
- Check your `.env` file has correct database credentials
- Ensure the database `inventory_db` exists

### Authentication Issues
- Clear browser cookies and try logging in again
- Verify JWT_SECRET is set in `.env`
- Check that the user exists in the database

### Port Already in Use
- Change the port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

## License

MIT

