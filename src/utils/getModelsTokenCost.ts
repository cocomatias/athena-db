import { GPTModelName } from '@types';

const gpt4Cost = {
  prompt: 0.03 / 1000,
  completion: 0.06 / 1000,
};
const gpt432Kcosts = {
  prompt: 0.06 / 1000,
  completion: 0.12 / 1000,
};

const gpt4TurboCost = {
  prompt: 0.01 / 1000,
  completion: 0.03 / 1000,
};

const gpt316KCost = {
  prompt: 0.003 / 1000,
  completion: 0.004 / 1000,
};
const gpt3Cost = {
  prompt: 0.0015 / 1000,
  completion: 0.002 / 1000,
};

export const getModelsTokenCost = (model: GPTModelName) => {
  let tokensCost: { prompt: number; completion: number };

  switch (model) {
    case GPTModelName.GPT4:
      tokensCost = gpt4Cost;
      break;
    case GPTModelName.GPT40314:
      tokensCost = gpt4Cost;
      break;
    case GPTModelName.GPT40613:
      tokensCost = gpt4Cost;
      break;
    case GPTModelName.GPT432k:
      tokensCost = gpt432Kcosts;
      break;
    case GPTModelName.GPT432k0314:
      tokensCost = gpt432Kcosts;
      break;
    case GPTModelName.GPT432k0613:
      tokensCost = gpt432Kcosts;
      break;
    case GPTModelName.GPT4TURBO:
      tokensCost = gpt4TurboCost;
      break;
    case GPTModelName.GPT3:
      tokensCost = gpt3Cost;
      break;
    case GPTModelName.GPT316k:
      tokensCost = gpt316KCost;
      break;
    case GPTModelName.GPT30301:
      tokensCost = gpt3Cost;
      break;
    case GPTModelName.GPT30613:
      tokensCost = gpt3Cost;
      break;
    case GPTModelName.GPT316k0613:
      tokensCost = gpt316KCost;
      break;
    default:
      throw new Error('Invalid model name');
  }

  return tokensCost;
};
