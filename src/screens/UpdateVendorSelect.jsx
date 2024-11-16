import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateVendorSelectMutation,
  useGetVendorSelectionsQuery,
} from "../slices/vendorSelectApiSlice.js";

export default function UpdateVendorSelect() {
  console.log("UpdateVendorSelect rendered");

  const { vendorID, clientID } = useParams();
  const navigate = useNavigate();
  const [hasUpdated, setHasUpdated] = useState(false);

  const [updateVendorSelect, { isLoading: isUpdating }] =
    useUpdateVendorSelectMutation();
  const { data: vendorSelections, isLoading: isVendorSelectionsLoading } =
    useGetVendorSelectionsQuery();

  const handleUpdateVendorSelect = async (vendorID, clientID) => {
    if (!vendorID || !clientID) {
      console.error("vendorID or clientID is undefined");
      return;
    }
    try {
      await updateVendorSelect({ vendorID, clientID }).unwrap();
      toast.success("Vendor selected successfully");
      setHasUpdated(true);
      navigate("/vendor-selection");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    handleUpdateVendorSelect(vendorID, clientID);
  }, []);

  return <button variant="secondary">Update Vendor Select</button>;
}
