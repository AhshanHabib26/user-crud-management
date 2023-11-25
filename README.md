# Project Details
* Project Name: User CRUD Management API 
* Project Technology: Express, MongoDB, TypeScript, Zod, Bcrypt.
* Project Opertations Method: GET, POST, PUT, DELETE
* Project Base URL: [`https://user-crud-management.vercel.app/`]



# Project Operations Methods API Endpoint List
* For Cretaing User: 
    * METHOD: POST
    * API ENDPOINT: `baseUrl/api/users`
    * Usage Example: `localhost:5000/api/users`

* For Getting All User: 
    * METHOD: GET
    * API ENDPOINT: `baseUrl/api/users`
    * Usage Example: `localhost:5000/api/users`

* For Single User: 
    * METHOD: GET
    * API ENDPOINT:  `baseUrl/api/users/:userId`
    * Usage Example: `localhost:5000/api/users/1`

* For Updating User: 
    * METHOD: PUT
    * API ENDPOINT: `baseUrl/api/users/:userId`
    * Usage Example: `localhost:5000/api/users/1`


* For Deleting User: 
    * METHOD: DELETE
    * API ENDPOINT: `baseUrl/api/users/:userId`
    * Usage Example: `localhost:5000/api/users/1`


# Special Part Of Projects. 

* For Adding User Order (if orders field are empty then create new order otherwise add prevous added order): 
    * METHOD: PUT
    * API ENDPOINT: `baseUrl/api/users/:userId/orders`
    * Usage Example: `localhost:5000/api/users/1/orders`


* For Getting User Order with userId: 
    * METHOD: GET
    * API ENDPOINT: `baseUrl/api/users/:userId/orders`
    * Usage Example: `localhost:5000/api/users/1/orders`


* For Getting Total Price at user orders (price & quantity): 
    * METHOD: GET
    * API ENDPOINT: `baseUrl/api/users/:userId/orders/total-price`
    * Usage Example: `localhost:5000/api/users/1/orders/total-price`


# If you want to use such a awesome user crud management API Application, then follow the few of steps and enjoy the project. 

* First, Copy the link and clone repository
```javascipt
git clone https://github.com/AhshanHabib26/user-crud-management.git
```
* Second, Switch Project Direcrtory
```javascript
    cd user-crud-management
```
* Third, Open your Terminal and run command
```javascript
    npm i or npm install
```

* Fourth, Open a ***.env** file on your project direcotry. And add some enviorinemnt variables like as: PORT, Database URL and Salt Round (For Password Hashing)

* Five, All setup complete then run command on your terminal.
```javascript
    npm run dev
```
* Six, Open your favourite browsers and paste link this link
```javascript
    http://localhost:5000/api/users
```
* Hurrah! you can do the your best. Please review this awesome projects and feel free and give your opinion Or any suggestions. Really, it's my pleasure.


