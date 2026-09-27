
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRoute } from "vue-router"

import { getStudents } from "../services/studentService"

const route = useRoute()

const student = ref(null)

const baseUrl = import.meta.env.BASE_URL


/* =========================
   EXPERIENCE NAVIGATION
========================= */

const experienceSection = ref(null)

function goToExperience() {

    experienceSection.value?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })

}


/* =========================
   LOAD STUDENT
========================= */

onMounted(async () => {

    try {

        const students = await getStudents()

        student.value = students.find(
            (item) => item.id == route.params.id
        )

    } catch (error) {

        console.error(error)

    }

})


/* =========================
   SKILLS
========================= */

const skills = [

    {
        name: "Vue.js",
        meta: "Frontend framework",
        icon: `<svg viewBox="0 0 40 40" fill="none">
            <path d="M6 8L20 31L34 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"/>
            <path d="M13 8L20 19.5L27 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"/>
        </svg>`
    },

    {
        name: "HTML",
        meta: "Markup language",
        icon: `<svg viewBox="0 0 40 40" fill="none">
            <path d="M15 12L8 20L15 28"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
            <path d="M22 10L18 30"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
            <path d="M25 12L32 20L25 28"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>`
    },

    {
        name: "JSON",
        meta: "Data format",
        icon: `<svg viewBox="0 0 40 40" fill="none">
            <path d="M16 9C12 9 12 12 12 15C12 18 11 19 9 20C11 21 12 22 12 25C12 28 12 31 16 31"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
            <path d="M24 9C28 9 28 12 28 15C28 18 29 19 31 20C29 21 28 22 28 25C28 28 28 31 24 31"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>`
    },

    {
        name: "Java",
        meta: "Object-oriented language",
        icon: `<svg viewBox="0 0 40 40" fill="none">
            <path d="M13 20C13 24 15.5 26.5 20 26.5C24.5 26.5 27 24 27 20"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
            <path d="M11 27C11 27 9 28.5 12 30C15.5 32 25 32 28.5 30C31 28.5 29 27 29 27"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"/>
            <path d="M17 8C14.5 10.5 14.5 12.5 17 15"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"/>
            <path d="M22 8C19.5 10.5 19.5 12.5 22 15"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"/>
        </svg>`
    },

    {
        name: "C++",
        meta: "Systems programming",
        icon: `<svg viewBox="0 0 40 40" fill="none">
            <path d="M25 13C22.5 11 19 11 16.5 13C13.5 15.5 13.5 24.5 16.5 27C19 29 22.5 29 25 27"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
            <path d="M29 17V23"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
            <path d="M26 20H32"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
        </svg>`
    },

    {
        name: "Python",
        meta: "General-purpose language",
        icon: `<svg viewBox="0 0 40 40" fill="none">
            <path d="M20 8C15 8 15 11 15 11V15H21V16H12C12 16 9 16 9 20.5C9 25 12 25 12 25H14V21.5C14 21.5 14 18 17.5 18H22.5C22.5 18 25.5 18 25.5 15V11C25.5 11 25.5 8 20 8Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"/>
            <path d="M20 32C25 32 25 29 25 29V25H19V24H28C28 24 31 24 31 19.5C31 15 28 15 28 15H26V18.5C26 18.5 26 22 22.5 22H17.5C17.5 22 14.5 22 14.5 25V29C14.5 29 14.5 32 20 32Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"/>
        </svg>`
    }

]


/* =========================
   SKILLS SCROLL
========================= */

const trackRef = ref(null)

const atStart = ref(true)

const atEnd = ref(false)

const isDragging = ref(false)

const dragStartX = ref(0)

const dragStartScroll = ref(0)


function scrollByCard(direction) {

    const track = trackRef.value

    if (!track) return

    const card =
        track.querySelector(".skill-card")

    const gap =
        parseFloat(
            getComputedStyle(track).columnGap
        ) || 24

    const step =
        card
            ? card.offsetWidth + gap
            : 260

    track.scrollBy({

        left: step * direction,

        behavior: "smooth"

    })

}


function onScroll() {

    const track = trackRef.value

    if (!track) return

    const max =
        track.scrollWidth -
        track.clientWidth

    atStart.value =
        track.scrollLeft <= 4

    atEnd.value =
        track.scrollLeft >= max - 4

}


function onPointerDown(e) {

    const track = trackRef.value

    if (!track) return

    isDragging.value = true

    dragStartX.value = e.pageX

    dragStartScroll.value =
        track.scrollLeft

    track.classList.add(
        "is-dragging"
    )

}


function onPointerMove(e) {

    if (!isDragging.value) return

    const track = trackRef.value

    if (!track) return

    const delta =
        e.pageX - dragStartX.value

    track.scrollLeft =
        dragStartScroll.value - delta

    onScroll()

}


function onPointerUp() {

    const track = trackRef.value

    isDragging.value = false

    if (track) {

        track.classList.remove(
            "is-dragging"
        )

    }

}


onMounted(() => {

    window.addEventListener(
        "resize",
        onScroll
    )

    setTimeout(() => {

        onScroll()

    }, 100)

})


onBeforeUnmount(() => {

    window.removeEventListener(
        "resize",
        onScroll
    )

})

</script>


<template>

    <main
        v-if="student"
        class="resume"
    >

        <!-- =========================
             HEADER
        ========================== -->

        <section class="resume-header">

            <div class="profile">

                <div class="profile-img">

                    <img
                        :src="`${baseUrl}images/${student.image}`"
                        alt="Profile"
                    />

                </div>

                <div>

                    <h1>

                        {{ student.name }}
                        {{ student.lastname }}

                    </h1>

                    <p>

                        {{ student.major }}

                    </p>

                </div>

            </div>

        </section>


        <!-- =========================
             ABOUT ME
        ========================== -->

        <section class="resume-section about-section">

            <h2>
                ABOUT ME
            </h2>

            <p>

                I am a 3rd-year Computer Science student at
                Kasetsart University with a strong interest in the
                end-to-end application development lifecycle.
                I have experience in front-end development using
                Vue.js and working with JSON and APIs.

            </p>

            <br>

            <p>

                I enjoy developing applications and learning new
                technologies to improve my programming skills.
                I am currently seeking an Application Developer
                internship where I can apply my knowledge, learn
                industry-standard coding practices, and gain
                practical experience in developing high-quality
                applications.

            </p>

        </section>


        <!-- =========================
             PERSONAL INFORMATION
        ========================== -->

        <section class="resume-section">

            <h2>
                PERSONAL INFORMATION
            </h2>

            <div class="info-grid">

                <span>
                    Nickname
                </span>

                <strong>
                    {{ student.nickname }}
                </strong>


                <span>
                    Age
                </span>

                <strong>
                    {{ student.age }}
                </strong>


                <span>
                    Major
                </span>

                <strong>
                    {{ student.major }}
                </strong>


                <span>
                    University
                </span>

                <strong>
                    {{ student.school }}
                </strong>

            </div>

        </section>


        <!-- =========================
             EDUCATION
        ========================== -->

        <section class="resume-section">

            <h2>
                EDUCATION
            </h2>


            <div class="resume-card">

                <img
                    :src="`${baseUrl}images/ph.jpg`"
                    alt="Phanatpittayakarn School"
                    class="education-logo"
                />

                <div class="education-content">

                    <h3>
                        Phanatpittayakarn School
                    </h3>

                    <p>
                        High School Certificate
                    </p>

                    <small>
                        2021-2024
                    </small>

                </div>

            </div>


            <br>


            <div class="resume-card">

                <img
                    :src="`${baseUrl}images/ku.png`"
                    alt="Kasetsart University"
                    class="education-logo"
                />

                <div class="education-content">

                    <h3>
                        Kasetsart University
                    </h3>

                    <p>
                        Bachelor of Science in Computer Science
                    </p>

                    <small>
                        Current Student
                    </small>

                </div>

            </div>

        </section>

<!-- =========================
     SKILLS
========================== -->

<section class="skills-section">

    <!-- PROGRAMMING SKILLS -->

    <div class="skills__header">

        <span class="skills__eyebrow">
            SKILLS
        </span>

        <h2 class="skills__title">
            Basic knowledge of
        </h2>

    </div>


    <div class="skills__stage">

        <!-- LEFT BUTTON -->

        <button
            class="skills__nav skills__nav--prev"
            type="button"
            aria-label="Scroll skills left"
            :disabled="atStart"
            @click="scrollByCard(-1)"
        >

            <svg
                viewBox="0 0 24 24"
                fill="none"
            >

                <path
                    d="M15 5L8 12L15 19"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />

            </svg>

        </button>


        <!-- PROGRAMMING SKILL CARDS -->

        <div
            ref="trackRef"
            class="skills__track"
            @scroll="onScroll"
            @mousedown="onPointerDown"
            @mousemove="onPointerMove"
            @mouseup="onPointerUp"
            @mouseleave="onPointerUp"
        >

            <article
                v-for="skill in skills"
                :key="skill.name"
                class="skill-card"
            >

                <div
                    class="skill-card__icon"
                    v-html="skill.icon"
                ></div>


                <h3 class="skill-card__name">
                    {{ skill.name }}
                </h3>


                <p class="skill-card__meta">
                    {{ skill.meta }}
                </p>

            </article>

        </div>


        <!-- RIGHT BUTTON -->

        <button
            class="skills__nav skills__nav--next"
            type="button"
            aria-label="Scroll skills right"
            :disabled="atEnd"
            @click="scrollByCard(1)"
        >

            <svg
                viewBox="0 0 24 24"
                fill="none"
            >

                <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />

            </svg>

        </button>

    </div>


    <!-- =========================
         OTHER SKILLS
    ========================== -->

    <div class="other-skills">

        <div class="other-skills__header">

            <span class="skills__eyebrow">
                OTHER SKILLS
            </span>

            <h2 class="skills__title">
                Microsoft Office & Languages
            </h2>

        </div>


        <div class="other-skills__grid">

            <!-- MICROSOFT WORD -->

            <article class="skill-card">

                <div class="skill-card__icon">

                    <svg
                        viewBox="0 0 40 40"
                        fill="none"
                    >

                        <rect
                            x="8"
                            y="7"
                            width="24"
                            height="26"
                            rx="2"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                        <path
                            d="M13 14H27"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                        <path
                            d="M13 20H27"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                        <path
                            d="M13 26H23"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                    </svg>

                </div>


                <h3 class="skill-card__name">
                    Microsoft Word
                </h3>


                <p class="skill-card__meta">
                    Document editing
                </p>

            </article>


            <!-- MICROSOFT EXCEL -->

            <article class="skill-card">

                <div class="skill-card__icon">

                    <svg
                        viewBox="0 0 40 40"
                        fill="none"
                    >

                        <rect
                            x="7"
                            y="7"
                            width="26"
                            height="26"
                            rx="2"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                        <path
                            d="M7 15H33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M15 7V33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M24 15V33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M15 24H33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                    </svg>

                </div>


                <h3 class="skill-card__name">
                    Microsoft Excel
                </h3>


                <p class="skill-card__meta">
                    Spreadsheet & data
                </p>

            </article>


            <!-- ENGLISH -->

            <article class="skill-card">

                <div class="skill-card__icon">

                    <svg
                        viewBox="0 0 40 40"
                        fill="none"
                    >

                        <circle
                            cx="20"
                            cy="20"
                            r="13"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                        <path
                            d="M7 20H33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M20 7C16 11 16 29 20 33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M20 7C24 11 24 29 20 33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                    </svg>

                </div>


                <h3 class="skill-card__name">
                    English
                </h3>


                <p class="skill-card__meta">
                    Basic
                </p>

            </article>


            <!-- THAI -->

            <article class="skill-card">

                <div class="skill-card__icon">

                    <svg
                        viewBox="0 0 40 40"
                        fill="none"
                    >

                        <circle
                            cx="20"
                            cy="20"
                            r="13"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                        <path
                            d="M7 20H33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M20 7C16 11 16 29 20 33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M20 7C24 11 24 29 20 33"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                    </svg>

                </div>


                <h3 class="skill-card__name">
                    Thai
                </h3>


                <p class="skill-card__meta">
                    Good
                </p>

            </article>

        </div>

    </div>

</section>

        <!-- =========================
             EXPERIENCE
        ========================== -->

        <section
            ref="experienceSection"
            class="experience-section"
        >

            <div class="experience-header">

                <span class="experience-eyebrow">
                    EXPERIENCE
                </span>

                <h2 class="experience-title">
                    My Experience
                </h2>

            </div>


            <!-- =========================
                 EXPERIENCE 1
            ========================== -->

            <article
                class="experience-item experience-item--text-only"
            >

                <div class="experience-content">

                    <span class="experience-date">
                        April 2025
                    </span>

                    <h3>
                        Inspector, Production Department
                    </h3>

                    <h4>
                        Amagasaki Pipe - Chonburi
                    </h4>

                    <ul>

                        <li>
                            Performed high-precision quality inspections
                            and defect detection using specialized equipment,
                            ensuring zero-defect product delivery.
                        </li>

                        <li>
                            Demonstrated a strong logical approach to
                            troubleshooting and identifying systemic issues,
                            skills directly transferable to software testing
                            and application debugging.
                        </li>

                    </ul>

                </div>

            </article>


            <!-- =========================
                 EXPERIENCE 2
            ========================== -->

            <article
                class="experience-item
                       experience-item--text-only
                       experience-item--right"
            >

                <div class="experience-content">

                    <span class="experience-date">
                        September 2024
                    </span>

                    <h3>
                        Part-time Event Assistant
                    </h3>

                    <h4>
                        Rattanachol Hotel - Chonburi
                    </h4>

                    <ul>

                        <li>
                            Assisted parents and children with event
                            onboarding and registration.
                        </li>

                        <li>
                            Managed registration data accurately
                            and efficiently.
                        </li>

                        <li>
                            Monitored activities and resolved issues
                            to ensure safety and satisfaction.
                        </li>

                    </ul>

                </div>

            </article>


            <!-- =========================
                 EXPERIENCE 3
            ========================== -->

            <article
                class="experience-item
                       experience-item--text-only"
            >

                <div class="experience-content">

                    <span class="experience-date">
                        2025
                    </span>

                    <h3>
                        Portfolio Website
                    </h3>

                    <h4>
                        Vue.js | JSON Server
                    </h4>

                    <ul>

                        <li>
                            Developed a personal portfolio website
                            using Vue.js.
                        </li>

                        <li>
                            Implemented data storage and retrieval
                            using JSON Server.
                        </li>

                        <li>
                            Created interactive features for managing
                            and displaying portfolio information.
                        </li>

                        <li>
                            Improved the original portfolio website by creating a more
                            professional and organized design.
                        </li>

                    </ul>

                </div>

            </article>


            <!-- =========================
                 EXPERIENCE 4
            ========================== -->

            <article
                class="experience-item
                       experience-item--text-only
                       experience-item--right"
            >

                <div class="experience-content">

                    <span class="experience-date">
                        2025
                    </span>

                    <h3>
                        Computer Science Database Management System
                    </h3>

                    <h4>
                        Database Design | Normalization | ER Diagram
                    </h4>

                    <ul>

                        <li>
                            Collected and analyzed data related to
                            the Computer Science department.
                        </li>

                        <li>
                            Designed database structures and diagrams
                            based on the collected data.
                        </li>

                        <li>
                            Applied database normalization techniques
                            to organize data and reduce redundancy.
                        </li>

                    </ul>

                </div>

            </article>

        </section>

        <!-- =========================
     ACHIEVEMENTS
========================== -->

<section class="achievement-section">

    <div class="achievement-header">

        <span class="achievement-eyebrow">
            ACHIEVEMENTS
        </span>

        <h2 class="achievement-title">
            Academic Achievements
        </h2>

    </div>


    <div class="achievement-list">

        <!-- Achievement 1 -->

        <article class="achievement-item">

            <div class="achievement-image">

                <img
                    :src="`${baseUrl}images/5A.jpg`"
                    alt="5-A Scholarship"
                />

            </div>

            <div class="achievement-content">

                <h3>
                    Received a 5-A Scholarship
                </h3>

                <p>
                    Kasetsart University (2025)
                </p>

            </div>

        </article>


        <!-- Achievement 2 -->

        <article class="achievement-item">

            <div class="achievement-image">

                <img
                    :src="`${baseUrl}images/academic.jpg`"
                    alt="Academic Excellence Certificate"
                />

            </div>

            <div class="achievement-content">

                <h3>
                    Received an Academic Excellence Certificate
                </h3>

                <p>
                    With a GPA of at least 3.50,
                    Kasetsart University (2024)
                </p>

            </div>

        </article>

    </div>

</section>

<!-- =========================
     ACTIVITIES
========================== -->
<section class="activity-section">

    <div class="activity-header">
        <span class="activity-eyebrow">
            ACTIVITIES
        </span>

        <h2 class="activity-title">
            Workshops & Training
        </h2>
    </div>

    <div class="activity-list">

        <!-- ACTIVITY 1 -->
        <article class="activity-item">

            <div class="activity-image">
                <img
                    :src="`${baseUrl}images/ai-thai.jpg`"
                    alt="AI for Thai Workshop"
                />
            </div>

            <div class="activity-content">

                <span class="activity-date">
                    2026
                </span>

                <h3>
                    AI for Thai Workshop
                </h3>

                <h4>
                    Kasetsart University, Sriracha Campus
                </h4>

                <ul>
                    <li>
                        Gained knowledge and hands-on experience
                        in LINE Chatbot development, including
                        chatbot creation.
                    </li>

                    <li>
                        Learned how to design chatbot interactions
                        and configure commands to respond to user needs,
                        improving communication efficiency and
                        user experience.
                    </li>
                </ul>

            </div>

        </article>


        <!-- ACTIVITY 2 -->
        <article class="activity-item activity-item--reverse">

            <div class="activity-content">

                <span class="activity-date">
                    2026
                </span>

                <h3>
                    LINK Certified Network Cabling for Engineering (LCCE) 2026
                </h3>

                <h4>
                    Kasetsart University, Sriracha Campus
                </h4>

                <ul>
                    <li>
                        Gained knowledge of network cabling fundamentals,
                        telecommunications infrastructure, and the selection
                        of appropriate network cables and equipment.
                    </li>

                    <li>
                        Developed practical skills in cable preparation,
                        LAN cable termination, and proper cable installation
                        techniques through hands-on training.
                    </li>

                    <li>
                        Learned the importance of cabling standards and
                        proper cable management to ensure efficient and
                        stable network connectivity.
                    </li>
                </ul>

            </div>

            <div class="activity-image">
                <img
                    :src="`${baseUrl}images/lcce.jpg`"
                    alt="LINK Certified Network Cabling for Engineering"
                />
            </div>

        </article>

    </div>

</section>

    </main>

<!-- =========================
     CONTACT
========================== -->

<section v-if="student" class="contact-section">

    <div class="contact-inner">

        <div class="contact-header">

            <span class="contact-eyebrow">
                CONTACT
            </span>

            <h2 class="contact-title">
                Get In Touch
            </h2>

            <p class="contact-description">
                Feel free to contact me for internship opportunities,
                projects, or any further information.
            </p>

        </div>


        <div class="contact-content">

            <!-- ADDRESS -->
            <div class="contact-item">

                <div class="contact-icon">

                    <svg viewBox="0 0 24 24" fill="none">

                        <path
                            d="M12 21C12 21 19 15.5 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 15.5 12 21 12 21Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <circle
                            cx="12"
                            cy="9.5"
                            r="2.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                    </svg>

                </div>


                <div class="contact-info">

                    <span class="contact-label">
                        ADDRESS
                    </span>

                    <p>
                        25/9 Moo 5, Namatoom,<br>
                        Phanatnikhom, Chonburi 20140
                    </p>

                </div>

            </div>


            <!-- PHONE -->
            <div class="contact-item">

                <div class="contact-icon">

                    <svg viewBox="0 0 24 24" fill="none">

                        <path
                            d="M6.5 3.5L9.5 3L11 7L8.5 8.5C9.6 11.2 11.8 13.4 14.5 14.5L16 12L20 13.5L19.5 16.5C19.3 18 18 19 16.5 19C9.9 19 5 14.1 5 7.5C5 6 6 4.7 6.5 3.5Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                        />

                    </svg>

                </div>


                <div class="contact-info">

                    <span class="contact-label">
                        PHONE
                    </span>

                    <a
                        class="contact-link"
                    >
                        +66 (0) 92 783 8374
                    </a>

                </div>

            </div>


            <!-- EMAIL -->
            <div class="contact-item">

                <div class="contact-icon">

                    <svg viewBox="0 0 24 24" fill="none">

                        <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />

                        <path
                            d="M4 7L12 13L20 7"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                        />

                    </svg>

                </div>


                <div class="contact-info">

                    <span class="contact-label">
                        EMAIL
                    </span>

                    <a
                        class="contact-link"
                    >
                        Banthita.chal@ku.th
                    </a>

                    <a
                        class="contact-link"
                    >
                        banthita0210@gmail.com
                    </a>

                </div>

            </div>


            <!-- GITHUB -->
            <div class="contact-item">

                <div class="contact-icon">

                    <svg viewBox="0 0 24 24" fill="none">

                        <path
                            d="M12 3C7.03 3 3 7.03 3 12C3 16.05 5.58 19.5 9.16 20.71C9.61 20.79 9.77 20.51 9.77 20.27C9.77 20.05 9.76 19.46 9.76 18.67C7.5 19.16 6.97 17.58 6.97 17.58C6.56 16.55 5.97 16.27 5.97 16.27C5.05 15.64 6.04 15.65 6.04 15.65C7.06 15.72 7.6 16.7 7.6 16.7C8.5 18.24 9.99 17.8 10.33 17.57C10.42 16.91 10.68 16.47 10.96 16.22C9.16 16.02 7.27 15.32 7.27 11.73C7.27 10.71 7.64 9.87 8.24 9.22C8.14 8.97 7.82 8.01 8.34 6.72C8.34 6.72 9.13 6.47 9.76 7.63C10.51 7.42 11.25 7.32 12 7.32C12.75 7.32 13.49 7.42 14.24 7.63C14.87 6.47 15.66 6.72 15.66 6.72C16.18 8.01 15.86 8.97 15.76 9.22C16.36 9.87 16.73 10.71 16.73 11.73C16.73 15.33 14.84 16.01 13.04 16.21C13.39 16.51 13.75 17.1 13.75 18.01C13.75 19.32 13.74 20.37 13.74 20.27C13.74 20.51 13.9 20.79 14.35 20.71C17.93 19.5 20.5 16.05 20.5 12C20.5 7.03 16.97 3 12 3Z"
                            stroke="currentColor"
                            stroke-width="1.2"
                            stroke-linejoin="round"
                        />

                    </svg>

                </div>


                <div class="contact-info">

                    <span class="contact-label">
                        GITHUB
                    </span>

                    <a
                        href="https://github.com/banthita0210-del?utm_source=chatgpt.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="contact-link github-link"
                    >
                        GitHub Profile
                    </a>

                </div>

            </div>

        </div>


        <!-- FOOTER -->

        <div class="contact-footer">

            <span>
                © 2026 {{ student.name }} {{ student.lastname }}
            </span>

            <span>
                Computer Science · Kasetsart University
            </span>

        </div>

    </div>

</section>

</template>

<style scoped>

/* =========================
   RESUME
========================= */

.resume {

    width:
        100%;

    max-width:
        900px;

    margin:
        0 auto;

    padding:
        50px 25px 80px;

    position:
        relative;

    z-index:
        1;

}


/* =========================
   RESUME BACKGROUND
   เหมือนพื้นหลัง HOME
========================= */

.resume::before {

    content:
        "";

    position:
        absolute;

    width:
        100vw;

    height:
        100%;

    top:
        0;

    left:
        50%;

    transform:
        translateX(-50%);

    background:
        radial-gradient(
            ellipse 80% 60% at 50% 0%,
            rgba(212, 175, 90, 0.06),
            transparent 70%
        ),
        linear-gradient(
            180deg,
            #050507 0%,
            #0a0a0d 55%,
            #06070a 100%
        );

    z-index:
        -1;

    pointer-events:
        none;

}


/* =========================
   TOP NAVIGATION
========================= */

.top-navigation {

    display:
        flex;

    justify-content:
        flex-end;

    align-items:
        center;

    margin-bottom:
        25px;

}


.top-nav-link {

    border:
        none;

    background:
        transparent;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.85rem;

    letter-spacing:
        1px;

    cursor:
        pointer;

    padding:
        8px 0;

    transition:
        color 0.25s ease;

}


.top-nav-link:hover {

    color:
        white;

}


/* =========================
   HEADER
========================= */

.resume-header {

    padding-bottom:
        40px;

    border-bottom:
        1px solid
        rgba(201, 168, 76, 0.3);

}


.profile {

    display:
        flex;

    align-items:
        center;

    gap:
        25px;

}


.profile-img {

    width:
        170px;

    height:
        170px;

    border-radius:
        50%;

    overflow:
        hidden;

    flex-shrink:
        0;

}


.profile-img img {

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

}


.profile h1 {

    margin:
        0;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        clamp(
            2rem,
            5vw,
            3.5rem
        );

}


.profile p {

    color:
        var(--gold);

    font-family:
        var(--mono);

}


/* =========================
   SECTION
========================= */

.resume-section {

    padding:
        35px 0;

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

}


.resume-section h2 {

    margin-bottom:
        20px;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        14px;

    letter-spacing:
        3px;

}


.resume-section p {

    line-height:
        1.8;

    color:
        var(--text-dim);

}


/* =========================
   PERSONAL INFORMATION
========================= */

.info-grid {

    display:
        grid;

    grid-template-columns:
        150px 1fr;

    gap:
        14px;

    color:
        var(--text-dim);

}


.info-grid strong {

    color:
        var(--text);

}


/* =========================
   EDUCATION
========================= */

.resume-card {

    padding:
        20px;

    background:
        var(--bg-light);

    border-left:
        3px solid
        var(--gold);

    border-radius:
        8px;

    display:
        flex;

    align-items:
        center;

    gap:
        20px;

}


.education-logo {

    width:
        70px;

    height:
        70px;

    object-fit:
        contain;

    flex-shrink:
        0;

}


.education-content {

    flex:
        1;

}


.resume-card h3 {

    margin-top:
        0;

    margin-bottom:
        8px;

    color:
        white;

}


.resume-card p {

    margin:
        0 0 8px;

}


.resume-card small {

    color:
        var(--gold);

}


/* =========================
   SKILLS
========================= */

.skills-section {

    --skills-bg:
        transparent;

    --skills-panel:
        #141416;

    --skills-border:
        rgba(212, 175, 55, 0.28);

    --skills-border-strong:
        rgba(212, 175, 55, 0.65);

    --skills-gold:
        #d4af37;

    --skills-gold-soft:
        #e8cd7a;

    --skills-text:
        #f2f0eb;

    --skills-text-dim:
        #8f8c85;

    background:
        transparent;

    color:
        var(--skills-text);

    padding:
        50px 20px;

    margin-top:
        35px;

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

}


.skills__header {

    max-width:
        1100px;

    margin:
        0 auto 35px;

}


.skills__eyebrow {

    display:
        block;

    font-size:
        0.8rem;

    letter-spacing:
        3px;

    color:
        var(--skills-gold-soft);

    margin-bottom:
        8px;

}


.skills__title {

    font-size:
        clamp(
            1.6rem,
            3vw,
            2.2rem
        );

    font-weight:
        500;

    margin:
        0;

    color:
        var(--skills-text);

}


.skills__stage {

    position:
        relative;

    max-width:
        1100px;

    margin:
        0 auto;

    display:
        flex;

    align-items:
        center;

    gap:
        12px;

}


.skills__track {

    display:
        flex;

    gap:
        24px;

    overflow-x:
        auto;

    scroll-snap-type:
        x proximity;

    scroll-behavior:
        smooth;

    padding:
        10px 5px 20px;

    cursor:
        grab;

    -webkit-overflow-scrolling:
        touch;

    scrollbar-width:
        none;

    flex:
        1;

}


.skills__track::-webkit-scrollbar {

    display:
        none;

}


.skills__track.is-dragging {

    cursor:
        grabbing;

    scroll-snap-type:
        none;

}


/* =========================
   SKILL CARD
========================= */

.skill-card {

    scroll-snap-align:
        start;

    flex:
        0 0 auto;

    width:
        210px;

    min-height:
        150px;

    background:
        linear-gradient(
            180deg,
            var(--skills-panel),
            var(--bg)
        );

    border:
        1px solid
        var(--skills-border);

    border-radius:
        18px;

    padding:
        25px 20px;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    gap:
        12px;

    transition:
        transform 0.35s ease,
        border-color 0.35s ease,
        box-shadow 0.35s ease;

    user-select:
        none;

}


.skill-card:hover {

    transform:
        translateY(-6px);

    border-color:
        var(--skills-border-strong);

    box-shadow:
        0 18px 40px -20px
        rgba(212, 175, 55, 0.35);

}


.skill-card__icon {

    width:
        40px;

    height:
        40px;

    color:
        var(--skills-gold);

    transition:
        color 0.35s ease;

}


.skill-card__icon svg {

    width:
        100%;

    height:
        100%;

}


.skill-card:hover .skill-card__icon {

    color:
        var(--skills-gold-soft);

}


.skill-card__name {

    font-size:
        1.05rem;

    font-weight:
        500;

    margin:
        0;

    color:
        var(--skills-text);

}


.skill-card__meta {

    margin:
        0;

    font-size:
        0.85rem;

    color:
        var(--skills-text-dim);

}


/* =========================
   NAVIGATION BUTTON
========================= */

.skills__nav {

    flex:
        0 0 auto;

    width:
        42px;

    height:
        42px;

    border-radius:
        50%;

    border:
        1px solid
        var(--skills-border);

    background:
        var(--skills-panel);

    color:
        var(--skills-gold-soft);

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    cursor:
        pointer;

    transition:
        border-color 0.25s ease,
        transform 0.2s ease,
        opacity 0.25s ease;

}


.skills__nav svg {

    width:
        18px;

    height:
        18px;

}


.skills__nav:hover:not(:disabled) {

    border-color:
        var(--skills-border-strong);

    transform:
        scale(1.06);

}


.skills__nav:disabled {

    opacity:
        0.3;

    cursor:
        default;

}


/* =========================
   OTHER SKILLS
========================= */

.other-skills {

    max-width:
        1100px;

    margin:
        55px auto 0;

}


.other-skills__header {

    margin-bottom:
        30px;

}


.other-skills__grid {

    display:
        grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap:
        24px;

}


.other-skills__grid .skill-card {

    width:
        auto;

}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {

    .other-skills__grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

}


@media (max-width: 640px) {

    .other-skills {

        margin-top:
            40px;

    }


    .other-skills__grid {

        grid-template-columns:
            1fr 1fr;

        gap:
            15px;

    }


    .other-skills__grid .skill-card {

        width:
            auto;

        min-height:
            140px;

        padding:
            20px 15px;

    }

}


@media (max-width: 450px) {

    .other-skills__grid {

        grid-template-columns:
            1fr;

    }

}


/* =========================
   EXPERIENCE
========================= */

.experience-section {

    padding:
        55px 0;

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

    scroll-margin-top:
        30px;

}


.experience-header {

    margin-bottom:
        45px;

    padding-bottom:
        25px;

    border-bottom:
        1px solid
        rgba(201, 168, 76, 0.3);

}


.experience-eyebrow {

    display:
        block;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.8rem;

    letter-spacing:
        3px;

    margin-bottom:
        8px;

}


.experience-title {

    margin:
        0;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        clamp(
            1.8rem,
            4vw,
            2.6rem
        );

    font-weight:
        500;

}


/* =========================
   EXPERIENCE ITEMS
   2 COLUMNS
========================= */

.experience-section {

    padding:
        55px 0;

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

    scroll-margin-top:
        30px;

}


.experience-section {

    display:
        grid;

    grid-template-columns:
        1fr 1fr;

    column-gap:
        50px;

}


.experience-header {

    grid-column:
        1 / -1;

    margin-bottom:
        45px;

}


.experience-item--text-only {

    width:
        100%;

    margin:
        0 0 70px;

}


.experience-item--text-only.experience-item--right {

    margin:
        0 0 70px;

}


/* =========================
   EXPERIENCE CONTENT
========================= */

.experience-content {

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        flex-start;

}


.experience-date {

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.85rem;

    letter-spacing:
        1px;

    margin-bottom:
        10px;

}


.experience-content h3 {

    margin:
        0 0 8px;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        1.45rem;

    line-height:
        1.4;

}


.experience-content h4 {

    margin:
        0 0 18px;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.9rem;

    font-weight:
        400;

}


.experience-content ul {

    margin:
        0;

    padding-left:
        20px;

}


.experience-content li {

    color:
        var(--text-dim);

    line-height:
        1.8;

    margin-bottom:
        10px;

}


.experience-content li::marker {

    color:
        var(--gold);

}


/* =========================
   ACHIEVEMENTS
========================= */

.achievement-section {

    padding:
        55px 0;

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

}


.achievement-header {

    margin-bottom:
        45px;

    padding-bottom:
        25px;

    border-bottom:
        1px solid
        rgba(201, 168, 76, 0.3);

}


.achievement-eyebrow {

    display:
        block;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.8rem;

    letter-spacing:
        3px;

    margin-bottom:
        8px;

}


.achievement-title {

    margin:
        0;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        clamp(
            1.8rem,
            4vw,
            2.6rem
        );

    font-weight:
        500;

}


/* =========================
   ACHIEVEMENT LIST
========================= */

.achievement-list {

    display:
        grid;

    grid-template-columns:
        1fr 1fr;

    gap:
        50px;

}


.achievement-item {

    background:
        var(--bg-light);

    border:
        1px solid
        rgba(201, 168, 76, 0.2);

    border-radius:
        10px;

    overflow:
        hidden;

    transition:
        transform 0.3s ease,
        border-color 0.3s ease;

}


.achievement-item:hover {

    transform:
        translateY(-5px);

    border-color:
        rgba(201, 168, 76, 0.6);

}


/* =========================
   ACHIEVEMENT IMAGE
========================= */

.achievement-image {

    width:
        100%;

    height:
        250px;

    overflow:
        hidden;

    background:
        #111;

}


.achievement-image img {

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

    display:
        block;

}


/* =========================
   ACHIEVEMENT CONTENT
========================= */

.achievement-content {

    padding:
        22px;

}


.achievement-content h3 {

    margin:
        0 0 10px;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        1.2rem;

    line-height:
        1.5;

}


.achievement-content p {

    margin:
        0;

    color:
        var(--text-dim);

    font-family:
        var(--mono);

    font-size:
        0.85rem;

    line-height:
        1.7;

}


/* =========================
   MOBILE ACHIEVEMENTS
========================= */

@media (max-width: 700px) {

    .achievement-list {

        grid-template-columns:
            1fr;

        gap:
            30px;

    }


    .achievement-image {

        height:
            220px;

    }

}


/* =========================
   ACTIVITIES
========================= */

.activity-section {

    padding:
        55px 0;

    border-bottom:
        1px solid
        rgba(255, 255, 255, 0.08);

}


.activity-header {

    margin-bottom:
        45px;

    padding-bottom:
        25px;

    border-bottom:
        1px solid
        rgba(201, 168, 76, 0.3);

}


.activity-eyebrow {

    display:
        block;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.8rem;

    letter-spacing:
        3px;

    margin-bottom:
        8px;

}


.activity-title {

    margin:
        0;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        clamp(
            1.8rem,
            4vw,
            2.6rem
        );

    font-weight:
        500;

}


/* =========================
   ACTIVITY LIST
========================= */

.activity-list {

    display:
        flex;

    flex-direction:
        column;

    gap:
        60px;

}


/* =========================
   ACTIVITY ITEM
========================= */

.activity-item {

    display:
        grid;

    grid-template-columns:
        400px 1fr;

    gap:
        50px;

    align-items:
        center;

}


/* =========================
   ACTIVITY REVERSE
========================= */

.activity-item--reverse {

    grid-template-columns:
        1fr 400px;

}


/* =========================
   ACTIVITY IMAGE
========================= */

.activity-image {

    width:
        400px;

    height:
        280px;

    overflow:
        hidden;

    border-radius:
        10px;

    background:
        #111;

    border:
        1px solid
        rgba(201, 168, 76, 0.25);

    box-sizing:
        border-box;

}


.activity-image img {

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

    display:
        block;

}


/* =========================
   ACTIVITY CONTENT
========================= */

.activity-content {

    display:
        flex;

    flex-direction:
        column;

}


.activity-date {

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.85rem;

    letter-spacing:
        1px;

    margin-bottom:
        10px;

}


.activity-content h3 {

    margin:
        0 0 8px;

    color:
        white;

    font-family:
        var(--serif);

    font-size:
        1.4rem;

    line-height:
        1.4;

}


.activity-content h4 {

    margin:
        0 0 18px;

    color:
        var(--gold);

    font-family:
        var(--mono);

    font-size:
        0.9rem;

    font-weight:
        400;

    line-height:
        1.6;

}


.activity-content ul {

    margin:
        0;

    padding-left:
        20px;

}


.activity-content li {

    color:
        var(--text-dim);

    line-height:
        1.8;

    margin-bottom:
        10px;

}


.activity-content li::marker {

    color:
        var(--gold);

}


/* =========================
   MOBILE ACTIVITIES
========================= */

@media (max-width: 700px) {

    .activity-item,
    .activity-item--reverse {

        display:
            flex;

        flex-direction:
            column;

        gap:
            25px;

        align-items:
            stretch;

    }


    .activity-image {

        width:
            100%;

        height:
            220px;

    }


    .activity-content h3 {

        font-size:
            1.25rem;

    }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

    .experience-section {

        display:
            block;

    }


    .experience-header {

        margin-bottom:
            45px;

    }


    .experience-item--text-only,
    .experience-item--text-only.experience-item--right {

        width:
            100%;

        margin:
            0 0 50px;

    }


    .experience-content h3 {

        font-size:
            1.25rem;

    }

}


/* =========================
   MOBILE SKILLS
========================= */

@media (max-width: 640px) {

    .skills-section {

        padding:
            40px 10px;

    }


    .skills__nav {

        display:
            none;

    }


    .skill-card {

        width:
            190px;

        min-height:
            140px;

        padding:
            20px;

    }

}


/* =========================
   MOBILE RESUME
========================= */

@media (max-width: 600px) {

    .profile {

        flex-direction:
            column;

        align-items:
            flex-start;

    }


    .profile-img {

        width:
            120px;

        height:
            120px;

    }


    .info-grid {

        grid-template-columns:
            1fr;

        gap:
            5px;

    }


    .resume-card {

        gap:
            15px;

    }


    .education-logo {

        width:
            55px;

        height:
            55px;

    }


    .top-navigation {

        margin-bottom:
            20px;

    }


    .top-nav-link {

        font-size:
            0.8rem;

    }

}


/* =========================
   CONTACT - FULL WIDTH
   ไม่แก้ไข
========================= */

.contact-section {

    width: 100%;

    background: var(--bg);

    border-top:
        1px solid
        rgba(201, 168, 76, 0.25);

    box-sizing: border-box;

}


.contact-inner {

    width: 100%;

    max-width: 1200px;

    margin: 0 auto;

    padding: 70px 40px 0;

    box-sizing: border-box;

}


/* =========================
   CONTACT HEADER
========================= */

.contact-header {

    margin-bottom: 45px;

    padding-bottom: 25px;

    border-bottom:
        1px solid
        rgba(201, 168, 76, 0.3);

}


.contact-eyebrow {

    display: block;

    color: var(--gold);

    font-family: var(--mono);

    font-size: 0.8rem;

    letter-spacing: 3px;

    margin-bottom: 8px;

}


.contact-title {

    margin: 0 0 12px;

    color: white;

    font-family: var(--serif);

    font-size: clamp(
        1.8rem,
        4vw,
        2.6rem
    );

    font-weight: 500;

}


.contact-description {

    margin: 0;

    max-width: 600px;

    color: var(--text-dim);

    line-height: 1.8;

}


/* =========================
   CONTACT CONTENT
========================= */

.contact-content {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 20px;

}


/* =========================
   CONTACT ITEM
========================= */

.contact-item {

    min-height: 150px;

    padding: 25px;

    background: var(--bg-light);

    border:
        1px solid
        rgba(201, 168, 76, 0.18);

    border-radius: 10px;

    display: flex;

    align-items: flex-start;

    gap: 15px;

    box-sizing: border-box;

    transition:
        transform 0.3s ease,
        border-color 0.3s ease;

}


.contact-item:hover {

    transform:
        translateY(-4px);

    border-color:
        rgba(201, 168, 76, 0.55);

}


/* =========================
   ICON
========================= */

.contact-icon {

    width: 40px;

    height: 40px;

    flex-shrink: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    border:
        1px solid
        rgba(201, 168, 76, 0.35);

    border-radius: 50%;

    color: var(--gold);

}


.contact-icon svg {

    width: 20px;

    height: 20px;

}


/* =========================
   CONTACT INFO
========================= */

.contact-info {

    min-width: 0;

    display: flex;

    flex-direction: column;

}


.contact-label {

    margin-bottom: 8px;

    color: var(--gold);

    font-family: var(--mono);

    font-size: 0.7rem;

    letter-spacing: 2px;

}


.contact-info p {

    margin: 0;

    color: var(--text-dim);

    font-size: 0.85rem;

    line-height: 1.8;

}


.contact-link {

    width: fit-content;

    color: var(--text-dim);

    font-size: 0.85rem;

    line-height: 1.7;

    text-decoration: none;

    overflow-wrap: anywhere;

    transition:
        color 0.25s ease;

}


.contact-link:hover {

    color: var(--gold);

}


.github-link {

    color: white;

}


/* =========================
   FOOTER
========================= */

.contact-footer {

    margin-top: 60px;

    padding: 25px 0;

    border-top:
        1px solid
        rgba(255, 255, 255, 0.08);

    display: flex;

    justify-content: space-between;

    gap: 20px;

    color: #777;

    font-family: var(--mono);

    font-size: 0.7rem;

    line-height: 1.7;

}


/* =========================
   CONTACT RESPONSIVE
========================= */

@media (max-width: 900px) {

    .contact-content {

        grid-template-columns:
            1fr 1fr;

    }

}


@media (max-width: 700px) {

    .contact-inner {

        padding:
            50px 18px 0;

    }


    .contact-content {

        grid-template-columns:
            1fr;

    }


    .contact-item {

        min-height:
            auto;

    }


    .contact-footer {

        flex-direction:
            column;

        align-items:
            flex-start;

    }

}

</style>
