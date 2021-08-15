// Mobile Menu Toggle //
const hamburgerBtn = document.querySelector(".header__mobile-menu-toggle");
const mobileOverlay = document.querySelector(".header__nav-menu-overlay");
const mobileMenu = document.querySelector(".header__nav-menu");

const openMobileMenu = () => {
  /*let mobileMenuShown = mobileMenu.getAttribute("aria-hidden") == "false"; */
  hamburgerBtn.setAttribute("aria-expanded", "true");
  mobileMenu.classList.remove("hide");
  hamburgerBtn.classList.add("hamburger-close");
  mobileOverlay.setAttribute("aria-hidden", "false");
  mobileMenu.setAttribute("aria-modal", "true");
};

const closeMobileMenu = () => {
  hamburgerBtn.setAttribute("aria-expanded", "false");
  mobileMenu.classList.add("hide");
  mobileOverlay.setAttribute("aria-hidden", "true");
  hamburgerBtn.classList.remove("hamburger-close");
};

hamburgerBtn.addEventListener("click", () => {
  let mobileMenuExpanded = hamburgerBtn.getAttribute("aria-expanded") == "true";
  openMobileMenu();
  if (mobileMenuExpanded) {
    closeMobileMenu();
  }
});

const mediaQuery = window.matchMedia("(min-width: 56.3em)");

function showMobileMenu(e) {
  if (e.matches) {
    mobileMenu.classList.remove("hide");
  }
}

showMobileMenu(mediaQuery);
mediaQuery.addEventListener("change", showMobileMenu);

// closing by clicking modal overlay //

mobileOverlay.addEventListener("click", () => {
  closeMobileMenu();
});

//closing by pressing ESC key

document.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  if (e.keyCode === 27) {
    closeMobileMenu();
    closeMainModal();
  }
}

// Toggle Bookmark //
const bookmarkCheck = document.querySelector(
  ".main__project-bookmark-checkbox"
);
const bookmarkBtn = document.querySelector(".main__project-bookmark");
const bookmarkTitle = document.querySelector(".main__project-bookmark-title");
const bookmarkIcon = document.querySelector(".main__project-bookmark svg");
const bookmarkMessage = document.querySelector(".main__project-bookmark-sr");

bookmarkBtn.addEventListener("click", () => {
  const btnExpanded = bookmarkBtn.getAttribute("aria-expanded") == "true";

  bookmarkIcon.classList.add("checked");
  bookmarkTitle.classList.add("checked");
  bookmarkTitle.textContent = "Bookmarked";
  bookmarkMessage.textContent = "Bookmarked";
  bookmarkBtn.setAttribute("aria-expanded", "true");

  if (btnExpanded) {
    bookmarkIcon.classList.remove("checked");
    bookmarkTitle.classList.remove("checked");
    bookmarkTitle.textContent = "Bookmark";
    bookmarkBtn.setAttribute("aria-expanded", "false");
  }
});

// Amount Left Control //

const amountLeft = document.querySelectorAll(
  ".main__project-details-pledge-amount-left span"
);
const modalAmountLeft = document.querySelectorAll(
  ".main__modal-pledge-amount-left span"
);

// Toggle Modal when clicking "Back this Project" button //
const backBtn = document.querySelector(".main__back-btn");
const selectBtn = document.querySelectorAll(
  ".main__project-details-pledge-btn"
);
const closeBtn = document.querySelector(".main__modal-btn");
const mainModal = document.querySelector(".main__modal");
const mainModalOverlay = document.querySelector(".main__modal-overlay");
const forms = document.querySelectorAll(".main__modal-submit");

const openMainModal = () => {
  backBtn.setAttribute("aria-expanded", "true");
  /* selectBtn[idx].setAttribute("aria-expanded", "true");*/
  mainModal.setAttribute("aria-hidden", "false");
  mainModal.setAttribute("aria-modal", "true");
  mainModalOverlay.setAttribute("aria-hidden", "false");
};

const closeMainModal = () => {
  backBtn.setAttribute("aria-expanded", "false");
  /* selectBtn[idx].setAttribute("aria-expanded", "false"); */
  mainModal.setAttribute("aria-hidden", "true");
  mainModal.setAttribute("aria-modal", "false");
  /* closeBtn.setAttribute("aria-pressed", "true"); */
  mainModalOverlay.setAttribute("aria-hidden", "true");
  resetRadio();
  hideAllContainers();
  const focusedElementBeforeModal = document.activeElement;
  focusedElementBeforeModal.focus();
};

backBtn.addEventListener("click", () => {
  openMainModal();
  isFocusModal();
});

closeBtn.addEventListener("click", () => {
  closeMainModal();
});

mainModalOverlay.addEventListener("click", () => {
  closeMainModal();
});

// Radio Button Operation //

const submitContainers = document.querySelectorAll(".main__modal-submit");
const pledgeContainers = document.querySelectorAll(".main__modal-item");
const radios = document.querySelectorAll('input[type="radio"]');
const numberInputs = document.querySelectorAll('input[type="number"]');

radios.forEach((radio, idx) => {
  radio.addEventListener("change", () => {
    hideAllContainers();
    submitContainers[idx].setAttribute("aria-hidden", "false");
    pledgeContainers[idx].classList.add("change-border");
  });
});

function hideAllContainers() {
  submitContainers.forEach((container) =>
    container.setAttribute("aria-hidden", "true")
  );
  pledgeContainers.forEach((pledge) =>
    pledge.classList.remove("change-border")
  );
}

function resetRadio() {
  radios.forEach((radio) => (radio.checked = false));
}

// Success Modal //
const successModal = document.querySelector(".main__success-modal");
const successCloseBtn = document.querySelector(".main__success-modal-btn");
const continueBtn = document.querySelectorAll(".main__modal-continue-btn");

const successModalOverlay = document.querySelector(
  ".main__success-modal-overlay"
);

const openSuccessModal = () => {
  successModal.setAttribute("aria-hidden", "false");
  successModal.setAttribute("aria-modal", "true");
  successModalOverlay.setAttribute("aria-hidden", "false");
  successCloseBtn.setAttribute("aria-pressed", "false");
};
const closeSuccessModal = () => {
  successCloseBtn.setAttribute("aria-pressed", "true");
  successModal.setAttribute("aria-modal", "false");
  successModal.setAttribute("aria-hidden", "true");
  successModalOverlay.setAttribute("aria-hidden", "true");
};

forms.forEach((form, idx) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // when choosing no-reward //
    if (idx === 0) {
      openSuccessModal();
      closeMainModal();
    } else {
      let amount = Number(amountLeft[idx - 1].textContent);
      let modalAmount = Number(modalAmountLeft[idx - 1].textContent);

      // Disable "continue" button & inputs in modal when amount is "0" //
      if (modalAmount === 0) {
        continueBtn[idx].disabled = true;
        pledgeContainers[idx].classList.add("disabled");
        radios[idx].disabled = true;
        numberInputs[idx - 1].disabled = true;
      } else {
        openSuccessModal();
        /* continueBtn[idx].setAttribute("aria-expanded", "true"); */
        closeMainModal();
        amountLeft[idx - 1].textContent = amount - 1;
        modalAmountLeft[idx - 1].textContent = modalAmount - 1;

        const progress = document.querySelector(".main__progress-bar-progress");
        const progressMessage = document.querySelector(
          ".main__progress-bar span"
        );
        let totalFund = document.querySelector(
          ".main__project-data-fund span"
        ).textContent;
        let totalBacker = document.querySelector(
          ".main__project-data-backers"
        ).textContent;

        // Update total backers
        document.querySelector(".main__project-data-backers").textContent = (
          parseInt(totalBacker.replace(/,/g, "")) + 1
        ).toLocaleString();

        // Update total fund
        if (numberInputs !== null) {
          totalFund = parseInt(totalFund.replace(/,/g, ""));
          totalFund += parseInt(numberInputs[idx - 1].value);
        } else {
          totalFund = parseInt(totalFund.replace(/,/g, ""));
        }
        document.querySelector(
          ".main__project-data-fund span"
        ).textContent = `${totalFund.toLocaleString()}`;

        // update progress bar //
        const percTotalFund = (totalFund / 100000) * 100;
        progress.style.width = `${percTotalFund}%`;
        progress.setAttribute("aria-valuenow", percTotalFund);
        progressMessage.textContent = `${Math.round(percTotalFund)}% achieved`;
        console.log(totalFund);
      }
    }

    // disable "Select Reward" button on main page //
    selectBtns.forEach((selectbtn, idx) => {
      let amount = parseInt(amountLeft[idx].textContent);
      if (amount === 0) {
        selectBtns[idx].disabled = true;
        selectBtns[idx].textContent = "Out of Stock";
      }
    });
  });
}); /*
}); */

const pledgeSelectionContainers = document.querySelectorAll(
  "main__project-details-pledge-item"
);

pledgeSelectionContainers.forEach((selection, idx) => {
  let amount = parseInt(amountLeft[idx].textContent);
  if (amount === 0) {
    selection.classList.add("disable-pledge");
  }
});

successCloseBtn.addEventListener("click", () => {
  closeSuccessModal();
  /*continueBtn.forEach((btn, idx) => {
    btn.setAttribute("aria-expanded", "false");
  }); */
});

// select Reward Button //
const selectBtns = document.querySelectorAll(
  ".main__project-details-pledge-btn"
);

selectBtns.forEach((selectBtn, idx) => {
  selectBtn.addEventListener("click", () => {
    openMainModal();
    isFocusModal();
    radios[idx + 1].checked = "true";
    hideAllContainers();
    submitContainers[idx + 1].setAttribute("aria-hidden", "false");
    pledgeContainers[idx + 1].classList.add("change-border");
  });
});

// Tackle focus trap //

function isFocusModal() {
  // Tackle Keybord Trap //

  mainModal.addEventListener("keydown", trapTabKey);

  const focusableElementsString = `a[href]:not([tabindex^="-"]),
area[href]:not([tabindex^="-"]),
input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"]),
input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked,
select:not([disabled]):not([tabindex^="-"]),
textarea:not([disabled]):not([tabindex^="-"]),
button:not([disabled]):not([tabindex^="-"]),
iframe:not([tabindex^="-"]),
audio[controls]:not([tabindex^="-"]),
video[controls]:not([tabindex^="-"]),
[contenteditable]:not([tabindex^="-"]),
[tabindex]:not([tabindex^="-"])`;
  let focusableElements = mainModal.querySelectorAll(focusableElementsString);
  focusableElements = Array.prototype.slice.call(focusableElements);

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  // Focus first child
  firstTabStop.focus();

  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

        // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  }
}
