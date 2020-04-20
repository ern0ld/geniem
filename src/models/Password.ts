//Password model

import { Model } from 'objection';
import { tables } from '../../constants';

export default class Password extends Model {
  static tableName = tables.PW_TABLE;

  readonly id!: number;
  username: string;
  hash?: string;


  static jsonSchema = {
    type: 'object',
    required: ['username'],

    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 1, maxLength: 255 },
      hash: { type: 'string', minLength: 1, maxLength: 255 },
    },
  };
}
