import { render, screen, fireEvent } from "@testing-library/react";
import { LaunchList } from "./LaunchList";
import type { Launch } from "../../types/spacex";
import { vi, describe, it, expect } from "vitest";


vi.mock("../LaunchCard/LaunchCard", () => ({
  LaunchCard: ({ launch, onSeeMore }: { launch: Launch; onSeeMore: (l: Launch) => void }) => (
    <div data-testid="launch-card">
      <span>{launch.mission_name}</span>
      <button onClick={() => onSeeMore(launch)}>See more</button>
    </div>
  ),
}));

const launches: Launch[] = [
  {
    mission_name: "FalconSat",
    rocket: { rocket_name: "Falcon 1" },
    links: { mission_patch_small: "https://example.com/patch1.png" },
  } as Launch,
  {
    mission_name: "DemoSat",
    rocket: { rocket_name: "Falcon 1" },
    links: { mission_patch_small: "https://example.com/patch2.png" },
  } as Launch,
];

describe("LaunchList", () => {
  it("рендерит заголовок", () => {
    render(<LaunchList launches={launches} onSeeMore={() => {}} />);
    expect(screen.getByText(/SpaceX Launches 2020/i)).toBeInTheDocument();
  });

  it("рендерит карточки по количеству запусков", () => {
    render(<LaunchList launches={launches} onSeeMore={() => {}} />);
    const cards = screen.getAllByTestId("launch-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("FalconSat")).toBeInTheDocument();
    expect(screen.getByText("DemoSat")).toBeInTheDocument();
  });

  it("вызывает onSeeMore при клике на кнопку карточки", () => {
    const handleSeeMore = vi.fn();
    render(<LaunchList launches={launches} onSeeMore={handleSeeMore} />);
    const buttons = screen.getAllByRole("button", { name: /see more/i });
    fireEvent.click(buttons[0]);
    expect(handleSeeMore).toHaveBeenCalledWith(launches[0]);
  });
});
