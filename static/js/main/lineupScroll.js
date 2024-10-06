const lineupContainer = document.querySelector('.lineupContainer');

lineupContainer.addEventListener('scroll', () => {
  const artistContainers = document.querySelectorAll('.artistContainer');
  const containerCenter = lineupContainer.offsetWidth / 2;

  let closest = null;
  let closestDistance = Infinity;

  artistContainers.forEach((artist) => {
    const artistCenter = artist.offsetLeft + artist.offsetWidth / 2;
    const distance = Math.abs(containerCenter - (artistCenter - lineupContainer.scrollLeft));

    if (distance < closestDistance) {
      closest = artist;
      closestDistance = distance;
    }
  });

  if (closest) {
    lineupContainer.scrollTo({
      left: closest.offsetLeft - (lineupContainer.offsetWidth / 2 - closest.offsetWidth / 2),
      behavior: 'smooth'
    });
  }
});