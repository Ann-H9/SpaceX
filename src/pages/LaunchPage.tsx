import { useEffect, useReducer } from "react";
import { initialState, launchesReducer } from "../reducers/launchesReducer";
import { fetchLaunches2020 } from "../utils/api";
import { LaunchList } from "../components/LaunchList/LaunchList";
import { LaunchModal } from "../components/LaunchModal/LaunchModal";

export function LaunchesPage() {
  const [state, dispatch] = useReducer(launchesReducer, initialState);

  useEffect(() => {
    async function load() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchLaunches2020();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch {
        dispatch({ type: "FETCH_ERROR", payload: "Ошибка загрузки" });
      }
    }
    load();
  }, []);

  return (
    <div>
      {state.loading && <p>Загрузка...</p>}
      {state.error && <p>{state.error}</p>}

      <LaunchList
        launches={state.launches}
        onSeeMore={(launch) => dispatch({ type: "OPEN_MODAL", payload: launch })}
      />

      {state.selected && (
        <LaunchModal
          data-testid="launch-modal"
          launch={state.selected}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        />
      )}
    </div>
  );
}
