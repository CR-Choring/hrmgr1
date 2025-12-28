const loginForm = document.getElementById('loginForm');
const loginTitle = document.getElementById('loginTitle');
const inputGroup = document.getElementById('inputGroup'); 
const loginButton = document.getElementById('loginButton');
const csrfTokenInput = document.getElementById('csrfToken');

let step = 1;

// 获取 CSRF
async function getCsrfToken() {
  try {
    const res = await fetch('/api/csrf-token', { credentials: 'include' });
    const data = await res.json();
    csrfTokenInput.value = data.token;
  } catch (err) {
    console.error('获取CSRF令牌失败:', err);
  }
}
getCsrfToken();

loginForm.addEventListener('submit', async e => {
  e.preventDefault();

  if (step === 1) {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    if (!username) return alert('请输入账号');

    // 隐藏账号输入框
    usernameInput.style.display = 'none';

    // 添加密码框
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = '密码';
    passwordInput.required = true;
    inputGroup.appendChild(passwordInput);

    // 添加“记住我”
    const rememberDiv = document.createElement('div');
    rememberDiv.className = 'form-options';
    rememberDiv.innerHTML = '<label><input type="checkbox" id="rememberMe"> 记住我</label>';
    inputGroup.appendChild(rememberDiv);

    loginTitle.textContent = '请输入密码';
    loginButton.textContent = '登录';
    passwordInput.focus();
    step = 2;
    return;
  }

  // 第2步提交密码
  const passwordInput = document.getElementById('password');
  const username = document.getElementById('username').value.trim();
  const password = passwordInput.value.trim();
  if (!password) return alert('请输入密码');

  try {
    const rememberMe = document.getElementById('rememberMe')?.checked;
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfTokenInput.value
      },
      credentials: 'include',
      body: JSON.stringify({ username, password, rememberMe })
    });
    const data = await res.json();

    if (res.ok) {
      showPopup(data.welcome, () => {
        window.location.href = '/home/';
      });
    } else {
      await getCsrfToken();
      showPopup(data.msg);
      passwordInput.value = '';
      passwordInput.focus();
    }
  } catch (err) {
    console.error('登录请求失败:', err);
    alert('服务器无法连接，请稍后再试');
  }
});

function showPopup(message, callback) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  const popupOk = document.getElementById('popup-ok');

  popupMessage.textContent = message;
  popup.classList.remove('hidden');

  popupOk.onclick = () => {
    popup.classList.add('hidden');
    if (callback) callback();
  };
}
