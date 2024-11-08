// DOMContentLoaded 이벤트 사용
// => DOM이 완전히 로드된 후에 JS 코드가 실행되도록 보장 가능
document.addEventListener('DOMContentLoaded', function() {

    // 1. DOM 선언
    const chatLog = document.getElementById('chat-log'),
        userInput = document.getElementById('user-input'),
        sendButton = document.getElementById('send-button'),
        buttonIcon = document.getElementById('button-icon'),
        info = document.querySelector('.info');
    
    // 2. 버튼 클릭 시 이벤트 추가
    sendButton.addEventListener('click', sendMessage);
    
    // 3. 함수 정의하기
    function sendMessage() {
        // 1. 받아온 값 저장 : trim()
        const message = userInput.value.trim();
    
        // 2. 공백만 입력받았을 때 send하지 않기
        // 3. 사용자가 입력한 message 화면에 띄우기(container)
        if (message === '') {
            return
        }
        else {
            appendMessage('user', message);
    
            setTimeout(() => {
                appendMessage('bot', 'nothing to say');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }, 1000);
            return;
        }
    }
    
    // 4. appendMessage 함수 정의
    function appendMessage(sender, message) {
        info.style.display = 'none';
        buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');
    
        // 메세지 담을 Node 생성
        const chatElement = document.createElement('div');      // 전체 채팅박스
        const messageElement = document.createElement('div');   // 채팅 텍스트가 들어갈 박스
        const iconElement = document.createElement('div');      // 사용자/복 아이콘이 들어갈 박스
        const icon = document.createElement('i');               // 사용자/봇 아이콘
    
        chatElement.classList.add('chat-box');
        iconElement.classList.add('icon');
        messageElement.classList.add(sender);   // 전송자가 사용자인지 봇인지 명시
    
        messageElement.innerText = message;    // 메시지를 채팅 텍스트에 들어가도록
    
        if (sender === 'user') {
            icon.classList.add('fa-regular', 'fa-user');    // 유저 아이콘 설정
            iconElement.setAttribute('id', 'user-icon');    // 아이디를 user-icon으로 변경
        }
        else {
            icon.classList.add('fa-solid', 'fa-robot');
            iconElement.setAttribute('id', 'bot-icon');
        }
    
        // 정의한 Node를 트리에 연결
        iconElement.appendChild(icon);              // icon 박스에 icon 추가
        chatElement.appendChild(iconElement);       // 전체 채팅 박스에 아이콘 박스 추가
        chatElement.appendChild(messageElement);   // 전체 채팅 박스에 채팅 텍스트 박스 추가
        chatLog.appendChild(chatElement);           // chat-icon
    }
    }
    );
    
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";