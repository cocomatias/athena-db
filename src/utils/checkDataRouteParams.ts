import { Request } from 'express';

export const checkDatRouteParams = (req: Request) => {
  const body = req.body;
  const { ids, ai_table_name } = body;

  if (ids) {
    if (!Array.isArray(ids)) {
      throw new Error(`Invalid ids param: ${typeof ids}`);
    }
    if (!ids.length) {
      throw new Error(`No ids provided`);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.length)) {
      throw new Error(`All the ids must be non empty strings`);
    }
  }

  if (ai_table_name && typeof ai_table_name !== 'string') {
    throw new Error(`Invalid ai_table_name param: ${typeof ai_table_name}`);
  }

  if (!ids && !ai_table_name) {
    throw new Error(`You must provide either ids or ai_table_name param`);
  }

  if (ids && ai_table_name) {
    throw new Error(
      `You must provide either ids or ai_table_name param, not both`,
    );
  }

  return {
    ids,
    ai_table_name,
  };
};
