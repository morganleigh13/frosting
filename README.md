# Frosting 💎 **Frost Yourself** 💎



## 💍  E‑Commerce Store (React + Redux Toolkit)
A polished, full‑stack shopping experience built with React, RTK, TailwindCSS and Daisy‑UI.
## UI/UX
- Product Page – Filter by category (Jewelry, Purses, or All).
- A drawer on the left shows the cart; it opens via a sticky button.
- Order Dashboard – Displays all orders for the signed‑in user.
- Click an order to see a detailed view with item breakdowns.
- Back‑to‑Top Button – Appears after scrolling down a threshold and scrolls smoothly to the top.
- Images below illustrate the drawer‑enabled product page and the order detail view.

### 📸 Screenshots
![Product Page with Cart Drawer](/frosting.jpg)
![Order Detail Page](/frosting-order.jpg)


## 📦 What’s Inside?
### Layer	- Tech	- Why it matters

- Front‑end	React 19.2 + Redux Toolkit	Simple, powerful state handling with RTK’s createSlice + createAsyncThunk.

- TailwindCSS 4.2 + Daisy‑UI	Utility‑first styling + ready‑made component themes.

- Back‑end	Node.js + Express + MongoDB	Scalable data layer for products, users, and orders.

- AuthJWT Secure token‑based auth and password hashing.

- Payments Credit‑card validation & 2‑step verification.


## 🚀 Features

### User Flow

- Signup / Login – Simple forms with validation.
Security question is hashed before storage; it’s used for password recovery.

- Auto‑filled Checkout – Logged‑in users get their shipping details pre‑populated.

- Stepper Checkout –

- Credit‑card number validation.
Two‑step verification: enter last 4 digits again.
 - Discounts – Applied automatically at the end based on total cart value.
- Order Confirmation – Users can review a final summary before placing the order.



## 🛠️ Getting Started


1. Clone the Repo
git clone https://github.com/your-username/frosting.git
cd frosting
2. Install Dependencies
# Front‑end
cd client
npm install
3. Environment Variables
Create a .env file in the client folder:
Look at all .env.example files to see what you will need

# Back‑end
cd ../server
npm install
4. Environment Variables
Create a .env file in the server folder:
Look at all .env.example files to see what you will need

# test 
cd ../test
npm install
5. Environment Variables
Create a .env file in the test folder:
Look at all .env.example files to see what you will need
6. npm run seed:users
7. npm run seed:products 


©️ Morgan Adams
