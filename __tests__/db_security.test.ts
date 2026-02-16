import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to ensure queryMock is defined before the mock factory runs
const { queryMock } = vi.hoisted(() => {
  return { queryMock: vi.fn().mockResolvedValue([]) };
});

vi.mock('@neondatabase/serverless', () => ({
  neon: () => ({
    query: queryMock
  })
}));

import { db } from '../src/lib/db/index';

describe('Database Security', () => {
  beforeEach(() => {
    queryMock.mockClear();
    // Simulate DB configured
    process.env.DATABASE_URL = 'postgres://user:pass@host/db';
  });

  it('should escape table names in insert', async () => {
    // This is expected to fail initially as table names are not escaped
    await db.insert('users', { name: 'test' });
    // We expect: INSERT INTO "users" ("name") VALUES ($1) RETURNING *
    // Current implementation: INSERT INTO users (name) VALUES ($1) RETURNING *
    expect(queryMock).toHaveBeenCalledWith(
      expect.stringMatching(/INSERT INTO "users" \("name"\) VALUES \(\$1\) RETURNING \*/),
      ['test']
    );
  });

  it('should escape column names in insert', async () => {
    // This is expected to fail initially as column names are not escaped
    await db.insert('users', { 'bad_col"': 'test' });
    // We expect: INSERT INTO "users" ("bad_col""") VALUES ($1) RETURNING *
    // Current implementation: INSERT INTO users (bad_col") VALUES ($1) RETURNING *
    expect(queryMock).toHaveBeenCalledWith(
      expect.stringMatching(/INSERT INTO "users" \("bad_col"""\) VALUES \(\$1\) RETURNING \*/),
      ['test']
    );
  });

  it('should escape table names in update', async () => {
    // This is expected to fail initially
    await db.update('users', 1, { name: 'test' });
    // We expect: UPDATE "users" SET "name" = $1 WHERE "id" = $2 RETURNING *
    // Current implementation: UPDATE users SET name = $1 WHERE id = $2 RETURNING *
     expect(queryMock).toHaveBeenCalledWith(
      expect.stringMatching(/UPDATE "users" SET "name" = \$1 WHERE "id" = \$2 RETURNING \*/),
      ['test', 1]
    );
  });

  it('should escape id column in update', async () => {
    // This is expected to fail initially
    await db.update('users', 1, { name: 'test' }, 'user_id');
    // We expect: UPDATE "users" SET "name" = $1 WHERE "user_id" = $2 RETURNING *
    // Current implementation: UPDATE users SET name = $1 WHERE user_id = $2 RETURNING *
     expect(queryMock).toHaveBeenCalledWith(
      expect.stringMatching(/UPDATE "users" SET "name" = \$1 WHERE "user_id" = \$2 RETURNING \*/),
      ['test', 1]
    );
  });
});
