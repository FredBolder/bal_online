import { useEffect } from "react";

export default function PayPalButton() {
  useEffect(() => {
    if (!window.paypal) {
      console.error("PayPal SDK STILL failed to load.");
      return;
    }

    window.paypal
      .HostedButtons({ hostedButtonId: "3CEK3CQMM3YKA" })
      .render("#paypal-container-3CEK3CQMM3YKA")
      .catch(console.error);
  }, []);

  return <div id="paypal-container-3CEK3CQMM3YKA"></div>;
}





{/* <script 
  src="https://www.paypal.com/sdk/js?client-id=BAARfViDzMaZ7htTuXcNt_obEM5POXXaG7YCEeYtA4N4CE28nEkTY2jjPJeNsj_HnmvHjsYDypTSnkUGC8&components=hosted-buttons&disable-funding=venmo&currency=EUR">
</script>

<div id="paypal-container-3CEK3CQMM3YKA"></div>
<script>
  paypal.HostedButtons({
    hostedButtonId: "3CEK3CQMM3YKA",
  }).render("#paypal-container-3CEK3CQMM3YKA")
</script> */}