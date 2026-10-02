#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/03fdac1ef07265cd6108a376b8fdae907c42b4a08f8ba189403a82d6ede2fe0c/contract';
import startContract from '../../snapshots/03fdac1ef07265cd6108a376b8fdae907c42b4a08f8ba189403a82d6ede2fe0c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/8bb9dd4a3ff20c6abd2fa590aebd717da48e02f329603458de99c307d42da8ed/contract';
import endContract from '../../snapshots/8bb9dd4a3ff20c6abd2fa590aebd717da48e02f329603458de99c307d42da8ed/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Country',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
          }),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Country',
        constraint: 'Country_id_key',
        columns: ['id'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
