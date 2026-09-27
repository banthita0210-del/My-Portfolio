<script setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getStudents } from "../services/studentService"

const route = useRoute()
const router = useRouter()

const studentName = ref("Student")
const studentLastname = ref("Portfolio")
const studentImage = ref("")

// =========================
// MENU
// =========================

const menuOpen = ref(false)

function toggleMenu() {

  menuOpen.value = !menuOpen.value

}

function closeMenu() {

  menuOpen.value = false

}


// =========================
// LOAD STUDENT
// =========================

async function loadStudent() {

  // ถ้าอยู่หน้า Home
  if (!route.params.id) {

    studentName.value = "Student"
    studentLastname.value = "Portfolio"
    studentImage.value = ""

    return

  }

  try {

    const students = await getStudents()

    const student = students.find(
      (item) => item.id == route.params.id
    )

    if (student) {

      studentName.value = student.name

      studentLastname.value =
        student.lastname || ""

      if (student.image) {

        studentImage.value =
          `${import.meta.env.BASE_URL}images/${student.image}`

      }

    }

  } catch (error) {

    console.error(error)

  }

}

loadStudent()

watch(
  () => route.params.id,
  () => {

    loadStudent()

  }
)


// =========================
// HOME
// =========================

function goHome() {

  closeMenu()

  router.push("/")

}

// =========================
// ABOUT ME
// =========================

function goAbout() {

  closeMenu()

  setTimeout(() => {

    const aboutSection =
      document.querySelector(".about-section")

    if (aboutSection) {

      const navbarHeight = 70

      const position =
        aboutSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight

      window.scrollTo({

        top: position,

        behavior: "smooth"

      })

    }

  }, 100)

}



// =========================
// SKILLS
// =========================

function goSkills() {

  closeMenu()

  const skillsSection =
    document.querySelector(".skills-section")

  if (skillsSection) {

    skillsSection.scrollIntoView({

      behavior: "smooth",

      block: "start"

    })

  }

}

// =========================
// EXPERIENCE
// =========================

function goExperience() {

  closeMenu()

  const experienceSection =
    document.querySelector(".experience-section")

  if (experienceSection) {

    experienceSection.scrollIntoView({

      behavior: "smooth",

      block: "start"

    })

  }

}


// =========================
// ACHIEVEMENTS
// =========================

function goAchievements() {

  closeMenu()

  const achievementSection =
    document.querySelector(".achievement-section")

  if (achievementSection) {

    achievementSection.scrollIntoView({

      behavior: "smooth",

      block: "start"

    })

  }

}


// =========================
// ACTIVITIES
// =========================

function goActivities() {

  closeMenu()

  const activitySection =
    document.querySelector(".activity-section")

  if (activitySection) {

    activitySection.scrollIntoView({

      behavior: "smooth",

      block: "start"

    })

  }

}

// =========================
// CONTACT
// =========================

function goContact() {

  closeMenu()

  const contactSection =
    document.querySelector(".contact-section")

  if (contactSection) {

    contactSection.scrollIntoView({

      behavior: "smooth",

      block: "start"

    })

  }

}
</script>


<template>

  <nav class="navbar">

    <!-- =========================
         LOGO / PROFILE
    ========================== -->

    <div class="nav-logo">

      <div class="nav-profile">

        <!-- ถ้ามีรูป -->
        <img
          v-if="studentImage"
          :src="studentImage"
          alt="Profile"
        />

        <!-- ถ้าไม่มีรูป -->
        <span v-else>
          SP
        </span>

      </div>


      <div>

        <strong>
          {{ studentName }}
        </strong>

        <small>
          {{ studentLastname }}
        </small>

      </div>

    </div>


    <!-- =========================
         HAMBURGER BUTTON
    ========================== -->

    <button
      class="menu-toggle"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >

      <span></span>

      <span></span>

      <span></span>

    </button>


    <!-- =========================
         NAV MENU
    ========================== -->

    <div
      class="nav-menu"
      :class="{ 'menu-open': menuOpen }"
    >

      <button @click="goHome">
        HOME
      </button>

      <button @click="goAbout">
        ABOUT ME
      </button>

      <button @click="goSkills">
      SKILLS
      </button>

      <button @click="goExperience">
        EXPERIENCE
      </button>

      <button @click="goAchievements">
        ACHIEVEMENTS
      </button>

      <button @click="goActivities">
        ACTIVITIES
      </button>

      <button @click="goContact"> 
        CONTACT 
      </button>

    </div>

  </nav>

</template>


<style scoped>

/* =========================
   NAVBAR
========================= */

.navbar {

  position:
    fixed;

  top:
    0;

  left:
    0;

  right:
    0;

  height:
    70px;

  z-index:
    9999;


  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;


  padding:
    0 2rem;


  background:
    rgba(17, 17, 24, 0.95);

  backdrop-filter:
    blur(10px);


  border-bottom:
    1px solid
    rgba(201, 168, 76, 0.35);

}


/* =========================
   LOGO
========================= */

.nav-logo {

  display:
    flex;

  align-items:
    center;

  gap:
    10px;

  color:
    white;

}


.nav-profile {

  width:
    42px;

  height:
    42px;


  border-radius:
    50%;

  overflow:
    hidden;


  display:
    flex;

  align-items:
    center;

  justify-content:
    center;


  background:
    #c9a84c;

  color:
    #111118;


  flex-shrink:
    0;

}


.nav-profile img {

  width:
    100%;

  height:
    100%;

  object-fit:
    cover;

}


.nav-profile span {

  font-family:
    "Courier New",
    monospace;

  font-size:
    12px;

  font-weight:
    bold;

}


.nav-logo div {

  display:
    flex;

  flex-direction:
    column;

}


.nav-logo strong {

  font-size:
    14px;

}


.nav-logo small {

  font-size:
    10px;

  color:
    #c9a84c;

  letter-spacing:
    1px;

}


/* =========================
   NAV MENU
========================= */

.nav-menu {

  display:
    flex;

  align-items:
    center;

  gap:
    8px;

}


.nav-menu button {

  border:
    none;

  background:
    transparent;

  color:
    #e8e2d0;


  padding:
    9px 16px;

  border-radius:
    8px;


  cursor:
    pointer;


  font-family:
    "Courier New",
    monospace;

  font-size:
    12px;

  letter-spacing:
    1px;

}


.nav-menu button:hover {

  color:
    #c9a84c;

  background:
    rgba(201, 168, 76, 0.1);

}


/* =========================
   HAMBURGER BUTTON
========================= */

.menu-toggle {

  display:
    none;


  width:
    42px;

  height:
    42px;


  border:
    none;

  background:
    transparent;


  cursor:
    pointer;


  flex-direction:
    column;

  justify-content:
    center;

  align-items:
    center;


  gap:
    5px;

}


.menu-toggle span {

  display:
    block;


  width:
    23px;

  height:
    2px;


  background:
    #c9a84c;


  border-radius:
    2px;

}


/* =========================
   TABLET / SMALL SCREEN
========================= */

@media (max-width: 900px) {

  .navbar {

    padding:
      0 1rem;

  }


  /* แสดงปุ่ม 3 ขีด */

  .menu-toggle {

    display:
      flex;

  }


  /* ซ่อนเมนู */

  .nav-menu {

    display:
      none;


    position:
      absolute;


    top:
      70px;

    right:
      1rem;


    width:
      220px;


    padding:
      10px;


    flex-direction:
      column;


    align-items:
      stretch;


    gap:
      4px;


    background:
      rgba(17, 17, 24, 0.98);


    border:
      1px solid
      rgba(201, 168, 76, 0.35);


    border-radius:
      10px;


    box-shadow:
      0 10px 30px
      rgba(0, 0, 0, 0.4);

  }


  /* เมื่อกดปุ่ม 3 ขีด */

  .nav-menu.menu-open {

    display:
      flex;

  }


  .nav-menu button {

    width:
      100%;


    text-align:
      left;


    padding:
      12px 14px;


    font-size:
      11px;

  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .navbar {

    padding:
      0 1rem;

  }


  .nav-profile {

    width:
      38px;

    height:
      38px;

  }


  .nav-logo strong {

    font-size:
      12px;

  }


  .nav-logo small {

    font-size:
      9px;

  }


  .nav-menu {

    right:
      1rem;

    width:
      200px;

  }


  .nav-menu button {

    padding:
      11px 12px;

    font-size:
      10px;

  }

}

</style>