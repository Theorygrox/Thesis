export const policyData = [
  {
    countryName: "China",
    header: "China Policy",
    policy: `The People’s Republic of China (PRC) has confirmed cases of COVID-19 within its borders.
The Department of State maintains a Travel Advisory for China of Level 3: Reconsider Travel due to COVID-19 and arbitrary enforcement of local laws.
COVID-19 precautions and preventative measures vary from location to location. Grocery stores, restaurants, and hospitals are operating.  Large gatherings are common.
The U.S. Embassy in Beijing continues to monitor developments related to COVID-19 in the PRC.
If the PRC government designates an area as medium- or high-risk for COVID, the area may be subject to intensive prevention and control measures, which could include mass testing, closures, transportation disruptions, lockdowns, family separation, or other measures.
In response to local outbreaks, Chinese authorities have implemented quarantine and testing policies in certain communities and residences. The U.S. Embassy urges all Americans to comply with local authorities’ health measures.  Due to the extreme difficulty in transferring from one hospital to another, medical care options may be limited.  If you find yourself in an emergency, please contact the Embassy or nearest Consulate.`,
    url:
      "https://china.usembassy-china.org.cn/covid-19-information/?_ga=2.170701152.1594848645.1617317854-42795230.1617317854",
    route: require("../assets/China.jpg"),
  },
  {
    countryName: "error",
    header: "Oops!",
    policy: `Sorry! We currently don't have the info about the country you are looking for.`,
    url: "",
    route: require("../assets/error.jpg"),
  },
  {
    countryName: "United States",
    header: "United States COVID-19 Traveler Information",
    policy: `Effective January 26, the Centers of Disease Control and Prevention (CDC) will require all air passengers entering the United States (including U.S. citizens and Legal Permanent Residents) to present a negative COVID-19 test, taken within three calendar days of departure or proof of recovery from the virus within the last 90 days​. Airlines must confirm the negative test result or proof of recovery for all passengers two years of age and over prior to boarding. ​Airlines must deny boarding of passengers who do not provide documentation of a negative test or recovery

Please see CDC’s FAQ for answers to questions about the new requirement for proof of negative COVID-19 test or recovery from COVID-19 for all air passengers arriving in the United States.
    
CDC recommends that you do not travel at this time. Delay travel and stay home to protect yourself and others from COVID-19. If you do travel, follow all CDC recommendations before, during, and after travel.`,
    url:
      "https://travel.state.gov/content/travel/en/traveladvisories/ea/covid-19-information.html",
    route: require("../assets/UnitedStates.jpg"),
  },
];
