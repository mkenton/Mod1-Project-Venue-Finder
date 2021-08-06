# Group Central Venue Locator #

### Author: Sungoh Park*, Michael Kenton*
*Authors contributed equally to this project.

### Features / User Story ###
Given a list of departure points (physical addresses), the app will deliver the available venues using google map API within reasonable distance from the addresses provided.

![Example](https://github.com/mkenton/Mod1-Project-Venue-Finder/blob/main/example.PNG)

* As a user, I want to find the convenient location for everyone in the group to eat together or hang out. 
* I want to be able to search for the food or activity, and see the information of some closest venues from the center of everyone's location
* I would like to choose among the search result based on the information (restaurant name, google rating, and image).
* Finally, I would like to vote on the venues of my approval with vote (can choose multiple).


#### Feature Details ####
* This app takes two types of input. (1) Addresses representing locations of departure of everyone of the group. (2) food or activity (pizza, bowling, Thai, etc.) to search venues for.
* Address is provided one by one. This can be as abstract as a city name such as "New York" or as specific as "123 N Main st. ...", but we recommend providing specific input addresses. Each time you input an address, there will be a marker on the map corresponding to the address provided. 
* Additionally, there will be a marker representing the center point of all the addresses provided, with a circle highlighting the nearby area. This center point has the average latitude and longitude of all addresses provided so far, and is dynamically updated upon addition or removal of an address.
* When the address input is finished, we can search for the venue of interest. The search word can be any activity or food (pizza, bowling, Thai, etc.).
* The search result will be returned in a form of information of 4 closest restaurants (limited to 4 for the ease of display and help decision-making) by distance from a point defined by average of the longitudes and latitudes of all the addresses provided. This point is also marked on the map.
* The search result information has (1) name, (2) image, (3) rating, and (4) address of the places. 
* Based on how attrative they are, the user can click the "vote" button to display heart of approval. The user can select multiple venues. Eventually, the number of vote count will be represented by the number of hearts displayed, and there goes the fianl decision for the group.


### Potential Improvements in the Future ###
* More interactivity with the map and the search result such as hovering mouse cursor on search result makes the corresponding marker on the map change color, etc.
* More advanced metric for selection, such as complexity of route, how similar estimated times of arrivals are for everyone (considering they may use different transportation), and automatic suggestion if the direct search result limited to 4 can be improved significantly. 
* Improved functionalities for more advanced search scenario such as watching movie after dinner.
* More Styling for better look!
