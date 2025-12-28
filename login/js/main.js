const loginForm = document.getElementById('loginForm');
const loginTitle = document.getElementById('loginTitle');
const usernameInput = document.getElementById('username');
const passwordGroup = document.getElementById('passwordGroup');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

let step = 1; // 步骤控制：1=输入账号，2=输入密码

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (step === 1) {
    if (!usernameInput.value.trim()) return alert('请输入账号');
    // 进入密码步骤
    step = 2;
    loginTitle.textContent = '请输入密码';
    passwordGroup.style.display = 'flex';
    usernameInput.disabled = true;
    loginButton.textContent = '登录';
  } else {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!password) return alert('请输入密码');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.msg);
        // 登录成功跳转首页
        window.location.href = '/frontend/home/home.html';
      } else {
        alert(data.msg);
        passwordInput.value = '';
      }
    } catch (err) {
      console.error(err);
      alert('服务器无法连接');
    }
  }
});
