##Project 6: Make Effective Data Visulization | Data Visualization and D3.js

- Author:  Vivek Yadav (vivek DOT yadav AT gmail DOT com)
- Last updated: Nov 13, 2015

###Summary

For this project I analyzed the sentiments expressed in twitter feeds towards US airlines for February 15. I downloaded data from [kaggle](https://www.kaggle.com/crowdflower/twitter-airline-sentiment). I conducted the initial data processing in Python. In this step, I took data of tweets that had location information and extracted longitude and latitude from them. I then obtained the list of [30 busiest airports in the United States from Wikipedia](https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States), and assigned each tweet with location data to an airport based on proximity. I assumed that a tweet about an airline came from the airport closest to the location of tweet. After this, I exported data as CSV and performed further analysis in javascript directly. 

Link to the final project: [US Airline Twitter Sentiment Analysis](http://vxy10.github.io/p6_vis_versions/scroll_MapVersion2/index.html)

### Visualization
The latest version of the visualization can be found [here](http://vxy10.github.io/p6_vis_versions/scroll_MapVersion2/index.html). This visualization was obtained 

1. [First draft](http://vxy10.github.io/p6_vis_versions/scroll_Map_version1/index.html)
2. [First submission](http://vxy10.github.io/p6_vis_versions/scroll_MapVersion2/index.html)

###Design
####1. Data clean and manipulation

ADDD HERE 


####2. Design

**(1)  Initial visualization design (original [index.html] (http://vxy10.github.io/p6_vis_versions/scroll_Map_version1/index.html))**
 

**(2) Revised visualization design based on feedback (revised [index.html] (http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index_re7.html))**

The discussion of which and why the changes were made are summarized below:

**(3) Revised visualization design based on reviewer's comments, the 1st submission (revised [index.html](http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index_re8.html))**

ADD

**(4) Revised visualization design based on reviewer's comments, the 2nd submission (revised [index.html](http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index_re9.html))**

ADD

**(5) Revised visualization design based on reviewer's comments, the 3rd submission (revised [index.html](http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index_re10.html) for original exploratory visualization,  [index.html](http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index_re11.html) for simple explanatory version)**

ADD

**(6) Revised visualization design based on reviewer's comments, the 4th submission (revised [index.html](http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index.html) for explanatory version using dimple.js)**

ADD

###Feedback

I obtained lots of helpful feedback and comments from [Udacity discussion forum](https://discussions.udacity.com/t/feedback-for-project-6-us-airline-sentiment-analysis-using-twitter-data/163274/2) and [Google+](https://plus.google.com/communities/116797052510270749486?gclid=Cj0KEQjwwIKxBRDKhOz7ytT30vkBEiQAT1NaPS05CAXdYdk1Yu7ymp6T8ZGMhTJ0lMeqMdwFyCpF2bsaAkHc8P8HAQ). The main points from and comments are below:

- _Initially as the page loads, as the elements are being generated, it is a distracting effect_. I fixed this by adding a loading gif which shows while the graphics objects are being created. 
- _the content should be closer to the center of the page vertically_. I did not include this change because I wanted to keep the graphs section larger than the text section. 
- _There are no instructions as to how to navigate to the next page_. I added text "*Scroll down to read more." on the first page. 
- _On the "Tweets By Locations" page, the transition (of the graph) could be slowed a little (as by the time that the page comes into focus that transition is finished)_. I increased the transition time for map to appear to 400 ms. 
- _The plots Reason by airline don't have a legend, nor do they have a y axis label_. I added legend and axis labels.

#####1. Myles Udacity 

Hi Vivek,

What I noticed:
Initially as the page loads, as the elements are being generated, it is a distracting effect (to combat that effect, you can wrap your content in a div and set a timer for when to display the page (see the end of this post)). Also, the content should be closer to the center of the page vertically (maybe a personal preference, but there is a lot of white space under the content).
The Introductory page is clear and informative. On the first page, there are no instructions as to how to navigate to the next page (there are on the other pages).
The transition to the second page is smooth, and again the information provided is on point.
Each page is informative, and the motivation for the following page is given (nice touch). So the visualization unfolds like a story.
On the "Tweets By Locations" page, the transition (of the graph) could be slowed a little (as by the time that the page comes into focus that transition is finished).
The "Main Findings" could be put on a page on its own, as they precede the drop down menus (which both 'get in the way' of the drop down menus and appear out of sequence).
What questions do you have about the data?

I will think about that (there is so much information provided in a readily digestible form that no immediate questions jump to mind).
What relationships do you notice?

As I live in the North-East: Don't fly United or Delta
That customer service is, overall, by a long way, the main issue (something that should be easily remedied). But that this is largely due to the disproportionate effect of a few airlines (that information was provided by a cleverly selected sequence of graphics).
What do you think is the main takeaway from this visualization? Is there something you don’t understand in the graphic?

Main takeaways are given in the previous section.
The presentation is clear as can be.
Overall, it is nitpicking to critique this presentation. Not only are the graphics well presented, the structure of the flow of graphics maximizes informational content.

Excellent presentation!

Myles

#####2. Liang Sun (collegue) 

The whole impression is that the visualization is very clean,concise and well-organized.

My question is about the data itself. Intuitively, people are more likely to complain than praise service online. The data may be not an adequate description of the whole population of customers, but good for the analysis of comparison among different airlines and reasons of negative sentiments. 

United, US Airways, and American have a bigger fraction of negative sentiments than the other three.  The reasons for negative sentiments have different weights for different airlines. In general, customer service issues and cancelled flights are the most common reasons for all airlines. 

This analysis gives us a sense of what customers care about and unsatisfied with the airlines, and how airlines can improve their service and customers' satisfaction. 

You can add legend to the graph "reasons by airline" and the normalized one for this.

#####3. Melissa Kilby (collegue) 

Sorry just get to it now.

1. What do you notice in the visualization?

⋅⋅⋅ The plots Reason by airline don't have a legend...nor do they have a y axis label...

2.  What questions do you have about the data?

... In how far are complaints: customer service and late flights related to a specific airport location/connecting flights...not sure if phrase this correctly, the big airline offer a bigger net of connections, of course there are more delays and problems, etc, not sure if you can get that link with the data available...

3. What relationships do you notice?

... I see two groups of airlines, the big ones that offer more connections/flights and maybe suffer more from delays, etc...the smaller airlines operate more locally...maybe less overall delays, are there statistics out there on average delays per airline you can work in too?
4. What do you think is the main takeaway from this visualization?
... looking at maps number of tweets peaks at the big airports that are hubs for connecting flights...people only tweet when they can complain lol, maybe due to them being stuck at the airport and not having anything better to do haha
5. Is there something you don’t understand in the graphic?
... No all super easy to follow except the missing legend I had to scroll up to remind myself of the category

I hope this helps, but again it looks really awesome and every single statement is super clear and makes totally sense!!!



###Resources
1. [DC.JS GETTING STARTED AND HOW-TO GUIDE](https://dc-js.github.io/dc.js/docs/stock.html)
2. [Create Rich Interactive Visualisations](https://becomingadatascientist.wordpress.com/2013/05/21/create-rich-interactive-visualisations/)
3. [dimple.js](http://dimplejs.org)

