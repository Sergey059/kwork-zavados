// toggle functions

function toggleDown(nodeName) {
  const node =
    typeof nodeName == "string" ? document.querySelector(nodeName) : nodeName;
  if (node) {
    const nodeActualHeight = node.offsetHeight + "px";
    node.style.maxHeight = "unset";
    const nodeFullHeight = node.offsetHeight + "px";
    node.style.maxHeight = nodeActualHeight;
    setTimeout(() => {
      node.style.maxHeight = nodeFullHeight;
    }, 50);
  }
}

function toggleUp(nodeName) {
  const node =
    typeof nodeName == "string" ? document.querySelector(nodeName) : nodeName;
  if (node) {
    setTimeout(() => {
      node.style.maxHeight = "0px";
    }, 50);
  }
}

// scroll functions

let scrollInterval = null;

function clearScrollInterval() {
  clearInterval(scrollInterval);
}

document.addEventListener("wheel", () => {
  clearScrollInterval();
});

function scrollToEl(nodeEl) {
  const node = document.querySelector(nodeEl);
  if (node) {
    clearScrollInterval();
    const targetOffset =
      node.getBoundingClientRect().y + window.pageYOffset - 40;
    let startPoint = window.pageYOffset;
    const intervalStep = startPoint > targetOffset ? -35 : 35;
    scrollInterval = setInterval(() => {
      intervalStep > 0
        ? targetOffset >= startPoint
          ? (startPoint += intervalStep)
          : clearScrollInterval()
        : targetOffset <= startPoint
        ? (startPoint += intervalStep)
        : clearScrollInterval();
      window.scrollTo(0, startPoint);
    }, 10);
  }
}

// to top button

const toTopButton = document.querySelector(".toTop");
if (toTopButton) {
  toTopButton.addEventListener("click", function () {
    scrollToEl(".header");
  });
  setInterval(function () {
    if (window.pageYOffset > window.innerHeight) {
      toTopButton.classList.add("active");
    } else {
      toTopButton.classList.remove("active");
    }
  }, 500);
}

// modals scripts

const body = document.querySelector("body");

function openModal(modalNode) {
  const modal = document.querySelector(modalNode);
  if (modal) {
    body.classList.add("over");
    modal.classList.add("active");
  }
}

document.addEventListener("click", function (e) {
  if (
    (e.target.closest(".modal") && !e.target.closest(".modal-cont")) ||
    e.target.closest(".modal-close")
  ) {
    e.target.closest(".modal").classList.remove("active");
    body.classList.remove("over");
  }
});

// header actions scripts

const headerContactsNode = document.querySelector(".header__actions .contact");
if (headerContactsNode) {
  headerContactsNode.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      this.classList.add("active");
      toggleDown(".header__actions .contact");
    } else {
      this.classList.remove("active");
      toggleUp(".header__actions .contact");
    }
  });
}

// sim info

document.querySelectorAll(".sim-info").forEach((item) => {
  const iconBtn = item.querySelector(".icon");
  const boxNode = item.querySelector(".box");
  iconBtn.addEventListener("click", function () {
    if (item.classList.contains("active")) {
      toggleUp(boxNode);
      setTimeout(() => {
        item.classList.remove("active");
      }, 500);
    } else {
      item.classList.add("active");
      setTimeout(() => {
        toggleDown(boxNode);
      }, 500);
    }
  });
});

// menu-btn
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const headerMenu = document.querySelector(".header-menu");
const headerContacts = document.querySelector(".header .contact");
const contactBtn = document.querySelector(".contact-btn");
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    window.scrollTo(0, 0);
    if (contactBtn.classList.contains("active")) {
      contactBtn.click();
    }
    if (!this.classList.contains("active")) {
      this.classList.add("active");
      header.classList.add("opened");
      headerMenu.classList.add("active");
      body.classList.add("over");
    } else {
      this.classList.remove("active");
      header.classList.remove("opened");
      headerMenu.classList.remove("active");
      body.classList.remove("over");
    }
  });
}

if (contactBtn) {
  contactBtn.addEventListener("click", function () {
    if (menuBtn.classList.contains("active")) {
      menuBtn.click();
    }
    if (!this.classList.contains("active")) {
      this.classList.add("active");
      header.classList.add("opened");
      headerContacts.classList.add("active");
      body.classList.add("over");
    } else {
      this.classList.remove("active");
      header.classList.remove("opened");
      headerContacts.classList.remove("active");
      body.classList.remove("over");
    }
  });
}

if (window.innerWidth < 768) {
  // header links toggle on moible

  document.querySelectorAll(".header-menu__box .line").forEach((item) => {
    const titleNode = item.querySelector(".title");
    const boxNode = item.querySelector(".nav-cont");
    titleNode.addEventListener("click", function () {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        toggleUp(boxNode);
      } else {
        item.classList.add("active");
        toggleDown(boxNode);
      }
    });
  });

  // footer links toggle on mobile

  document.querySelectorAll(".footer__nav-item").forEach((item) => {
    const titleNode = item.querySelector(".title");
    const boxNode = item.querySelector(".list-box");
    titleNode.addEventListener("click", function () {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        toggleUp(boxNode);
      } else {
        item.classList.add("active");
        toggleDown(boxNode);
      }
    });
  });
}

// timers

function clockTimer() {
  var date = new Date();

  var time = [date.getHours(), date.getMinutes()];
  if (time[0] < 10) {
    time[0] = "0" + time[0];
  }
  if (time[1] < 10) {
    time[1] = "0" + time[1];
  }

  var current_time = [time[0], time[1]].join(":");
  var clock = document.getElementById("clock");
  clock.innerHTML = current_time;

  setTimeout(clockTimer, 1000);
}

// clockTimer();

// inputs

document.querySelectorAll(".input, .textarea").forEach((item) => {
  const inputNode = item.querySelector("input, textarea");
  inputNode.addEventListener("focus", function (e) {
    item.classList.add("fill");
    Validate();
  });
  inputNode.addEventListener("blur", function (e) {
    if (e.target.value == "") item.classList.remove("fill");
    Validate();
  });
});

const Validate = () => {
  const forms = document.querySelectorAll(".price__box");
  if (forms) {
    forms.forEach((form) => {
      const inputShipment = form.querySelector(".input__shipment");
      const inputDelivery = form.querySelector(".input__delivery");
      const inputName = form.querySelector(".input__name");
      const inputPhone = form.querySelector(".input__phone");
      const lineInfo = form.querySelector(".line-info-js");
      const lineContacts = form.querySelector(".line-contacts-js");
      if (inputShipment.value != "" && inputDelivery.value != "") {
        lineInfo.classList.add("active");
      } else {
        lineInfo.classList.remove("active");
      }
      if (inputName.value != "" && inputPhone.value != "") {
        lineContacts.classList.add("active");
      } else {
        lineContacts.classList.remove("active");
      }
    });
  }
};

function showCont() {
  console.log(this);
}
const showCont2 = () => {
  console.log(this);
};
