import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import type { Launch } from "../types/spacex";
import { fetchLaunches2020 } from "../utils/api";
import { vi, describe, beforeEach, it, expect, type Mock } from "vitest";
import { LaunchesPage } from "./LaunchPage";


// Мокаем API
vi.mock("../utils/api", () => ({
  fetchLaunches2020: vi.fn(),
}));

// Мокаем LaunchList и LaunchModal
vi.mock("../components/LaunchList/LaunchList", () => ({
  LaunchList: ({ launches, onSeeMore }: { launches: Launch[]; onSeeMore: (l: Launch) => void }) => (
    <div>
      {launches.map((l) => (
        <div key={l.mission_name}>
          <span>{l.mission_name}</span>
          <button onClick={() => onSeeMore(l)}>See more</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../components/LaunchModal/LaunchModal", () => ({
  LaunchModal: ({ launch, onClose }: { launch: Launch; onClose: () => void }) => (
    <div data-testid="launch-modal">
      <p>{launch.mission_name}</p>
      <button data-testid="close-modal" onClick={onClose}>
        ✕
      </button>
    </div>
  ),
}));

const mockLaunches: Launch[] = [
  {
    mission_name: "FalconSat",
    rocket: { rocket_name: "Falcon 1" },
    links: { mission_patch: "patch.png", mission_patch_small: "patch-small.png" },
    details: "First launch",
  } as Launch,
];

describe("LaunchesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("показывает индикатор загрузки", async () => {
    (fetchLaunches2020 as Mock).mockResolvedValueOnce(mockLaunches);
    render(<LaunchesPage />);
    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Загрузка/i)).not.toBeInTheDocument());
  });

  it("рендерит список запусков при успешной загрузке", async () => {
    (fetchLaunches2020 as Mock).mockResolvedValueOnce(mockLaunches);
    render(<LaunchesPage />);
    expect(await screen.findByText("FalconSat")).toBeInTheDocument();
  });

  it("показывает ошибку при неудачной загрузке", async () => {
    (fetchLaunches2020 as Mock).mockRejectedValueOnce(new Error("fail"));
    render(<LaunchesPage />);
    expect(await screen.findByText(/Ошибка загрузки/i)).toBeInTheDocument();
  });

  it("открывает модалку при клике на See more", async () => {
    (fetchLaunches2020 as Mock).mockResolvedValueOnce(mockLaunches);
    render(<LaunchesPage />);
    const button = await screen.findByRole("button", { name: /see more/i });
    fireEvent.click(button);

    const modal = await screen.findByTestId("launch-modal");
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText("FalconSat")).toBeInTheDocument();
  });

  it("закрывает модалку при клике на ✕", async () => {
    (fetchLaunches2020 as Mock).mockResolvedValueOnce(mockLaunches);
    render(<LaunchesPage />);
    const button = await screen.findByRole("button", { name: /see more/i });
    fireEvent.click(button);

    const modal = await screen.findByTestId("launch-modal");
    const closeButton = within(modal).getByTestId("close-modal");
    fireEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByTestId("launch-modal")).not.toBeInTheDocument());
  });
});
