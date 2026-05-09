import { DateUtils } from "../utils/DateUtils.js";
import { GenreService } from "../utils/GenreService.js";
import { seasons as seasonData } from "../data.js";

/**
 * Modal controller for podcast details.
 * Handles open/close behavior and renders podcast details into the modal.
 */
export const createModal = {
  /**
   * Retrieves season detail objects for a podcast.
   * @param {string} podcastId - Podcast id to find season data for.
   * @returns {{title: string, episodes: number}[]} Season detail objects.
   */
  getSeasonDetails(podcastId) {
    return seasonData.find((item) => item.id === podcastId)?.seasonDetails || [];
  },

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
      const seasonDetails = createModal.getSeasonDetails(podcast.id);
      const summary = `Seasons: ${podcast.seasons}`;

      if (seasonDetails.length) {
        const listItems = seasonDetails
          .map(
            (season) =>
              `<li><strong>${season.title}</strong>: ${season.episodes} episodes</li>`
          )
          .join("");

        seasons.innerHTML = `
          <div class="modal-season-summary">${summary}</div>
          <ul class="modal-season-list">${listItems}</ul>
        `;
      } else {
        seasons.textContent = summary;
      }
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
