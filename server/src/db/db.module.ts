// src/db/db.module.ts
import { Global, Module } from '@nestjs/common';
import { db, DRIZZLE } from './db.provider';

@Global() // Makes Drizzle available everywhere without re-importing
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useValue: db,
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule {}
