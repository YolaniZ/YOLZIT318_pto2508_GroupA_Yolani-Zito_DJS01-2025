import { podcasts, genres } from "./data.js";
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

  const grid = createGrid();
  const genreFilter = document.getElementById("genreFilter");
  const sortOrder = document.getElementById("sortOrder");

  if (!genreFilter || !sortOrder) {
    grid.render(podcasts);
    return;
  }

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.title;
    genreFilter.appendChild(option);
  });

  const renderPodcasts = () => {
    const selectedGenre = genreFilter.value;
    const selectedSort = sortOrder.value;

    let filteredPodcasts = podcasts;

    if (selectedGenre !== "all") {
      const genreId = Number(selectedGenre);
      filteredPodcasts = podcasts.filter((podcast) =>
        podcast.genres.includes(genreId)
      );
    }

    const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
      if (selectedSort === "title") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.updated) - new Date(a.updated);
    });

    grid.render(sortedPodcasts);
  };

  genreFilter.addEventListener("change", renderPodcasts);
  sortOrder.addEventListener("change", renderPodcasts);

  renderPodcasts();
}

init();
