// src/offline-modules/offline-sync/offline-sync.queries.js

export const CREATE_SYNC_QUEUE_TABLE = `
  CREATE TABLE IF NOT EXISTS sync_queue (
    id TEXT PRIMARY KEY,
    table_name TEXT NOT NULL,
    record_id TEXT NOT NULL,
    action TEXT NOT NULL,           -- INSERT | UPDATE | DELETE
    payload TEXT,                   -- JSON string
    created_at INTEGER,
    retry_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending'
  );
`;

export const INSERT_SYNC_ITEM = `
  INSERT INTO sync_queue (
    id,
    table_name,
    record_id,
    action,
    payload,
    created_at,
    retry_count,
    status 
  ) VALUES (?, ?, ?, ?, ?, ?, ?,?);
`;

export const SELECT_PENDING_SYNC = `
    SELECT * FROM sync_queue
  WHERE status = 'pending'
  ORDER BY created_at ASC;

`;

export const DELETE_SYNC_ITEM = `
  DELETE FROM sync_queue WHERE id = ?;
`;

export const INCREMENT_RETRY_COUNT = `
UPDATE sync_queue
SET retry_count = retry_count + 1,
    status = CASE 
        WHEN retry_count + 1 >= 5 THEN 'failed'
        ELSE 'pending'
    END
WHERE id = ?;
`;