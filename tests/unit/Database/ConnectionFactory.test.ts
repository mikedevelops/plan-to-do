import getConnection from "~/src/Database/ConnectionFactory";
import getConfig from "~/src/Config/ConfigLoader";
import { Database } from "sqlite3";

jest.mock("~/src/Config/ConfigLoader", () => () => ({
  getValue: jest.fn(() => "data/test"),
}));
jest.mock("sqlite3", () => ({
  Database: jest.fn(),
}));

const databaseConstructorMock = (<unknown>Database) as jest.Mock<any>;

describe("ConnectionFactory", () => {
  test("Should return a database connection", (done) => {
    const config = {};
    const databaseInstance = {};
    databaseConstructorMock.mockImplementation(() => databaseInstance);

    getConnection().then((database: any) => {
      expect(databaseInstance).toBe(database);
      done();
    });

    databaseConstructorMock.mock.calls[0][1].call(null, null);
  });

  test("Should reject an error", (done) => {
    const err = new Error();

    expect.assertions(1);
    getConnection().catch((error: Error) => {
      expect(error).toBe(err);
      done();
    });

    databaseConstructorMock.mock.calls[0][1].call(null, err);
  });
});
