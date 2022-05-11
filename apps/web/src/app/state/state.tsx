import { addDays, isToday, subDays } from 'date-fns';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '../api';

export const AppContext = createContext(null);

export const AppState = ({ children }) => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [dailyMetrics, setDailyMetrics] = useState(null);
  const [weeklyMetrics, setWeeklyMetrics] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [waterLog, setWaterLog] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userInfo, setUserInfo] = useState(null);

  const fetchActivity = useCallback(async () => {
    const {
      data: { meal, sport, water, dailyMetrics, weeklyMetrics }
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

    const waterQuantityMl = water.reduce((sum, w) => {
      return sum + w.data.quantity;
    }, 0);

    const result = {
      meals,
      sports,
      water: {
        quantity: waterQuantityMl,
        cups: water.length
      },
      dailyMetrics,
      weeklyMetrics
    };

    setMeals(result.meals);
    setExercises(result.sports);
    setWaterLog(result.water);
    setDailyMetrics(result.dailyMetrics);
    setWeeklyMetrics(result.weeklyMetrics);
  }, [selectedDate, setMeals, setExercises, setWaterLog, setDailyMetrics, setWeeklyMetrics]);

  const saveActivity = useCallback(
    async (payload: any) => {
      await api.post('/activity/save-activity', {
        ...payload,
        ts: +new Date(selectedDate)
      });
    },
    [userInfo, selectedDate]
  );

  const contextValue = useMemo(() => {
    return {
      meals,
      setMeals: async (payload) => {
        await saveActivity({
          ...payload,
          category: 'meal'
        });
        fetchActivity();
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
        await saveActivity({
          ...payload,
          category: 'sport'
        });
        fetchActivity();
      },
      saveWaterLog: async (quantity: number) => {
        await saveActivity({
          quantity,
          category: 'water'
        });
        fetchActivity();
      },
      userInfo,
      setUserInfo,
      dailyMetrics,
      weeklyMetrics,
      waterLog
    };
  }, [meals, selectedDate, exercises, userInfo, dailyMetrics, waterLog, weeklyMetrics, fetchActivity, saveActivity]);

  useEffect(() => {
    fetchActivity();
  }, [selectedDate, userInfo]);

  console.log(contextValue);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
