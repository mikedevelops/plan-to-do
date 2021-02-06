import fs from "fs";
import { ConfigValue } from "~/src/api/Config/types";
import getConfig from "~/src/api/Config/ConfigLoader";

jest.mock("fs");

const readFileSyncMock = fs.readFileSync as jest.Mock<any>;
const mockConfig = `
${ConfigValue.DB_LOCATION}=path/to/database
`;

describe("ConfigLoader", () => {
  const config = getConfig();

  test("Should support overriding config location", () => {
    readFileSyncMock.mockReturnValue(mockConfig);
    process.env.ENV_PATH = "path/to/some/config";

    config.getValue(ConfigValue.DB_LOCATION);

    expect(
      readFileSyncMock.mock.calls[0][0].endsWith("path/to/some/config")
    ).toBe(true);

    delete process.env.ENV_PATH;
  });

  test("Should throw an error if the config file does not exist", () => {
    config.reload();
    readFileSyncMock.mockImplementation(() => {
      throw new Error();
    });

    expect(() => config.getValue(ConfigValue.DB_LOCATION)).toThrow();
  });

  test("Should throw if there is are unreadable lines", () => {
    config.reload();
    readFileSyncMock.mockReturnValue("invalid config");

    expect(() => config.getValue(ConfigValue.DB_LOCATION)).toThrow();
  });

  test("Should throw if there is an invalid key", () => {
    config.reload();
    readFileSyncMock.mockReturnValue(`not_a_valid_key=bar`);

    expect(() => config.getValue(ConfigValue.DB_LOCATION)).toThrow();
  });

  test("Should use a cached config when accessing multiple times to reduce IO", () => {
    config.reload();
    readFileSyncMock.mockReturnValue(mockConfig);

    config.getValue(ConfigValue.DB_LOCATION);
    config.getValue(ConfigValue.DB_LOCATION);

    expect(readFileSyncMock).toHaveBeenCalledTimes(1);
  });

  describe("getValue", () => {
    test("Should get config value", () => {
      readFileSyncMock.mockReturnValue(mockConfig);

      expect(config.getValue(ConfigValue.DB_LOCATION)).toBe("path/to/database");
    });

    test("Should throw if the value is undefined", () => {
      readFileSyncMock.mockReturnValue(mockConfig);

      expect(() => config.getValue("foo" as ConfigValue)).toThrow();
    });
  });
});
