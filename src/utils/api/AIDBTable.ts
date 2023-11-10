import {
  DefaultClassParams,
  SupabaseDBNames,
} from '@types';
import { BaseClass } from '@utils/BaseClass';

export class AIDBTable extends BaseClass {
  private supabaseDBName: SupabaseDBNames = 'ai_db_table';
  constructor(params: DefaultClassParams) {
    super(params);
  }

  readonly delete = async (ai_table_name: string) => {
    try {
      // 1. Delete AI Table from database
      const deleteAITable = await this.supabase.deleteData({
        table_name: this.supabaseDBName,
        ids: [ai_table_name],
      });

      if (deleteAITable.error) {
        throw new Error(
          deleteAITable.error || `Error deleting AI Table ${ai_table_name}`,
        );
      }

      const data = deleteAITable.data || `Deleted ${ai_table_name} AI Table`;
      this.log('delete', data);
      return data;
    } catch (error: any) {
      this.log('delete', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
