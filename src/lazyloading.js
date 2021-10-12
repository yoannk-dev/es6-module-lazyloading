/**
 * Easy Lazyloading https://dev.to/ekafyi/lazy-loading-images-with-vanilla-javascript-2fbj
 */
import "./styles.scss";

class Lazyloading {
  constructor(className) {
    this.className = className;
    this.lazyImages = Lazyloading.getLazyImages(this.className);
    /* Functions */
    this.lazyloadObserver = this.lazyloadObserver.bind(this);
  }

  init() {
    this.lazyloadObserver();
  }

  lazyloadObserver() {
    let lazyImages = this.lazyImages;

    if ("IntersectionObserver" in window) {
      const lazyImageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          console.log(entry);
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            Lazyloading.updateImage(lazyImage);
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      lazyImages.forEach(element => lazyImageObserver.observe(element));
    }
    else {
      // `document.querySelectorAll` does not work in Opera Mini
      lazyImages = document.getElementsByClassName(this.className);
      // https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
      [].forEach.call(lazyImages, lazyImage => {
        Lazyloading.updateImage(lazyImage);
        lazyImage.height = "auto";
      });
    }
  }

  static updateImage(image) {
    image.src = image.dataset.src;
    image.dataset.src = "";
    image.classList.remove(this.className);
    Lazyloading.removeLoading(image);
  }

  static removeLoading(image) {
    if (image.parentNode.hasAttribute("data-loading")) {
      image.parentNode.setAttribute("data-loading", false);
    }
  }

  static getLazyImages(className) {
    return [].slice.call(document.querySelectorAll("." + className));
  }
}

export default Lazyloading;