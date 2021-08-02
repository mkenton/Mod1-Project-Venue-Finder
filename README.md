# Mod1-Project-Venue-Finder #
Project for phase 1 - single page web app - restaurant/venue finder based on multiple starting address input


## Simple Restaurant Finder ##

### Features ###
Given a list of departure points (physical addresses), the app will deliver the highly rated restaurants using google map API within reasonable distance from the addresses provided.

![Example](https://github.com/mkenton/Mod1-Project-Venue-Finder/blob/adding_image/example.PNG)
  
### User Story ###
-as a user, you should be able to input a list of addresses representing locations of departure of everyone
-as a user, you should be able to input a type of restaurant (Indian, American, Chinese, etc.)
-as a user, you receive a result in a form of top 5 (at most) highest rated restaurants in a geometrical region defined by center of gravity, sorted in the order of metric determined by the time it takes for everyone to arrive at the restaurant.

### The basic story of your application ###
* See the user story

### The core features of your MVP ###
#### MVP will show the following functionalities: ####
#### Address inputs ####
* Location visualization based on google map
    * Restaurant locations within the search area
    * Search area updates based on radius

#### Possible challenges
* The metric to determine the restaurants
* Showing the result visually and interactively 

#### Meeting the requirements
* We will implement HTML/CSS/JS frontend structure to interact with the google map API.
* All functionalities of this web application can be achieved within single page.
* It is expected that the user input is provided by submit, which will naturally involve clicking on submit button.
* Google map interaction means the content will have to change and update to show the user about the restaurant search result.
* User input addresses will be duplicated onto the webpage after input, eventually to be voted for.


#### implementation detail

*calculate center of gravity for (x,y) coordinate for everyone
*search within some radius (e.g. 10 miles) from (x_COM, y_COM)
![equation](http://latex2png.com/pngs/8ffe43f8e379421c8ef079b03a6484f1.png)

*sort by total time spent for everyone to travel to the location.

* may need some assumptions on travel time (time/block etc.)
