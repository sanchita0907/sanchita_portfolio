// SANCHITA SANTOSH JADHAV — PORTFOLIO JAVASCRIPT


// 1. Changing professional roles

const typedRole = document.getElementById("typedRole");

const roles = [
    "Web Developer",
    "AI Engineer",
    "Data Science Enthusiast"
];

let roleIndex = 0;

function changeRole() {
    if (!typedRole) return;

    typedRole.style.opacity = "0";

    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        typedRole.textContent = roles[roleIndex];
        typedRole.style.opacity = "1";
    }, 250);
}

if (typedRole) {
    setInterval(changeRole, 2500);
}


// 2. Mobile navigation menu

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


// 3. Highlight the current navigation section

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let currentSection = "home";

    sections.forEach((section) => {

        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }

    });

    navItems.forEach((link) => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );

    });

}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// 4. Check for a missing profile photo

const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto) {

    profilePhoto.addEventListener("error", () => {

        console.error(
            "Profile photo not found. Check that assets/profile.jpg exists."
        );

    });

}


// 5. Scroll-reveal animations

const revealElements = document.querySelectorAll(
    ".about-section, .experience-section, .projects-section, " +
    ".contact-section, .about-person, .about-skills, " +
    ".about-right, .experience-card, .project-card, .info-card"
);


// Respect reduced-motion accessibility settings

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !reduceMotion) {

    revealElements.forEach((element) => {
        element.classList.add("reveal-ready");
    });

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

}


// 6. Animate skill bars when About Me appears

const aboutSection = document.querySelector(".about-section");

if (aboutSection && "IntersectionObserver" in window && !reduceMotion) {

    const skillObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    aboutSection.querySelectorAll(".skill-bar span").forEach(
                        (bar) => {

                            const targetWidth = bar.style.width;

                            bar.style.width = "0";

                            requestAnimationFrame(() => {
                                bar.style.width = targetWidth;
                            });

                        }
                    );

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.2
        }

    );

    skillObserver.observe(aboutSection);

}