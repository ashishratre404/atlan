# Atlan

Project is live at : 

## Project overview

The project is a web-based SQL query playground that allows users to enter, execute, and save SQL queries. It primarily focuses on providing a user-friendly interface for interacting with SQL queries and visualizing the query results.

### Key features
* Query Execution and Visualization: Users can enter custom SQL queries in an input field. Upon clicking the "Search" button, the application fetches data from a predefined dataset using GraphQL and displays the query results in a tabular format.

* Predefined Queries: Users have the option to select from a list of predefined queries. These queries are presented in a dropdown menu, making it easy for users to explore specific queries without typing them manually.

* Query History: The application keeps track of the last five executed queries in a history section. Users can refer to their recent queries and revisit them quickly.

* Query Saving: Users can save queries for future reference. The application allows users to save up to 10 queries. Saved queries are visually differentiated with a star icon in the UI.

* CSV Data Parsing: The application fetches data from a remote CSV file, parses it, and presents it in a tabular format. The data is presented using HTML tables, showing rows and columns with appropriate headers.

* Loading Indicator: While fetching and processing data, a loading indicator is displayed to inform users that the application is working on fetching the results.

* Visual Enhancements: The user interface features an Atlan logo and aesthetic elements, including icons, buttons, and layout design, to provide a visually appealing experience.


## Tech Stack

#### Front-End:

* React: The project is built using the React JavaScript library, which is widely used for building user interfaces in web applications.
* CSS: Cascading Style Sheets are used for styling the user interface and defining the layout and appearance of the application.
  
#### Data Fetching and Manipulation:

* Axios: Axios is used for making HTTP requests. In this project, it's used to fetch data from a remote CSV file.

#### Icons:

* React Icons: The React Icons library is used to easily integrate icons, enhancing the user interface with visually informative elements.


## How to install this ReactJS project?

1. Fork this repository, It will make a copy of this repository in your github account.
2. Clone your fork, use command - `git clone https://github.com/<your username>/hotel-booking.git`.
3. Install the required packeges to run this project, use this command - `npm install`.
4. Your good to go, you can run this project by using this command - `npm start`.


#### Note : This is a dummy web application without a real backend or actual data.
