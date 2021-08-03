# Group Central Venue Locator #

### Author: Sungoh Park*, Michael Kenton*
*Authors contributed equally to this project.

### Features ###
Given a list of departure points (physical addresses), the app will deliver the highly rated restaurants using google map API within reasonable distance from the addresses provided.

![Example](https://github.com/mkenton/Mod1-Project-Venue-Finder/blob/main/example.PNG)
  
### User Story ###
* as a user, you should be able to input a list of addresses representing locations of departure of everyone
* as a user, you should be able to input a type of restaurant (Indian, American, Chinese, etc.)
* as a user, you receive a result in a form of top 5 (at most) highest rated restaurants in a geometrical region defined by center of gravity, sorted in the order of metric determined by the time it takes for everyone to arrive at the restaurant.

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
* calculate center of gravity for (x,y) coordinate for everyone
* search within some radius (e.g. 10 miles) from (x_COM, y_COM)
* ![equation](https://latex.codecogs.com/gif.latex?%28x_%7B%5Cmathrm%7BCOM%7D%7D%2C%20y_%7B%5Cmathrm%7BCOM%7D%7D%29%20%3D%20%28%5Cfrac%7B%5Csum_n%20w_n%20x_n%7D%7B%5Csum_n%20w_n%7D%2C%20%5Cfrac%7B%5Csum_n%20w_n%20y_n%7D%7B%5Csum_n%20w_n%7D%29)
* sort by total time spent for everyone to travel to the location.
* may need some assumptions on travel time (time/block etc.)
