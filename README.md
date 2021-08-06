# Group Central Venue Locator #

### Author: Sungoh Park*, Michael Kenton*
*Authors contributed equally to this project.

### Features / User Story ###
Given a list of departure points (physical addresses), the app will deliver the available venues using google map API within reasonable distance from the addresses provided.

![Example](https://github.com/mkenton/Mod1-Project-Venue-Finder/blob/main/CentroVenue-Screenshot.png)

* As a user, I want to find the convenient location for everyone in the group to eat together or hang out. 
* I want to be able to search for the food or activity, and see the information of some closest venues from the center of everyone's location
* I would like to choose among the search result based on the information (restaurant name, google rating, and image).
* Finally, I would like to vote on the venues of my approval with vote (can choose multiple).


#### Feature Details ####
* This app takes two types of input: (1) Addresses representing locations of departure of everyone of the group. (2) A search term to search for venues, e.g. places, type of food, or activity ("pizza", "bowling", "Thai", etc.).
* Addresses are provided one at a time. The text entered in the address field can be broadly defined, such as "New York," or more precisely defined, such as "123 N Main St." It is recommend to provide a specific input address in order to obtain accurate results for a central location. Upon the submitting an address, a marker appears on the map at the location corresponding to the provided address . 
* Additionally, there a marker representing the center point of all the addresses is calculated and provided on the map, with a circle highlighting the general vicinity. This center point is defined as a point with the average latitude and longitude of all provided addresses, and is dynamically updated upon addition or removal of an address. 
* When the address input is finished, the user can search for the venue of interest. The search term can be any term that is useful for finding venues on a map ("pizza", "bowling", "Thai", etc.).
* Search result are returned comprising the 4 closest places — sorted by distance from the center point defined above — and rendered as cards with place-related information. Search results have been limited to 4 for the ease of display and to reduce the phenomenon of choice paralysis in chosing a location.
* The resulting place-information card includes the following pieces of information: (1) name, (2) image, (3) rating, and (4) address of the places.
*  The user can mouse-hover over the search result cards and it will highlight both the card and the corrsponding marker on the map.
* A user can click the "vote" button to display a heart of approval. The user can select multiple venues, or enter multiple hearts on behalf of voters. The vote count is represented by the number of hearts displayed. The user can track votes to make a final decision for the group on a venue to attend.



### Potential Improvements in the Future ###
* Increasing interactivity and available information on search results. Implementation of additional iformation requests can be configured to return more information, such as a place website. 
* Implementation of current traffic and routing information: obtaining travel times from each starting location to potential venues would allow for more advanced metric for selection, such as minimizing the furthest travel time, optimizing travel times across all travelers, allowing each starting point to select a mode of transportation to calculate route time, etc. Using this information, it may be possible for the venue locator to automatically return a single venue based on example optimal metrics. 
* Additioanal interaction with place cards, such the option to select a "winner" among search results and subsequently remove the undesired venues. Then, the user may use the central locator tool again for a second activity. For example, a user may desire to plan a dinner and a movie. The user would first search for dinner locations, decide on a restaurant (clearing the unwanted restaurants) and then search for movies and select a movie theater. The resulting page could be configured to then display the chosen restaurant and movie theater.
* Additional styling and more adaptable layouts to tested across multiple devices and browsers.
