import { render, screen, fireEvent } from "@testing-library/react";
import { LaunchCard } from "./LaunchCard";
import type { Launch } from "../../types/spacex";
import { describe, it, expect, vi } from 'vitest';

const mockLaunch: Launch = {
  mission_name: "FalconSat",
  rocket: { rocket_name: "Falcon 1" },
  links: { mission_patch_small: "https://example.com/patch.png" },
} as Launch;

describe("LaunchCard", () => {
  it("рендерит название миссии и ракеты", () => {
    render(<LaunchCard launch={mockLaunch} onSeeMore={() => {}} />);
    expect(screen.getByText("FalconSat")).toBeInTheDocument();
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
  });

  it("рендерит картинку с alt текстом", () => {
    render(<LaunchCard launch={mockLaunch} onSeeMore={() => {}} />);
    const img = screen.getByAltText("FalconSat");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/patch.png");
  });

  it("вызывает onSeeMore при клике на кнопку", () => {
    const handleSeeMore = vi.fn();
    render(<LaunchCard launch={mockLaunch} onSeeMore={handleSeeMore} />);
    fireEvent.click(screen.getByRole("button", { name: /see more/i }));
    expect(handleSeeMore).toHaveBeenCalledWith(mockLaunch);
  });
});