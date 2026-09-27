<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

import { getStudents } from "../services/studentService"

const router = useRouter()

const students = ref([])

onMounted(async () => {
  try {
    students.value = await getStudents()
  } catch (error) {
    console.error(error)
  }
})

function openResume(student) {
  router.push(`/resume/${student.id}`)
}
</script>

<template>

  <main class="home">

    <!-- Decorative background layers -->
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-glow bg-glow--top" aria-hidden="true"></div>
    <div class="bg-glow bg-glow--bottom" aria-hidden="true"></div>
    <div class="bg-orbit" aria-hidden="true"></div>

    <section class="hero">

      <div class="hero-label">
        PORTFOLIO
      </div>

      <h1>
        MY
        <span>PORTFOLIO</span>
      </h1>

      <div class="hero-meta">
        <span class="hero-meta__dot"></span>
        <span class="hero-meta__chip">Kasetsart University, Sriracha Campus</span>
      </div>

      <div class="students">

        <button
          v-for="(student, index) in students"
          :key="student.id"
          class="student-btn"
          :style="{ '--delay': `${index * 0.06}s` }"
          @click="openResume(student)"
        >
          <span class="student-btn__avatar">{{ student.name?.charAt(0) }}</span>
          <span class="student-btn__name">{{ student.name }}</span>
          <span class="student-btn__arrow">→</span>
        </button>

      </div>

      <p v-if="!students.length" class="empty-state">
        No students available yet
      </p>

    </section>

  </main>

</template>

<style scoped>
.home {
  position: relative;

  min-height: calc(100vh - 70px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 20px;

  overflow: hidden;

  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212, 175, 90, 0.06), transparent 70%),
    linear-gradient(180deg, #050507 0%, #0a0a0d 55%, #06070a 100%);
}

/* ---------- Decorative background ---------- */

.bg-grid {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(rgba(212, 175, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 175, 90, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;

  mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 85%);

  pointer-events: none;
  z-index: 0;
}

.bg-glow {
  position: absolute;

  border-radius: 50%;
  filter: blur(90px);

  pointer-events: none;
  z-index: 0;

  animation: glowDrift 12s ease-in-out infinite alternate;
}

.bg-glow--top {
  width: 480px;
  height: 480px;

  top: -160px;
  left: 50%;
  transform: translateX(-50%);

  background: radial-gradient(circle, rgba(212, 175, 90, 0.18), transparent 70%);
}

.bg-glow--bottom {
  width: 380px;
  height: 380px;

  bottom: -140px;
  right: 8%;

  background: radial-gradient(circle, rgba(120, 100, 40, 0.14), transparent 70%);

  animation-delay: -6s;
}

.bg-orbit {
  position: absolute;

  width: 640px;
  height: 640px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid rgba(212, 175, 90, 0.08);
  border-radius: 50%;

  pointer-events: none;
  z-index: 0;
}

.bg-orbit::before,
.bg-orbit::after {
  content: "";

  position: absolute;

  width: 5px;
  height: 5px;
  border-radius: 50%;

  background: var(--gold, #d4af5a);
  box-shadow: 0 0 8px 2px rgba(212, 175, 90, 0.6);
}

.bg-orbit::before {
  top: -3px;
  left: 50%;
}

.bg-orbit::after {
  bottom: 8%;
  right: 4%;
}

@keyframes glowDrift {
  0% {
    transform: translate(-50%, 0) scale(1);
  }
  100% {
    transform: translate(-50%, 20px) scale(1.08);
  }
}

/* ---------- Hero content ---------- */

.hero {
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 900px;

  text-align: center;
}

.hero-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin-bottom: 18px;

  opacity: 0;
  animation: fadeUp 0.7s ease forwards;
  animation-delay: 0.05s;
}

.hero-tag__line {
  width: 28px;
  height: 1px;

  background: linear-gradient(90deg, transparent, var(--gold, #d4af5a));
}

.hero-tag__line:last-child {
  background: linear-gradient(90deg, var(--gold, #d4af5a), transparent);
}

.hero-tag__text {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--gold-dim);
}

.hero-label {
  font-family: var(--mono);

  font-size: 10px;

  letter-spacing: 4px;

  color: var(--gold-dim);

  margin-bottom: 25px;

  opacity: 0;
  animation: fadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
}

h1 {
  margin: 0;

  font-family: var(--serif);

  font-size: clamp(3rem, 7vw, 6rem);

  line-height: 1.1;

  color: white;

  opacity: 0;
  animation: fadeUp 0.75s ease forwards;
  animation-delay: 0.18s;
}

h1 span {
  display: block;

  background: linear-gradient(120deg, #f3dfa4, #d4af5a 45%, #f6e6b4 70%, #b8923f);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  text-shadow: 0 0 40px rgba(212, 175, 90, 0.25);

  animation: shimmer 6s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}

p {
  margin-top: 20px;

  color: var(--text-dim);

  font-family: var(--mono);

  font-size: 13px;

  opacity: 0;
  animation: fadeUp 0.75s ease forwards;
  animation-delay: 0.26s;
}

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin-top: 22px;

  opacity: 0;
  animation: fadeUp 0.75s ease forwards;
  animation-delay: 0.32s;
}

.hero-meta__chip {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 2px;

  color: var(--gold-dim);

  padding: 6px 12px;
  border: 1px solid rgba(212, 175, 90, 0.25);
  border-radius: 999px;

  background: rgba(212, 175, 90, 0.04);
}

.hero-meta__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gold-dim);
}

.students {
  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  gap: 14px;

  margin-top: 44px;
}

.student-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 22px 12px 12px;

  border-radius: 999px;

  border: 1.5px solid rgba(212, 175, 90, 0.55);

  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(6px);

  color: var(--gold, #d4af5a);

  cursor: pointer;

  font-family: inherit;
  font-size: 14px;

  transition: var(--transition), box-shadow 0.3s ease;

  opacity: 0;
  transform: translateY(14px);
  animation: fadeUp 0.6s ease forwards;
  animation-delay: calc(0.4s + var(--delay, 0s));
}

.student-btn__avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 26px;
  border-radius: 50%;

  background: linear-gradient(135deg, rgba(212, 175, 90, 0.25), rgba(212, 175, 90, 0.05));
  border: 1px solid rgba(212, 175, 90, 0.4);

  font-family: var(--serif);
  font-size: 12px;
  font-weight: 600;
  color: #f3dfa4;

  flex-shrink: 0;
}

.student-btn__name {
  white-space: nowrap;
}

.student-btn__arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: var(--transition);

  font-size: 13px;
}

.student-btn:hover {
  background: rgba(212, 175, 90, 0.1);

  color: #f6e6b4;

  transform: translateY(-3px);

  box-shadow: 0 8px 24px -6px rgba(212, 175, 90, 0.35);
}

.student-btn:hover .student-btn__arrow {
  opacity: 1;
  transform: translateX(0);
}

.empty-state {
  margin-top: 30px;

  color: var(--text-dim);
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 1px;

  opacity: 0.6;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- Responsive ---------- */

@media (max-width: 768px) {
  .bg-orbit {
    width: 420px;
    height: 420px;
  }

  .hero-meta {
    flex-wrap: wrap;
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .home {
    padding: 30px 16px;
  }

  h1 {
    font-size: clamp(2.4rem, 12vw, 3.6rem);
  }

  .students {
    gap: 10px;
  }

  .student-btn {
    padding: 10px 18px 10px 10px;
    font-size: 13px;
  }
}

@media (max-width: 375px) {
  .hero-tag__text {
    font-size: 9px;
    letter-spacing: 2px;
  }

  .hero-meta__chip {
    font-size: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-glow,
  h1 span,
  .hero-tag,
  .hero-label,
  h1,
  p,
  .hero-meta,
  .student-btn {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>