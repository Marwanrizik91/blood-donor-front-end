import React, { useState, useEffect } from 'react';
import './App.css';
import SettingsListScreen from '../screens/settingsListScreen'
import MapBox from '../screens/MapBox/MapBox'
import NavBar from "../general/navBar";
import getGeolocation from "../screens/MapBox/API-Geolocation"

import { Switch, Route } from "react-router-dom";
import PersonalSettingsScreen from '../screens/personalSettingsScreen'
import GoalsScreen from "../screens/goalsScreen";
import HomeScreen from "../screens/homeScreen";


let alerts = [
  {title:"Blood donation needed!", context: "Haifa district"},
  {title:"Blood donation needed!", context: "jerusalem district"},
  {title:"Blood donation needed!", context: "holululu district"},
]



let jdObject = [
  {
    "DateDonation": "2020-06-18T00:00:00",
    "FromHour": "16:00",
    "ToHour": "19:30",
    "Name": "מתנס ירוחם",
    "City": "ירוחם",
    "Street": "",
    "NumHouse": "",
    "AccountType": ""
  },
  {
    "DateDonation": "2020-06-18T00:00:00",
    "FromHour": "16:00",
    "ToHour": "19:30",
    "Name": "Italian hospital",
    "City": "Haifa",
    "Street": "",
    "NumHouse": "",
    "AccountType": ""
  },
  {
    "DateDonation": "2020-06-18T00:00:00",
    "FromHour": "16:00",
    "ToHour": "19:30",
    "Name": "German Colony",
    "City": "Haifa",
    "Street": "",
    "NumHouse": "",
    "AccountType": ""
  },
  {
    "DateDonation": "2020-06-18T00:00:00",
    "FromHour": "16:00",
    "ToHour": "19:30",
    "Name": "One Stop",
    "City": "Holywell",
    "Street": "",
    "NumHouse": "",
    "AccountType": ""
  }
];

function App() {
  const [geolocationArray, setGeolocationArray] = useState()
  useEffect(() => {
    getGeolocation(jdObject)
      .then((result) => {
        console.log("RESULT IS", result);

        setGeolocationArray(result)
      })
  }, [])


    return (
      <div>


      <Switch>
        <Route exact path="/">
          <HomeScreen alertsData={alerts}/>
        </Route>

        <Route exact path="/goals">
          <GoalsScreen />
        </Route>

          <Route exact path="/map">
            <MapBox arrayOfGeolocationObjects={geolocationArray} />
          </Route>

          <Route exact path="/personal">
            {/*TODO - render home screen*/}
          </Route>

          <Route exact path="/settings">
            <SettingsListScreen />
          </Route>

        <Route exact path="/settings/personal">
          <PersonalSettingsScreen />
        </Route>

          <Route exact path="/settings/reminders">
            {/*TODO - render home screen*/}
          </Route>
        </Switch>


      <NavBar />
    </div>
  );
}

  export default App;
