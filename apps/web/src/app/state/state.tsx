import { addDays, isToday, subDays } from 'date-fns';
import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext(null);

export const AppState = ({ children }) => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exercises, setExercises] = useState([]);

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
      setExercises
    };
  }, [meals, selectedDate, exercises]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
