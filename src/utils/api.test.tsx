import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchLaunches2020 } from "./api";

describe("fetchLaunches2020", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("возвращает данные при успешном ответе", async () => {
    const mockData = [{ mission_name: "FalconSat" }];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await fetchLaunches2020();
    expect(result).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.spacexdata.com/v3/launches?launch_year=2020"
    );
  });

  it("выбрасывает ошибку при res.ok = false", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => [],
    } as Response);

    await expect(fetchLaunches2020()).rejects.toThrow("Ошибка загрузки");
  });
});
