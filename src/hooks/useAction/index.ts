import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../store/action-creators";

export const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};
