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
  const [exercises, setExercises] = useState([]);
  const [waterLog, setWaterLog] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userInfo, setUserInfo] = useState(null);

  const fetchActivity = useCallback(async () => {
    const {
      data: {
        results: { meal, sport, water }
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

    const waterQuantityMl = water.reduce((sum, w) => {
      return sum + w.data.quantity;
    }, 0);

    return {
      meals,
      sports,
      water: {
        quantity: waterQuantityMl,
        cups: water.length
      },
      dailyMetrics: calculateDailyMetrics(meal, sports, userInfo?.surveyData || {})
    };
  }, [userInfo, selectedDate]);

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
        const { meals } = await fetchActivity();
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
        await saveActivity({
          ...payload,
          category: 'sport'
        });
        const { sports } = await fetchActivity();
        setExercises(sports);
      },
      saveWaterLog: async (quantity: number) => {
        await saveActivity({
          quantity,
          category: 'water'
        });
        const { water } = await fetchActivity();
        setWaterLog(water);
      },
      userInfo,
      setUserInfo,
      dailyMetrics,
      waterLog
    };
  }, [meals, selectedDate, exercises, userInfo, dailyMetrics, waterLog, fetchActivity, saveActivity]);

  useEffect(() => {
    (async () => {
      const { meals, sports, water, dailyMetrics } = await fetchActivity();
      setMeals(meals);
      setExercises(sports);
      setWaterLog(water);
      setDailyMetrics(dailyMetrics);
    })();
  }, [selectedDate, userInfo]);

  console.log(contextValue);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

function calculateDailyMetrics(meals: any, sports: any, surveyData: any) {
  const metrics = {
    protein: 0,
    carbs: 0,
    fat: 0,
    exerciseDuration: 0,
    calories: 0,
    dailySuggestedCalories: 0,
    BMR: 0,
    dailySuggestedProtein: 0,
    dailySuggestedCarbs: 0,
    dailySuggestedFat: 0
  };

  // console.log(surveyData);

  let BMR = 0;
  if (surveyData.gender === 'male') {
    BMR = 10 * surveyData.weight + 6.25 * surveyData.height - 5 * surveyData.age + 5;
  } else {
    BMR = 10 * surveyData.weight + 6.25 * surveyData.height - 5 * surveyData.age - 161;
  }

  let dailySuggestedCalories = 0;
  if (surveyData.activityLevel === 'sedentary') {
    dailySuggestedCalories = BMR * 1.2;
  } else if (surveyData.activityLevel === 'active') {
    dailySuggestedCalories = BMR * 1.375;
  } else if (surveyData.activityLevel === 'extremely_active') {
    dailySuggestedCalories = BMR * 1.55;
  }

  metrics.BMR = BMR;
  metrics.dailySuggestedCalories = dailySuggestedCalories;
  if (surveyData.goal === 'lose') {
    metrics.dailySuggestedCalories -= 500;
    metrics.dailySuggestedCarbs = Math.floor((dailySuggestedCalories * 0.4) / 4);
    metrics.dailySuggestedProtein = Math.floor((dailySuggestedCalories * 0.3) / 4);
    metrics.dailySuggestedFat = Math.floor((dailySuggestedCalories * 0.3) / 9);
  } else if (surveyData.goal === 'gain') {
    metrics.dailySuggestedCalories += 500;
    metrics.dailySuggestedCarbs = Math.floor((dailySuggestedCalories * 0.45) / 4);
    metrics.dailySuggestedProtein = Math.floor((dailySuggestedCalories * 0.35) / 4);
    metrics.dailySuggestedFat = Math.floor((dailySuggestedCalories * 0.2) / 9);
  } else {
    metrics.dailySuggestedCarbs = Math.floor((dailySuggestedCalories * 0.5) / 4);
    metrics.dailySuggestedProtein = Math.floor((dailySuggestedCalories * 0.25) / 4);
    metrics.dailySuggestedFat = Math.floor((dailySuggestedCalories * 0.25) / 9);
  }

  meals.forEach(({ data }) => {
    metrics.protein += data.nf_protein;
    metrics.carbs += data.nf_total_carbohydrate;
    metrics.fat += data.nf_total_fat;
    metrics.calories += data.nf_calories;
  });

  sports.forEach((sport) => {
    if (typeof sport.duration_min === 'number') {
      metrics.exerciseDuration += sport.duration_min;
    }
    if (typeof sport.nf_calories === 'number') {
      metrics.calories += sport.nf_calories;
    }
  });

  // console.log(metrics);
  return metrics;
}
