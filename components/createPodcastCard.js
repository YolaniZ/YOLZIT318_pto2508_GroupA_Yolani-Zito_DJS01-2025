import { GenreService } from "../GenreService.js";
import { DateUtils } from "../DateUtils.js";

/**
 * Creates a podcast card element for the grid.
 * @param {object} podcast - Podcast data object.
 * @param {function} onClick - Click handler invoked when the card is selected.
 * @returns {HTMLElement} Podcast card element.
 */
export function createPodcastCard(podcast, onClick) {
  const card = document.createElement("article");
  card.className = "podcast-card";
  card.dataset.id = podcast.id;

  const genreNames = GenreService.getNames(podcast.genres);

  card.innerHTML = `
    <img class="podcast-cover" src="${podcast.image}" alt="${podcast.title} cover image" />
    <div class="podcast-card-body">
      <h3>${podcast.title}</h3>
      <p class="podcast-meta">${podcast.seasons} seasons · ${genreNames.join(", ")}</p>
      <p class="podcast-updated">${DateUtils.format(podcast.updated)}</p>
    </div>
  `;

  card.addEventListener("click", () => onClick(podcast));
  return card;
}
