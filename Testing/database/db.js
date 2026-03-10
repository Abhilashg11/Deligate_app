import { open } from '@op-engineering/op-sqlite';

export const db = open({
  name: 'app.db',
});

if (!db) {
  console.error("Failed to open the local database");
}