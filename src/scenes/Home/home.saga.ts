import { takeEvery, call } from "redux-saga/effects";

function* fetchHome(action) {
  // eslint-disable-next-line no-console
  yield call(console.log, "hi");
}

export function* fetchHomeSaga() {
  yield takeEvery("PINNED_METRIC_INIT", fetchHome);
}
