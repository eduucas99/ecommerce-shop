#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4faaf559b868870d2041a791cb633246f59ae28b4d0c423a056cfe72d431b85f/contract';
import endContract from '../../snapshots/4faaf559b868870d2041a791cb633246f59ae28b4d0c423a056cfe72d431b85f/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/8bb9dd4a3ff20c6abd2fa590aebd717da48e02f329603458de99c307d42da8ed/contract';
import startContract from '../../snapshots/8bb9dd4a3ff20c6abd2fa590aebd717da48e02f329603458de99c307d42da8ed/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'Country', column: 'createdAt' }),
      this.dropColumn({ schema: 'public', table: 'Country', column: 'updatedAt' }),
      this.dropConstraint({ schema: 'public', table: 'Country', constraint: 'Country_id_key' }),
      this.createTable({
        schema: 'public',
        table: 'UserAddress',
        columns: [
          col('address', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('address2', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('countryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('firstName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('lastName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('postalCode', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addPrimaryKey({
        schema: 'public',
        table: 'Country',
        constraint: 'Country_pkey',
        columns: ['id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'UserAddress',
        constraint: 'UserAddress_userId_key',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserAddress',
        index: 'UserAddress_countryId_idx_27b43b27',
        columns: ['countryId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserAddress',
        foreignKey: {
          name: 'UserAddress_countryId_fkey',
          columns: ['countryId'],
          references: { schema: 'public', table: 'Country', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserAddress',
        foreignKey: {
          name: 'UserAddress_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
