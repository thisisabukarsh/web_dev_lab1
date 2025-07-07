const slides = [
  "slides/01_welcome.html",
  "slides/02_kickoff.html",
  "slides/03_youssef.html",
  "slides/04_rules.html",
  "slides/05_goal_web_foundations.html",
  "slides/06_client_server.html",
  "slides/07_key_terms.html",
  "slides/08_what_happens.html",
  "slides/09_why_html_css.html",
  "slides/10_Approach.html",
  "slides/11_html_structure.html",
  "slides/12_head_elements.html",
  "slides/13_inline_block_elements.html",
  "slides/14_note_on_tags.html",
  "slides/15_css_three_ways.html",
  "slides/16_good_vs_bad_css.html",
  "slides/17_break.html",
  "slides/18_project_goal.html",
  "slides/19_project_requirements.html",
  "slides/20_flex_properties.html",
  "slides/21_flex-box.html",
  "slides/22_grid_properties.html",
  "slides/23_grid.html",
  "slides/24_topics_not_deep_dived.html",
  "slides/25_homework_assignment.html",
  "slides/26_great_job_today.html",
  "slides/27_htmlTags.html",
  "slides/28_css_prop.html",
];

const noTransitionSlides = [20, 22];
let currentSlide = parseInt(localStorage.getItem("currentSlide")) || 0;

function loadSlide(index, direction = 1) {
  const content = document.getElementById("slide-content");

  localStorage.setItem("currentSlide", index);

  // If slide is no-transition, just load without effects
  if (noTransitionSlides.includes(index)) {
    fetchAndShowSlide(index, 0); // 0 or null direction means no animation
    return;
  }

  if (content.innerHTML.trim() !== "") {
    content.classList.remove(
      "slide-in-left",
      "slide-in-right",
      "slide-out-left",
      "slide-out-right"
    );
    if (direction === 1) {
      content.classList.add("slide-out-left");
    } else {
      content.classList.add("slide-out-right");
    }
    setTimeout(() => {
      fetchAndShowSlide(index, direction);
    }, 500);
  } else {
    fetchAndShowSlide(index, direction);
  }
}

function fetchAndShowSlide(index, direction = 1) {
  const content = document.getElementById("slide-content");

  fetch(slides[index])
    .then((res) => res.text())
    .then((html) => {
      content.innerHTML = html;
      content.classList.remove(
        "slide-out-left",
        "slide-out-right",
        "slide-in-left",
        "slide-in-right"
      );

      if (!noTransitionSlides.includes(index)) {
        if (direction === 1) {
          content.classList.add("slide-in-right");
        } else if (direction === -1) {
          content.classList.add("slide-in-left");
        }
        setTimeout(() => {
          content.classList.remove("slide-in-left", "slide-in-right");
        }, 500);
      }
    });
}

document.getElementById("prev-btn").onclick = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  loadSlide(currentSlide, -1);
  updateNavigator();
};
document.getElementById("next-btn").onclick = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  loadSlide(currentSlide, 1);
  updateNavigator();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") document.getElementById("next-btn").click();
  if (e.key === "ArrowLeft") document.getElementById("prev-btn").click();
});

const navigatorContainer = document.getElementById("slide-navigator");

function createNavigator() {
  navigatorContainer.innerHTML = ""; // clear existing
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className =
      "px-3 py-1 rounded border border-gray-500 hover:bg-gray-200 ";

    if (i === currentSlide) {
      btn.classList.add("bg-blue-500", "text-white");
    }

    btn.onclick = () => {
      if (i !== currentSlide) {
        currentSlide = i;
        loadSlide(i);
        updateNavigator();
      }
    };

    navigatorContainer.appendChild(btn);
  });
}

function updateNavigator() {
  Array.from(navigatorContainer.children).forEach((btn, i) => {
    if (i === currentSlide) {
      btn.classList.add("bg-blue-500", "text-white");
    } else {
      btn.classList.remove("bg-blue-500", "text-white");
    }
  });
}

// call this after loading a slide or on init
window.addEventListener("DOMContentLoaded", () => {
  createNavigator();
  loadSlide(currentSlide);
});
