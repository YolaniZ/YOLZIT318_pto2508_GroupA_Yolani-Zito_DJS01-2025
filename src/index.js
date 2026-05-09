import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";
import { DateUtils } from "./utils/DateUtils.js";

/**
 * Initializes the podcast application.
 *
 * @principle SRP - Only responsible for application startup logic like event binding and rendering initial grid.
 */
function init() {
  document
    .getElementById("closeModal")
    .addEventListener("click", createModal.close);

  const formattedDate = DateUtils.format(podcasts[0].updated);
  console.log(formattedDate);

  const grid = createGrid();
  grid.render(podcasts);
}

init();
