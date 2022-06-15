import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCustomGlobalContext } from "../context/GlobalContext";
import { isAuthorised } from "../utils/global";

function usePrivateRoute() {
  const router = useRouter();
  useEffect(() => {
    if (isAuthorised()) {
      const redirect = router.query?.next ? String(router.query?.next) : "/";
      router.replace(redirect);
    }
  }, []);

  return [];
}

export default usePrivateRoute;
