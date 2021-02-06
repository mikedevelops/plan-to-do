import { sql } from "~/src/api/Database";

const db = {
  run: jest.fn(),
  all: jest.fn(),
  get: jest.fn(),
} as any;

describe("Database", () => {
  describe("run", () => {
    test("Should run the query and return the updated row count", (done) => {
      expect.assertions(1);

      sql.run(db, "SQL").then((rows: number) => {
        expect(rows).toBe(666);
        done();
      });

      db.run.mock.calls[0][1].call({ changes: 666 }, null);
    });

    test("Should reject an error", (done) => {
      const err = new Error();

      expect.assertions(1);

      sql.run(db, "SQL").catch((error: Error) => {
        expect(error).toBe(err);
        done();
      });

      db.run.mock.calls[0][1].call(null, err);
    });
  });

  describe("all", () => {
    test("Should run the query and return the updated rows", (done) => {
      const data: any[] = [{ id: 666 }];

      expect.assertions(1);

      sql.getAll(db, "SQL").then((rows: any[]) => {
        expect(rows).toBe(data);
        done();
      });

      db.all.mock.calls[0][1].call(null, null, data);
    });

    test("Should reject an error", (done) => {
      const err = new Error();

      expect.assertions(1);

      sql.getAll(db, "SQL").catch((error: Error) => {
        expect(error).toBe(err);
        done();
      });

      db.all.mock.calls[0][1].call(null, err);
    });
  });

  describe("get", () => {
    test("Should run the query and return the first row", (done) => {
      const data = { id: 666 };

      expect.assertions(1);

      sql.getOne(db, "SQL").then((row: any) => {
        expect(row).toBe(data);
        done();
      });

      db.get.mock.calls[0][1].call(null, null, data);
    });

    test("Should reject an error", (done) => {
      const err = new Error();

      expect.assertions(1);

      sql.getOne(db, "SQL").catch((error: Error) => {
        expect(error).toBe(err);
        done();
      });

      db.get.mock.calls[0][1].call(null, err);
    });
  });
});
