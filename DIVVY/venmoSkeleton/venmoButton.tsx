import React from "react";
import { Button } from "@/components/ui/button";
import { IoLogoVenmo } from "react-icons/io5";

const LaunchVenmo = () => {
  const openVenmo = () => {
    const venmoUrl = "https://venmo.com"; // Add more if needed
    window.open(venmoUrl, "_blank");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={openVenmo} className="flex items-center gap-2 p-4 text-white bg-green-500 hover:bg-green-600">
        <IoLogoVenmo size={24} /> Launch Venmo
      </Button>
    </div>
  );
};

export default LaunchVenmo;