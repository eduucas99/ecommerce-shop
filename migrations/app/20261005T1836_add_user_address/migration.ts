#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4faaf559b868870d2041a791cb633246f59ae28b4d0c423a056cfe72d431b85f/contract';
import endContract from '../../snapshots/4faaf559b868870d2041a791cb633246f59ae28b4d0c423a056cfe72d431b85f/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/6059fc750cdac72665ad5205b5cb12342fbd68949f762c34ce559d86f9f08126/contract';
import startContract from '../../snapshots/6059fc750cdac72665ad5205b5cb12342fbd68949f762c34ce559d86f9f08126/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Country',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerified', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('images', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('user'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('User_role_check_b73ac96c', "\"role\" IN ('admin', 'user')"),
        ],
      }),
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
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
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
