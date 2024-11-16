import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useUpdateVendorDisplayMutation,
  useGetVendorDisplayByIdQuery,
  useGetVendorDisplaysQuery,
} from "../slices/vendorDisplayApiSlice.js";

export default function UpdateVendorDisplay() {
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateVendorDisplay, { isLoading: isUpdating }] =
    useUpdateVendorDisplayMutation();
  const { data: vendorDisplay, isLoading: isVendorDisplayLoading } =
    useGetVendorDisplayByIdQuery(id);
  const { data: vendorDisplays, isLoading: isVendorDisplaysLoading } =
    useGetVendorDisplaysQuery();

  useEffect(() => {
    if (vendorDisplay) {
      setImageURL(vendorDisplay.imageURL);
      setName(vendorDisplay.name);
      setDescription(vendorDisplay.description);
      setIsSelect(vendorDisplay.isSelect);
    }
  }, [vendorDisplay]);

  const handleUpdateVendorDisplay = async (id) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    setIsLoading(true);
    const vendorID = userInfo._id;

    const selectedDisplay = vendorDisplays.find((display) => display.isSelect);
    console.log(selectedDisplay);

    if (!selectedDisplay) {
      console.error("No selected display");
      return;
    }

    const oldDisplayID = selectedDisplay._id;

    const newDisplayID = id;
    console.log(oldDisplayID);

    try {
      const promises = [];

      if (oldDisplayID) {
        const oldDisplay = vendorDisplays.find(
          (display) => display._id === oldDisplayID
        );
        promises.push(
          updateVendorDisplay({
            id: oldDisplay._id,
            imageURL: oldDisplay.imageURL,
            name: oldDisplay.name,
            description: oldDisplay.description,
            vendorID: oldDisplay.vendorID,
            isSelect: false,
          }).unwrap()
        );
      }

      const newDisplay = vendorDisplays.find(
        (display) => display._id === newDisplayID
      );
      promises.push(
        updateVendorDisplay({
          id: newDisplay._id,
          imageURL: newDisplay.imageURL,
          name: newDisplay.name,
          description: newDisplay.description,
          vendorID: newDisplay.vendorID,
          isSelect: true,
        }).unwrap()
      );

      await Promise.all(promises);
      console.log('promises resolved')
      try {
        console.log('Before refetch');
        await refetch();
      } catch (err) {
        console.log('Error in refetch', err);
      }

      toast.success("Vendor Display updated successfully");
      navigate("/get-display-items");
      window.location.reload();
    } catch (err) {
      console.log('error occurred');
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    handleUpdateVendorDisplay(id);
  }, [id]);

  return (
    <button variant="secondary" onClick={() => handleUpdateVendorDisplay(id)}>
      Update Vendor Display
    </button>
  );
}
