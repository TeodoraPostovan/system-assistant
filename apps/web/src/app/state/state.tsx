import { addDays, isToday, subDays } from 'date-fns';
import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext(null);

let savedUserInfo = {};
try {
  savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
} catch (err) {
  savedUserInfo = {};
}

export const AppState = ({ children }) => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exercises, setExercises] = useState([]);
  const [surveyData, setSurveyData] = useState({});
  const [userInfo, setUserInfo] = useState(savedUserInfo);

  const contextValue = useMemo(() => {
    return {
      meals,
      setMeals,
      selectedDate,
      setPrevDay: () => setSelectedDate(subDays(selectedDate, 1)),
      setNextDay: () => {
        if (isToday(selectedDate)) {
          return;
        }
        setSelectedDate(addDays(selectedDate, 1));
      },
      exercises,
      setExercises,
      surveyData,
      setSurveyData,
      userInfo,
      setUserInfo: (val) => {
        setUserInfo(val);
        localStorage.setItem('userInfo', JSON.stringify(val));
      }
    };
  }, [meals, selectedDate, exercises, surveyData, userInfo]);

  // console.log(contextValue);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
