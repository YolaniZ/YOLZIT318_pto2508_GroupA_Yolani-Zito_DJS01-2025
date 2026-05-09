import { DateUtils } from "../DateUtils.js";
import { GenreService } from "../GenreService.js";

/**
 * Modal controller for podcast details.
 * Handles open/close behavior and renders podcast details into the modal.
 */
export const createModal = {
  /**
   * Opens the detail modal for a podcast.
   * @param {object} podcast - Podcast data object.
   */
  open(podcast) {
    if (!podcast) return;

    const modal = document.getElementById("modal");
    if (!modal) return;

    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const image = document.getElementById("modalImage");
    const genres = document.getElementById("modalGenres");
    const updated = document.getElementById("modalUpdated");
    const seasons = document.getElementById("modalSeasons");

    if (title) title.textContent = podcast.title;
    if (description) description.textContent = podcast.description;
    if (image) {
      image.src = podcast.image || "";
      image.alt = podcast.title || "Podcast cover image";
    }

    if (genres) {
      const genreNames = GenreService.getNames(podcast.genres);
      genres.innerHTML = genreNames
        .map((name) => `<span class="genre-chip">${name}</span>`)
        .join("");
    }

    if (updated) {
      updated.textContent = DateUtils.format(podcast.updated);
    }

    if (seasons) {
      seasons.textContent = `Seasons: ${podcast.seasons}`;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  },

  /**
   * Closes the detail modal.
   */
  close() {
    const modal = document.getElementById("modal");
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  },
};
