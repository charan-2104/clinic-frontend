// src/utils/gtag.js
export const gtagReportConversion = (url) => {
  const callback = () => {
    if (typeof url !== "undefined") {
      window.open(url, "_blank");
    }
  };

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "conversion", {
      send_to: "AW-17100941855/-O7uCL2_8ZcbEJ_Urto_",
      event_callback: callback,
    });
  } else {
    // fallback: just open WhatsApp if gtag isn't loaded
    callback();
  }

  return false;
};
