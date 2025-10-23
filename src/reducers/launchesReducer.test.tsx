import { describe, it, expect } from "vitest";
import { launchesReducer, initialState } from "./launchesReducer";
import type { Launch } from "../types/spacex";

const mockLaunch: Launch = {
  mission_name: "FalconSat",
  rocket: { rocket_name: "Falcon 1" },
  links: { mission_patch: "patch.png", mission_patch_small: "patch-small.png" },
  details: "First launch",
} as Launch;

describe("launchesReducer", () => {
  it("обрабатывает FETCH_START", () => {
    const state = launchesReducer(initialState, { type: "FETCH_START" });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("обрабатывает FETCH_SUCCESS", () => {
    const state = launchesReducer(initialState, {
      type: "FETCH_SUCCESS",
      payload: [mockLaunch],
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.launches).toEqual([mockLaunch]);
  });

  it("обрабатывает FETCH_ERROR", () => {
    const state = launchesReducer(initialState, {
      type: "FETCH_ERROR",
      payload: "Ошибка загрузки",
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Ошибка загрузки");
  });

  it("обрабатывает OPEN_MODAL", () => {
    const state = launchesReducer(initialState, {
      type: "OPEN_MODAL",
      payload: mockLaunch,
    });
    expect(state.selected).toEqual(mockLaunch);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it("обрабатывает CLOSE_MODAL", () => {
    const openedState = { ...initialState, selected: mockLaunch };
    const state = launchesReducer(openedState, { type: "CLOSE_MODAL" });
    expect(state.selected).toBeNull();
  });
});