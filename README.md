# Mod1-Project-Venue-Finder
Project for phase 1 - single page web app - restaurant/venue finder based on multiple starting address input


Simple Restaurant Finder

Features
Given a list of departure points (physical addresses), the app will deliver the highly rated restaurants using google map API within reasonable distance from the addresses provided.

![alt text](https://github.com/mkenton/Mod1-Project-Venue-Finder/blob/main/example.png)
  
User Story
-as a user, you should be able to input a list of addresses representing locations of departure of everyone
-as a user, you should be able to input a type of restaurant (Indian, American, Chinese, etc.)
-as a user, you receive a result in a form of top 5 (at most) highest rated restaurants in a geometrical region defined by center of gravity, sorted in the order of metric determined by the time it takes for everyone to arrive at the restaurant.

The basic story of your application
See the user story
The core features of your MVP
MVP will show the following functionalities:
Address inputs
Location visualization based on google map
Restaurant locations within the search area
Search area updates based on radius
The API data you'll be using and how you'll use it
Google map
Challenges you expect to face
If the metric to determine the restaurants
Showing the result visually and interactively 
How you are meeting the requirements of the project
Your app must be a HTML/CSS/JS frontend that accesses data from a public API. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format.
We will implement HTML/CSS/JS frontend structure to interact with the google map API.
Your entire app must run on a single page. There should be NO redirects. In other words, your project will contain a single HTML file.
All functionalities of this web application can be achieved within single page
Your app needs to incorporate at least 3 separate event listeners (DOMContentLoaded, click, change, submit, etc).
It is expected that the user input is provided by submit, which will naturally involve clicking on submit button
Google map interaction means the content will have to change and update to show the user about the restaurant search result
Some interactivity is required. This could be as simple as adding a "like" button or adding comments. These interactions do not need to persist after reloading the page.
User input addresses will be duplicated onto the webpage after input.
Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.
We will do our best to follow the good coding practices.



-implementation detail


API:  google map


-calculate center of gravity for (x,y) coordinate for everyone
-search within some radius (e.g. 10 miles) from (x_COM, y_COM)
-sort by total time spent for everyone to travel to the location.

-may need some assumptions on travel time since google map route calculation is paid-feature.
-time/block etc.
