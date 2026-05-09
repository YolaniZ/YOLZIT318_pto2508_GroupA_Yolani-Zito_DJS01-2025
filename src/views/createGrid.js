import { createModal } from "../components/createModal.js";
import { createPodcastCard } from "../components/createPodcastCard.js";

/**
 * Creates the podcast grid view.
 */
export function createGrid() {
  return {
    render(podcasts) {
      const container = document.getElementById("podcastGrid");
      if (!container) return;

      container.replaceChildren(
        ...podcasts.map((podcast) => createPodcastCard(podcast, (selected) => createModal.open(selected)))
      );
    },
  };
}
