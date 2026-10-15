#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c9c1a9637b74d214ae3eeebbb3a234d24d2661ebfe6f42539857ceeeeb30e270/contract';
import endContract from '../../snapshots/c9c1a9637b74d214ae3eeebbb3a234d24d2661ebfe6f42539857ceeeeb30e270/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e160e579413d16f5d2574375d92f4607b293d0d6b6bdc038691570a253f9510e/contract';
import startContract from '../../snapshots/e160e579413d16f5d2574375d92f4607b293d0d6b6bdc038691570a253f9510e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('transactionId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
