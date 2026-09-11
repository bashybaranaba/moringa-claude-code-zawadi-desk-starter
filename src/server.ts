import { createApp } from "./api/app.js";

const port = Number(process.env.PORT ?? 4010);

createApp().listen(port, () => {
  console.log(`Zawadi Desk listening on http://localhost:${port}`);
});
