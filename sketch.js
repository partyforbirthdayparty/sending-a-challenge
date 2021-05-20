let cnv, letter_holder
let video_owl
let letters = []
let img_letter = []
let cnv_height
let is_letter_arrived, is_ready_to_interact=false, not_played_yet = true
let a_challenge;

function preload(){
  // 영상 불러오기
  video_owl = createVideo(['Assets/fight3.mp4'], videoLoaded);
  video_owl.onended(owlArrived)
  // 이미지 element 미리 만들어서 숨겨두기
  for(let i=0; i<4; i++){
    letters[i] = createImg('Assets/challenge2x-'+(i+1)+'.png', '도전장')
    letters[i].hide()
  }
}

function videoLoaded(){
  is_ready_to_interact = true
}

function calculateWidth(w){
  // bootstrap container 크기 맞춰서 수정
  if (w < 576){
    return windowWidth
  }else if (w < 768){
    return 540
  }else if (w < 992){
    return 720
  }else if (w < 1200){
    return 960
  }else if (w < 1400){
    return 1140
  }else{
    return 1320
  }
}

function setup() {
  // canvas
  container = document.querySelector(".cnv-holder")
  cnv_width = calculateWidth(windowWidth)
  cnv_height = cnv_width / 1280 * 720
  cnv = createCanvas(cnv_width, cnv_height)
  cnv.parent(container)
  
  // 편지를 담을 div
  letter_holder = document.querySelector(".letter-holder")
  for(letter of letters)
    letter.parent(letter_holder)
  
  // 하이퍼링크
  a = createA('https://open.kakao.com/o/ga8k01dd', '>> 진짜 무료 도전을 수락하려는 김동민이라면 여기로 <<');
  a.parent(letter_holder)
  a.attribute('class','my-3')
  a.hide()
}

function draw() {
  // 로딩 중
  if(!is_ready_to_interact){
    background(0)
    fill(255)
    textAlign(CENTER, CENTER)
    text("loading...", width/2, height/2)
  }
  else if(is_ready_to_interact & not_played_yet){
    background(30)
    fill(255)
    textSize(12)
    text("시작하려면 화면을 누르세요\n(소리가 있으니 소리를 켜고 눌러주세요)", width/2, height/2)
    if(mouseIsPressed){
      video_owl.play(1)
      not_played_yet = false
    }
  }
  else{
    if (video_owl)
    image(video_owl, 0, 0, width, height); // 캔버스에 비디오 프레임 그리기
    if(is_letter_arrived){ 
      textAlign(CENTER, CENTER)
      textSize(30)
      text("⬇", width/2, height/2)
    }
  }
  
    
  
}

// 영상 재생이 끝나면,
function owlArrived() {
  is_letter_arrived = true
  // 도전장 나타내기
  let idx = 1
  for (letter of letters){
    letter.show()
    letter.attribute('class', 'animate__animated animate__bounceInDown animate__slow animate__delay-'+(idx)+'s')
    idx += 1
  }
  // 하이퍼링크 보여주기
  a.show()
}

// 창 사이즈 조절되면,
function windowResized() {
  cnv_width = calculateWidth(windowWidth)
  cnv_height = cnv_width / 1280 * 720
  resizeCanvas(cnv_width, cnv_height)
}
