# MCR Crime Data

This web application displays data about crimes reported in the city centre of Manchester, UK. It uses data about street level crime from the UK Police API and plots the locations where the crime(s) were reported on a Google Map of the centre of Manchester (For this app I've used the longitude and latitude of Piccadilly Gardens to denote central Manchester). Users can select the month / year to see the locations of reported crimes as pins on the map. Users can then click on the pins to see a chart breaking down the categories of crimes reported at that location and how many of each were reported.

This is a React application that uses Google Map React to display a map of central Manchester. It uses Uber's React-Vis to make the chart that displays a breakdown of crime data according to the selected month and area.

NB. Crimes that have been reported more recently may not yet have been added to the Police API that the web app makes a request to. Therefore, the user may find that the app shows far fewer crimes reported in the most recent month(s) that they are using the app compared to when they select a month from the previous year. Therefore the app couldn't be used to show whether there had been an increase or decline in crime. Rather it shows the number of crimes and their categories that have been added to the Police API.

## Getting Started

Follow the instructions below to get a local version up and running.

### Installation

1. To begin with, (fork and) clone this repo.

```
$ git clone https://github.com/jonp2020/mcr-crime-stats.git
```

2. Navigate into the directory and install the required dependencies.

```
$ cd mcr-crime-stats
$ npm install
```

3. Next you'll need to get a Google Maps API key. Head over to [Google's cloud platform](https://cloud.google.com/maps-platform) and sign up /sign in to create an API key.

[This link to Google's developer page](https://developers.google.com/maps/documentation/javascript/get-api-key) has a nice step by step walk through to get an API key.

4. Once you've got API key, create a .env file in the root directory of the app. Add your API key here by typing in the following:

```
REACT_APP_MAP=PASTE_YOUR_API_KEY_HERE
```

5. Get the app running on your machine by typing the following into your terminal:

```
$ npm start
```

6. A tab will be opened in your browser at the address **localhost:3000**.

7. Enjoy!

## Built Using

- Create React App
- React
- Google Map API
- Google-Map-React
- React-Vis
- Framer-motion
