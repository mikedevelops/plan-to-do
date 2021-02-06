import { serialiseDate } from "~/src/api/Time";

describe("Date Utils", () => {
  describe("serialiseDate", () => {
    test("should serialise a date", () => {
      const date = new Date(1988, 9, 3);

      expect(serialiseDate(date)).toBe(date.toISOString());
    });
  });
});
