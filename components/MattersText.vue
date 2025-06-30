<template>
    <div ref="canvasContainer" class="matters-text"></div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Matter from "matter-js";

const canvasContainer = ref(null);
const engine = Matter.Engine.create();
const world = engine.world;
let render = Matter.Render;
let runner = Matter.Runner;

// 텍스트와 관련된 색상 정보를 객체로 묶어서 배열로 처리
const textData = [
    { text: "HTML", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "CSS", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "SCSS", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "JavaScript", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "Vue", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "Nuxt", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "React", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "Next", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
    { text: "Figma", bgColor: "transparent", borderColor: "#ffffff", textColor: "#ffffff" },
];

// 캔버스 크기 자동 조절
const updateCanvasSize = () => {
    if (!render) return;

    const width = canvasContainer.value.offsetWidth;
    const height = canvasContainer.value.offsetHeight;

    render.options.width = width;
    render.options.height = height;
    render.canvas.width = width;
    render.canvas.height = height;

    Matter.Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
    });

    Matter.World.clear(world, false);
    Matter.Composite.add(world, [
        Matter.Bodies.rectangle(width / 2, height, width, 20, {
            isStatic: true,
            render: { visible: false },
        }), // 바닥
        Matter.Bodies.rectangle(0, height / 2, 20, height, {
            isStatic: true,
            render: { visible: false },
        }), // 왼쪽 벽
        Matter.Bodies.rectangle(width, height / 2, 20, height, {
            isStatic: true,
            render: { visible: false },
        }), // 오른쪽 벽
    ]);
};
const getResponsiveFontSize = () => {
    const screenWidth = window.innerWidth;
    return Math.max(18, Math.min(40, screenWidth * 0.03));
};

const measureTextWidth = (text) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const fontSize = getResponsiveFontSize();
    ctx.font = `${fontSize}px Funnel Display`; // 사용 중인 폰트 적용
    return ctx.measureText(text).width; // 텍스트 실제 너비 반환
};
// 둥근 박스 생성 및 추가
const createRoundedBoxes = () => {
    if (!render) return;

    textData.forEach((data, index) => {
        const lineWidth = 2; // 테두리 두께
        const boxWidth = measureTextWidth(data.text) + getResponsiveFontSize() * 1.5; // 텍스트 길이에 맞춰 박스 크기
        const boxHeight = getResponsiveFontSize() * 2; // 박스 기본 높이
        const radius = getResponsiveFontSize(); // 둥근 정도 설정
        const x = Math.random() * (canvasContainer.value.offsetWidth - boxWidth - lineWidth) + boxWidth / 2;
        const y = -index * 80; // 높이를 다르게 설정해 떨어지는 시점 차이

        // 물리적 충돌 영역은 lineWidth를 고려하여 크기를 확장합니다.
        const box = Matter.Bodies.rectangle(x, y, boxWidth + lineWidth, boxHeight + lineWidth, {
            chamfer: { radius }, // 박스 모서리를 둥글게
            restitution: 0.4, // 탄성 값 설정
            render: {
                fillStyle: "transprent", // 배경 색상
                strokeStyle: "transprent", // 테두리 색상
                lineWidth: 0, // 물리적 영역에서는 stroke를 적용하지 않음
                visible: false, // 충돌 영역은 화면에 보이지 않도록 설정
            },
        });

        Matter.Composite.add(world, box);

        // 도형과 함께 회전하는 텍스트
        Matter.Events.on(render, "afterRender", () => {
            const ctx = render?.context;
            ctx.save();
            ctx.translate(box.position.x, box.position.y);
            ctx.rotate(box.angle);

            // 렌더링에서는 실제 박스 크기만 사용하고 lineWidth만큼 외부에 테두리 그리기
            const xOffset = -boxWidth / 2;
            const yOffset = -boxHeight / 2;

            ctx.beginPath();
            ctx.moveTo(xOffset + radius, yOffset); // 시작점

            // 각 모서리에 arcTo로 둥글게 처리
            ctx.arcTo(xOffset + boxWidth, yOffset, xOffset + boxWidth, yOffset + boxHeight, radius); // top-right
            ctx.arcTo(xOffset + boxWidth, yOffset + boxHeight, xOffset, yOffset + boxHeight, radius); // bottom-right
            ctx.arcTo(xOffset, yOffset + boxHeight, xOffset, yOffset, radius); // bottom-left
            ctx.arcTo(xOffset, yOffset, xOffset + boxWidth, yOffset, radius); // top-left

            ctx.closePath();

            // 배경 색상 채우기
            ctx.fillStyle = data.bgColor;
            ctx.fill();

            // 외부 stroke 그리기
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = data.borderColor; // 테두리 색상
            ctx.stroke();

            // 텍스트 그리기
            const fontSize = getResponsiveFontSize();
            ctx.font = `${fontSize}px Funnel Display`; // 사용 중인 폰트 적용
            ctx.fillStyle = data.textColor; // 텍스트 색상
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(data.text, 0, 0);

            ctx.restore();
        });
    });
};

// 마우스 이벤트 핸들러
const addMouseEvents = () => {
    // 마우스 컨트롤
    const mouse = Matter.Mouse.create(render?.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.01,
            maxForce: 0.3, // 최대 힘을 제한 (마우스로 너무 빠르게 끌리지 않도록)
            damping: 0.6,
            render: {
                visible: false,
            },
        },
    });

    Matter.Composite.add(world, mouseConstraint);

    // 마우스가 클릭된 객체에 대한 상호작용
    Matter.Events.on(mouseConstraint, "mousedown", (event) => {});

    // 마우스가 객체에 올라갈 때
    Matter.Events.on(mouseConstraint, "mousemove", (event) => {
        // 여기서 마우스 위치에 따른 효과를 넣을 수 있음
    });

    // 마우스가 객체에서 벗어났을 때
    Matter.Events.on(mouseConstraint, "mouseup", (event) => {});
};

onMounted(() => {
    if (!canvasContainer.value) return;

    const width = canvasContainer.value.offsetWidth;
    const height = canvasContainer.value.offsetHeight;

    render = Matter.Render.create({
        element: canvasContainer.value,
        engine: engine,
        options: {
            width,
            height,
            wireframes: false,
            background: "transparent",
        },
    });

    Matter.Render.run(render);

    runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    updateCanvasSize();

    // 둥근 박스 여러 개 생성
    createRoundedBoxes();

    // 마우스 이벤트 추가
    addMouseEvents();

    window.addEventListener("resize", updateCanvasSize);
});

onUnmounted(() => {
    if (render) Matter.Render.stop(render);
    if (runner) Matter.Runner.stop(runner);
    Matter.World.clear(world);
    Matter.Engine.clear(engine);
    if (render?.canvas) render.canvas.remove();
    window.removeEventListener("resize", updateCanvasSize);
});
</script>
