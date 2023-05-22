// chart test scripts

// promo form transform

const promoMore = document.querySelector(".promo__more");

function setPromoActive() {
  const priceSection = document.querySelector(".price");
  if (promoMore && priceSection) {
    promoMore.classList.add("active");
    priceSection.classList.add("active");
  }
}
document.addEventListener("scroll", setPromoActive);

if (promoMore) {
  promoMore.addEventListener("click", function () {
    scrollToEl(".price");
  });
}

// numbers slider

new Swiper(".numbers__slider", {
  slidesPerView: 1.02,
  spaceBetween: (window.innerWidth / 375) * 8,
  pagination: {
    el: ".numbers__pagin",
    type: "bullets",
  },
});

// services card animation

const servicesItemsData = {};

const servicesItems = document.querySelectorAll(".services__item");

function initServicesCards() {
  const unit = window.innerWidth > 1440 ? "px" : "rem";

  servicesItems.forEach((item, index) => {
    item.style.transform = "translateY(" + index * 40 + unit + ")";
    servicesItemsData[index] = {
      top: item.getBoundingClientRect().top + window.pageYOffset,
      transformY: index * 20 + unit,
    };
    item.style.position = "sticky";
  });
}

if (window.innerWidth > 768) {
  initServicesCards();
}

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;
  const listTop =
    document.querySelector(".services__list").getBoundingClientRect().top +
    window.pageYOffset;
  const listHeight =
    document.querySelector(".services__list").offsetHeight + 780;
  const listBottom = listTop + listHeight;

  if (scrollTop >= listTop) {
    const points = Object.values(servicesItemsData);
    for (var i = 0; i < points.length; i++) {
      if (scrollTop >= points[i].top) {
        let scaleValue =
          (10 -
            (scrollTop - listTop - (listHeight / 4) * i) /
              (listHeight - (listHeight / 4) * i)) *
          0.1;
        if (i == 3) scaleValue = 1;
        servicesItems[i].style.transform =
          "translateY(" + points[i].transformY + ") scale(" + scaleValue + ")";
      }
    }
  }
});

// cirs animations

const backCirsNode = document.querySelector(".back-cirs");
const serv2Node = document.querySelector(".serv2");
const serviesNode = document.querySelector(".services");

function initBackCirs() {
  const val = window.innerWidth < 1440 ? window.innerWidth / 1440 : 1;
  let serviesNodeBottomY =
    serviesNode.getBoundingClientRect().top +
    window.pageYOffset +
    serviesNode.offsetHeight;
  let backCirsTopCenterY =
    backCirsNode.getBoundingClientRect().top +
    window.pageYOffset +
    backCirsNode.offsetHeight / 2;
  let serv2NodeAfterY =
    serv2Node.getBoundingClientRect().top +
    window.pageYOffset +
    serv2Node.offsetHeight +
    (val * 780) / 2 -
    window.innerHeight / 2;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset + window.innerHeight / 2 >= backCirsTopCenterY) {
      backCirsNode.classList.add("fixed");
    } else {
      backCirsNode.classList.remove("fixed");
    }
    if (window.pageYOffset >= serv2NodeAfterY) {
      backCirsNode.style.top =
        serv2NodeAfterY -
        backCirsNode.offsetHeight / 2 +
        window.innerHeight / 2 +
        "px";
      // backCirsNode.getBoundingClientRect().top + this.window.pageYOffset + 'px'
      backCirsNode.classList.add("bottom");
      backCirsNode.classList.add("col");
    }
    if (this.window.pageYOffset > serviesNodeBottomY - window.innerHeight / 2) {
      backCirsNode.classList.add("vis");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initBackCirs();
});

// maps

ymaps.ready(() => {
  const mapsButtons = document
    .querySelectorAll(".map-btn")
    .forEach((item, index) => {
      const mapBox = item.closest(".map-box");
      mapBox.querySelector(".map").id = "map" + index;
      item.addEventListener("click", function () {
        !mapBox.classList.contains("active")
          ? (this.querySelector("span").innerText = "закрыть карту")
          : (this.querySelector("span").innerText = "Смотреть на карте");
        mapBox.classList.toggle("active");
      });

      var myMap = new ymaps.Map("map" + index, {
        center: [55.650149569092456, 37.539625499999964],
        zoom: 12,
        controls: [],
        behavior: { scrollZoom: false },
      });
      myMap.behaviors.disable(["scrollZoom"]);

      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          // hintContent: 'Собственный значок метки',
          // balloonContent: 'Это красивая метка'
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: "/img/icons/map.svg",
          // Размеры метки.
          iconImageSize: [48, 63],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -63],
        }
      );

      myMap.geoObjects.add(myPlacemark);
    });
});

// benefits

const benefitsItemsList = document.querySelectorAll(".benefits__item");
const benefitsTop = [];
benefitsItemsList.forEach((item, index) => {
  benefitsTop.push(item.getBoundingClientRect().top + window.scrollY);
});
const benefitsList = document.querySelector(".benefits__list");
const benefitNumber = document.querySelector(".benefits__roll .right");

if (window.innerWidth > 768) {
  window.addEventListener("scroll", function () {
    const benefitsListGBC = benefitsList.getBoundingClientRect();
    if (
      window.scrollY > benefitsListGBC.top + window.scrollY &&
      window.scrollY <
        benefitsListGBC.top + window.scrollY + benefitsList.offsetHeight
    ) {
      for (let i = 0; i < benefitsTop.length; i++) {
        if (window.scrollY >= benefitsTop[i]) {
          benefitNumber.innerText = `0${i + 1}`;
        }
      }
    }
  });
}

// promo info

// const promoInfoBtn = document.querySelector(".info__btn");
// if (promoInfoBtn) {
//   promoInfoBtn.addEventListener("click", function () {
//     const infoBox = this.closest(".info");
//     if (infoBox.classList.contains("active")) {
//       infoBox.classList.add("closing");
//       infoBox.classList.remove("active");
//     } else if (infoBox.classList.contains("closing")) {
//       infoBox.classList.add("active");
//       infoBox.classList.remove("closing");
//     } else {
//       infoBox.classList.add("active");
//     }
//   });
// }

// services info

document.querySelectorAll(".services__item").forEach((item) => {
  const moreNode = item.querySelector(".more");
  const moreBox = item.querySelector(".more-box");
  const moreBtn = item.querySelector(".more__icon");
  moreBtn.addEventListener("click", function () {
    if (moreNode.classList.contains("active")) {
      toggleUp(moreBox);
      setTimeout(() => {
        moreNode.classList.remove("active");
      }, 1000);
    } else {
      moreNode.classList.add("active");
      setTimeout(() => {
        toggleDown(moreBox);
      }, 1000);
    }
  });
});

// numbers total
const numberInfo = document.querySelector(".numbers__total .sim-info");
if (numberInfo) {
  // const infoBtn = document.numberInfo(querySelector('.icon'))
}

// mobile toggles on services

if (window.innerWidth < 1440) {
  document.querySelectorAll(".services__item").forEach((item) => {
    const titleNode = item.querySelector(".title");
    const bodyBox = item.querySelector(".body-box");
    titleNode.addEventListener("click", function () {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        toggleUp(bodyBox);
      } else {
        item.classList.add("active");
        toggleDown(bodyBox);
      }
    });
  });

  document.querySelectorAll(".serv2__item").forEach((item) => {
    const titleNode = item.querySelector(".title");
    const bodyBox = item.querySelector(".body");
    titleNode.addEventListener("click", function () {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        toggleUp(bodyBox);
      } else {
        item.classList.add("active");
        toggleDown(bodyBox);
      }
    });
  });
}

// office info

const infoBlock = document.querySelector(".office .info");
if (infoBlock) {
  const infoBlockBox = infoBlock.querySelector(".box");
  const infoBlockIcon = infoBlock.querySelector(".info__icon");

  infoBlockIcon.addEventListener("click", function () {
    if (infoBlock.classList.contains("active")) {
      toggleUp(infoBlockBox);
      setTimeout(() => {
        infoBlock.classList.remove("active");
      }, 1000);
    } else {
      infoBlock.classList.add("active");
      setTimeout(() => {
        toggleDown(infoBlockBox);
      }, 1000);
    }
  });
}

// numbers tabs

document.querySelectorAll(".numbers__controls .tab").forEach((item, index) => {
  item.addEventListener("click", function () {
    document
      .querySelector(".numbers__controls .tab.active")
      .classList.remove("active");
    this.classList.add("active");

    document.querySelector(".chart-item.active").classList.remove("active");
    document.querySelectorAll(".chart-item")[index].classList.add("active");
  });
});

// office tabs

document
  .querySelectorAll(".office__tabs .tabs__item")
  .forEach((item, index) => {
    item.addEventListener("click", function () {
      document
        .querySelector(".office__tabs .tabs__item.active")
        .classList.remove("active");
      item.classList.add("active");

      document.querySelector(".office-item.active").classList.remove("active");
      document.querySelectorAll(".office-item")[index].classList.add("active");
    });
  });
