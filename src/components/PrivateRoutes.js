import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "../store/account/actions";
import { UrlConstants } from "../constants";

export const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const accountState = useSelector((state) => state.account);
  const [getUserDispatched, setGetUserDispatched] = useState(false);

  useEffect(() => {
    if (getUserDispatched === false) {
      setGetUserDispatched(true);
    }
  }, [accountState.user]);

  useEffect(() => {
    // Dispatch getCurrentUser only if it hasn't been dispatched before
    if (accountState.auth?.expiredAt && !getUserDispatched) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, accountState.auth?.expiredAt, getUserDispatched]);

  if (
    (!getUserDispatched && accountState.auth?.expiredAt) ||
    (accountState.loading && !accountState.user?._id)
  ) {
    // Render loading state while getUser is being dispatched
    return <></>;
  }
  // Use conditional rendering based on authUser
  return getUserDispatched && accountState.user?._id ? (
    <Outlet />
  ) : (
    <Navigate to={UrlConstants.LOGIN} replace state={{ from: location }} />
  );
};
