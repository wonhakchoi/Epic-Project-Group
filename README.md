# Easy Eats

## High-level Description
EasyEats is a social media platform centered around food, where users can create profiles, connect with friends, and share restaurant reviews. With the ability to rate restaurants and view friends' reviews, it provides an engaging experience for food enthusiasts to share and explore new culinary delights.

## Project Task Requirements
- 3-5 minimal requirements
  - Search up restaurants ✅
  - Add and remove friends ✅
  - User can make an account and login to the account (Account/Logic system) ✅
  - Add and delete restaurants to collections and view them ✅
  - View friends’ restaurants ✅

- 3-7 standard requirements
  - View restaurant details such as location, stars, description, contact info, opening hours, etc. ✅
  - User can add reviews for a restaurant, and be able to edit and delete their review 🟡
  - Account profile ✅
    - Tap on friend and see a profile ✅
    - Restaurants they recommend ✅
    - Edit profile biography and icon ✅
  - View ratings of friends as well as discover the ratings of strangers ✅

- 2-3 stretch requirements
  - Recommendation system for recommending restaurants to users ✅
  - Integrate with Instagram/other social media apps to allow you to find places based your interaction with foodie creators/locations on those apps 🔴
  
## Technologies Used

**HTML + CSS + JavaScript**

Some of our components are styled in CSS, with each file corresponding to a component. The logic of our application is also written with JavaScript.

**React + Redux**

Our application is built with multiple React components, with state management done with Redux. With Redux, we are able to have a single source of truth, reduce time and resources spent on unnecessary, duplicate API calls, as well as manage asynchronous behaviour in a more organized and predictable manner.

**Node + Express**

Our server’s API is implemented in Express to make calls to both our database and the Google Place API. We also used the Node Package Manager to easily manage and utilize external dependencies, such as Axios, Material UI, and Mongoose.

**MongoDB**

Our database information is stored in MongoDB, and we interact with the data through Mongoose. The data we store includes the profiles of our users, their ratings, and the collections of each user.

## Above and Beyond Functionality 

One feature that we are proud of is our authentication system, which uses session cookies and an encrypted password storage. We also used the Google Places API and Photos API, which allows our application to use real-world, up-to-date data about restaurants in Vancouver and display photos of their food and reviews. The ratings, which we perceive as the largest collection in our application, is also lazily loaded, with only a subset of the total documents being fetched at a time in order to improve the runtime of our application. Finally, we finished our stretch requirement of creating a recommender system. The model organises the search results in terms of popularity and rating, promoting restaurants that users might like more to be at the top of their searches.

## Next Steps

Our search functionality currently does not include any filters or ability to sort by ratings/prices/etc., and only returns restaurants in Vancouver, so this is definitely an area that could be improved in the future. 
One of our stretch requirements was to implement a recommendation system for recommending restaurants to users using ML. However, due to Google API’s limitations, we were not able to fully fetch all the data needed to build a recommendation system which made it difficult for us to build a mode, so we resorted to a hard-coded model. In the future we could try to implement a recommendation system that utilises live Google API data.

## Contributions

**Cedric**

- Implemented the friends system for users to send requests, view their friends, and accept new ones, as well as a search function that finds users by their name
- Implemented the backend, redux, and logic for loading information to the frontend for our rating system to add new reviews, and fetch all reviews of a user, a restaurant, or all friends of a user. Related to the ratings, I also made a Discover page for users to see the ratings of other users with lazy loading for better performance

**Malcolm**

- Designed and styled the profile page to display each user’s friends and their rated restaurants, with their profile icons and descriptions
Made the search page, linking search results to the Google Places API and Photos API to display all restaurants in the Vancouver area with photos for each
- Created a recommendation system to sort displayed restaurants to appeal more to users 

**Wendy**

- Made the collections system including creation and deletion of each collection, adding and removing of restaurants, and the ability to pin and unpin collections.
- Debugged and refactored the authentication system to ensure that login, logout, and signup all worked smoothly.
- Handled the deployment process for the frontend and backend.

**Tammy**

- Worked on the UI, including home page, navigation bar, profile page, collections page, and search page. Focused on refining the overall flow and enhancing user experience.
- Worked on the development of both frontend and backend functionalities for pinning and unpinning collections

**Wonhak**

- Implemented the authentication system with cookie session storage and encrypted password storage, allowing users to sign up/login securely. 
- Helped with styling using the Material UI library
- Worked on building the frontend for users to view, add, edit, and delete their reviews 
  - Refactored/debugged code for fetching ratings details

## Task Breakdowns
- Account/Login System
  - Create a login page where user can enter their credentials and log in
  - On the login page add a link to create account if you haven’t created an account yet 
  - Create a form where users can enter their username and password
  - Save username and password to database
  - User must enter correct username and password to successfully log in

- Friends
  - Make friend page to view list of friends
  - Have a button send friend request by username
  - Page to view friend requests
  - Can accept or decline friend requests

## Prototypes
### Prototype 1
![image](https://github.com/wonhakchoi/Epic-Project-Group/assets/64765407/41226d51-a2d4-4d39-8513-821f884036ca)
![image](https://github.com/wonhakchoi/Epic-Project-Group/assets/64765407/6b3a0135-32dd-4a94-b670-a288e74a68ce)
![image](https://github.com/wonhakchoi/Epic-Project-Group/assets/64765407/1ddebd3c-0a81-4235-806b-52a0faa317c0)

### Prototye 2
<img width="1029" alt="Screen Shot 2023-05-26 at 5 41 54 PM" src="https://github.com/wonhakchoi/Epic-Project-Group/assets/64765407/9c4b3203-8c6d-4d84-907a-858e3a80b208">
<img width="971" alt="Screen Shot 2023-05-26 at 5 42 27 PM" src="https://github.com/wonhakchoi/Epic-Project-Group/assets/64765407/6b377ca7-327e-4e98-823d-6bf226da5012">

### Prototype 3
![image](https://github.com/wonhakchoi/Epic-Project-Group/assets/64765407/a6bd0c5c-2256-4b55-a421-5deea484e5f3)




