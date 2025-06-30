<template>
  <div class="main">
    <!-- yes -->
    <section id="yes" class="hero">
      <div ref="gridRef" class="grid-system">
        <div
          v-for="n in 12"
          :key="n"
          :class="['block', `block--${n}`, morphDirections[n - 1]]"
        ></div>

        <!-- 중앙 텍스트 -->
        <div class="block--text">
          <div ref="heroTextRef" class="hero-text">
            <span class="hero-yes"><strong>Y</strong><span class="morph">OON</span></span>
            <br class="later" />
            <span class="hero-here"><strong>H</strong><span class="morph">YE</span></span
            >&nbsp;<span class="here-sentence"></span>
            <span class="hero-ready"><strong>R</strong><span class="morph">YEONG</span></span
            ><span class="ready-sentence"></span>
          </div>
        </div>
      </div>
    </section>
    <div class="inner">
      <!-- here -->
      <section id="here" class="here">
        <article class="posts">
          <div>
            <h2>Here.</h2>
            <div class="title-wrap">
              <h4>Recent Posts</h4>
              <div class="quick-buttons">
                <ClientOnly>
                  <NuxtLink v-hover="{ bg: '#008dff', text: '#fff' }" to="/posts" class="quick">
                    More Posts
                    <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="currentColor" d="M7 7L17 17M17 17V9M17 17H9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg> -->
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </NuxtLink>
                </ClientOnly>
              </div>
            </div>
            <ul class="study">
              <template v-for="(item, index) in studyItems" :key="index">
                <li>
                  <NuxtLink :to="`/postsDetail/${item.id}`">
                    <!-- <span>{{ index + 1 }}</span> -->
                    <!-- 썸네일 이미지 -->
                    <!-- <img v-if="getThumbnailImage(item)" :src="getThumbnailImage(item)" alt="썸네일" class="object-cover" @error="(e) => (e.target.src = '/placeholder-thumbnail.png')" /> -->
                    <i>{{ formatDateToYMD(item.created_time) }}</i>
                    <p>
                      {{ item.properties.title.title[0]?.plain_text || "제목 없음" }}
                    </p>
                  </NuxtLink>
                </li>
              </template>
            </ul>
            <div class="quick-more">
              <ClientOnly>
                <NuxtLink
                  v-hover="{ bg: '#fd30ae', text: '#fff' }"
                  target="_blank"
                  to="https://nebula-fiction-5e4.notion.site/197a784e4dc28023bd15de919529bcdd?v=197a784e4dc280e5aa57000cb639d563"
                  class="quick"
                >
                  <svg
                    class="icon"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Notion</title>
                    <path
                      fill="currentColor"
                      d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"
                    />
                  </svg>
                  Log
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H9M17 7V15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NuxtLink>
              </ClientOnly>
              <ClientOnly>
                <NuxtLink
                  v-hover="{ bg: '#ce2cff', text: '#fff' }"
                  target="_blank"
                  to="https://www.notion.so/198a784e4dc2809eb19affa4e028e53a?v=1ada784e4dc2804f9ae9000ced9c1d0f&source=copy_link"
                  class="quick"
                >
                  <svg
                    class="icon"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Notion</title>
                    <path
                      fill="currentColor"
                      d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"
                    />
                  </svg>
                  References
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H9M17 7V15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NuxtLink>
              </ClientOnly>
            </div>
          </div>
          <MorphinText :texts="['Yes,', 'Here.', 'Ready.']" />
        </article>
      </section>
      <!-- ready -->
      <section id="ready" class="ready">
        <h2>Ready.</h2>
        <div class="text-container">
          <p>
            저는 함께할 준비가 되어 있어요.<br />
            준비되셨다면, 편하게 메시지를 남겨주세요.
          </p>
          <form @submit.prevent="submitForm" novalidate class="multi-step-form">
            <!-- Step 1 -->
            <template v-if="step >= 1 && step !== 4">
              <div class="editor">
                <label for="name"><span>Q</span> 어떻게 불러드리면 될까요?</label>
                <div class="answer">
                  <span>A</span>
                  <input
                    ref="nameRef"
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="성함 또는 회사"
                    required
                    autocomplete="off"
                    @keydown.enter.prevent
                    :disabled="step !== 1"
                  />
                </div>
              </div>
              <div v-if="step === 1" class="button-wrap">
                <button
                  type="button"
                  v-hover="{ text: '#fff', bg: '#ce2cfe' }"
                  class="next"
                  v-if="form.name.trim()"
                  @click="nextStep"
                >
                  다음
                </button>
              </div>
            </template>

            <!-- Step 2 -->
            <template v-if="step >= 2 && step !== 4">
              <div class="editor">
                <label for="contactInput"><span>Q</span> 답변드릴 방법 알려주세요.</label>
                <div class="toggle-switch">
                  <button
                    type="button"
                    @click="toggleContactType"
                    class="switch"
                    :disabled="step !== 2"
                  >
                    <span :class="{ active: contactType === 'email' }">이메일</span>
                    <span :class="{ active: contactType === 'tel' }">전화번호</span>
                  </button>
                </div>
                <div class="answer">
                  <span>A</span>
                  <input
                    ref="contactRef"
                    id="contactInput"
                    :type="contactType"
                    v-model="contactValue"
                    :placeholder="contactType === 'email' ? 'justdoit@coding.com' : '010-5959-8282'"
                    required
                    autocomplete="off"
                    @keydown.enter.prevent
                    :disabled="step !== 2"
                  />
                </div>
              </div>
              <div v-if="step === 2" class="button-wrap">
                <button
                  type="button"
                  v-hover="{ text: '#eeeeee', bg: '#921fc1' }"
                  class="prev"
                  @click="prevStep"
                >
                  이전
                </button>
                <button
                  type="button"
                  v-hover="{ text: '#fff', bg: '#ce2cfe' }"
                  class="next"
                  v-if="isContactValid"
                  @click="nextStep"
                >
                  다음
                </button>
              </div>
            </template>

            <!-- Step 3 -->
            <template v-if="step >= 3 && step !== 4">
              <div class="editor">
                <label for="message"
                  ><span>Q</span> 궁금한 점이나 편하게 하고 싶은 얘기를 적어주세요.</label
                >
                <div class="answer">
                  <span>A</span>
                  <textarea
                    ref="messageRef"
                    id="message"
                    v-model="form.message"
                    placeholder="자유롭게 적어주세요."
                    required
                    autocomplete="off"
                    rows="1"
                    @input="autoResize"
                    @keydown.enter.prevent
                    :disabled="step !== 3"
                  />
                </div>
              </div>
              <div class="button-wrap">
                <button
                  type="button"
                  v-hover="{ text: '#eeeeee', bg: '#921fc1' }"
                  class="prev"
                  @click="prevStep"
                >
                  이전
                </button>
                <button
                  type="button"
                  v-hover="{ text: '#fff', bg: '#ce2cfe' }"
                  class="next"
                  v-if="form.message.trim()"
                  @click="nextStep"
                >
                  다음
                </button>
              </div>
            </template>

            <!-- Step 4: 요약 & 전송 -->
            <template v-if="step >= 4">
              <div class="preview">
                <p>
                  작성하신 내용, 한번 확인해 보세요! <br />
                  <span class="date">
                    {{ formattedDateTime }}
                  </span>
                </p>
                <dl>
                  <dt>성함 · 회사</dt>
                  <dd>{{ form.name }}</dd>
                </dl>
                <dl>
                  <dt>연락처</dt>
                  <dd>{{ contactValue }}</dd>
                </dl>
                <dl>
                  <dt>메시지</dt>
                  <dd>{{ form.message }}</dd>
                </dl>
              </div>
              <!-- reCAPTCHA 위젯 -->
              <div id="recaptcha-container"></div>
              <!-- 제출 버튼 -->
              <div class="button-wrap">
                <button
                  type="button"
                  v-hover="{ text: '#eeeeee', bg: '#921fc1' }"
                  class="prev last"
                  @click="prevStep"
                >
                  이전
                </button>
                <button type="submit" v-hover="{ text: '#fff', bg: '#ce2cfe' }" class="submit">
                  메시지 남기고 답변 기다리기
                </button>
                <div class="success-group">
                  <p class="success-message">메시지 잘 받았어요! 답변 조금만 기다려 주세요 💌</p>
                  <button class="prev" @click="formReset">처음으로 가기</button>
                </div>
              </div>
            </template>
          </form>
        </div>
        <!-- <MattersText /> -->
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
// import TextPlugin from "gsap/TextPlugin";
// import Flip from "gsap/Flip";
/** 애니메이션 */
onMounted(() => {
  animation();
});

const heroTextRef = ref(null);

const morphDirections = [
  "toY",
  "toX",
  "toX",
  "toY",
  "toX",
  "toY",
  "toY",
  "toX",
  "toX",
  "toY",
  "toX",
  "toY",
];
const gridRef = ref(null);

const animation = () => {
  if (!heroTextRef.value) return;

  const heroText = heroTextRef.value;
  const [el1, el2, el3] = Array.from(heroText.querySelectorAll(".morph"));

  const menuLink = document.querySelector('a[href="#yes"]');
  ScrollTrigger.create({
    trigger: "#yes",
    start: "top top",
    end: "+=9000",
    pin: true,
    anticipatePin: 1,
  });

  // 2) 각 단어 모핑은 개별 ScrollTrigger로 제어 (scrub: false)
  gsap.to(el1, {
    text: "es,",
    duration: 0.5,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#yes",
      start: 200,
      toggleActions: "play none none reverse",
    },
  });

  gsap.to(el2, {
    text: "ere.",
    duration: 0.5,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#yes",
      start: 500,
      toggleActions: "play none none reverse",
    },
  });

  gsap.to(el3, {
    text: "eady.",
    duration: 0.5,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#yes",
      start: 700,
      toggleActions: "play none none reverse",
    },
  });

  const grid = gridRef.value;
  const computed = window.getComputedStyle(grid);
  const gridCols = computed.getPropertyValue("grid-template-columns").split(" ").length;
  const gridRows = computed.getPropertyValue("grid-template-rows").split(" ").length;
  const gap = parseFloat(computed.getPropertyValue("gap"));

  // 전체 gap 너비 = (열 - 1) * gap
  const totalGapX = (gridCols - 1) * gap;
  const totalGapY = (gridRows - 1) * gap;

  // 실제 셀 하나 크기 (gap 제외하고 나눈 값)
  const cellWidth = (grid.clientWidth - totalGapX) / gridCols;
  const cellHeight = (grid.clientHeight - totalGapY) / gridRows;
  const minSize = Math.min(cellWidth, cellHeight);

  // 1) 원본 블록과 클론 매핑
  const originalBlocks = Array.from(grid.querySelectorAll(".block"));
  const pairs = originalBlocks.map((el) => {
    // 해당 원본 위치 정보
    const style = getComputedStyle(el);
    const [cStart, cEnd] = style.gridColumn.split(/\s*\/\s*/);
    const [rStart, rEnd] = style.gridRow.split(/\s*\/\s*/);
    const startCol = +cStart;
    const colSpan = cEnd.includes("span") ? +cEnd.replace("span", "") : +cEnd - startCol;
    const startRow = +rStart;
    const rowSpan = rEnd.includes("span") ? +rEnd.replace("span", "") : +rEnd - startRow;

    // 이 원본에 대응하는 클론들 생성
    const clones = [];
    for (let row = 0; row < rowSpan; row++) {
      for (let col = 0; col < colSpan; col++) {
        const clone = el.cloneNode(false);
        clone.classList.add("block--clone");
        clone.style.gridColumn = `${startCol + col} / span 1`;
        clone.style.gridRow = `${startRow + row} / span 1`;
        clone.style.opacity = 0;
        clone.style.transform = "scale(0.8)";

        clone.style.width = `${minSize}px`;
        clone.style.height = `${minSize}px`;

        grid.appendChild(clone);
        clones.push(clone);
      }
    }

    // 원본은 위쪽 z-index & 보이도록
    el.style.zIndex = 2;
    el.style.opacity = 1;

    return { original: el, clones };
  });

  // 2) 세트 순서 랜덤 섞기
  const randomPairs = gsap.utils.shuffle(pairs);

  // 3) 타임라인 + ScrollTrigger (scrub)
  const blockSeparateTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#yes",
      start: 1500,
      end: 2500,
      scrub: true,
    },
  });
  const blockHideTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#yes",
      start: 2500,
      end: 3500,
      scrub: true,
    },
  });

  // 4) 각 세트마다 애니메이션 연결 (+0.1초 오프셋)
  randomPairs.forEach(({ original, clones }, i) => {
    // 클론 등장 & 원본 사라짐
    blockSeparateTl.to(
      clones,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      i * 0.1
    );
    blockSeparateTl.to(
      original,
      {
        opacity: 0,
        duration: 0.2,
        ease: "none",
      },
      i * 0.1
    );
    blockHideTl.to(
      clones,
      {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      i * 0.1
    );
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#yes",
      start: 4000,
      end: 4500,
      scrub: true,
    },
  });

  tl.to(".block--text", {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  }).to(".hero-text", { width: "auto" }, { width: "0%", duration: 0.5 }, 0.2);

  gsap.to(".hero-ready", {
    marginTop: "1rem",
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#yes",
      start: 4550,
      toggleActions: "play none none reverse",
    },
  });
  const YHRTransformTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#yes",
      start: 4500,
      end: 8000,
      scrub: true,
    },
  });
  YHRTransformTl.to("br.later", { display: "none" }, 0)
    .to(".hero-ready", { display: "block" }, 0)
    .to(
      ".here-sentence",
      {
        duration: 500,
        text: {
          value:
            "I am. <br/> The one you've been looking for.<br>" +
            "I believe in the value of collaboration<br>" +
            "and get better outcomes through clear communication.",
          delimiter: " ", // "" 글자단위, " " 단어단위
          innerHTML: true, // HTML 태그(<br>)를 렌더링하도록 허용
        },
      },
      "+=100"
    )
    .to(".ready-sentence", {
      duration: 500,
      text: {
        value:
          "I adapt quickly to new environments, <br>" +
          "stay flexible when things change,<br>" +
          "and I'm always excited to learn new technology.<br>" +
          "Feel free to get in touch below.",
        delimiter: " ", // "" 글자단위, " " 단어단위
        innerHTML: true, // HTML 태그(<br>)를 렌더링하도록 허용
      },
    });
};

/** 스크롤 이동 */
import { ScrollSmoother } from "gsap/ScrollSmoother";
const scrollTo = (id) => {
  const target = document.getElementById(id);
  if (target) {
    ScrollSmoother.get().scrollTo(target, true, "power2.out");
  }
};

/* posts contents */
const { data: notionData } = await useFetch("/api/notion/notion");

const studyItems = computed(() => {
  const items = notionData.value?.results || [];
  return items.filter((item) => item.properties.category?.select?.name === "study").slice(0, 3); // 최대 3개까지만 반환;
});
/** 날짜 포맷 */
function formatDateToYMD(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

/* 문의하기 (resend) */
// const form = reactive({
//     name: "",
//     email: "",
//     message: "",
// });

// const submitForm = async () => {
//     const { data, error } = await useFetch("/api/contact", {
//         method: "POST",
//         body: form,
//     });

//     if (data.value?.success) {
//         alert(`메시지 잘 받았어요! 조금만 기다려 주세요, 곧 답변 드리겠습니다. 💌`);
//         form.name = "";
//         form.email = "";
//         form.message = "";
//     } else {
//         alert(`잠시 문제가 생긴 것 같아요. 다시 시도해 주세요. 그래도 문제가 지속되면 아래 방법으로 연락 주세요!
//     https://invite.kakao.com/tc/eU2mkP3Og4
//     `);
//     }
// };

/**문의하기 (notion db) */
const step = ref(1);
const contactType = ref("email"); // 타입 제거

// refs
const nameRef = ref(null);
const contactRef = ref(null);
const messageRef = ref(null);
const form = reactive({
  name: "",
  email: "",
  tel: "",
  message: "",
});

// Step 이동
// contactValue: 이메일/전화 필드 get/set
const contactValue = computed({
  get() {
    return contactType.value === "email" ? form.email : form.tel;
  },
  set(val) {
    if (contactType.value === "email") form.email = val;
    else form.tel = val;
  },
});

// 연락처 유효성 검사: contactValue만 검사
const isContactValid = computed(() => {
  const v = contactValue.value.trim();
  if (!v) return false;
  return contactType.value === "email"
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    : /^\d[\d\s-]{3,}\d$/.test(v);
});

// 단계 이동
const smoother = ScrollSmoother.get();
function nextStep() {
  if (step.value < 4) {
    step.value++;

    if (smoother) {
      nextTick(() => {
        const scrollY = smoother.content().scrollHeight - smoother.wrapper().clientHeight;
        smoother.scrollTo(scrollY, true);
      });
    }
  }
}

function prevStep() {
  if (step.value > 1) step.value--;
}
watch(step, async (newStep) => {
  await nextTick();
  if (newStep === 1) {
    nameRef.value?.focus();
  } else if (newStep === 2) {
    contactRef.value?.focus();
  } else if (newStep === 3) {
    messageRef.value?.focus();
    autoResize();
  }
});

// 연락처/이메일 토글
function toggleContactType() {
  // 타입 토글 및 값 초기화
  contactType.value = contactType.value === "email" ? "tel" : "email";
  if (contactType.value === "email") form.email = "";
  else form.tel = "";
}

// textarea 자동 확장
const MAX_ROWS = 5;
function autoResize() {
  const el = messageRef.value;
  if (!el) return;
  el.style.height = "auto";
  const lh = parseFloat(getComputedStyle(el).lineHeight);
  el.style.height = `${Math.min(el.scrollHeight, lh * MAX_ROWS)}px`;
}

// 현재 날짜를 YYYY.MM.DD 형식으로 포맷팅
const formattedDateTime = computed(() => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
});

const siteKey = "6LdPLGIrAAAAACiuYxdJr6IYnP_wDw46YS-IWl51"; // reChaptcha 공개 키 (사이트키)
let widgetId = null;
watch(step, async (newStep) => {
  if (newStep >= 4) {
    await nextTick();
    renderRecaptcha();
  }
}); // grecaptcha 로딩 대기 & 렌더링
function renderRecaptcha() {
  const el = document.getElementById("recaptcha-container");
  if (!el) return;

  const tryRender = () => {
    if (window.grecaptcha && grecaptcha.render) {
      // 이미 렌더되었는지 확인
      if (widgetId === null) {
        widgetId = grecaptcha.render(el, {
          sitekey: siteKey,
        });
      }
    } else {
      setTimeout(tryRender, 100);
    }
  };

  tryRender();
}
const submitForm = async () => {
  const reCaptcha = document.querySelector("#recaptcha-container");
  const submitEl = document.querySelector(".submit");
  const prevEl = document.querySelector(".prev.last");
  const successGroup = document.querySelector(".success-group");

  const token = grecaptcha.getResponse(widgetId);

  if (!token) {
    alert("로봇이 아님을 체크해주세요.");
    return;
  }

  // 1. submit 버튼 → 로딩 텍스트 전환
  gsap.to(submitEl, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      if (submitEl) submitEl.textContent = "전송 중...";
      gsap.to(submitEl, { opacity: 1, duration: 0.3 });
    },
  });

  // 2. 이전 버튼 숨김
  gsap.to(prevEl, {
    width: 0,
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
    onComplete: () => {
      if (prevEl) prevEl.style.display = "none";
    },
  });

  try {
    const data = await $fetch("/api/notion/contact", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email || undefined,
        tel: form.tel || undefined,
        message: form.message,
      },
    });

    if (data?.success) {
      const tl = gsap.timeline();

      // submit 버튼 사라짐
      tl.to(submitEl, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (submitEl) submitEl.style.display = "none";
          if (successGroup) successGroup.style.display = "flex";
          if (reCaptcha) reCaptcha.style.minHeight = 0;
          if (reCaptcha) reCaptcha.style.height = 0;
          if (reCaptcha) reCaptcha.style.marginBottom = 0;
          if (reCaptcha) reCaptcha.style.visibility = "hidden";
        },
      });

      // success 메시지 표시
      tl.fromTo(
        successGroup,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      throw new Error("서버 오류");
    }
  } catch (error) {
    const proceed = confirm(`잠시 문제가 생긴 것 같아요. 다시 시도해 주세요.`);
    if (proceed) {
      window.open("https://invite.kakao.com/tc/eU2mkP3Og4", "_blank");
    }
  }

  grecaptcha.reset(widgetId);
};

const formReset = () => {
  const reCaptcha = document.querySelector("#recaptcha-container");
  const submitEl = document.querySelector(".submit");
  const prevEl = document.querySelector(".prev.last");
  const successGroup = document.querySelector(".success-group");
  // 폼 초기화
  form.name = "";
  form.email = "";
  form.tel = "";
  form.message = "";
  step.value = 1;

  widgetId = null;

  const resetTl = gsap.timeline();

  // success 메시지 사라짐
  resetTl.to(successGroup, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      if (successGroup) successGroup.style.display = "none";
      if (reCaptcha) reCaptcha.style.minHeight = "7.8rem";
      if (reCaptcha) reCaptcha.style.height = "auto";
      if (reCaptcha) reCaptcha.style.marginBottom = "2rem";
      if (reCaptcha) reCaptcha.style.visibility = "visible";
      renderRecaptcha();
    },
  });

  // submit 버튼 복구
  resetTl.call(() => {
    if (submitEl) {
      submitEl.textContent = "메시지 남기고 답변 기다리기";
      submitEl.style.display = "inline-block";
    }
  });
  resetTl.to(submitEl, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  });

  // prev 버튼 복구
  resetTl.call(() => {
    if (prevEl) prevEl.style.display = "inline-block";
  });
  resetTl.to(prevEl, {
    width: "auto",
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  });
};
</script>
