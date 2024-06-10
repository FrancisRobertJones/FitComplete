export const renewPayment = () => {
  setInterval(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/stripe/renew-payment"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }, 1000);
};
