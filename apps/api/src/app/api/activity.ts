import { endOfDay, isSameDay, startOfDay } from 'date-fns';
import { Request, Response, Router } from 'express';
import { serializeError } from 'serialize-error';

import { ActivityCollection } from '../db/activity';
import { UsersCollection } from '../db/user';

const router = Router();

router.post('/save-activity', async (req: Request, res: Response) => {
  try {
    const payload = {
      ts: new Date(req.body.ts),
      data: req.body,
      userId: (req as any).user._id,
      type: req.body.category
    };

    await ActivityCollection.collection.insertOne(payload);
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

router.get('/get', async (req: Request, res: Response) => {
  try {
    const ts = +req.query.ts;

    const rawWeeklyMetrics = await ActivityCollection.getWeeklyMetrics((req as any).user._id, ts);

    const aggregatedMap = Object.keys(rawWeeklyMetrics).reduce((acc, ts: string) => {
      const results = rawWeeklyMetrics[ts];
      const grouped = results.reduce(
        (acc, curr) => {
          acc[curr.type].push(curr);
          return acc;
        },
        {
          meal: [],
          sport: [],
          water: []
        }
      );

      const dailyMetrics = calculateDailyMetrics(
        grouped.meal,
        grouped.sport.map((s) => s.data),
        (req as any).user.surveyData
      );

      acc[ts] = {
        ...grouped,
        dailyMetrics
      };

      return acc;
    }, {});

    res.send({
      ...aggregatedMap[Object.keys(aggregatedMap).find((_ts) => isSameDay(+_ts, ts))],
      weeklyMetrics: aggregatedMap
    });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;

function calculateDailyMetrics(meals: any, sports: any, surveyData: any) {
  const metrics = {
    protein: 0,
    carbs: 0,
    fat: 0,
    exerciseDuration: 0,
    burnedCalories: 0,
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
    dailySuggestedCalories = BMR * 1.55;
  } else if (surveyData.activityLevel === 'extremely_active') {
    dailySuggestedCalories = BMR * 1.9;
  }

  metrics.BMR = Math.round(BMR);
  metrics.dailySuggestedCalories = Math.round(dailySuggestedCalories);
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
      metrics.burnedCalories += sport.nf_calories;
    }
  });

  metrics.protein = Math.round(metrics.protein);
  metrics.carbs = Math.round(metrics.carbs);
  metrics.fat = Math.round(metrics.fat);
  metrics.calories = Math.round(metrics.calories);
  metrics.exerciseDuration = Math.round(metrics.exerciseDuration);
  metrics.burnedCalories = Math.round(metrics.burnedCalories);

  return metrics;
}
