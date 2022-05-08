import { addDays, isToday, subDays } from 'date-fns';
import { createContext, useEffect, useMemo, useState } from 'react';

import { api } from '../api';

export const AppContext = createContext(null);

export const AppState = ({ children }) => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [exercises, setExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [surveyData, setSurveyData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const contextValue = useMemo(() => {
    return {
      meals,
      setMeals: async (payload) => {
        await api.post('/activity/save-activity', {
          ...payload,
          category: 'meal'
        });
        const { meals } = await fetchActivity(selectedDate);
        setMeals(meals);
      },
      selectedDate,
      setPrevDay: () => setSelectedDate(subDays(selectedDate, 1)),
      setNextDay: () => {
        if (isToday(selectedDate)) {
          return;
        }
        setSelectedDate(addDays(selectedDate, 1));
      },
      exercises,
      setExercises: async (payload) => {
        await api.post('/activity/save-activity', {
          ...payload,
          category: 'sport'
        });
        const { sports } = await fetchActivity(selectedDate);
        setExercises(sports);
      },
      surveyData,
      setSurveyData,
      userInfo,
      setUserInfo
    };
  }, [meals, selectedDate, exercises, surveyData, userInfo]);

  useEffect(() => {
    (async () => {
      const { meals, sports } = await fetchActivity(selectedDate);
      setMeals(meals);
      setExercises(sports);
    })();
  }, [selectedDate]);

  console.log(contextValue);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

async function fetchActivity(selectedDate) {
  const {
    data: {
      results: { meal, sport }
    }
  } = await api.get('/activity/get', { params: { ts: +new Date(selectedDate) } });

  const meals = meal.reduce(
    (acc, item) => {
      acc[item.data.type].push(item.data);
      return acc;
    },
    {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: []
    }
  );

  const sports = sport.map((s) => s.data);

  return { meals, sports };
}
