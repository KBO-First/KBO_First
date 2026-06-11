document.getElementById('gnb-wrap').innerHTML = `
    <!-- GNB -->
    <nav class="gnb">
        <div class="gnb-inner">
            <h1 class="logo">
                <a href="/index.html">
                    <span class="icon">⚾</span> KBO First <span class="year">2026</span>
                </a>
            </h1>
            <ul class="nav-links">
                <li><a href="/index.html">Intro</a></li>
                <li><a href="/pages/team.html">Team</a></li>
                <li><a href="/pages/form.html">Find Your Team</a></li>
                <li><a href="/pages/game.html">Game</a></li>
            </ul>
            <div class="gnb-right">
                <a href="/pages/game.html" class="btn-gnb-action">티켓팅 게임 🚀</a>
            </div>
        </div>
    </nav>
`;

document.getElementById('footer-wrap').innerHTML = `
    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-logo">
            <span class="icon">⚾</span> KBO First <span class="year">2026</span>
        </div>
        <p>구원투수 - KBO 야구 입문 가이드</p>
        <p class="copyright">이 사이트는 학업용 프로젝트 목적으로 제작되었습니다.</p>
    </footer>
`;

// 현재 URL과 일치하는 nav 링크에 active 추가
document.querySelectorAll('.nav-links a').forEach(link => {
    if (location.pathname.endsWith(link.getAttribute('href').replace('/', ''))) {
        link.classList.add('active');
    }
});