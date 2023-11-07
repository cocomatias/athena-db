import { GPTModelName } from '@types';

export const getTokensLimit = (model: GPTModelName) => {
  let tokensLimit: number;

  switch (model) {
    case GPTModelName.GPT4:
      tokensLimit = 7900;
      break;
    case GPTModelName.GPT40314:
      tokensLimit = 7900;
      break;
    case GPTModelName.GPT40613:
      tokensLimit = 7900;
      break;
    case GPTModelName.GPT432k:
      tokensLimit = 31000;
      break;
    case GPTModelName.GPT432k0314:
      tokensLimit = 31000;
      break;
    case GPTModelName.GPT432k0613:
      tokensLimit = 31000;
      break;
    case GPTModelName.GPT4TURBO:
      tokensLimit = 120000;
      break;
    case GPTModelName.GPT3:
      tokensLimit = 3900;
      break;
    case GPTModelName.GPT316k:
      tokensLimit = 15900;
      break;
    case GPTModelName.GPT30301:
      tokensLimit = 3900;
      break;
    case GPTModelName.GPT30613:
      tokensLimit = 3900;
      break;
    case GPTModelName.GPT316k0613:
      tokensLimit = 15900;
      break;
    default:
      throw new Error('Invalid model name');
  }

  return tokensLimit;
};
