Final year module for KF6012BNN01 : Web Application Integration, this gained me a mark of 65%.

The frontend was coded using React and Tailwind CSS.

The backend made use of PHP, Firebase JWT and an SQLite databse for users and conference data.

Part 1 Endpoints
 
GET Developer Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/developer
Returns my name and student ID.

GET Country Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/country
Returns the list of countries and removes the duplicates.

GET Preview Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/preview
Will only show 1 preview video and will change with each refresh.

GET Author and Affiliation Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/AuthorAndAffiliation
Returns all of the authors, their affiliations, country, city, insitution and content tile. Can filter with the params country, content and author.
E.G: AuthorAndAffiliation?content=99140
AuthorAndAffiliation?country=Japan
AuthorAndAffiliation?author_id=91994

GET Content Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/content
Can filter with the params page and type, but you will need to be case sensitive with the type filter so it matches how its spelt in the database. However, some are empty in the database. 
E.G: content?page=2 and content?type=Course 
All the content types.
Course
Demo
Doctoral Consortium
Event
Late-Breaking Work
Paper
Poster
Work-in-Progress
Workshop
Case Study
Panel
AltCHI
SIG
Keynote
Interactivity
Journal
Symposia
Competitions

GET token Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/token
Parameters Username and Password must be transmitted via authorization headers. Can only use GET to get a bearer token that can be used for the note endpoint.
john@example.com examplePassword1234  ||  admin@example.com CHI2023

GET Note Endpoint 
https://w20017978.nuwebspace.co.uk/coursework/App/note
Paramaters for the note endpoint, can use GET, POST and DELETE. The note endpoint will check to see if the user exists in the database and whether the user is logged in. Get will get all of the notes stored in the database for the content and can only be viewed if you have the bearer token. Using the bearer token, you can view what has been stored in the database on that specific user. 

PART 2 REACT

You are able to navigate the website using the buttons at the top. To login to the website you will have to use the emails and passwords from the TOKEN endpoint. Logging in will give you access to the notes of the specific user, while also being able to create new notes, edit notes, and delete them. 

Main/Home page: https://w20017978.nuwebspace.co.uk/coursework/react/ 
Has the heading "CHI 2023", a menu with links to the other pages, and a title and link to a random preview video.

Content page: https://w20017978.nuwebspace.co.uk/coursework/react/content 
This page shows details of the research content that has the title, abstract, authors names, their affiliations, the type of content it is and if it has won an award or not. The page shows content in 20 items at a time and there is 2 buttons to go further or back to previous content. There is a filter you can use that will get the content based on its content type. You can also sign in to the website and add/edit/delete notes for the content.

Countries Page: https://w20017978.nuwebspace.co.uk/coursework/react/countries
This page lists each country from the affiliation table in the database and only displays the country once. There is a search box that allows you to search for the country.
