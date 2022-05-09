import axios from 'axios';
import { Request, Response, Router } from 'express';
import { serializeError } from 'serialize-error';

import { RecommendationCollection } from '../db/recommendation';

const router = Router();

const secrets = ['72d02592ecb04982a7f4fb0ce88d5ef4'];

function getSecret() {
  return secrets[Math.floor(Math.random() * secrets.length)];
}

router.get('/recommendations', async (req: Request, res: Response) => {
  try {
    const userInfo = (req as any).user;
    const savedRecommendedRecipes = await RecommendationCollection.collection.findOne({
      userId: userInfo._id
    });

    if (savedRecommendedRecipes) {
      return res.send(savedRecommendedRecipes.recipes);
    }

    const params = {
      addRecipeNutrition: true,
      intolerances: userInfo.surveyData?.allergies?.join(',') || '',
      diet: userInfo.surveyData?.diets?.join(',') || ''
    };
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params,
      headers: {
        'x-api-key': getSecret()
      }
    });

    await RecommendationCollection.collection.insertOne({
      userId: userInfo._id,
      recipes: response.data.results
    });

    res.send(response.data.results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;
