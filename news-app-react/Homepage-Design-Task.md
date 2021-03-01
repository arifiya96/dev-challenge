# Home Page Design Task

## Overview of what the user can do

1) Load the page and get the most popular news articles in the UK (default).
2) Filter by region so they get the most popular news articles of a selected region.
3) Search for the most popular articles from a search via the text input field.
4) Get all the articles based on a search. If empty, the most popular articles (everything) will show.
5) For all articles that appear, user will always able to filter by source.

## Based on what the user can do, I would like to capture the following: 

### 1. User clicks and mouse movement (scroll movement for phone) 
User experience and engagement is very important in motivating the user to come back and regularly use the website/app. Clicks and mouse movement are good indicators of user activity and it has a linear relationship: the more clicks, scrolls and movement, the higher the chance that the user is having a positive user experience. This may sound trivial but this is backed up by a wealth of empirical evidence provided by the HCI research community (e.g. Mueller & Lockered, 2001). 

Frustrated users will have less activity due to frustration with the UI. This is why I want to capture user activity via clicks and mouse movements because the data can give an indication of user experience. It allows the team to make improvements to the UI and the overall UX with empirical data. For example, with Amplitude, you can log everytime the user clicks the search button with the following command: amplitude.getInstance().logEvent('[data-testid=search-input]')

### 2. Analyse web accessibility components 
It is important not to neglect our users with disabilities that may have trouble navigating the UI. Firstly, it might be useful to see if the website can detect whether things like ChromeVox is enabled. When it comes to user behaviour, a good indication of positive user experience is activity with the ChromeVox commands. This will be the equivalent of user clicks and movements for visual components. The reason why this is important is because a good user experience ensures that it caters to everybody.

### 3. Targeting specific components: the source filter element 
It goes without saying that we can target specific elements by using the data-testid prop. Specifically with the feature I implemented, I would like to target the source filter element. The user behaviour that I am particularly interested in is the range of sources the user chooses during a session. I have already covered user clicks in the previous point but I want to highlight the importance of targeting the source filter component. Since this is a new feature, I will need to know the levels of engagement so that improvements to the filter can be made. It is also an incentive for only (the most) popular sources to be targeted.

### 4. Sharing and Popularity 
With many websites being connected to social media, a user behaviour that is useful to track is sharing to external sites. This allows us to assess the engagement that users may have with particular sites, sources, articles etc. For example, if a user comes across an article they want to share, the social media share functionality should be easily accessible and increases the chance for the user to come back. If many users actually use this website as their main news source, we will be able to see if social media engagement have played a role (or not).

### References
Mueller, F. and Lockerd, A., 2001, March. Cheese: tracking mouse movement activity on websites, a tool for user modeling. In CHI'01 extended abstracts on Human factors in computing systems (pp. 279-280).