#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/2a25e866495110889e70cf4fec62ff4f6d21f2f034c6c8a8e4454750ff47f8d3/contract';
import startContract from '../../snapshots/2a25e866495110889e70cf4fec62ff4f6d21f2f034c6c8a8e4454750ff47f8d3/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e160e579413d16f5d2574375d92f4607b293d0d6b6bdc038691570a253f9510e/contract';
import endContract from '../../snapshots/e160e579413d16f5d2574375d92f4607b293d0d6b6bdc038691570a253f9510e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'Order',
        column: 'isPaid',
        defaultSql: 'DEFAULT false',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
