const loader = document.querySelector(".loader");
const dismissLoader = () => {
  window.setTimeout(() => loader?.classList.add("done"), 700);
};
if (document.readyState === "complete") dismissLoader();
else window.addEventListener("load", dismissLoader, { once: true });

const observer =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          }),
        { threshold: 0.12 },
      )
    : null;
document.querySelectorAll(".reveal").forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add("visible");
});

const menu = document.querySelector(".menu");
const header = document.querySelector(".nav");
const closeMenu = () => {
  header?.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-label", "Open menu");
};
menu?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("open") ?? false;
  menu.setAttribute("aria-expanded", String(isOpen));
  menu.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
document
  .querySelectorAll(".nav nav a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const supportsHover = window.matchMedia("(hover: hover)").matches;
if (cursor && follower && supportsHover) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  const follow = () => {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(follow);
  };
  follow();
  document
    .querySelectorAll("a, button, .skill, .project")
    .forEach((element) => {
      element.addEventListener("mouseenter", () => {
        follower.style.width = "55px";
        follower.style.height = "55px";
      });
      element.addEventListener("mouseleave", () => {
        follower.style.width = "34px";
        follower.style.height = "34px";
      });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((link) =>
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId && document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }),
);
