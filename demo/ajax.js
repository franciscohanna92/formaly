(function () {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      const form = document.getElementById("asyncForm");
      form.addEventListener("submit", submit);

      function post(payload) {
        fetch(
          "http://localhost:5001/formaly-7c2e7/us-central1/forms/zgUUPPITMyDJ1v6zpViZ",
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => alert(JSON.stringify(res)))
          .catch((err) => console.error(err));
      }

      function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let payload = {};

        for (let entry of formData.entries()) {
          const [name, value] = entry;
          payload[name] = value;
        }

        post(payload);
      }
    },
    false
  );
})();
