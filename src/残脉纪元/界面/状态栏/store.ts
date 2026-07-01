import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../脚本/变量结构/schema';

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });

