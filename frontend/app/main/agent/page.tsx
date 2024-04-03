"use client";
import React, { useEffect, useMemo, useState } from "react";
import TableFour from "@/components/Tables/TableFour";
import { getAgent } from "@/services/Agent";

import { useDispatch, useSelector } from "react-redux";

const Agent: React.FC = () => {
 
  return (
    <>
      <div className="mt-7.5">
        <TableFour />
      </div>
    </>
  );  
};

export default Agent;