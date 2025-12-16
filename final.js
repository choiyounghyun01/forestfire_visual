const map_X = 100;
const map_Y = 100;
const map_w = 500;
const map_h = 800;
const memo_X = map_X + 500;
const memo_Y = map_X + 50;
const memo_w = 400;
const memo_h = 700;
let selectedRegion = null;


const regions = [
  { name: "강원", x: 270, y: 100, id: 74.1, tem: 23.4, speed: 3.6, rain: 16, map: 14.863},
  { name: "경기", x: 175, y: 60, id: 129.9, tem: 27.8, speed: 3.6, rain: 17.4, map: 0.404 },
  { name: "서울", x: 130, y: 100, id: 9.5, tem: 27.5, speed: 3.9, rain: 18.5, map:0.182 },
  { name: "인천", x: 70, y: 100, id: 18.3, tem:25.5, speed: 3.8, rain: 17.6, map: 0.364},
  { name: "충북", x: 250, y: 190, id: 24.9, tem: 27.8, speed: 3.1, rain: 16.4, map: 1.347},
  { name: "충남", x: 120, y: 260, id: 39.6, tem: 26.4, speed: 3.5, rain: 16.8, map: 7.149},
  { name: "세종", x: 170, y: 240, id: 3.9, tem: 27.8, speed: 3.1, rain: 16.2, map: 0.131},
  { name: "대전", x: 230, y: 300, id: 6.5, tem: 27.8, speed: 4.4, rain: 17.7, map: 0.295},
  { name: "경북", x: 330, y: 300, id: 85.8, tem: 28.4, speed: 3.2, rain: 16.2, map: 24.558},
  { name: "대구", x: 300, y: 370, id: 10.6, tem: 28.8, speed: 2.8, rain: 18.2, map: 1.57},
  { name: "전북", x: 160, y: 380, id: 26.7, tem: 27.8, speed: 3.6, rain: 17.2, map: 0.386},
  { name: "광주", x: 155, y: 470, id: 3.1, tem: 27.8, speed: 4.3, rain: 18.3, map: 0.365},
  { name: "전남", x: 110, y: 520, id: 37.7, tem: 26.1, speed: 3.8, rain: 17, map: 2.882},
  { name: "제주", x: 70, y: 700, id: 0.3, tem: 24.8, speed: 4.4, rain: 18.8, map: 0.7},
  { name: "경남", x: 270, y: 450, id: 49, tem: 27.2, speed: 3.5, rain: 16.6, map: 4.113},
  { name: "울산", x: 370, y: 400, id: 11.9, tem: 25.8, speed: 2.9, rain: 17.3, map: 4.925},
  { name: "부산", x: 370, y: 500, id: 13.7, tem: 24.6, speed: 4.4, rain: 18.6, map: 1.299}
];

// SVG 기본 생성
const svg = d3.select("#container")
  .append("svg")
  .attr("width", 1100)
  .attr("height", 1500);

// 지도 이미지
svg.append("image")
  .attr("href", "https://upload.wikimedia.org/wikipedia/commons/d/dc/Map_of_South_Korea-blank.svg")
  .attr("x", map_X)
  .attr("y", map_Y)
  .attr("width", map_w)
  .attr("height", map_h);


// 기본 메모 그룹
const memoGroup = svg.append("g").attr("id", "memoDefault");

memoGroup.append("rect")
  .attr("x", memo_X)
  .attr("y", memo_Y)
  .attr("width", memo_w)
  .attr("height", memo_h)
  .attr("fill", "white")
  .attr("stroke", "#333")
  .attr("stroke-width", 1);

const maptitle=memoGroup.append("text")
  .text("건당 피해 면적")
  .attr("x", memo_X + memo_w / 2 -50)
  .attr("y", memo_Y + 285)
  .attr("text-anchor", "middle")
  .attr("font-size", "20px");

const maptext=memoGroup.append("text")
  .text("-")
  .attr("x", memo_X + memo_w / 2 + 70)
  .attr("y", memo_Y + 285)
  .attr("text-anchor", "middle")
  .attr("font-size", "20px");

const mapt=memoGroup.append("text")
  .text("h")
  .attr("x", memo_X + memo_w / 2 +110)
  .attr("y", memo_Y + 285)
  .attr("text-anchor", "middle")
  .attr("font-size", "20px");

const memoText = memoGroup.append("text")
  .text("전국")
  .attr("x", memo_X + memo_w / 2)
  .attr("y", memo_Y + 50)
  .attr("text-anchor", "middle")
  .attr("font-size", "30px");

const idText = memoGroup.append("text")
  .text("-")
  .attr("x", memo_X + 310)
  .attr("y", memo_Y + 350)
  .attr("text-anchor", "middle")
  .attr("font-size", "30px");

const temText = memoGroup.append("text")
  .text("-")
  .attr("x", memo_X + 310)
  .attr("y", memo_Y + 400)
  .attr("text-anchor", "middle")
  .attr("font-size", "30px");

const speedText = memoGroup.append("text")
  .text("-")
  .attr("x", memo_X + 310)
  .attr("y", memo_Y + 450)
  .attr("text-anchor", "middle")
  .attr("font-size", "30px");

const rainText = memoGroup.append("text")
  .text("-")
  .attr("x", memo_X + 310)
  .attr("y", memo_Y + 500)
  .attr("text-anchor", "middle")
  .attr("font-size", "30px");

const vi=memoGroup.append("rect")
  .attr("x", memo_X+310)
  .attr("y", memo_X+310)
  .attr("r", 10)

const labels = [
  ["2015-2024 산불 발생 횟수", 350],
  ["2015-2024 평균 최고 기온", 400],
  ["2015-2024 평균 풍속", 450],
  ["2015-2024 평균 습도", 500]
];

labels.forEach(([text, offsetY]) => {
  memoGroup.append("text")
    .text(text)
    .attr("x", memo_X + memo_w / 2 - 170)
    .attr("y", memo_Y + offsetY)
    .attr("text-anchor", "start")
    .attr("font-size", "20px")
    .attr("fill", "black");
});

const unitlabels = [
  ["건", 350],
  ["°C", 400],
  ["(m/s)", 450],
  ["%", 500]
];

unitlabels.forEach(([text, offsetY]) => {
  memoGroup.append("text")
    .text(text)
    .attr("x", memo_X + memo_w / 2 + 150)
    .attr("y", memo_Y + offsetY)
    .attr("text-anchor", "start")
    .attr("font-size", "15px")
    .attr("fill", "black");
});


const memoPage = svg.append("g")
  .attr("id", "memoPage")
  .style("display", "none");

memoPage.append("rect")
  .attr("x", memo_X)
  .attr("y", memo_Y)
  .attr("width", memo_w)
  .attr("height", memo_h)
  .attr("fill", "white")
  .attr("stroke", "#555");

// 타이틀
memoPage.append("text")
  .text("지역 간 데이터 비교")
  .attr("x", memo_X + memo_w / 2)
  .attr("y", memo_Y + 50)
  .attr("text-anchor", "middle")
  .attr("font-size", "24px")
  .attr("fill", "black");

memoPage.append("rect")
  .attr("x", memo_X+50)
  .attr("y", memo_Y+25)
  .attr("width", 30)
  .attr("height", 30)
  .attr("fill", "gray")
  .attr("stroke", "#555")
  .attr("rx", "5");

memoPage.append("text")
  .text("🔄")
  .attr("x", memo_X + 65)
  .attr("y", memo_Y + 45)
  .attr("text-anchor", "middle")
  .style("cursor", "pointer")
  .attr("class","reset");


memoPage.selectAll(".reset")
  .on("click", () => {
    displayedRegions = [];

    ["count", "tem", "speed", "rain"].forEach(type => {
      svg.selectAll(`.bar-${type}`).remove();
      svg.selectAll(`.${type}-label`).remove();
    });

    svg.selectAll(".x-label").remove();
    xScale.domain([]); // x축 초기화
  });

// 그래프 영역 기본 세팅
const chartWidth = 300;
const chartHeight = 80;
const barPadding = 5;

// x축 스케일 (막대 너비 + 간격에 맞춰)
const xScale = d3.scaleBand()
  .domain(regions.map(d => d.name))
  .range([0, chartWidth])
  .padding(0.1);

// y축 스케일은 각 데이터 타입마다 다름, 임의 최대값 설정
const yScaleTem = d3.scaleLinear().domain([0, 50]).range([chartHeight, 0]);
const yScaleSpeed = d3.scaleLinear().domain([0, 10]).range([chartHeight, 0]);
const yScaleRain = d3.scaleLinear().domain([0, 20]).range([chartHeight, 0]);
const yScaleCount = d3.scaleLinear().domain([0, 130]).range([chartHeight, 0]);

// 차트 그룹 만들기
const countGroup = memoPage.append("g")
  .attr("class", "chartGroup")
  .attr("transform", `translate(${memo_X + 50}, ${memo_Y + 80})`);

countGroup.append("text")
  .text("발생 횟수 (건)")
  .attr("x", 0)
  .attr("y", +120)
  .attr("font-size", "16px")
  .attr("fill", "black");

const temGroup = memoPage.append("g")
  .attr("class", "chartGroup")
  .attr("transform", `translate(${memo_X + 50}, ${memo_Y + 200})`);

temGroup.append("text")
  .text("기온 (°C)")
  .attr("x", 0)
  .attr("y", +120)
  .attr("font-size", "16px")
  .attr("fill", "black");

const speedGroup = memoPage.append("g")
  .attr("class", "chartGroup")
  .attr("transform", `translate(${memo_X + 50}, ${memo_Y + 300})`);

speedGroup.append("text")
  .text("풍속 (m/s)")
  .attr("x", 0)
  .attr("y", +120)
  .attr("font-size", "16px")
  .attr("fill", "black");

const rainGroup = memoPage.append("g")
  .attr("class", "chartGroup")
  .attr("transform", `translate(${memo_X + 50}, ${memo_Y + 430})`);

rainGroup.append("text")
  .text("습도 (%)")
  .attr("x", 0)
  .attr("y", +120)
  .attr("font-size", "16px")
  .attr("fill", "black");

// 데이터 저장용 (그래프에 표시된 지역 이름 리스트)
let displayedRegions = [];

// 막대그래프를 추가하는 함수
function addBarToChart(region) {
  if (displayedRegions.includes(region.name)) {
    // 이미 그래프에 표시된 지역이면 추가 안 함
    return;
  }

  displayedRegions.push(region.name);

  // x 스케일 업데이트 (영역 확장)
  xScale.domain(displayedRegions);

  //countGroup에 막대 추가
    countGroup.selectAll("rect.bar-count")
    .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar-count")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleCount(d.id))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleCount(d.id))
        .attr("fill", "green"),
      update => update
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleCount(d.id))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleCount(d.id))
    );
//count 막대에 값 추가
countGroup.selectAll("text.count-label")
  .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
  .join(
    enter => enter.append("text")
      .attr("class", "count-label")
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleCount(d.id) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text(d => d.id),
    update => update
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleCount(d.id) - 5)
      .text(d => d.id)
  );

  // temGroup에 막대 추가
  temGroup.selectAll("rect.bar-tem")
    .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar-tem")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleTem(d.tem))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleTem(d.tem))
        .attr("fill", "tomato"),
      update => update
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleTem(d.tem))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleTem(d.tem))
    );

temGroup.selectAll("text.tem-label")
  .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
  .join(
    enter => enter.append("text")
      .attr("class", "tem-label")
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleTem(d.tem) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text(d => d.tem),
    update => update
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleTem(d.tem) - 5)
      .text(d => d.tem)
  );

  // speedGroup에 막대 추가
  speedGroup.selectAll("rect.bar-speed")
    .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar-speed")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleSpeed(d.speed))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleSpeed(d.speed))
        .attr("fill", "steelblue"),
      update => update
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleSpeed(d.speed))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleSpeed(d.speed))
    );

speedGroup.selectAll("text.speed-label")
  .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
  .join(
    enter => enter.append("text")
      .attr("class", "speed-label")
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleSpeed(d.speed) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text(d => d.speed),
    update => update
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleSpeed(d.speed) - 5)
      .text(d => d.speed)
  );

  // rainGroup에 막대 추가
  rainGroup.selectAll("rect.bar-rain")
    .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar-rain")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleRain(d.rain))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleRain(d.rain))
        .attr("fill", "orange"),
      update => update
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScaleRain(d.rain))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScaleRain(d.rain))
    );


rainGroup.selectAll("text.rain-label")
  .data(displayedRegions.map(name => regions.find(r => r.name === name)), d => d.name)
  .join(
    enter => enter.append("text")
      .attr("class", "rain-label")
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleRain(d.rain) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text(d => d.rain),
    update => update
      .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", d => yScaleRain(d.rain) - 5)
      .text(d => d.rain)
  )

function updateXLabels(group, yOffset) {
  const labels = group.selectAll("text.x-label")
    .data(displayedRegions, d => d);

  labels.join(
    enter => enter.append("text")
      .attr("class", "x-label")
      .attr("x", d => xScale(d) + xScale.bandwidth() / 2)
      .attr("y", yOffset)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(d => d),
    update => update
      .attr("x", d => xScale(d) + xScale.bandwidth() / 2)
      .attr("y", yOffset)
      .text(d => d)
  );
}
updateXLabels(countGroup, chartHeight + 15);
updateXLabels(temGroup, chartHeight + 15);
updateXLabels(speedGroup, chartHeight + 15);
updateXLabels(rainGroup, chartHeight + 15);
}


// ellipse+line 클릭 시 함수
function onEllipseClick(event, d) {
  event.stopPropagation();

  // 메모 기본은 숨기고 새 페이지 보이기
  d3.select("#memoDefault").style("display", "none");
  d3.select("#memoPage").style("display", "block");
  // 새 지역 막대 추가
  addBarToChart(d);
}

// 지역 그룹 생성 및 이벤트
const regionGroup = svg.selectAll("g.region")
  .data(regions)
  .enter()
  .append("g")
  .attr("class", "region")
  .on("mouseover", function () {
    if (this !== selectedRegion) {
      d3.select(this).select("rect").attr("fill", "tomato");
      d3.select(this).select("text").attr("fill", "white");
    }
  })
  .on("mouseout", function () {
    if (this !== selectedRegion) {
      d3.select(this).select("rect").attr("fill", "white");
      d3.select(this).select("text").attr("fill", "black");
    }
  })
  .on("click", function (event, d) {
    d3.select("#memoDefault").style("display", "block");
    d3.select("#memoPage").style("display", "none");
  
    d3.selectAll(".mapCircle").remove();
    memoGroup.append("circle")
     .attr("cx", (memo_X+memo_w)-memo_w/2)
     .attr("cy", memo_Y+160)
     .attr("r", d.map*4)
     .attr("fill", "tomato")
     .attr("stroke-width", 1)
     .attr("class", "mapCircle");
    

    if (selectedRegion) {
      d3.select(selectedRegion).select("rect").attr("fill", "white");
      d3.select(selectedRegion).select("text").attr("fill", "black");
    }

    d3.select(this).select("rect").attr("fill", "tomato");
    d3.select(this).select("text").attr("fill", "white");
    selectedRegion = this;

    memoText.text(d.name);
    idText.text(d.id);  
    temText.text(d.tem);
    speedText.text(d.speed);
    rainText.text(d.rain);
    maptext.text(d.map);
  });

// rect + text
regionGroup.append("rect")
  .attr("x", d => map_X + d.x)
  .attr("y", d => map_Y + d.y)
  .attr("width", 40)
  .attr("height", 60)
  .attr("fill", "white")
  .attr("stroke", "#333");


regionGroup.append("text")
  .text(d => d.name)
  .attr("x", d => map_X + d.x + 20)
  .attr("y", d => map_Y + d.y + 30)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "black");

// ellipse + cross lines with click 이벤트 바인딩
regionGroup.append("ellipse")
  .attr("cx", d => map_X + d.x + 35)
  .attr("cy", d => map_Y + d.y)
  .attr("rx", 10)
  .attr("ry", 10)
  .attr("fill", "gray")
  .style("cursor", "pointer")
  .attr("class","ellipse")
  .on("click", onEllipseClick);

regionGroup.append("line")
  .attr("x1", d => map_X + d.x + 30)
  .attr("x2", d => map_X + d.x + 40)
  .attr("y1", d => map_Y + d.y)
  .attr("y2", d => map_Y + d.y)
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .style("cursor", "pointer")
  .on("click", onEllipseClick);

regionGroup.append("line")
  .attr("x1", d => map_X + d.x + 35)
  .attr("x2", d => map_X + d.x + 35)
  .attr("y1", d => map_Y + d.y - 5)
  .attr("y2", d => map_Y + d.y + 5)
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .style("cursor", "pointer")
  .on("click", onEllipseClick);