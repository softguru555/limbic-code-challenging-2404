"use client";
import React, { useEffect, useMemo, useState } from "react";
import TableFour from "../Tables/TableFour";
import { getAgent } from "@/services/Agent";

import { useDispatch, useSelector } from "react-redux";

const Agent: React.FC = () => {
const dispatch = useDispatch();
  useEffect(() => {
    getAgent(dispatch);
  }, [dispatch]);
  const { user } = useSelector((state: any) => state.user)

  return (
    <>
      <div className="mt-7.5">
        <TableFour />
      </div>
    </>
  );
};

export default Agent;
