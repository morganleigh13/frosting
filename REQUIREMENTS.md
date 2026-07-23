
# eCommerce Project

## Requirements MVP (Minimal Viable Product)

### Data

* MongoDB
* UserSchema
* CartSchema
* ProductSchema
* Decide what your store is selling. Can be everything like Amazon, can be just one category like shoes. You decide.

### Navbar

* Login button
* App logo or Name
* Profile element with avatar
* Logout

### Search

* Search
* Can be in navbar, or below, but should be near the top
* Results should go to results page with matches

### Main page

* Should have Navbar, Search, some type of product listings

### Login

* Login form for admin that goes to dashboard/main app
* Should have all login functionality that we have been creating on previous apps
* Login for normal user (customer) should take them back to whatever page they were on before they logged in

### Product Listing

* A page that lists products. Can be all products, with a filter, or by category - you decide
* Must show at least 1 thumbnail for each product

### Product Detail

* A page that lists all the information for a product
* Default method for routing is to use the database \_id as the parameter
* Should have at least 1 image of the product

### Cart: Drawer

* Default is requiring the user to login before adding things to their cart
* Should open when a user adds an item to the cart
* User should be able to manage the number of each items in the cart, up or down
* User should be able to remove any item from the cart
* User should be able to go to the checkout

### Cart: Page

* Default is requiring the user to login before checking out
* All features that the drawer has

### Checkout

* Page that accepts user info for shipping and payment info

### Orders: List

* Main orders page that lists all orders

## Technical

* MERN
* react-router
* Redux Toolkit
* CRUD
* Tailwind
* Any CSS framework built on Tailwind is an option. DaisyUI is not required but is used in the instructor code.
* Faker.js OR Ollama/MSTY Studio to generate users, products, or any other data

## Optional

* **Product detail:** Use a unique product slug instead of product \_id
* * Slug should be saved in schema/DB
* **Product detail:** If product is clothing and has a size, have form elements to allow user to select one size
* * If using sizes, allow user to add multiple of same product, but with different sizes
* * * Example, user adds novelty t-shirt in their size of XL, then also adds another one of the same t-shirt in MD for their dog
* **Product detail:** Show similar items to the one being viewed
* **Main page:** have a carousel of products
* **Main page:** show items by featured categories or brands, using a FeaturedSchema
* **Main page:** have a campaign, using a CampaignSchema, to show featured items
* **Main page:** have featured items by holiday or season or time
* **Main page:** have a Three.js splash section
* **Cart page:**, show similar items to ones in cart
* **Cart page:**, have the ability to save items for later
* * Show saved items in cart full page
* **Orders:** Show order detail page
* **Products viewed:** Keep track of products viewed by user
* * If you keep track of products viewed by user, have a page that shows the browsing history for the user
* **Coupons:** Allow coupon codes, usable on product detail or cart or checkout or wherever
* **Sale:** Have a sale on certain items
* **User address:** Have address information for user
* * Form for logged in user to update their address info
* * Allow multiple addresses per user
* * If user has multiple addresses, allow a default address
* * Autopopulate checkout form with single or default user address

## Concepts

* Be able to explain in human words what we are trying to do
* How to structure data to accommodate features
* How to get Faker to generate test/dummy data
* How to get our AI to generate test/dummy data using your data structure
* How to structure React components
* How to use react-router to route pages and control user flow, including private and admin routes
* How to get code from CSS frameworks and example sites and integrate them into your React project
* How to implement a product search that checks the database for results
* How to implement a login and protect private functionality (cart, checkout) behind the login
* How to make standardize product images so that all product images look the same
* How to structure cart data so that you can add multiple of the same item
* How to handle addresses for checkout
* How to use an external API for shipping (Instructor/Shippo)

## Notes

* MongoDB projection: https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/?interface=driver&language=nodejs
* Mongoose projection: https://www.geeksforgeeks.org/mongodb/how-to-use-mongodb-projection-in-mongoose/
