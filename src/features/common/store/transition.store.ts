import { createStore } from 'zustand/vanilla';

type TransitionParameter = {
  [key: string]: unknown;
};

type TransitionState = {
  transition: TransitionParameter;
};

const transitionStore = createStore<TransitionState>(() => ({
  transition: {},
}));

export function getTransitionParams() {
  const { transition } = transitionStore.getState();
  return transition;
}

export function setTransitionParams(params: TransitionParameter) {
  const state = getTransitionParams();
  transitionStore.setState({ transition: { ...state, ...params } });
}
