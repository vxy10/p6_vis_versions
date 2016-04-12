##Project 6: Make Effective Data Visulization | Data Visualization and D3.js

- Author:  Vivek Yadav (vivek DOT yadav AT gmail DOT com)
- Last updated: Nov 13, 2015

###Summary

** SUMMARY ** 


### Final Version of Visualization
1. [Explanatory visualization of Airbnb data](http://vxy10.github.io/p6_vis_versions/scroll_Map_version1/index.html)
2. [Exploratory visualization of Airbnb data](http://cdn.rawgit.com/cyuancheng/Data_Visualization_D3js/master/index_re10.html)

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

I obtained lots of helpful feedback and comments from [Udacity discussion forum](https://discussions.udacity.com/t/feedback-for-project-6-us-airline-sentiment-analysis-using-twitter-data/163274/2) and [Google+](https://plus.google.com/communities/116797052510270749486?gclid=Cj0KEQjwwIKxBRDKhOz7ytT30vkBEiQAT1NaPS05CAXdYdk1Yu7ymp6T8ZGMhTJ0lMeqMdwFyCpF2bsaAkHc8P8HAQ). The selected feedback and comments are below:

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


2. Jay Teguh (Google+)

	- How many room places are there in AirBnB? Perhaps a good idea to include this under Room Type chart.
	- What year was the data from?
	- Due to different sizes of the circles in price vs. availability, it is sometimes hard to compare price and availability between each data point. Maybe a button to disable sizes, in addition to a faster tooltip display would help.
	- Price varies with time could benefit from tooltips too. I use d3-tip in my project and it works really great (I did not use html default tip since it takes awhile to show them and users are impatient).
	- Remember that the rubric requires you to have a complete documentation of your functions. The functions in your projects seems to be sparsely commented as it is now. My reviewer suggested me to use jsdoc and that makes documentation really easy, but in your case you would need to put your js code into a separate file if you wish to do so.
	- As you get more feedback you'll notice several interesting findings readers have noticed. You can create stories from them, then later create quick-link buttons that will automatically adjust the plots to tell the story and pops up an explanation you wish to tell your readers (martini glass narrative structure).﻿

3. Piyush Agarwal (Google+)

	- The dashboard looks exhaustive, as there are so many charts. Maybe if you could arrange them in a better way and provide a detailed insight into each, that would be great.
	- I don't know the dataset but is it possible to figure out that what is the most busiest time for the bookings, i.e., at what time of the year there are max. number of people using these Airbnb locations.
	- Do people like staying in the shared rooms/private?
	- Number of reviews is higher in the Central East region as compared to any other region I have never been to SF, but from the visualizations, Presidio seems to be a very expensive and high-class neighborhood, as there are no shared/single rooms available there and also its very expensive.
	- There is a lot of variation in the Price/Night and it looks like you can find a place in San Francisco, starting from anywhere between $40 to about $400
	- Variation of price with time graph can be done better if we move the axis away from 0.
	- The colors are fading in Price by Month and Price by Day graphs. Not sure do they have some significance (like price is higher with darker colors)﻿


###Resources
1. [DC.JS GETTING STARTED AND HOW-TO GUIDE](https://dc-js.github.io/dc.js/docs/stock.html)
2. [Create Rich Interactive Visualisations](https://becomingadatascientist.wordpress.com/2013/05/21/create-rich-interactive-visualisations/)
3. [dimple.js](http://dimplejs.org)

