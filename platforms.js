document.querySelectorAll(".stream-platform input").forEach((n, index) => {
  const container = n.parentElement.parentElement;
  n.addEventListener(
    "change",
    () => {
      runToggleAnimation(container, n.checked);
      if (index > 0) {
        toggleVideoCard(index - 1, n.checked);
      }
    },
    false
  );

  const defaultChecked =
    container.className.indexOf("stream-platform--enabled") > -1;
  toggleIcon(container, defaultChecked, true);
});

setTimeout(() => {
  // const checkbox = document.querySelectorAll(".stream-platform input")[1];
  // checkbox.checked = true;
  // runToggleAnimation(checkbox.parentElement.parentElement, true, true);
}, 1000);

function runToggleAnimation(toggle, isChecked, noBorder) {
  const suffix = isChecked ? "" : "-reverse";

  const animations = [
    `border-color-animation${suffix} 0.4s cubic-bezier(0.5, 0.35, 0.15, 1) 0s 1 normal forwards`,
    `shrink-animation${suffix} 0.4s cubic-bezier(0.5, 0.35, 0.15, 1) 0.16s 1 normal forwards`,
  ];

  if (noBorder) {
    animations.shift();
  }

  toggle.style.animation = animations.join(" ,");

  toggleIcon(toggle, isChecked, false);
}

function toggleIcon(container, isChecked, skipDelay) {
  const enabledIcon = container.querySelector(
    ".stream-platform__icon__enabled"
  ).style;
  const disnabledIcon = container.querySelector(
    ".stream-platform__icon__disabled"
  ).style;

  const minSize = 0.64;
  if (!isChecked) {
    enabledIcon.transitionDelay = "0.16s";
    enabledIcon.opacity = 0;
    enabledIcon.scale = minSize;

    if (!skipDelay) {
      disnabledIcon.transitionDelay = "0.26s";
    } else {
      disnabledIcon.transitionDelay = "0s";
    }
    disnabledIcon.opacity = 0.8;
    disnabledIcon.scale = 1;
  } else {
    disnabledIcon.transitionDelay = "0.16s";
    disnabledIcon.opacity = 0;
    disnabledIcon.scale = minSize;

    if (!skipDelay) {
      enabledIcon.transitionDelay = "0.26s";
    } else {
      enabledIcon.transitionDelay = "0s";
    }
    enabledIcon.opacity = 1;
    enabledIcon.scale = 1;
  }
}

function toggleVideoCard(index, isChecked) {
  const videoStacks = document.querySelectorAll(".video-stack");
  const stackCard = videoStacks[index];
  if (!stackCard) {
    return;
  }

  if (isChecked) {
    stackCard.classList.add("video-stack--enabled");
  } else {
    stackCard.classList.remove("video-stack--enabled");
  }

  // Update opacity for visible cards
  let opacity = 0.8;
  videoStacks.forEach((n, i) => {
    if (n.classList.contains("video-stack--enabled")) {
      n.style.opacity = opacity;
      opacity -= 0.2;
    }
  });
}
