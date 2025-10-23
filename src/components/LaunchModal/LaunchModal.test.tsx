import { render, screen, fireEvent } from "@testing-library/react";
import { LaunchModal } from "./LaunchModal";
import type { Launch } from "../../types/spacex";
import { describe, it, expect, vi } from "vitest";

const mockLaunch: Launch = {
  mission_name: "FalconSat",
  rocket: { rocket_name: "Falcon 1" },
  links: {
    mission_patch: "https://example.com/patch.png",
    mission_patch_small: "https://example.com/patch-small.png",
  },
  details: "This was the first SpaceX launch attempt.",
} as Launch;

describe("LaunchModal", () => {
  it("рендерит данные запуска", () => {
    render(<LaunchModal launch={mockLaunch} onClose={() => {}} />);

   
    expect(screen.getByText("Mission name:")).toBeInTheDocument();
    expect(screen.getByText("FalconSat")).toBeInTheDocument();

    expect(screen.getByText("Rocket name:")).toBeInTheDocument();
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();

    expect(screen.getByText("Details:")).toBeInTheDocument();
    expect(screen.getByText("This was the first SpaceX launch attempt.")).toBeInTheDocument();

    
    const img = screen.getByAltText("FalconSat");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/patch.png");
  });

  it("вызывает onClose при клике на кнопку ✕", () => {
    const handleClose = vi.fn();
    render(<LaunchModal launch={mockLaunch} onClose={handleClose} />);

    const closeButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
